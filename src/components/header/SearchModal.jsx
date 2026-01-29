import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight } from 'lucide-react';
import { searchService } from '@/services/searchService';

const SearchModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }
    const results = searchService.search(query);
    setSearchResults(results);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      window.location.href = searchResults[0].href;
      handleClose();
    }
  };

  const handleClose = () => {
    onClose();
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20"
          onClick={handleClose}
          onKeyDown={handleKeyDown}
        >
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input */}
            <div className="p-6 border-b border-gray-200">
              <form onSubmit={handleSearchSubmit} className="relative">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for tax services, guides, calculators..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-steel-blue focus:border-transparent outline-none"
                    autoFocus
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        setSearchResults([]);
                      }}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Search Results */}
            {searchQuery && (
              <div className="max-h-96 overflow-y-auto">
                {searchResults.length > 0 ? (
                  <div className="p-2">
                    {searchResults.map((result, index) => (
                      <Link
                        key={index}
                        to={result.href}
                        className="block p-4 hover:bg-gray-50 rounded-lg transition-colors"
                        onClick={handleClose}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-steel-blue to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                            <Search className="h-4 w-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="text-sm font-semibold text-gray-900">
                                {result.title}
                              </h3>
                              <span className="text-xs bg-steel-blue/10 text-steel-blue px-2 py-1 rounded-full">
                                {result.category}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500">
                              {result.description}
                            </p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-gray-400 flex-shrink-0 mt-1" />
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
                    <p className="text-gray-500">Try searching for something else</p>
                  </div>
                )}
              </div>
            )}

            {/* Quick Links */}
            {!searchQuery && (
              <div className="p-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Popular searches</h3>
                <div className="grid grid-cols-2 gap-2">
                  {searchService.getPopularSearches().slice(0, 6).map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(item)}
                      className="text-left p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
