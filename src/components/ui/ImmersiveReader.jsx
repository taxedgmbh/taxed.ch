import React, { useState, useEffect } from 'react';
import { X, BookOpen, Settings, Type, Moon, Sun, Minus, Plus } from 'lucide-react';
import { Button } from './button';
import { motion, AnimatePresence } from 'framer-motion';

const ImmersiveReader = ({ post, isOpen, onClose }) => {
  const [fontSize, setFontSize] = useState(18);
  const [lineHeight, setLineHeight] = useState(1.7);
  const [darkMode, setDarkMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Add escape key listener
      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      document.addEventListener('keydown', handleEscape);
      
      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, onClose]);

  const handleClose = () => {
    onClose();
  };

  const increaseFontSize = () => {
    setFontSize(prev => Math.min(prev + 2, 28));
  };

  const decreaseFontSize = () => {
    setFontSize(prev => Math.max(prev - 2, 14));
  };

  const increaseLineHeight = () => {
    setLineHeight(prev => Math.min(prev + 0.1, 2.5));
  };

  const decreaseLineHeight = () => {
    setLineHeight(prev => Math.max(prev - 0.1, 1.2));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`immersive-reader-container ${
          darkMode ? 'dark' : 'light'
        }`}
      >
        {/* Header */}
        <div className={`sticky top-0 z-10 border-b shadow-sm transition-colors duration-300 ${
          darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <BookOpen className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-gray-700'}`} />
                <h1 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {post.title}
                </h1>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSettings(!showSettings)}
                  className={darkMode ? 'border-gray-600 text-white hover:bg-gray-800' : ''}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClose}
                  className={darkMode ? 'border-gray-600 text-white hover:bg-gray-800' : ''}
                >
                  <X className="w-4 h-4 mr-2" />
                  Exit
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Panel */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`border-b shadow-sm transition-colors duration-300 ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="max-w-4xl mx-auto px-6 py-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Font Size */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-white' : 'text-gray-700'
                    }`}>
                      Font Size: {fontSize}px
                    </label>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={decreaseFontSize}
                        className={darkMode ? 'border-gray-600 text-white hover:bg-gray-700' : ''}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={increaseFontSize}
                        className={darkMode ? 'border-gray-600 text-white hover:bg-gray-700' : ''}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Line Height */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-white' : 'text-gray-700'
                    }`}>
                      Line Height: {lineHeight.toFixed(1)}
                    </label>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={decreaseLineHeight}
                        className={darkMode ? 'border-gray-600 text-white hover:bg-gray-700' : ''}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={increaseLineHeight}
                        className={darkMode ? 'border-gray-600 text-white hover:bg-gray-700' : ''}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Dark Mode */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-white' : 'text-gray-700'
                    }`}>
                      Theme
                    </label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDarkMode(!darkMode)}
                      className={darkMode ? 'border-gray-600 text-white hover:bg-gray-700' : ''}
                    >
                      {darkMode ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
                      {darkMode ? 'Light Mode' : 'Dark Mode'}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`magazine-article max-w-none transition-colors duration-300 ${
              darkMode ? 'text-gray-100' : 'text-gray-800'
            }`}
            style={{
              fontSize: `${fontSize}px`,
              lineHeight: lineHeight,
              fontFamily: "'Georgia', 'Times New Roman', serif"
            }}
          >
            {/* Article Meta */}
            <div className={`mb-8 pb-6 border-b ${
              darkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <div className="flex items-center space-x-4 text-sm mb-4">
                <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {post.author} • {post.authorTitle}
                </span>
                <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {new Date(post.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
                <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {post.readTime}
                </span>
              </div>
              <p className={`text-lg italic ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {post.summary}
              </p>
            </div>

            {/* Article Content */}
            <div 
              className={`prose prose-lg max-w-none ${
                darkMode ? 'dark' : ''
              }`}
              style={{
                fontSize: `${fontSize}px`,
                lineHeight: lineHeight,
                fontFamily: "'Georgia', 'Times New Roman', serif"
              }}
              dangerouslySetInnerHTML={{ 
                __html: post.content.replace(
                  /class="[^"]*"/g, 
                  '' // Remove existing classes for clean immersive reading
                )
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ImmersiveReader;
