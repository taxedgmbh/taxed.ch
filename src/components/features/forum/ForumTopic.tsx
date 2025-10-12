import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  MessageCircle, 
  Eye, 
  Heart, 
  Bookmark, 
  Star,
  Share2,
  Flag,
  Edit,
  Trash2,
  User,
  Clock,
  ArrowLeft,
  Reply,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';

interface ForumPost {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    role: 'member' | 'expert' | 'moderator' | 'admin';
    reputation: number;
  };
  isSolution: boolean;
  isExpertAnswer: boolean;
  likes: number;
  dislikes: number;
  userLiked?: boolean;
  userDisliked?: boolean;
  createdAt: string;
  updatedAt: string;
  replies?: ForumPost[];
}

interface ForumTopic {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    role: 'member' | 'expert' | 'moderator' | 'admin';
  };
  category: {
    id: string;
    name: string;
    color: string;
  };
  tags: string[];
  status: 'active' | 'locked' | 'pinned' | 'archived';
  isSolved: boolean;
  views: number;
  likes: number;
  userLiked?: boolean;
  userBookmarked?: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ForumTopicProps {
  topic?: ForumTopic;
  posts?: ForumPost[];
  onReply?: (content: string, parentId?: string) => void;
  onLike?: (postId: string) => void;
  onDislike?: (postId: string) => void;
  onBookmark?: (topicId: string) => void;
  onMarkSolution?: (postId: string) => void;
  onEdit?: (postId: string, content: string) => void;
  onDelete?: (postId: string) => void;
  onReport?: (postId: string) => void;
  loading?: boolean;
  className?: string;
}

export const ForumTopic: React.FC<ForumTopicProps> = ({
  topic,
  posts = [],
  onReply,
  onLike,
  onDislike,
  onBookmark,
  onMarkSolution,
  onEdit,
  onDelete,
  onReport,
  loading = false,
  className = ''
}) => {
  const [replyContent, setReplyContent] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [editingPost, setEditingPost] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  // Mock data for now
  const mockTopic: ForumTopic = {
    id: '1',
    title: 'Quellensteuer refund for expat - urgent help needed',
    content: 'I need help with my Quellensteuer refund. I\'m an expat working in Switzerland and I\'m not sure about the process. I\'ve been here for 2 years and I think I might be eligible for a refund. Can someone guide me through the process?',
    author: {
      id: '1',
      name: 'John Doe',
      role: 'member'
    },
    category: {
      id: '1',
      name: 'Individual Tax Returns',
      color: '#3B82F6'
    },
    tags: ['quellensteuer', 'expat', 'refund'],
    status: 'active',
    isSolved: false,
    views: 156,
    likes: 12,
    userLiked: false,
    userBookmarked: false,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T14:30:00Z'
  };

  const mockPosts: ForumPost[] = [
    {
      id: '1',
      content: 'To get a Quellensteuer refund, you need to file Form 85 with the Swiss tax authorities. Since you\'ve been here for 2 years, you should be eligible. Here\'s what you need to do:\n\n1. Download Form 85 from the tax office website\n2. Fill out your personal details\n3. Attach your salary statements\n4. Submit before the deadline (usually March 31st)\n\nI can help you with the specific sections if you need.',
      author: {
        id: '2',
        name: 'Tax Expert',
        role: 'expert',
        reputation: 1250
      },
      isSolution: false,
      isExpertAnswer: true,
      likes: 8,
      dislikes: 0,
      userLiked: false,
      userDisliked: false,
      createdAt: '2024-01-15T11:00:00Z',
      updatedAt: '2024-01-15T11:00:00Z'
    },
    {
      id: '2',
      content: 'I went through this process last year. The key is to make sure you have all your documents ready. Don\'t forget to include your residence permit and any tax certificates from your home country.',
      author: {
        id: '3',
        name: 'Sarah Wilson',
        role: 'member',
        reputation: 340
      },
      isSolution: false,
      isExpertAnswer: false,
      likes: 3,
      dislikes: 0,
      userLiked: true,
      userDisliked: false,
      createdAt: '2024-01-15T12:30:00Z',
      updatedAt: '2024-01-15T12:30:00Z'
    }
  ];

  const handleReply = () => {
    if (replyContent.trim()) {
      onReply?.(replyContent, replyingTo || undefined);
      setReplyContent('');
      setReplyingTo(null);
    }
  };

  const handleEdit = (post: ForumPost) => {
    setEditingPost(post.id);
    setEditContent(post.content);
  };

  const handleSaveEdit = (postId: string) => {
    if (editContent.trim()) {
      onEdit?.(postId, editContent);
      setEditingPost(null);
      setEditContent('');
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'expert':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'moderator':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'admin':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <Card className="p-6 animate-pulse">
          <div className="space-y-4">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </Card>
        {[...Array(3)].map((_, index) => (
          <Card key={index} className="p-6 animate-pulse">
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-16 bg-gray-200 rounded"></div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => window.history.back()}
        className="mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Topics
      </Button>

      {/* Topic Header */}
      <Card className="p-6">
        <div className="space-y-4">
          {/* Title and Meta */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {mockTopic.title}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  <span className="font-medium">{mockTopic.author.name}</span>
                  <Badge className={`ml-2 ${getRoleColor(mockTopic.author.role)}`}>
                    {mockTopic.author.role}
                  </Badge>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {formatDate(mockTopic.createdAt)}
                </div>
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {mockTopic.views} views
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onLike?.(mockTopic.id)}
                className={mockTopic.userLiked ? 'text-red-500' : 'text-gray-500'}
              >
                <Heart className="w-4 h-4 mr-1" />
                {mockTopic.likes}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onBookmark?.(mockTopic.id)}
                className={mockTopic.userBookmarked ? 'text-blue-500' : 'text-gray-500'}
              >
                <Bookmark className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {mockTopic.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                #{tag}
              </Badge>
            ))}
          </div>

          {/* Topic Content */}
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">
              {mockTopic.content}
            </p>
          </div>
        </div>
      </Card>

      {/* Posts */}
      <div className="space-y-4">
        {mockPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className={`p-6 ${post.isSolution ? 'border-green-200 bg-green-50' : ''}`}>
              <div className="space-y-4">
                {/* Post Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-500" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">{post.author.name}</span>
                        <Badge className={getRoleColor(post.author.role)}>
                          {post.author.role}
                        </Badge>
                        {post.isExpertAnswer && (
                          <Badge className="bg-purple-100 text-purple-800">
                            <Star className="w-3 h-3 mr-1" />
                            Expert
                          </Badge>
                        )}
                        {post.isSolution && (
                          <Badge className="bg-green-100 text-green-800">
                            <Star className="w-3 h-3 mr-1" />
                            Solution
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span>{formatDate(post.createdAt)}</span>
                        <span>•</span>
                        <span>{post.author.reputation} reputation</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onMarkSolution?.(post.id)}
                      disabled={post.isSolution}
                    >
                      <Star className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onReport?.(post.id)}
                    >
                      <Flag className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Post Content */}
                {editingPost === post.id ? (
                  <div className="space-y-3">
                    <Textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      rows={6}
                      className="w-full"
                    />
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        onClick={() => handleSaveEdit(post.id)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Save
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingPost(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {post.content}
                    </p>
                  </div>
                )}

                {/* Post Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onLike?.(post.id)}
                      className={post.userLiked ? 'text-red-500' : 'text-gray-500'}
                    >
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      {post.likes}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDislike?.(post.id)}
                      className={post.userDisliked ? 'text-red-500' : 'text-gray-500'}
                    >
                      <ThumbsDown className="w-4 h-4 mr-1" />
                      {post.dislikes}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setReplyingTo(post.id)}
                    >
                      <Reply className="w-4 h-4 mr-1" />
                      Reply
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(post)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete?.(post.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Reply Form */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {replyingTo ? 'Reply to Post' : 'Add Your Reply'}
        </h3>
        <div className="space-y-4">
          <Textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Share your thoughts and help the community..."
            rows={6}
            className="w-full"
          />
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Be respectful and helpful. Remember, this is a professional tax forum.
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                onClick={() => setReplyingTo(null)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleReply}
                disabled={!replyContent.trim()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Post Reply
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
