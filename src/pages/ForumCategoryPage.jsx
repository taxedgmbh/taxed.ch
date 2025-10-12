import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ForumLayout } from '@/components/features/forum/ForumLayout';
import { ForumTopics } from '@/components/features/forum/ForumTopics';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Plus, 
  Filter, 
  Search,
  MessageCircle,
  Users,
  Clock,
  Star,
  Lock,
  Pin
} from 'lucide-react';

const ForumCategoryPage = () => {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filterBy, setFilterBy] = useState('all');

  // Mock data for now
  const mockCategories = {
    'individual-tax-returns': {
      id: '1',
      name: 'Individual Tax Returns',
      slug: 'individual-tax-returns',
      description: 'Questions about personal tax returns, deductions, and individual tax planning',
      icon: 'user',
      color: '#3B82F6',
      topicCount: 24,
      postCount: 156,
      lastActivity: '2 hours ago',
      rules: [
        'Be specific about your tax situation',
        'Include relevant documents when possible',
        'Respect privacy and confidentiality',
        'Follow Swiss tax law guidelines'
      ]
    },
    'business-tax-services': {
      id: '2',
      name: 'Business Tax Services',
      slug: 'business-tax-services',
      description: 'Corporate tax compliance, VAT, and business tax planning',
      icon: 'building',
      color: '#10B981',
      topicCount: 18,
      postCount: 89,
      lastActivity: '4 hours ago',
      rules: [
        'Provide company details when relevant',
        'Include business structure information',
        'Mention industry and revenue size',
        'Follow corporate tax guidelines'
      ]
    },
    'international-tax': {
      id: '3',
      name: 'International Tax',
      slug: 'international-tax',
      description: 'Cross-border tax issues, tax treaties, and expatriate tax planning',
      icon: 'globe',
      color: '#F59E0B',
      topicCount: 31,
      postCount: 203,
      lastActivity: '1 hour ago',
      rules: [
        'Specify your home country and residence status',
        'Include tax treaty information if relevant',
        'Mention double taxation concerns',
        'Provide expat-specific details'
      ]
    }
  };

  const mockTopics = [
    {
      id: '1',
      title: 'Quellensteuer refund for expat - urgent help needed',
      slug: 'quellensteuer-refund-expat-urgent',
      content: 'I need help with my Quellensteuer refund. I\'m an expat and not sure about the process...',
      author: {
        id: '1',
        name: 'John Doe',
        role: 'member'
      },
      category: {
        id: '1',
        name: 'Individual Tax Returns',
        slug: 'individual-tax-returns',
        color: '#3B82F6'
      },
      tags: ['quellensteuer', 'expat', 'refund'],
      status: 'active',
      isSolved: false,
      isFeatured: true,
      views: 156,
      replies: 8,
      likes: 12,
      lastReply: {
        author: 'Tax Expert',
        createdAt: '2 hours ago'
      },
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T14:30:00Z'
    },
    {
      id: '2',
      title: 'Pillar 3a contributions and tax deductions',
      slug: 'pillar-3a-contributions-tax-deductions',
      content: 'I want to maximize my Pillar 3a contributions for tax benefits. What\'s the current limit?',
      author: {
        id: '2',
        name: 'Sarah Wilson',
        role: 'member'
      },
      category: {
        id: '1',
        name: 'Individual Tax Returns',
        slug: 'individual-tax-returns',
        color: '#3B82F6'
      },
      tags: ['pillar-3a', 'deductions', 'retirement'],
      status: 'active',
      isSolved: true,
      isFeatured: false,
      views: 89,
      replies: 15,
      likes: 23,
      lastReply: {
        author: 'Retirement Expert',
        createdAt: '4 hours ago'
      },
      createdAt: '2024-01-14T09:15:00Z',
      updatedAt: '2024-01-15T10:15:00Z'
    },
    {
      id: '3',
      title: 'Tax deductions for home office expenses',
      slug: 'tax-deductions-home-office-expenses',
      content: 'I work from home 3 days a week. Can I deduct home office expenses from my taxes?',
      author: {
        id: '3',
        name: 'Mike Johnson',
        role: 'member'
      },
      category: {
        id: '1',
        name: 'Individual Tax Returns',
        slug: 'individual-tax-returns',
        color: '#3B82F6'
      },
      tags: ['home-office', 'deductions', 'expenses'],
      status: 'active',
      isSolved: false,
      isFeatured: false,
      views: 67,
      replies: 5,
      likes: 8,
      lastReply: {
        author: 'Tax Advisor',
        createdAt: '1 hour ago'
      },
      createdAt: '2024-01-15T08:45:00Z',
      updatedAt: '2024-01-15T13:45:00Z'
    }
  ];

  useEffect(() => {
    // Simulate loading
    setLoading(true);
    setTimeout(() => {
      const categoryData = mockCategories[categorySlug];
      if (categoryData) {
        setCategory(categoryData);
        setTopics(mockTopics);
      }
      setLoading(false);
    }, 1000);
  }, [categorySlug]);

  const handleCreateTopic = () => {
    navigate(`/forum/category/${categorySlug}/create-topic`);
  };

  const handleTopicClick = (topic) => {
    navigate(`/forum/topic/${topic.slug}`);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Filter topics based on search query
    const filtered = mockTopics.filter(topic =>
      topic.title.toLowerCase().includes(query.toLowerCase()) ||
      topic.content.toLowerCase().includes(query.toLowerCase()) ||
      topic.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
    setTopics(filtered);
  };

  const getIcon = (iconName) => {
    const icons = {
      'user': '👤',
      'building': '🏢',
      'globe': '🌍',
      'book-open': '📚',
      'briefcase': '💼',
      'message-circle': '💬'
    };
    return icons[iconName] || '📁';
  };

  if (loading) {
    return (
      <ForumLayout>
        <div className="space-y-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="h-24 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </ForumLayout>
    );
  }

  if (!category) {
    return (
      <ForumLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <p className="text-gray-600 mb-6">The category you're looking for doesn't exist.</p>
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
        {/* Category Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center space-x-4 mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate('/forum')}
              className="flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Forum
            </Button>
          </div>

          <Card className="p-6">
            <div className="flex items-start space-x-4">
              <div 
                className="w-16 h-16 rounded-lg flex items-center justify-center text-white text-2xl font-medium flex-shrink-0"
                style={{ backgroundColor: category.color }}
              >
                {getIcon(category.icon)}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {category.name}
                  </h1>
                  <Badge className="bg-blue-100 text-blue-800">
                    {category.topicCount} topics
                  </Badge>
                </div>
                <p className="text-gray-600 mb-4 text-lg">
                  {category.description}
                </p>
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    {category.topicCount} topics
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {category.postCount} posts
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    Last activity {category.lastActivity}
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <Button
                  onClick={handleCreateTopic}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Topic
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Category Rules */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="p-6 bg-blue-50 border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              Community Guidelines
            </h3>
            <ul className="space-y-2 text-sm text-blue-800">
              {category.rules.map((rule, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  {rule}
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>

        {/* Topics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ForumTopics
            topics={topics}
            categoryId={category.id}
            onTopicClick={handleTopicClick}
            onSearch={handleSearch}
          />
        </motion.div>

        {/* Empty State */}
        {topics.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-12 text-center">
              <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No topics found
              </h3>
              <p className="text-gray-600 mb-6">
                Be the first to start a discussion in this category.
              </p>
              <Button
                onClick={handleCreateTopic}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create First Topic
              </Button>
            </Card>
          </motion.div>
        )}
      </div>
    </ForumLayout>
  );
};

export default ForumCategoryPage;
