import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import { db } from '../../config/firebase';
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  addDoc,
  updateDoc,
  doc,
  Timestamp,
  serverTimestamp,
  getDoc,
  getDocs
} from 'firebase/firestore';
import {
  Send,
  Search,
  User,
  MessageSquare,
  Clock,
  Check,
  CheckCheck,
  Paperclip,
  Image as ImageIcon,
  Bell,
  ChevronLeft
} from 'lucide-react';
import { Conversation, Message, User as UserType } from '../../types/admin';

interface ConversationWithUser extends Conversation {
  customerData?: UserType;
}

const Messages: React.FC = () => {
  const [searchParams] = useSearchParams();
  const customerId = searchParams.get('customerId');

  const { currentUser } = useAdminAuth();
  const [conversations, setConversations] = useState<ConversationWithUser[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<ConversationWithUser | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  // Load conversations
  useEffect(() => {
    if (!currentUser) return;

    const loadConversations = async () => {
      try {
        const conversationsQuery = query(
          collection(db, 'conversations'),
          where('expertId', '==', currentUser.id),
          orderBy('updatedAt', 'desc')
        );

        const unsubscribe = onSnapshot(conversationsQuery, async (snapshot) => {
          const conversationsData: ConversationWithUser[] = [];

          for (const docSnap of snapshot.docs) {
            const conversation = { id: docSnap.id, ...docSnap.data() } as Conversation;

            // Fetch customer data
            const customerDoc = await getDoc(doc(db, 'users', conversation.customerId));
            if (customerDoc.exists()) {
              conversationsData.push({
                ...conversation,
                customerData: { id: customerDoc.id, ...customerDoc.data() } as UserType
              });
            } else {
              conversationsData.push(conversation);
            }
          }

          setConversations(conversationsData);

          // Auto-select conversation if customerId is provided in URL
          if (customerId && !selectedConversation) {
            const targetConversation = conversationsData.find(c => c.customerId === customerId);
            if (targetConversation) {
              setSelectedConversation(targetConversation);
            }
          }

          setLoading(false);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error('Error loading conversations:', error);
        setLoading(false);
      }
    };

    loadConversations();
  }, [currentUser, customerId, selectedConversation]);

  // Load messages for selected conversation
  useEffect(() => {
    if (!selectedConversation) {
      setMessages([]);
      return;
    }

    const messagesQuery = query(
      collection(db, 'messages'),
      where('conversationId', '==', selectedConversation.id),
      orderBy('sentAt', 'asc')
    );

    const unsubscribe = onSnapshot(messagesQuery, async (snapshot) => {
      const messagesData: Message[] = [];
      const unreadMessageIds: string[] = [];

      for (const docSnap of snapshot.docs) {
        const message = { id: docSnap.id, ...docSnap.data() } as Message;
        messagesData.push(message);

        // Track unread messages from customer
        if (message.senderRole === 'customer' && !message.isRead) {
          unreadMessageIds.push(docSnap.id);
        }
      }

      setMessages(messagesData);

      // Mark messages as read
      if (unreadMessageIds.length > 0) {
        markMessagesAsRead(unreadMessageIds);
        updateConversationUnreadCount();
      }

      // Scroll to bottom
      setTimeout(() => scrollToBottom(), 100);
    });

    return () => unsubscribe();
  }, [selectedConversation]);

  const markMessagesAsRead = async (messageIds: string[]) => {
    try {
      const promises = messageIds.map(id =>
        updateDoc(doc(db, 'messages', id), {
          isRead: true,
          readAt: serverTimestamp()
        })
      );
      await Promise.all(promises);
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  };

  const updateConversationUnreadCount = async () => {
    if (!selectedConversation) return;

    try {
      await updateDoc(doc(db, 'conversations', selectedConversation.id), {
        unreadCountExpert: 0,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating conversation unread count:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation || !currentUser) return;

    setSending(true);
    try {
      // Add message to Firestore
      await addDoc(collection(db, 'messages'), {
        conversationId: selectedConversation.id,
        senderId: currentUser.id,
        senderRole: currentUser.role,
        senderName: currentUser.name,
        content: newMessage,
        isRead: false,
        sentAt: serverTimestamp()
      });

      // Update conversation
      await updateDoc(doc(db, 'conversations', selectedConversation.id), {
        lastMessage: newMessage,
        lastMessageTime: serverTimestamp(),
        unreadCountCustomer: (selectedConversation.unreadCountCustomer || 0) + 1,
        updatedAt: serverTimestamp()
      });

      setNewMessage('');
      messageInputRef.current?.focus();
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatTime = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp instanceof Timestamp ? timestamp.toDate() : new Date(timestamp);
    const today = new Date();

    if (date.toDateString() === today.toDateString()) {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    }

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Filter conversations based on search
  const filteredConversations = conversations.filter(conv =>
    conv.customerData?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.customerData?.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg h-[calc(100vh-180px)] flex">
      {/* Conversations List */}
      <div className={`w-full lg:w-1/3 border-r border-gray-200 flex flex-col ${
        selectedConversation ? 'hidden lg:flex' : 'flex'
      }`}>
        {/* Search Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.length > 0 ? (
            filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation)}
                className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                  selectedConversation?.id === conversation.id ? 'bg-indigo-50' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center flex-1">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                      <User className="h-6 w-6 text-gray-600" />
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          {conversation.customerData?.name || 'Unknown Customer'}
                        </p>
                        {conversation.lastMessageTime && (
                          <p className="text-xs text-gray-500">
                            {formatTime(conversation.lastMessageTime)}
                          </p>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 truncate">
                        {conversation.lastMessage || 'No messages yet'}
                      </p>
                    </div>
                  </div>
                  {conversation.unreadCountExpert > 0 && (
                    <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                      {conversation.unreadCountExpert}
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No conversations found</p>
            </div>
          )}
        </div>
      </div>

      {/* Messages Area */}
      <div className={`flex-1 flex flex-col ${
        !selectedConversation ? 'hidden lg:flex' : 'flex'
      }`}>
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <button
                    onClick={() => setSelectedConversation(null)}
                    className="lg:hidden mr-3 p-2 rounded-md hover:bg-gray-100"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                    <User className="h-6 w-6 text-gray-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {selectedConversation.customerData?.name || 'Unknown Customer'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {selectedConversation.customerData?.email}
                    </p>
                  </div>
                </div>
                <button className="p-2 rounded-md hover:bg-gray-100">
                  <Bell className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {messages.length > 0 ? (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.senderRole === currentUser?.role ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.senderRole === currentUser?.role
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white text-gray-900 shadow'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <div className={`flex items-center justify-end mt-1 space-x-1 ${
                          message.senderRole === currentUser?.role ? 'text-indigo-200' : 'text-gray-400'
                        }`}>
                          <span className="text-xs">{formatTime(message.sentAt)}</span>
                          {message.senderRole === currentUser?.role && (
                            message.isRead ? (
                              <CheckCheck className="h-3 w-3" />
                            ) : (
                              <Check className="h-3 w-3" />
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-gray-500">No messages yet. Start the conversation!</p>
                  </div>
                </div>
              )}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-end space-x-2">
                <button className="p-2 rounded-md hover:bg-gray-100">
                  <Paperclip className="h-5 w-5 text-gray-600" />
                </button>
                <button className="p-2 rounded-md hover:bg-gray-100">
                  <ImageIcon className="h-5 w-5 text-gray-600" />
                </button>
                <textarea
                  ref={messageInputRef}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 resize-none border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  rows={1}
                  disabled={sending}
                />
                <button
                  onClick={sendMessage}
                  disabled={!newMessage.trim() || sending}
                  className="p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <p className="text-xl text-gray-500">Select a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;