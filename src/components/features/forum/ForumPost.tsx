import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  User, 
  Clock, 
  Star,
  ThumbsUp,
  ThumbsDown,
  Reply,
  Edit,
  Trash2,
  Flag,
  Award
} from 'lucide-react';

interface ForumPostProps {
  post: {
    id: string;
    content: string;
    author: {
      id: string;
      name: string;
      avatar?: string;
      role: 'member' | 'expert' | 'moderator' | 'admin';
      reputation: number;
    };
    isSolution: boolean;
    isExpertAnswer: boolean;
    likes: number;
    dislikes: number;
    userLiked?: boolean;
    userDisliked?: boolean;
    createdAt: string;
    updatedAt: string;
    replies?: ForumPostProps['post'][];
  };
  onLike?: (postId: string) => void;
  onDislike?: (postId: string) => void;
  onMarkSolution?: (postId: string) => void;
  onEdit?: (postId: string, content: string) => void;
  onDelete?: (postId: string) => void;
  onReport?: (postId: string) => void;
  onReply?: (postId: string, content: string) => void;
  canEdit?: boolean;
  canDelete?: boolean;
  canMarkSolution?: boolean;
  className?: string;
}

export const ForumPost: React.FC<ForumPostProps> = ({
  post,
  onLike,
  onDislike,
  onMarkSolution,
  onEdit,
  onDelete,
  onReport,
  onReply,
  canEdit = false,
  canDelete = false,
  canMarkSolution = false,
  className = ''
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content);
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  const handleEdit = () => {
    setIsEditing(true);
    setEditContent(post.content);
  };

  const handleSaveEdit = () => {
    if (editContent.trim() && editContent !== post.content) {
      onEdit?.(post.id, editContent);
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditContent(post.content);
  };

  const handleReply = () => {
    if (replyContent.trim()) {
      onReply?.(post.id, replyContent);
      setReplyContent('');
      setIsReplying(false);
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'expert':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'moderator':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'admin':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`space-y-4 ${className}`}
    >
      <Card className={`p-6 ${post.isSolution ? 'border-green-200 bg-green-50' : ''}`}>
        <div className="space-y-4">
          {/* Post Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-gray-500" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900">{post.author.name}</span>
                  <Badge className={getRoleColor(post.author.role)}>
                    {post.author.role}
                  </Badge>
                  {post.isExpertAnswer && (
                    <Badge className="bg-purple-100 text-purple-800">
                      <Star className="w-3 h-3 mr-1" />
                      Expert
                    </Badge>
                  )}
                  {post.isSolution && (
                    <Badge className="bg-green-100 text-green-800">
                      <Award className="w-3 h-3 mr-1" />
                      Solution
                    </Badge>
                  )}
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>{formatDate(post.createdAt)}</span>
                  <span>•</span>
                  <span>{post.author.reputation} reputation</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {canMarkSolution && !post.isSolution && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onMarkSolution?.(post.id)}
                  className="text-green-600 hover:text-green-700"
                >
                  <Star className="w-4 h-4 mr-1" />
                  Mark as Solution
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onReport?.(post.id)}
                className="text-gray-500 hover:text-red-500"
              >
                <Flag className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Post Content */}
          {isEditing ? (
            <div className="space-y-3">
              <Textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                rows={6}
                className="w-full"
              />
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  onClick={handleSaveEdit}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Save
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {post.content}
              </p>
            </div>
          )}

          {/* Post Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onLike?.(post.id)}
                className={post.userLiked ? 'text-red-500' : 'text-gray-500'}
              >
                <ThumbsUp className="w-4 h-4 mr-1" />
                {post.likes}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDislike?.(post.id)}
                className={post.userDisliked ? 'text-red-500' : 'text-gray-500'}
              >
                <ThumbsDown className="w-4 h-4 mr-1" />
                {post.dislikes}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsReplying(!isReplying)}
              >
                <Reply className="w-4 h-4 mr-1" />
                Reply
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              {canEdit && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleEdit}
                >
                  <Edit className="w-4 h-4" />
                </Button>
              )}
              {canDelete && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete?.(post.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Reply Form */}
      {isReplying && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="ml-8"
        >
          <Card className="p-4">
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Reply to {post.author.name}</h4>
              <Textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Share your thoughts and help the community..."
                rows={4}
                className="w-full"
              />
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Be respectful and helpful. Remember, this is a professional tax forum.
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsReplying(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleReply}
                    disabled={!replyContent.trim()}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Post Reply
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Replies */}
      {post.replies && post.replies.length > 0 && (
        <div className="ml-8 space-y-4">
          {post.replies.map((reply) => (
            <ForumPost
              key={reply.id}
              post={reply}
              onLike={onLike}
              onDislike={onDislike}
              onMarkSolution={onMarkSolution}
              onEdit={onEdit}
              onDelete={onDelete}
              onReport={onReport}
              onReply={onReply}
              canEdit={canEdit}
              canDelete={canDelete}
              canMarkSolution={canMarkSolution}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};
