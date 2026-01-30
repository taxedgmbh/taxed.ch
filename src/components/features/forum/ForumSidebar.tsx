import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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

interface ForumStats {
  total_topics: number;
  total_posts: number;
  total_users: number;
  total_categories: number;
}

interface ForumSidebarProps {
  categories?: ForumCategory[];
  stats?: ForumStats;
  onCategoryClick?: (category: ForumCategory) => void;
  onFilterClick?: (filter: string) => void;
  className?: string;
}

export const ForumSidebar: React.FC<ForumSidebarProps> = ({
  categories = [],
  stats,
  onCategoryClick,
  onFilterClick,
  className = ''
}) => {
  const quickFilters = [
    { name: 'Latest Topics', icon: Clock },
    { name: 'Most Popular', icon: TrendingUp },
    { name: 'Unanswered', icon: MessageCircle },
    { name: 'Expert Answers', icon: Star }
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
              <div className="flex items-center w-full">
                <filter.icon className="w-4 h-4 mr-3" />
                <span className="flex-1">{filter.name}</span>
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
          {categories.map((category) => (
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

      {/* Popular Tags - derived from category slugs */}
      {categories.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Tag className="w-5 h-5 mr-2" />
            Popular Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {categories.slice(0, 6).map((category) => (
              <Button
                key={category.slug}
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => onCategoryClick?.(category)}
              >
                #{category.slug}
              </Button>
            ))}
          </div>
        </Card>
      )}

      {/* Forum Stats */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Users className="w-5 h-5 mr-2" />
          Community Stats
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Members</span>
            <span className="font-semibold text-gray-900">
              {stats?.total_users?.toLocaleString() ?? '-'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Categories</span>
            <span className="font-semibold text-blue-600">
              {stats?.total_categories?.toLocaleString() ?? categories.length}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Topics</span>
            <span className="font-semibold text-purple-600">
              {stats?.total_topics?.toLocaleString() ?? '-'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Posts</span>
            <span className="font-semibold text-green-600">
              {stats?.total_posts?.toLocaleString() ?? '-'}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};
