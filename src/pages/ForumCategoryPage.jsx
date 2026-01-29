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
  MessageCircle,
  Users,
  Clock,
  AlertCircle
} from 'lucide-react';
import { getCategory, getTopics } from '@/services/forum';

const ForumCategoryPage = () => {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [topics, setTopics] = useState([]);
  const [allTopics, setAllTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Category guidelines (static for now)
  const defaultRules = [
    'Be specific about your tax situation',
    'Include relevant documents when possible',
    'Respect privacy and confidentiality',
    'Follow Swiss tax law guidelines'
  ];

  // Icon mapping based on category slug
  const getIcon = (slug) => {
    const icons = {
      'individual-tax-returns': '👤',
      'business-tax-services': '🏢',
      'international-tax': '🌍',
      'tax-planning': '📚',
      'general-discussion': '💬'
    };
    return icons[slug] || '📁';
  };

  // Transform API topic to component format
  const transformTopic = (apiTopic) => ({
    id: apiTopic.id.toString(),
    title: apiTopic.title,
    slug: apiTopic.slug,
    content: apiTopic.content,
    author: {
      id: '1',
      name: `${apiTopic.author_name || 'Anonymous'} ${apiTopic.author_lastname || ''}`.trim(),
      role: apiTopic.author_karma > 100 ? 'expert' : 'member'
    },
    category: {
      id: apiTopic.category_slug,
      name: apiTopic.category_name,
      slug: apiTopic.category_slug,
      color: apiTopic.category_color || '#3B82F6'
    },
    tags: [], // API doesn't return tags yet
    status: apiTopic.status,
    isSolved: apiTopic.is_solved,
    isFeatured: apiTopic.is_featured,
    views: apiTopic.views || 0,
    replies: apiTopic.replies_count || 0,
    likes: apiTopic.upvotes || 0,
    lastReply: {
      author: 'Community',
      createdAt: apiTopic.last_reply_at || apiTopic.created_at
    },
    createdAt: apiTopic.created_at,
    updatedAt: apiTopic.last_reply_at || apiTopic.created_at
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch category and topics in parallel
        const [categoryData, topicsData] = await Promise.all([
          getCategory(categorySlug),
          getTopics({ category: categorySlug })
        ]);

        if (!categoryData) {
          setError('Category not found');
          setLoading(false);
          return;
        }

        // Transform category data
        setCategory({
          id: categoryData.id.toString(),
          name: categoryData.name,
          slug: categoryData.slug,
          description: categoryData.description,
          icon: categoryData.slug,
          color: categoryData.color || '#3B82F6',
          topicCount: categoryData.topic_count || 0,
          postCount: categoryData.post_count || 0,
          lastActivity: categoryData.last_activity
            ? new Date(categoryData.last_activity).toLocaleDateString()
            : 'No activity yet',
          rules: defaultRules
        });

        // Transform topics
        const transformedTopics = topicsData.map(transformTopic);
        setTopics(transformedTopics);
        setAllTopics(transformedTopics);
      } catch (err) {
        console.error('Error fetching forum data:', err);
        setError(err.message || 'Failed to load forum data');
      } finally {
        setLoading(false);
      }
    };

    if (categorySlug) {
      fetchData();
    }
  }, [categorySlug]);

  const handleCreateTopic = () => {
    // Navigate to forum with create modal
    navigate('/forum');
  };

  const handleTopicClick = (topic) => {
    navigate(`/forum/topic/${topic.slug}`);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setTopics(allTopics);
      return;
    }

    const filtered = allTopics.filter(topic =>
      topic.title.toLowerCase().includes(query.toLowerCase()) ||
      topic.content.toLowerCase().includes(query.toLowerCase())
    );
    setTopics(filtered);
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

  if (error) {
    return (
      <ForumLayout>
        <div className="text-center py-12">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Category</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="flex justify-center space-x-4">
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
            <Button variant="outline" onClick={() => navigate('/forum')}>
              Back to Forum
            </Button>
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
                {getIcon(category.slug)}
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
                    Last activity: {category.lastActivity}
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
        {topics.length === 0 && !searchQuery && (
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
