import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ChevronUp, 
  ChevronDown, 
  Reply, 
  MoreHorizontal,
  Award,
  Flag,
  Clock,
  User
} from 'lucide-react';

interface ForumComment {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    karma: number;
    awards: string[];
  };
  upvotes: number;
  downvotes: number;
  score: number;
  createdAt: string;
  userVote?: 'upvote' | 'downvote' | null;
  isSolution?: boolean;
  isExpertAnswer?: boolean;
    replies?: ForumComment[];
  depth: number;
}

interface ForumCommentThreadProps {
  comment: ForumComment;
  onVote?: (commentId: string, voteType: 'upvote' | 'downvote') => void;
  onReply?: (commentId: string, content: string) => void;
  onReport?: (commentId: string) => void;
  onMarkSolution?: (commentId: string) => void;
  maxDepth?: number;
  className?: string;
}

export const ForumCommentThread: React.FC<ForumCommentThreadProps> = ({
  comment,
  onVote,
  onReply,
  onReport,
  onMarkSolution,
  maxDepth = 5,
  className = ''
}) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [showReplies, setShowReplies] = useState(true);
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async (voteType: 'upvote' | 'downvote') => {
    if (isVoting) return;
    setIsVoting(true);
    try {
      await onVote?.(comment.id, voteType);
    } finally {
      setIsVoting(false);
    }
  };

  const handleReply = async () => {
    if (!replyContent.trim()) return;
    try {
      await onReply?.(comment.id, replyContent);
      setReplyContent('');
      setIsReplying(false);
    } catch (error) {
      console.error('Failed to reply:', error);
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
    if (Math.abs(score) >= 1000) return `${(score / 1000).toFixed(1)}k`;
    return score.toString();
  };

  const getBorderColor = (depth: number) => {
    const colors = [
      'border-gray-200',
      'border-blue-200',
      'border-green-200',
      'border-yellow-200',
      'border-purple-200',
      'border-red-200'
    ];
    return colors[depth % colors.length];
  };

  const getLeftMargin = (depth: number) => {
    return Math.min(depth * 20, 100);
  };

  return (
    <div className={`${className}`}>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className={`border-l-2 ${getBorderColor(comment.depth)} pl-4`}
        style={{ marginLeft: `${getLeftMargin(comment.depth)}px` }}
      >
        <Card className="p-3 bg-white hover:bg-gray-50 transition-colors">
          {/* Comment Header */}
          <div className="flex items-center gap-2 mb-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={comment.author.avatar} />
              <AvatarFallback className="text-xs">
                {comment.author.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            
            <span className="text-sm font-medium text-gray-700">
              {comment.author.name}
            </span>
            
            <span className="text-xs text-orange-500 font-medium">
              {comment.author.karma} karma
            </span>
            
            <span className="text-xs text-gray-400">•</span>
            
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatTimeAgo(comment.createdAt)}
            </span>

            {comment.isSolution && (
              <Badge variant="default" className="text-xs bg-green-500">
                <Award className="h-3 w-3 mr-1" />
                Solution
              </Badge>
            )}

            {comment.isExpertAnswer && (
              <Badge variant="default" className="text-xs bg-blue-500">
                <Award className="h-3 w-3 mr-1" />
                Expert Answer
              </Badge>
            )}
          </div>

          {/* Comment Content */}
          <div className="text-sm text-gray-800 mb-3 whitespace-pre-wrap">
            {comment.content}
          </div>

          {/* Comment Actions */}
          <div className="flex items-center gap-4 text-xs">
            {/* Voting */}
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                className={`p-1 h-6 w-6 ${
                  comment.userVote === 'upvote' ? 'text-orange-500 bg-orange-100' : 'text-gray-400'
                }`}
                onClick={() => handleVote('upvote')}
                disabled={isVoting}
              >
                <ChevronUp className="h-3 w-3" />
              </Button>
              
              <span className={`text-xs font-medium px-1 ${
                comment.score > 0 ? 'text-orange-500' : 
                comment.score < 0 ? 'text-blue-500' : 'text-gray-500'
              }`}>
                {formatScore(comment.score)}
              </span>
              
              <Button
                variant="ghost"
                size="sm"
                className={`p-1 h-6 w-6 ${
                  comment.userVote === 'downvote' ? 'text-blue-500 bg-blue-100' : 'text-gray-400'
                }`}
                onClick={() => handleVote('downvote')}
                disabled={isVoting}
              >
                <ChevronDown className="h-3 w-3" />
              </Button>
            </div>

            {/* Reply Button */}
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-gray-700 p-1 h-6"
              onClick={() => setIsReplying(!isReplying)}
            >
              <Reply className="h-3 w-3 mr-1" />
              Reply
            </Button>

            {/* Mark as Solution */}
            {onMarkSolution && (
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-green-600 p-1 h-6"
                onClick={() => onMarkSolution(comment.id)}
              >
                <Award className="h-3 w-3 mr-1" />
                Mark Solution
              </Button>
            )}

            {/* Report */}
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-red-600 p-1 h-6"
              onClick={() => onReport?.(comment.id)}
            >
              <Flag className="h-3 w-3 mr-1" />
              Report
            </Button>

            {/* Show/Hide Replies */}
            {comment.replies && comment.replies.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-gray-700 p-1 h-6"
                onClick={() => setShowReplies(!showReplies)}
              >
                {showReplies ? 'Hide' : 'Show'} {comment.replies.length} replies
              </Button>
            )}
          </div>

          {/* Reply Form */}
          <AnimatePresence>
            {isReplying && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 pt-3 border-t border-gray-200"
              >
                <Textarea
                  placeholder="Write your reply..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="mb-2 text-sm"
                  rows={3}
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={handleReply}
                    disabled={!replyContent.trim()}
                  >
                    Reply
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setIsReplying(false);
                      setReplyContent('');
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        {/* Nested Replies */}
        <AnimatePresence>
          {showReplies && comment.replies && comment.replies.length > 0 && comment.depth < maxDepth && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2"
            >
              {comment.replies.map((reply) => (
                <ForumCommentThread
                  key={reply.id}
                  comment={reply}
                  onVote={onVote}
                  onReply={onReply}
                  onReport={onReport}
                  onMarkSolution={onMarkSolution}
                  maxDepth={maxDepth}
                  className="mt-2"
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
