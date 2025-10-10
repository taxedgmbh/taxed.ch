import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowRight,
  Eye,
  Heart,
  Share2,
  Bookmark
} from 'lucide-react';

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

interface BlogCardProps {
  post: BlogPost;
  variant?: 'default' | 'featured' | 'compact';
  onReadMore?: (post: BlogPost) => void;
  onLike?: (postId: string) => void;
  onBookmark?: (postId: string) => void;
  onShare?: (post: BlogPost) => void;
  className?: string;
}

export const BlogCard: React.FC<BlogCardProps> = ({
  post,
  variant = 'default',
  onReadMore,
  onLike,
  onBookmark,
  onShare,
  className = ''
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleReadMore = () => {
    onReadMore?.(post);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLike?.(post.id);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    onBookmark?.(post.id);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShare?.(post);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  if (variant === 'compact') {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={className}
      >
        <Card className="p-4 hover:shadow-lg transition-all duration-300 cursor-pointer group">
          <div className="flex items-start space-x-4">
            {/* Image */}
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg overflow-hidden">
                {post.image ? (
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {post.title.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="secondary" className="text-xs">
                  {post.category}
                </Badge>
                {post.featured && (
                  <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                    Featured
                  </Badge>
                )}
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {post.title}
              </h3>
              
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-4">
                  <span>{formatDate(post.publishedAt)}</span>
                  <span>{post.readTime} min read</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-3 h-3" />
                    <span>{post.views}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="w-3 h-3" />
                    <span>{post.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    );
  }

  if (variant === 'featured') {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={className}
      >
        <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group">
          {/* Featured Image */}
          <div className="relative h-64 bg-gradient-to-br from-blue-100 to-green-100">
            {post.image ? (
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-4xl">
                  {post.title.charAt(0)}
                </span>
              </div>
            )}
            
            {/* Featured Badge */}
            <div className="absolute top-4 left-4">
              <Badge className="bg-yellow-500 text-white">
                Featured
              </Badge>
            </div>
            
            {/* Category Badge */}
            <div className="absolute top-4 right-4">
              <Badge variant="secondary" className="bg-white/90">
                {post.category}
              </Badge>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <motion.div variants={itemVariants} className="mb-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                {post.title}
              </h2>
              <p className="text-gray-600 line-clamp-3">
                {post.excerpt}
              </p>
            </motion.div>

            {/* Tags */}
            <motion.div variants={itemVariants} className="mb-4">
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {post.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{post.tags.length - 3} more
                  </Badge>
                )}
              </div>
            </motion.div>

            {/* Meta Info */}
            <motion.div variants={itemVariants} className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>{post.author.name}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime} min read</span>
                </div>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>{post.views} views</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Heart className="w-4 h-4" />
                  <span>{post.likes} likes</span>
                </div>
              </div>
              
              <Button
                onClick={handleReadMore}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Read More
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </div>
        </Card>
      </motion.div>
    );
  }

  // Default variant
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group">
        {/* Image */}
        <div className="relative h-48 bg-gradient-to-br from-blue-100 to-green-100">
          {post.image ? (
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-3xl">
                {post.title.charAt(0)}
              </span>
            </div>
          )}
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="bg-white/90">
              {post.category}
            </Badge>
          </div>
          
          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleBookmark}
              className={`w-8 h-8 p-0 ${post.isBookmarked ? 'bg-blue-600 text-white' : 'bg-white/90'}`}
            >
              <Bookmark className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="w-8 h-8 p-0 bg-white/90"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <motion.div variants={itemVariants} className="mb-4">
            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
              {post.title}
            </h3>
            <p className="text-gray-600 line-clamp-3">
              {post.excerpt}
            </p>
          </motion.div>

          {/* Tags */}
          <motion.div variants={itemVariants} className="mb-4">
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 2).map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {post.tags.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{post.tags.length - 2} more
                </Badge>
              )}
            </div>
          </motion.div>

          {/* Meta Info */}
          <motion.div variants={itemVariants} className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>{post.author.name}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{post.readTime} min</span>
            </div>
          </motion.div>

          {/* Stats and Actions */}
          <motion.div variants={itemVariants} className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>{post.views}</span>
              </div>
              <button
                onClick={handleLike}
                className={`flex items-center space-x-1 ${post.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
              >
                <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                <span>{post.likes}</span>
              </button>
            </div>
            
            <Button
              onClick={handleReadMore}
              variant="outline"
              size="sm"
            >
              Read More
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
};





