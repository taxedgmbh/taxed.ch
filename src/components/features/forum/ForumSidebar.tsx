import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Users, 
  TrendingUp, 
  Clock,
  Star,
  Bookmark,
  Tag,
  Filter
} from 'lucide-react';

interface ForumCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  topicCount: number;
  postCount: number;
  lastActivity?: string;
}

interface ForumSidebarProps {
  categories?: ForumCategory[];
  onCategoryClick?: (category: ForumCategory) => void;
  onFilterClick?: (filter: string) => void;
  className?: string;
}

export const ForumSidebar: React.FC<ForumSidebarProps> = ({
  categories = [],
  onCategoryClick,
  onFilterClick,
  className = ''
}) => {
  // Mock data for now
  const mockCategories: ForumCategory[] = [
    {
      id: '1',
      name: 'Individual Tax Returns',
      slug: 'individual-tax-returns',
      description: 'Personal tax questions and advice',
      icon: 'user',
      color: '#3B82F6',
      topicCount: 24,
      postCount: 156,
      lastActivity: '2 hours ago'
    },
    {
      id: '2',
      name: 'Business Tax Services',
      slug: 'business-tax-services',
      description: 'Corporate tax compliance and planning',
      icon: 'building',
      color: '#10B981',
      topicCount: 18,
      postCount: 89,
      lastActivity: '4 hours ago'
    },
    {
      id: '3',
      name: 'International Tax',
      slug: 'international-tax',
      description: 'Cross-border tax issues and treaties',
      icon: 'globe',
      color: '#F59E0B',
      topicCount: 31,
      postCount: 203,
      lastActivity: '1 hour ago'
    },
    {
      id: '4',
      name: 'Tax Education',
      slug: 'tax-education',
      description: 'Swiss tax law updates and resources',
      icon: 'book-open',
      color: '#8B5CF6',
      topicCount: 12,
      postCount: 67,
      lastActivity: '6 hours ago'
    }
  ];

  const quickFilters = [
    { name: 'Latest Topics', icon: Clock, count: 45 },
    { name: 'Most Popular', icon: TrendingUp, count: 23 },
    { name: 'Unanswered', icon: MessageCircle, count: 8 },
    { name: 'Expert Answers', icon: Star, count: 15 }
  ];

  const formatTimeAgo = (timeString: string) => {
    return timeString; // For now, just return as is
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Quick Filters */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Filter className="w-5 h-5 mr-2" />
          Quick Filters
        </h3>
        <div className="space-y-2">
          {quickFilters.map((filter, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full justify-start text-left"
              onClick={() => onFilterClick?.(filter.name)}
            >
              <div className="flex items-center justify-between w-full">
                <filter.icon className="w-4 h-4 mr-3" />
                <span className="flex-1">{filter.name}</span>
                <Badge variant="secondary" className="ml-2">
                  {filter.count}
                </Badge>
              </div>
            </Button>
          ))}
        </div>
      </Card>

      {/* Categories */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <MessageCircle className="w-5 h-5 mr-2" />
          Categories
        </h3>
        <div className="space-y-3">
          {mockCategories.map((category) => (
            <motion.div
              key={category.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="ghost"
                className="w-full justify-start text-left p-3 h-auto"
                onClick={() => onCategoryClick?.(category)}
              >
                <div className="flex items-start space-x-3 w-full">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-medium flex-shrink-0"
                    style={{ backgroundColor: category.color }}
                  >
                    {category.icon === 'user' && '👤'}
                    {category.icon === 'building' && '🏢'}
                    {category.icon === 'globe' && '🌍'}
                    {category.icon === 'book-open' && '📚'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 truncate">
                      {category.name}
                    </h4>
                    <p className="text-sm text-gray-500 truncate">
                      {category.description}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-gray-400">
                        {category.topicCount} topics
                      </span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-400">
                        {category.postCount} posts
                      </span>
                      {category.lastActivity && (
                        <>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-400">
                            {formatTimeAgo(category.lastActivity)}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Button>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Popular Tags */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Tag className="w-5 h-5 mr-2" />
          Popular Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {['quellensteuer', 'expat', 'vat', 'pillar-3a', 'tax-planning', 'compliance'].map((tag) => (
            <Button
              key={tag}
              variant="outline"
              size="sm"
              className="text-xs"
            >
              #{tag}
            </Button>
          ))}
        </div>
      </Card>

      {/* Forum Stats */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Users className="w-5 h-5 mr-2" />
          Community Stats
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Total Members</span>
            <span className="font-semibold text-gray-900">1,247</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Active Today</span>
            <span className="font-semibold text-green-600">89</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Topics This Week</span>
            <span className="font-semibold text-blue-600">23</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Expert Answers</span>
            <span className="font-semibold text-purple-600">156</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
