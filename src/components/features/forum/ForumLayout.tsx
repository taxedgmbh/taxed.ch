import React from 'react';
import { motion } from 'framer-motion';
import { ForumHeader } from './ForumHeader';
import { ForumSidebar } from './ForumSidebar';
import { ForumStats } from './ForumStats';

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
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      {/* Forum Header */}
      <ForumHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          {showSidebar && (
            <aside className="lg:w-1/4">
              <ForumSidebar />
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
            <ForumStats />
          </div>
        )}
      </div>
    </div>
  );
};
