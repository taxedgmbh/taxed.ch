import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter, 
  Grid, 
  List,
  ArrowLeft,
  ArrowRight,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { BlogCard } from './BlogCard';
import { BlogFilters } from './BlogFilters';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
    bio?: string;
  };
  publishedAt: string;
  readTime: number;
  image?: string;
  category: string;
  tags: string[];
  views: number;
  likes: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  featured?: boolean;
  slug: string;
}

interface BlogListProps {
  posts: BlogPost[];
  loading?: boolean;
  error?: string;
  onPostClick?: (post: BlogPost) => void;
  onLike?: (postId: string) => void;
  onBookmark?: (postId: string) => void;
  onShare?: (post: BlogPost) => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
  className?: string;
}

export const BlogList: React.FC<BlogListProps> = ({
  posts,
  loading = false,
  error,
  onPostClick,
  onLike,
  onBookmark,
  onShare,
  onLoadMore,
  hasMore = false,
  className = ''
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(posts);

  // Filter posts based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        post.author.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  }, [posts, searchQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleViewModeChange = (mode: 'grid' | 'list') => {
    setViewMode(mode);
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

  if (error) {
    return (
      <div className={`flex items-center justify-center min-h-96 ${className}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Error Loading Posts
          </h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search blog posts..."
                value={searchQuery}
                onChange={handleSearch}
                className="pl-10"
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Filter Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </Button>

            {/* View Mode Toggle */}
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleViewModeChange('grid')}
                className="rounded-none border-0"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleViewModeChange('list')}
                className="rounded-none border-0"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <BlogFilters
              onFiltersChange={(filters) => {
                // TODO: Apply filters logic here
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Count */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mb-6"
      >
        <p className="text-gray-600">
          {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'} found
          {searchQuery && ` for "${searchQuery}"`}
        </p>
      </motion.div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading posts...</p>
          </motion.div>
        </div>
      )}

      {/* Posts Grid/List */}
      {!loading && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={`${
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-6'
          }`}
        >
          <AnimatePresence>
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                variants={itemVariants}
                layout
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <BlogCard
                  post={post}
                  variant={viewMode === 'list' ? 'compact' : 'default'}
                  onReadMore={onPostClick}
                  onLike={onLike}
                  onBookmark={onBookmark}
                  onShare={onShare}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Empty State */}
      {!loading && filteredPosts.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center py-12"
        >
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No posts found
          </h3>
          <p className="text-gray-600 mb-4">
            {searchQuery
              ? `No posts match your search for "${searchQuery}"`
              : 'No blog posts available at the moment.'}
          </p>
          {searchQuery && (
            <Button
              variant="outline"
              onClick={() => setSearchQuery('')}
            >
              Clear Search
            </Button>
          )}
        </motion.div>
      )}

      {/* Load More */}
      {!loading && hasMore && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button
            onClick={onLoadMore}
            variant="outline"
            size="lg"
            className="px-8"
          >
            Load More Posts
          </Button>
        </motion.div>
      )}

      {/* Pagination */}
      {!loading && filteredPosts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="flex items-center justify-center space-x-4 mt-12"
        >
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((page) => (
              <Button
                key={page}
                variant={page === 1 ? 'default' : 'outline'}
                size="sm"
                className="w-10 h-10"
              >
                {page}
              </Button>
            ))}
          </div>
          
          <Button variant="outline" size="sm">
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      )}
    </div>
  );
};






