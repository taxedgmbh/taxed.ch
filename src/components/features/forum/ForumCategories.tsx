import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Users, 
  Clock,
  ArrowRight,
  Star,
  Lock,
  Pin
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
  lastTopic?: {
    title: string;
    author: string;
    createdAt: string;
  };
  isLocked?: boolean;
  isPinned?: boolean;
}

interface ForumCategoriesProps {
  categories?: ForumCategory[];
  onCategoryClick?: (category: ForumCategory) => void;
  loading?: boolean;
  className?: string;
}

export const ForumCategories: React.FC<ForumCategoriesProps> = ({
  categories = [],
  onCategoryClick,
  loading = false,
  className = ''
) => {
  // Use categories from props
  const getIcon = (iconName: string) => {
    const icons = {
      'user': '👤',
      'building': '🏢',
      'globe': '🌍',
      'book-open': '📚',
      'briefcase': '💼',
      'message-circle': '💬'
    };
    return icons[iconName as keyof typeof icons] || '📁';
  };

  if (loading) {
    return (
      <div className={`space-y-4 ${className}`}>
        {[...Array(6)].map((_, index) => (
          <Card key={index} className="p-6 animate-pulse">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {categories.map((category, index) => (
        <motion.div
          key={category.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Card className="p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-start space-x-4">
              {/* Category Icon */}
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-lg font-medium flex-shrink-0"
                style={{ backgroundColor: category.color }}
              >
                {getIcon(category.icon)}
              </div>

              {/* Category Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {category.name}
                  </h3>
                  {category.isPinned && (
                    <Pin className="w-4 h-4 text-yellow-500" />
                  )}
                  {category.isLocked && (
                    <Lock className="w-4 h-4 text-gray-500" />
                  )}
                </div>
                
                <p className="text-gray-600 mb-3">
                  {category.description}
                </p>

                {/* Stats */}
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                  <span className="flex items-center">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    {category.topicCount} topics
                  </span>
                  <span className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {category.postCount} posts
                  </span>
                  {category.lastActivity && (
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {category.lastActivity}
                    </span>
                  )}
                </div>

                {/* Last Topic */}
                {category.lastTopic && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {category.lastTopic.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          by {category.lastTopic.author} • {category.lastTopic.createdAt}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="flex-shrink-0">
                <Button
                  onClick={() => onCategoryClick?.(category)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  View Topics
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
