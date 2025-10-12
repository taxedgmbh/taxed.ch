import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ForumLayout } from '@/components/features/forum/ForumLayout';
import { ForumCategories } from '@/components/features/forum/ForumCategories';
import { ForumTopics } from '@/components/features/forum/ForumTopics';
import { ForumStats } from '@/components/features/forum/ForumStats';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  MessageCircle, 
  TrendingUp, 
  Clock, 
  Star,
  Users,
  BookOpen,
  Briefcase,
  Globe
} from 'lucide-react';

const ForumPage = () => {
  const [activeTab, setActiveTab] = useState('categories');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setActiveTab('topics');
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setActiveTab('categories');
  };

  const quickStats = [
    { label: 'Total Members', value: '1,247', icon: Users, color: 'text-blue-600' },
    { label: 'Active Today', value: '89', icon: Clock, color: 'text-green-600' },
    { label: 'Expert Answers', value: '234', icon: Star, color: 'text-yellow-600' },
    { label: 'Solved Topics', value: '67', icon: TrendingUp, color: 'text-purple-600' }
  ];

  const featuredTopics = [
    {
      id: '1',
      title: 'Quellensteuer refund for expat - urgent help needed',
      category: 'Individual Tax Returns',
      replies: 8,
      views: 156,
      lastActivity: '2 hours ago',
      isSolved: false,
      isFeatured: true
    },
    {
      id: '2',
      title: 'VAT registration for new company - step by step guide',
      category: 'Business Tax Services',
      replies: 15,
      views: 89,
      lastActivity: '4 hours ago',
      isSolved: true,
      isFeatured: true
    },
    {
      id: '3',
      title: '2024 tax rate changes - what you need to know',
      category: 'Tax Education & Resources',
      replies: 12,
      views: 234,
      lastActivity: '6 hours ago',
      isSolved: true,
      isFeatured: true
    }
  ];

  return (
    <ForumLayout>
      <div className="space-y-8">
        {/* Forum Header */}
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Swiss Tax Community Forum
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Get expert tax advice, share experiences, and connect with the Swiss tax community. 
            Our experts are here to help with your tax questions.
          </motion.p>
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {quickStats.map((stat, index) => (
            <Card key={index} className="p-6 text-center">
              <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </Card>
          ))}
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          <Button
            variant={activeTab === 'categories' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('categories')}
            className="flex-1"
          >
            Categories
          </Button>
          <Button
            variant={activeTab === 'topics' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('topics')}
            className="flex-1"
            disabled={!selectedCategory}
          >
            Topics
          </Button>
          <Button
            variant={activeTab === 'stats' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('stats')}
            className="flex-1"
          >
            Statistics
          </Button>
        </div>

        {/* Content */}
        {activeTab === 'categories' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ForumCategories onCategoryClick={handleCategoryClick} />
          </motion.div>
        )}

        {activeTab === 'topics' && selectedCategory && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6">
              <Button
                variant="ghost"
                onClick={handleBackToCategories}
                className="mb-4"
              >
                ← Back to Categories
              </Button>
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedCategory.name} Topics
              </h2>
              <p className="text-gray-600">{selectedCategory.description}</p>
            </div>
            <ForumTopics categoryId={selectedCategory.id} />
          </motion.div>
        )}

        {activeTab === 'stats' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ForumStats />
          </motion.div>
        )}

        {/* Featured Topics */}
        {activeTab === 'categories' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-500" />
                Featured Topics
              </h3>
              <div className="space-y-4">
                {featuredTopics.map((topic, index) => (
                  <motion.div
                    key={topic.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">
                        {topic.title}
                      </h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                          {topic.category}
                        </span>
                        <span>{topic.replies} replies</span>
                        <span>{topic.views} views</span>
                        <span>{topic.lastActivity}</span>
                        {topic.isSolved && (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                            Solved
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {topic.isFeatured && (
                        <Star className="w-4 h-4 text-yellow-500" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center bg-blue-50 rounded-lg p-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Need Help with Your Taxes?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join our community of tax professionals and get expert advice on Swiss tax matters. 
            Whether you're an expat, business owner, or individual taxpayer, we're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <MessageCircle className="w-4 h-4 mr-2" />
              Start a Discussion
            </Button>
            <Button variant="outline">
              <BookOpen className="w-4 h-4 mr-2" />
              Browse Tax Resources
            </Button>
          </div>
        </motion.div>
      </div>
    </ForumLayout>
  );
};

export default ForumPage;
