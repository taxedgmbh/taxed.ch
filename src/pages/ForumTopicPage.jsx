import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ForumLayout } from '@/components/features/forum/ForumLayout';
import { ForumTopic } from '@/components/features/forum/ForumTopic';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Share2, 
  Bookmark, 
  Heart,
  Flag,
  Edit,
  Trash2,
  Star,
  MessageCircle,
  Eye,
  Clock,
  User
} from 'lucide-react';

const ForumTopicPage = () => {
  const { topicSlug } = useParams();
  const navigate = useNavigate();
  const [topic, setTopic] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLiked, setUserLiked] = useState(false);
  const [userBookmarked, setUserBookmarked] = useState(false);

  // Mock data for now
  const mockTopics = {
    'quellensteuer-refund-expat-urgent': {
      id: '1',
      title: 'Quellensteuer refund for expat - urgent help needed',
      slug: 'quellensteuer-refund-expat-urgent',
      content: 'I need help with my Quellensteuer refund. I\'m an expat working in Switzerland and I\'m not sure about the process. I\'ve been here for 2 years and I think I might be eligible for a refund. Can someone guide me through the process?\n\nI have all my salary statements and my residence permit. I\'m just not sure about the forms and deadlines.',
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
    }
  };

  const mockPosts = [
    {
      id: '1',
      content: 'To get a Quellensteuer refund, you need to file Form 85 with the Swiss tax authorities. Since you\'ve been here for 2 years, you should be eligible. Here\'s what you need to do:\n\n1. Download Form 85 from the tax office website\n2. Fill out your personal details\n3. Attach your salary statements\n4. Submit before the deadline (usually March 31st)\n\nI can help you with the specific sections if you need. The key is to make sure you have all your documents ready.',
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
      content: 'I went through this process last year. The key is to make sure you have all your documents ready. Don\'t forget to include your residence permit and any tax certificates from your home country.\n\nAlso, make sure to check if your home country has a tax treaty with Switzerland - this can affect your eligibility.',
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
    },
    {
      id: '3',
      content: 'Just to add to the expert\'s answer - the deadline for Form 85 is indeed March 31st, but you can submit it earlier. I submitted mine in February and got my refund by April.\n\nAlso, make sure to keep copies of everything you submit. The tax office can be slow to respond, so having records is important.',
      author: {
        id: '4',
        name: 'Mike Johnson',
        role: 'member',
        reputation: 280
      },
      isSolution: false,
      isExpertAnswer: false,
      likes: 5,
      dislikes: 0,
      userLiked: false,
      userDisliked: false,
      createdAt: '2024-01-15T14:00:00Z',
      updatedAt: '2024-01-15T14:00:00Z'
    }
  ];

  useEffect(() => {
    // Simulate loading
    setLoading(true);
    setTimeout(() => {
      const topicData = mockTopics[topicSlug];
      if (topicData) {
        setTopic(topicData);
        setPosts(mockPosts);
        setUserLiked(topicData.userLiked);
        setUserBookmarked(topicData.userBookmarked);
      }
      setLoading(false);
    }, 1000);
  }, [topicSlug]);

  const handleLike = (postId) => {
    if (postId === topic.id) {
      setUserLiked(!userLiked);
      // Update topic likes
      setTopic(prev => ({
        ...prev,
        likes: userLiked ? prev.likes - 1 : prev.likes + 1
      }));
    } else {
      // Update post likes
      setPosts(prev => prev.map(post => 
        post.id === postId 
          ? { ...post, likes: post.userLiked ? post.likes - 1 : post.likes + 1, userLiked: !post.userLiked }
          : post
      ));
    }
  };

  const handleDislike = (postId) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, dislikes: post.userDisliked ? post.dislikes - 1 : post.dislikes + 1, userDisliked: !post.userDisliked }
        : post
    ));
  };

  const handleBookmark = (topicId) => {
    setUserBookmarked(!userBookmarked);
  };

  const handleMarkSolution = (postId) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, isSolution: true }
        : { ...post, isSolution: false }
    ));
    // Mark topic as solved
    setTopic(prev => ({ ...prev, isSolved: true }));
  };

  const handleReply = (content, parentId) => {
    const newPost = {
      id: Date.now().toString(),
      content,
      author: {
        id: 'current-user',
        name: 'You',
        role: 'member',
        reputation: 100
      },
      isSolution: false,
      isExpertAnswer: false,
      likes: 0,
      dislikes: 0,
      userLiked: false,
      userDisliked: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setPosts(prev => [...prev, newPost]);
  };

  const handleEdit = (postId, content) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, content, updatedAt: new Date().toISOString() }
        : post
    ));
  };

  const handleDelete = (postId) => {
    setPosts(prev => prev.filter(post => post.id !== postId));
  };

  const handleReport = (postId) => {
    // TODO: Implement reporting functionality
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: topic.title,
        text: topic.content,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // Show toast notification
    }
  };

  if (loading) {
    return (
      <ForumLayout>
        <div className="space-y-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
            <div className="h-32 bg-gray-200 rounded mb-6"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="h-24 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </ForumLayout>
    );
  }

  if (!topic) {
    return (
      <ForumLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Topic Not Found</h1>
          <p className="text-gray-600 mb-6">The topic you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/forum')}>
            Back to Forum
          </Button>
        </div>
      </ForumLayout>
    );
  }

  return (
    <ForumLayout>
      <div className="space-y-6">
        {/* Topic Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center space-x-4 mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate(`/forum/category/${topic.category.id}`)}
              className="flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to {topic.category.name}
            </Button>
          </div>

          <Card className="p-6">
            <div className="space-y-4">
              {/* Title and Meta */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {topic.title}
                  </h1>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      <span className="font-medium">{topic.author.name}</span>
                      <Badge className="ml-2 bg-gray-100 text-gray-800">
                        {topic.author.role}
                      </Badge>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {new Date(topic.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {topic.views} views
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(topic.id)}
                    className={userLiked ? 'text-red-500' : 'text-gray-500'}
                  >
                    <Heart className="w-4 h-4 mr-1" />
                    {topic.likes}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleBookmark(topic.id)}
                    className={userBookmarked ? 'text-blue-500' : 'text-gray-500'}
                  >
                    <Bookmark className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleShare}
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {topic.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    #{tag}
                  </Badge>
                ))}
              </div>

              {/* Topic Content */}
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {topic.content}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <ForumTopic
            topic={topic}
            posts={posts}
            onLike={handleLike}
            onDislike={handleDislike}
            onBookmark={handleBookmark}
            onMarkSolution={handleMarkSolution}
            onReply={handleReply}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onReport={handleReport}
          />
        </motion.div>
      </div>
    </ForumLayout>
  );
};

export default ForumTopicPage;
