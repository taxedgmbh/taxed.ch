import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  Award, 
  TrendingUp, 
  MessageCircle, 
  Calendar,
  MapPin,
  Link,
  Mail,
  Shield,
  Star,
  Trophy,
  Activity
} from 'lucide-react';

interface ForumUserProfileProps {
  user: {
    id: string;
    name: string;
    avatar?: string;
    karma: number;
    postKarma: number;
    commentKarma: number;
    joinDate: string;
    location?: string;
    website?: string;
    email?: string;
    role: 'member' | 'expert' | 'moderator' | 'admin';
    awards: Array<{
      name: string;
      icon: string;
      color: string;
      description: string;
    }>;
    stats: {
      postsCreated: number;
      commentsCreated: number;
      solutionsMarked: number;
      votesReceived: number;
      rank: number;
    };
    recentActivity: Array<{
      type: 'post' | 'comment' | 'vote' | 'award';
      title: string;
      score: number;
      createdAt: string;
    }>;
  };
  isOwnProfile?: boolean;
  onFollow?: (userId: string) => void;
  onMessage?: (userId: string) => void;
  className?: string;
}

export const ForumUserProfile: React.FC<ForumUserProfileProps> = ({
  user,
  isOwnProfile = false,
  onFollow,
  onMessage,
  className = ''
}) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    onFollow?.(user.id);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatKarma = (karma: number) => {
    if (karma >= 1000000) return `${(karma / 1000000).toFixed(1)}M`;
    if (karma >= 1000) return `${(karma / 1000).toFixed(1)}k`;
    return karma.toString();
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-500';
      case 'moderator': return 'bg-purple-500';
      case 'expert': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Shield className="h-4 w-4" />;
      case 'moderator': return <Shield className="h-4 w-4" />;
      case 'expert': return <Star className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Profile Header */}
      <Card className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="text-2xl">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-gray-900">
                {user.name}
              </h2>
              
              <Badge 
                variant="default" 
                className={`${getRoleColor(user.role)} text-white`}
              >
                {getRoleIcon(user.role)}
                <span className="ml-1 capitalize">{user.role}</span>
              </Badge>
              
              {user.stats.rank <= 10 && (
                <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                  <Trophy className="h-3 w-3 mr-1" />
                  Top {user.stats.rank}
                </Badge>
              )}
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Joined {formatDate(user.joinDate)}</span>
              </div>
              
              {user.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{user.location}</span>
                </div>
              )}
            </div>
            
            <div className="flex gap-4">
              {!isOwnProfile && (
                <>
                  <Button
                    variant={isFollowing ? "outline" : "default"}
                    size="sm"
                    onClick={handleFollow}
                  >
                    {isFollowing ? 'Following' : 'Follow'}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onMessage?.(user.id)}
                  >
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Message
                  </Button>
                </>
              )}
              
              {isOwnProfile && (
                <Button variant="outline" size="sm">
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Karma Stats */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Karma Breakdown
        </h3>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-500">
              {formatKarma(user.karma)}
            </div>
            <div className="text-sm text-gray-600">Total Karma</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-green-500">
              {formatKarma(user.postKarma)}
            </div>
            <div className="text-sm text-gray-600">Post Karma</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-500">
              {formatKarma(user.commentKarma)}
            </div>
            <div className="text-sm text-gray-600">Comment Karma</div>
          </div>
        </div>
      </Card>

      {/* Activity Stats */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Activity Stats
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Posts Created</span>
            <span className="font-semibold">{user.stats.postsCreated}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Comments</span>
            <span className="font-semibold">{user.stats.commentsCreated}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Solutions</span>
            <span className="font-semibold">{user.stats.solutionsMarked}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Votes Received</span>
            <span className="font-semibold">{user.stats.votesReceived}</span>
          </div>
        </div>
      </Card>

      {/* Awards */}
      {user.awards.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Award className="h-5 w-5" />
            Awards & Achievements
          </h3>
          
          <div className="grid grid-cols-2 gap-3">
            {user.awards.map((award, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                <div 
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs"
                  style={{ backgroundColor: award.color }}
                >
                  {award.icon}
                </div>
                <div>
                  <div className="font-medium text-sm">{award.name}</div>
                  <div className="text-xs text-gray-600">{award.description}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Recent Activity */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        
        <div className="space-y-3">
          {user.recentActivity.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-gray-50 rounded"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  {activity.type === 'post' && <MessageCircle className="h-4 w-4 text-blue-600" />}
                  {activity.type === 'comment' && <MessageCircle className="h-4 w-4 text-green-600" />}
                  {activity.type === 'vote' && <TrendingUp className="h-4 w-4 text-orange-600" />}
                  {activity.type === 'award' && <Award className="h-4 w-4 text-yellow-600" />}
                </div>
                
                <div>
                  <div className="font-medium text-sm">{activity.title}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(activity.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className={`text-sm font-semibold ${
                  activity.score > 0 ? 'text-green-600' : 
                  activity.score < 0 ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {activity.score > 0 ? '+' : ''}{activity.score}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
};
