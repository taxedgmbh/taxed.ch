import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ChevronUp, 
  ChevronDown, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  Flag,
  Award,
  Clock,
  User,
  Eye,
  TrendingUp
} from 'lucide-react';

interface ForumPostCardProps {
  post: {
    id: string;
    title: string;
    content: string;
    author: {
      id: string;
      name: string;
      avatar?: string;
      karma: number;
      awards: string[];
    };
    category: {
      name: string;
      slug: string;
      color: string;
    };
    flair?: {
      name: string;
      color: string;
      background_color: string;
    };
    upvotes: number;
    downvotes: number;
    score: number;
    comments: number;
    views: number;
    createdAt: string;
    isHot?: boolean;
    isTrending?: boolean;
    userVote?: 'upvote' | 'downvote' | null;
    isBookmarked?: boolean;
  };
  onVote?: (postId: string, voteType: 'upvote' | 'downvote') => void;
  onBookmark?: (postId: string) => void;
  onShare?: (postId: string) => void;
  onReport?: (postId: string) => void;
  className?: string;
}

export const ForumPostCard: React.FC<ForumPostCardProps> = ({
  post,
  onVote,
  onBookmark,
  onShare,
  onReport,
  className = ''
}) => {
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async (voteType: 'upvote' | 'downvote') => {
    if (isVoting) return;
    setIsVoting(true);
    try {
      await onVote?.(post.id, voteType);
    } finally {
      setIsVoting(false);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds}s`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
    return `${Math.floor(diffInSeconds / 86400)}d`;
  };

  const formatScore = (score: number) => {
    if (score >= 1000) return `${(score / 1000).toFixed(1)}k`;
    return score.toString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors ${className}`}
    >
      <Card className="p-0 overflow-hidden">
        <div className="flex">
          {/* Voting Section - Reddit Style */}
          <div className="flex flex-col items-center p-2 bg-gray-50 border-r border-gray-200">
            <Button
              variant="ghost"
              size="sm"
              className={`p-1 h-8 w-8 hover:bg-orange-100 ${
                post.userVote === 'upvote' ? 'text-orange-500 bg-orange-100' : 'text-gray-400'
              }`}
              onClick={() => handleVote('upvote')}
              disabled={isVoting}
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
            
            <div className="text-sm font-semibold text-gray-700 py-1">
              {formatScore(post.score)}
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              className={`p-1 h-8 w-8 hover:bg-blue-100 ${
                post.userVote === 'downvote' ? 'text-blue-500 bg-blue-100' : 'text-gray-400'
              }`}
              onClick={() => handleVote('downvote')}
              disabled={isVoting}
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-4">
            {/* Post Header */}
            <div className="flex items-center gap-2 mb-2">
              <Badge 
                variant="secondary" 
                className="text-xs"
                style={{ backgroundColor: post.category.color + '20', color: post.category.color }}
              >
                {post.category.name}
              </Badge>
              
              {post.flair && (
                <Badge 
                  variant="outline"
                  className="text-xs"
                  style={{ 
                    color: post.flair.color, 
                    borderColor: post.flair.color,
                    backgroundColor: post.flair.background_color 
                  }}
                >
                  {post.flair.name}
                </Badge>
              )}
              
              {post.isHot && (
                <Badge variant="destructive" className="text-xs">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Hot
                </Badge>
              )}
              
              {post.isTrending && (
                <Badge variant="default" className="text-xs bg-orange-500">
                  Trending
                </Badge>
              )}
            </div>

            {/* Post Title */}
            <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
              {post.title}
            </h3>

            {/* Post Content Preview */}
            <p className="text-gray-700 text-sm mb-3 line-clamp-3">
              {post.content}
            </p>

            {/* Post Footer */}
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Avatar className="h-5 w-5">
                    <AvatarImage src={post.author.avatar} />
                    <AvatarFallback className="text-xs">
                      {post.author.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{post.author.name}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-orange-500 font-medium">{post.author.karma} karma</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{formatTimeAgo(post.createdAt)}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <MessageCircle className="h-4 w-4" />
                  <span>{post.comments} comments</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>{post.views} views</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-gray-700"
                onClick={() => onBookmark?.(post.id)}
              >
                <Bookmark className={`h-4 w-4 mr-1 ${post.isBookmarked ? 'fill-current' : ''}`} />
                Save
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-gray-700"
                onClick={() => onShare?.(post.id)}
              >
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-gray-700"
                onClick={() => onReport?.(post.id)}
              >
                <Flag className="h-4 w-4 mr-1" />
                Report
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
