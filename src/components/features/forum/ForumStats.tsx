import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { 
  Users, 
  MessageCircle, 
  TrendingUp, 
  Star,
  Clock,
  Award,
  Activity
} from 'lucide-react';

interface ForumStatsProps {
  stats?: {
    totalMembers: number;
    activeToday: number;
    totalTopics: number;
    totalPosts: number;
    expertAnswers: number;
    solvedTopics: number;
    averageResponseTime: string;
    topContributors: Array<{
      name: string;
      posts: number;
      reputation: number;
    }>;
  };
  className?: string;
}

export const ForumStats: React.FC<ForumStatsProps> = ({
  stats,
  className = ''
}) => {
  // Mock data for now
  const mockStats = {
    totalMembers: 1247,
    activeToday: 89,
    totalTopics: 156,
    totalPosts: 892,
    expertAnswers: 234,
    solvedTopics: 67,
    averageResponseTime: '2.5 hours',
    topContributors: [
      { name: 'Tax Expert', posts: 45, reputation: 1250 },
      { name: 'Business Expert', posts: 38, reputation: 980 },
      { name: 'International Expert', posts: 32, reputation: 850 },
      { name: 'Sarah Wilson', posts: 28, reputation: 720 },
      { name: 'Mike Johnson', posts: 25, reputation: 680 }
    ]
  };

  const currentStats = stats || mockStats;

  const statCards = [
    {
      title: 'Total Members',
      value: currentStats.totalMembers.toLocaleString(),
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      change: '+12% this month'
    },
    {
      title: 'Active Today',
      value: currentStats.activeToday.toLocaleString(),
      icon: Activity,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      change: '+8% from yesterday'
    },
    {
      title: 'Total Topics',
      value: currentStats.totalTopics.toLocaleString(),
      icon: MessageCircle,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      change: '+15% this week'
    },
    {
      title: 'Expert Answers',
      value: currentStats.expertAnswers.toLocaleString(),
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      change: '+23% this month'
    },
    {
      title: 'Solved Topics',
      value: currentStats.solvedTopics.toLocaleString(),
      icon: Award,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      change: '+18% this week'
    },
    {
      title: 'Avg Response Time',
      value: currentStats.averageResponseTime,
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      change: '-0.5 hours improvement'
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
                  <p className="text-xs text-green-600 font-medium">
                    {stat.change}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Top Contributors */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2" />
          Top Contributors
        </h3>
        <div className="space-y-4">
          {currentStats.topContributors.map((contributor, index) => (
            <motion.div
              key={contributor.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">
                    {contributor.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{contributor.name}</h4>
                  <p className="text-sm text-gray-500">
                    {contributor.posts} posts • {contributor.reputation} reputation
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(contributor.reputation / 200) ? 'fill-current' : ''
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-600">
                  #{index + 1}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Community Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Community Health
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Response Rate</span>
              <span className="font-semibold text-green-600">94%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Expert Participation</span>
              <span className="font-semibold text-blue-600">87%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Solution Rate</span>
              <span className="font-semibold text-purple-600">78%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">User Satisfaction</span>
              <span className="font-semibold text-yellow-600">4.8/5</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">5 new topics in the last hour</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-600">12 expert answers provided</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-gray-600">3 topics marked as solved</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-gray-600">8 new members joined</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
