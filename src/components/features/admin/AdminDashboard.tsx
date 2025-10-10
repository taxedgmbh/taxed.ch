import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  DollarSign, 
  FileText, 
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Star,
  Eye,
  Download,
  RefreshCw
} from 'lucide-react';

interface DashboardStats {
  totalUsers: number;
  totalRevenue: number;
  totalOrders: number;
  totalBlogPosts: number;
  monthlyRevenue: number;
  monthlyGrowth: number;
  activeUsers: number;
  conversionRate: number;
}

interface RecentActivity {
  id: string;
  type: 'user_registration' | 'order_created' | 'blog_post' | 'payment_received';
  title: string;
  description: string;
  timestamp: string;
  status: 'success' | 'warning' | 'error';
}

interface AdminDashboardProps {
  className?: string;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ className = '' }) => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalRevenue: 0,
    totalOrders: 0,
    totalBlogPosts: 0,
    monthlyRevenue: 0,
    monthlyGrowth: 0,
    activeUsers: 0,
    conversionRate: 0
  });

  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchDashboardData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStats({
        totalUsers: 1247,
        totalRevenue: 125000,
        totalOrders: 89,
        totalBlogPosts: 156,
        monthlyRevenue: 15000,
        monthlyGrowth: 12.5,
        activeUsers: 892,
        conversionRate: 3.2
      });

      setRecentActivity([
        {
          id: '1',
          type: 'user_registration',
          title: 'New User Registration',
          description: 'Sarah Müller registered for tax consulting services',
          timestamp: '2024-01-15T10:30:00Z',
          status: 'success'
        },
        {
          id: '2',
          type: 'order_created',
          title: 'New Order Created',
          description: 'Order #1234 - Bookkeeping service for TechStart AG',
          timestamp: '2024-01-15T09:15:00Z',
          status: 'success'
        },
        {
          id: '3',
          type: 'payment_received',
          title: 'Payment Received',
          description: 'CHF 2,500 payment received from Müller & Associates',
          timestamp: '2024-01-15T08:45:00Z',
          status: 'success'
        },
        {
          id: '4',
          type: 'blog_post',
          title: 'New Blog Post Published',
          description: 'Swiss Tax Law Updates for 2024 published',
          timestamp: '2024-01-14T16:20:00Z',
          status: 'success'
        }
      ]);

      setLoading(false);
    };

    fetchDashboardData();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('de-CH', {
      style: 'currency',
      currency: 'CHF'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user_registration':
        return <Users className="w-5 h-5" />;
      case 'order_created':
        return <FileText className="w-5 h-5" />;
      case 'blog_post':
        return <FileText className="w-5 h-5" />;
      case 'payment_received':
        return <DollarSign className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-green-600 bg-green-100';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100';
      case 'error':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  if (loading) {
    return (
      <div className={`flex items-center justify-center min-h-96 ${className}`}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600">
          Welcome back! Here's what's happening with your business today.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div variants={itemVariants}>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +{stats.monthlyGrowth}% this month
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +{stats.monthlyGrowth}% this month
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-3xl font-bold text-gray-900">{stats.activeUsers.toLocaleString()}</p>
                <p className="text-sm text-blue-600 flex items-center mt-1">
                  <Eye className="w-4 h-4 mr-1" />
                  {stats.conversionRate}% conversion rate
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Blog Posts</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalBlogPosts}</p>
                <p className="text-sm text-gray-600 flex items-center mt-1">
                  <FileText className="w-4 h-4 mr-1" />
                  Content published
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
            
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getStatusColor(activity.status)}`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900">{activity.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-2">{formatDate(activity.timestamp)}</p>
                  </div>
                  
                  <Badge variant="outline" className="text-xs">
                    {activity.status}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants}>
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
            
            <div className="space-y-4">
              <Button className="w-full justify-start" variant="outline">
                <Users className="w-4 h-4 mr-3" />
                Manage Users
              </Button>
              
              <Button className="w-full justify-start" variant="outline">
                <FileText className="w-4 h-4 mr-3" />
                Create Blog Post
              </Button>
              
              <Button className="w-full justify-start" variant="outline">
                <DollarSign className="w-4 h-4 mr-3" />
                View Orders
              </Button>
              
              <Button className="w-full justify-start" variant="outline">
                <Download className="w-4 h-4 mr-3" />
                Export Data
              </Button>
            </div>

            {/* System Status */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="font-medium text-gray-900 mb-4">System Status</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Database</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600">Online</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">API</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600">Online</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Email Service</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600">Online</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};





