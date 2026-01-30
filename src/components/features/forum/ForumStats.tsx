import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import {
  Users,
  MessageCircle,
  TrendingUp,
  Star,
  Award,
  Activity
} from 'lucide-react';

interface ForumStatsProps {
  stats?: {
    total_users: number;
    total_topics: number;
    total_posts: number;
    total_categories: number;
    total_votes: number;
  };
  className?: string;
}

export const ForumStats: React.FC<ForumStatsProps> = ({
  stats,
  className = ''
}) => {

  const statCards = [
    {
      title: 'Members',
      value: stats?.total_users?.toLocaleString() ?? '0',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Categories',
      value: stats?.total_categories?.toLocaleString() ?? '0',
      icon: Activity,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Topics',
      value: stats?.total_topics?.toLocaleString() ?? '0',
      icon: MessageCircle,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Posts',
      value: stats?.total_posts?.toLocaleString() ?? '0',
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      title: 'Votes',
      value: stats?.total_votes?.toLocaleString() ?? '0',
      icon: Award,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    }
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card className="p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </h3>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Forum Overview */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2" />
          Forum Overview
        </h3>
        <p className="text-gray-600 text-sm">
          Welcome to the Swiss Tax Forum! This is a community-driven space where
          you can discuss tax questions, share experiences, and get advice from
          fellow taxpayers and experts.
        </p>
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Getting Started:</strong> Browse categories, read existing topics,
            or start a new discussion to get help with your tax questions.
          </p>
        </div>
      </Card>
    </div>
  );
};
