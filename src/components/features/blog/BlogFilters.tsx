import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  X, 
  Calendar, 
  Tag, 
  User,
  Clock,
  TrendingUp,
  Star
} from 'lucide-react';

interface BlogFiltersProps {
  onFiltersChange: (filters: FilterState) => void;
  className?: string;
}

interface FilterState {
  categories: string[];
  tags: string[];
  authors: string[];
  dateRange: {
    start: string;
    end: string;
  } | null;
  readTime: {
    min: number;
    max: number;
  } | null;
  sortBy: 'newest' | 'oldest' | 'popular' | 'trending';
  featured: boolean | null;
}

const categories = [
  'Tax Tips',
  'Business Advice',
  'Swiss Law',
  'Personal Finance',
  'Investment',
  'Compliance',
  'News',
  'Tutorials'
];

const popularTags = [
  'tax optimization',
  'swiss tax law',
  'business setup',
  'bookkeeping',
  'payroll',
  'compliance',
  'investment',
  'retirement',
  'expat taxes',
  'vat'
];

const authors = [
  'Emmanuel Flury',
  'Sarah Müller',
  'Michael Weber',
  'Lisa Chen'
];

const sortOptions = [
  { value: 'newest', label: 'Newest First', icon: Calendar },
  { value: 'oldest', label: 'Oldest First', icon: Calendar },
  { value: 'popular', label: 'Most Popular', icon: TrendingUp },
  { value: 'trending', label: 'Trending', icon: Star }
];

export const BlogFilters: React.FC<BlogFiltersProps> = ({
  onFiltersChange,
  className = ''
}) => {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    tags: [],
    authors: [],
    dateRange: null,
    readTime: null,
    sortBy: 'newest',
    featured: null
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const toggleCategory = (category: string) => {
    const updatedCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    updateFilters({ categories: updatedCategories });
  };

  const toggleTag = (tag: string) => {
    const updatedTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    updateFilters({ tags: updatedTags });
  };

  const toggleAuthor = (author: string) => {
    const updatedAuthors = filters.authors.includes(author)
      ? filters.authors.filter(a => a !== author)
      : [...filters.authors, author];
    updateFilters({ authors: updatedAuthors });
  };

  const clearAllFilters = () => {
    const clearedFilters: FilterState = {
      categories: [],
      tags: [],
      authors: [],
      dateRange: null,
      readTime: null,
      sortBy: 'newest',
      featured: null
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = () => {
    return (
      filters.categories.length > 0 ||
      filters.tags.length > 0 ||
      filters.authors.length > 0 ||
      filters.dateRange !== null ||
      filters.readTime !== null ||
      filters.featured !== null
    );
  };

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Filter Posts</h3>
          <div className="flex items-center space-x-2">
            {hasActiveFilters() && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearAllFilters}
                className="text-red-600 hover:text-red-700"
              >
                Clear All
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              {showAdvanced ? 'Simple' : 'Advanced'}
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Sort By */}
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Sort By
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {sortOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <Button
                    key={option.value}
                    variant={filters.sortBy === option.value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => updateFilters({ sortBy: option.value as any })}
                    className="justify-start"
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {option.label}
                  </Button>
                );
              })}
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Categories
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={filters.categories.includes(category) ? 'default' : 'outline'}
                  className="cursor-pointer hover:bg-blue-100"
                  onClick={() => toggleCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </motion.div>

          {/* Tags */}
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Popular Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={filters.tags.includes(tag) ? 'default' : 'outline'}
                  className="cursor-pointer hover:bg-green-100"
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </motion.div>

          {/* Authors */}
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Authors
            </label>
            <div className="flex flex-wrap gap-2">
              {authors.map((author) => (
                <Badge
                  key={author}
                  variant={filters.authors.includes(author) ? 'default' : 'outline'}
                  className="cursor-pointer hover:bg-purple-100"
                  onClick={() => toggleAuthor(author)}
                >
                  {author}
                </Badge>
              ))}
            </div>
          </motion.div>

          {/* Advanced Filters */}
          <AnimatePresence>
            {showAdvanced && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Date Range */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Date Range
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">From</label>
                      <input
                        type="date"
                        value={filters.dateRange?.start || ''}
                        onChange={(e) => updateFilters({
                          dateRange: {
                            ...filters.dateRange,
                            start: e.target.value,
                            end: filters.dateRange?.end || ''
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">To</label>
                      <input
                        type="date"
                        value={filters.dateRange?.end || ''}
                        onChange={(e) => updateFilters({
                          dateRange: {
                            ...filters.dateRange,
                            start: filters.dateRange?.start || '',
                            end: e.target.value
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Read Time */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Read Time (minutes)
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Min</label>
                      <input
                        type="number"
                        min="1"
                        max="60"
                        value={filters.readTime?.min || ''}
                        onChange={(e) => updateFilters({
                          readTime: {
                            ...filters.readTime,
                            min: parseInt(e.target.value) || 1,
                            max: filters.readTime?.max || 60
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Max</label>
                      <input
                        type="number"
                        min="1"
                        max="60"
                        value={filters.readTime?.max || ''}
                        onChange={(e) => updateFilters({
                          readTime: {
                            ...filters.readTime,
                            min: filters.readTime?.min || 1,
                            max: parseInt(e.target.value) || 60
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Featured Posts */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Post Type
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="featured"
                        checked={filters.featured === null}
                        onChange={() => updateFilters({ featured: null })}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">All Posts</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="featured"
                        checked={filters.featured === true}
                        onChange={() => updateFilters({ featured: true })}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">Featured Only</span>
                    </label>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Active Filters Summary */}
          {hasActiveFilters() && (
            <motion.div variants={itemVariants} className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">Active filters:</span>
                  <div className="flex flex-wrap gap-2">
                    {filters.categories.map((category) => (
                      <Badge key={category} variant="default" className="text-xs">
                        {category}
                        <X 
                          className="w-3 h-3 ml-1 cursor-pointer" 
                          onClick={() => toggleCategory(category)}
                        />
                      </Badge>
                    ))}
                    {filters.tags.map((tag) => (
                      <Badge key={tag} variant="default" className="text-xs">
                        {tag}
                        <X 
                          className="w-3 h-3 ml-1 cursor-pointer" 
                          onClick={() => toggleTag(tag)}
                        />
                      </Badge>
                    ))}
                    {filters.authors.map((author) => (
                      <Badge key={author} variant="default" className="text-xs">
                        {author}
                        <X 
                          className="w-3 h-3 ml-1 cursor-pointer" 
                          onClick={() => toggleAuthor(author)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-red-600 hover:text-red-700"
                >
                  Clear All
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};





