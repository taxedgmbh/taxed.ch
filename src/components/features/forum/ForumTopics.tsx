import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter, 
  SortAsc, 
  SortDesc,
  MessageCircle,
  Eye,
  Heart,
  Bookmark,
  Star,
  Lock,
  Pin,
  User,
  Clock,
  ArrowRight
} from 'lucide-react';

interface ForumTopic {
  id: string;
  title: string;
  slug: string;
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
    slug: string;
    color: string;
  };
  tags: string[];
  status: 'active' | 'locked' | 'pinned' | 'archived';
  isSolved: boolean;
  isFeatured: boolean;
  views: number;
  replies: number;
  likes: number;
  lastReply?: {
    author: string;
    createdAt: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface ForumTopicsProps {
  topics?: ForumTopic[];
  categoryId?: string;
  onTopicClick?: (topic: ForumTopic) => void;
  onLike?: (topicId: string) => void;
  onBookmark?: (topicId: string) => void;
  loading?: boolean;
  className?: string;
}

export const ForumTopics: React.FC<ForumTopicsProps> = ({
  topics = [],
  categoryId,
  onTopicClick,
  onLike,
  onBookmark,
  loading = false,
  className = ''
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'replies'>('newest');
  const [filterBy, setFilterBy] = useState<'all' | 'solved' | 'unsolved' | 'featured'>('all');

  // Mock data for now
  const mockTopics: ForumTopic[] = [
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
      title: 'VAT registration for new company - step by step guide',
      slug: 'vat-registration-new-company-guide',
      content: 'I\'m starting a new company and need to register for VAT. Can someone guide me through the process?',
      author: {
        id: '2',
        name: 'Jane Smith',
        role: 'expert'
      },
      category: {
        id: '2',
        name: 'Business Tax Services',
        slug: 'business-tax-services',
        color: '#10B981'
      },
      tags: ['vat', 'registration', 'business'],
      status: 'active',
      isSolved: true,
      isFeatured: false,
      views: 89,
      replies: 15,
      likes: 23,
      lastReply: {
        author: 'Business Expert',
        createdAt: '4 hours ago'
      },
      createdAt: '2024-01-14T09:15:00Z',
      updatedAt: '2024-01-15T10:15:00Z'
    },
    {
      id: '3',
      title: 'Double taxation treaty CH-USA - pension contributions',
      slug: 'double-taxation-treaty-ch-usa-pension',
      content: 'I\'m contributing to both Swiss and US pension systems. How does the tax treaty affect this?',
      author: {
        id: '3',
        name: 'Mike Johnson',
        role: 'member'
      },
      category: {
        id: '3',
        name: 'International Tax',
        slug: 'international-tax',
        color: '#F59E0B'
      },
      tags: ['treaty', 'pension', 'usa', 'international'],
      status: 'active',
      isSolved: false,
      isFeatured: false,
      views: 67,
      replies: 5,
      likes: 8,
      lastReply: {
        author: 'International Expert',
        createdAt: '1 hour ago'
      },
      createdAt: '2024-01-15T08:45:00Z',
      updatedAt: '2024-01-15T13:45:00Z'
    },
    {
      id: '4',
      title: '2024 tax rate changes - what you need to know',
      slug: '2024-tax-rate-changes-guide',
      content: 'The Swiss government has announced new tax rates for 2024. Here\'s what changed and how it affects you...',
      author: {
        id: '4',
        name: 'Tax Expert',
        role: 'expert'
      },
      category: {
        id: '4',
        name: 'Tax Education & Resources',
        slug: 'tax-education-resources',
        color: '#8B5CF6'
      },
      tags: ['2024', 'rates', 'changes', 'education'],
      status: 'pinned',
      isSolved: true,
      isFeatured: true,
      views: 234,
      replies: 12,
      likes: 45,
      lastReply: {
        author: 'Admin',
        createdAt: '6 hours ago'
      },
      createdAt: '2024-01-10T14:20:00Z',
      updatedAt: '2024-01-15T08:20:00Z'
    }
  ];

  const filteredTopics = mockTopics.filter(topic => {
    const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         topic.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         topic.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = filterBy === 'all' || 
                         (filterBy === 'solved' && topic.isSolved) ||
                         (filterBy === 'unsolved' && !topic.isSolved) ||
                         (filterBy === 'featured' && topic.isFeatured);
    
    return matchesSearch && matchesFilter;
  });

  const sortedTopics = [...filteredTopics].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'popular':
        return b.views - a.views;
      case 'replies':
        return b.replies - a.replies;
      default:
        return 0;
    }
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pinned':
        return <Pin className="w-4 h-4 text-yellow-500" />;
      case 'locked':
        return <Lock className="w-4 h-4 text-gray-500" />;
      default:
        return null;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'expert':
        return 'bg-purple-100 text-purple-800';
      case 'moderator':
        return 'bg-blue-100 text-blue-800';
      case 'admin':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className={`space-y-4 ${className}`}>
        {[...Array(5)].map((_, index) => (
          <Card key={index} className="p-6 animate-pulse">
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              <div className="flex space-x-2">
                <div className="h-6 bg-gray-200 rounded w-16"></div>
                <div className="h-6 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Search and Filters */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value as any)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm"
              >
                <option value="all">All Topics</option>
                <option value="solved">Solved</option>
                <option value="unsolved">Unsolved</option>
                <option value="featured">Featured</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <SortAsc className="w-4 h-4 text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm"
              >
                <option value="newest">Newest</option>
                <option value="popular">Most Popular</option>
                <option value="replies">Most Replies</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Topics List */}
      <div className="space-y-4">
        <AnimatePresence>
          {sortedTopics.map((topic, index) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                    onClick={() => onTopicClick?.(topic)}>
                <div className="flex items-start space-x-4">
                  {/* Status Icons */}
                  <div className="flex flex-col items-center space-y-1 pt-1">
                    {getStatusIcon(topic.status)}
                    {topic.isSolved && (
                      <Star className="w-4 h-4 text-green-500" />
                    )}
                  </div>

                  {/* Topic Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                        {topic.title}
                      </h3>
                      <div className="flex items-center space-x-2 ml-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            onLike?.(topic.id);
                          }}
                          className="text-gray-500 hover:text-red-500"
                        >
                          <Heart className="w-4 h-4 mr-1" />
                          {topic.likes}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            onBookmark?.(topic.id);
                          }}
                          className="text-gray-500 hover:text-blue-500"
                        >
                          <Bookmark className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {topic.content}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        <span className="font-medium">{topic.author.name}</span>
                        <Badge className={`ml-2 ${getRoleColor(topic.author.role)}`}>
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
                      <div className="flex items-center">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        {topic.replies} replies
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {topic.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Last Reply */}
                    {topic.lastReply && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-gray-600">
                            <span>Last reply by {topic.lastReply.author}</span>
                            <span className="mx-2">•</span>
                            <span>{topic.lastReply.createdAt}</span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {sortedTopics.length === 0 && (
        <Card className="p-12 text-center">
          <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No topics found</h3>
          <p className="text-gray-600 mb-4">
            {searchQuery ? 'Try adjusting your search terms' : 'Be the first to start a discussion'}
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Create New Topic
          </Button>
        </Card>
      )}
    </div>
  );
};
