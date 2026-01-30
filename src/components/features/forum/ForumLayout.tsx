import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ForumHeader } from './ForumHeader';
import { ForumSidebar } from './ForumSidebar';
import { ForumStats } from './ForumStats';
import { getCategories, getStats } from '@/services/forum';

interface ForumLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
  showStats?: boolean;
  className?: string;
}

export const ForumLayout: React.FC<ForumLayoutProps> = ({
  children,
  showSidebar = true,
  showStats = true,
  className = ''
}) => {
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, statsData] = await Promise.all([
          getCategories(),
          getStats()
        ]);
        setCategories(categoriesData);
        setStats(statsData);
      } catch (err) {
        console.error('Error fetching forum data:', err);
      }
    };
    fetchData();
  }, []);
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      {/* Forum Header */}
      <ForumHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          {showSidebar && (
            <aside className="lg:w-1/4">
              <ForumSidebar
                categories={categories.map(cat => ({
                  id: String(cat.id),
                  name: cat.name,
                  slug: cat.slug,
                  description: cat.description,
                  icon: cat.icon || 'book-open',
                  color: cat.color || '#3B82F6',
                  topicCount: cat.topic_count || 0,
                  postCount: cat.post_count || 0,
                  lastActivity: cat.last_activity
                }))}
                stats={stats}
              />
            </aside>
          )}
          
          {/* Main Content */}
          <main className="lg:w-3/4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {children}
            </motion.div>
          </main>
        </div>
        
        {/* Forum Stats */}
        {showStats && (
          <div className="mt-12">
            <ForumStats stats={stats} />
          </div>
        )}
      </div>
    </div>
  );
};
