import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ForumPostCard } from '@/components/features/forum/ForumPostCard';
import { ForumCommentThread } from '@/components/features/forum/ForumCommentThread';
import { ForumUserProfile } from '@/components/features/forum/ForumUserProfile';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  TrendingUp, 
  Clock, 
  Star, 
  Filter,
  Search,
  Plus,
  Users,
  MessageCircle,
  Award,
  Trophy
} from 'lucide-react';

const ForumPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('hot');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalUsers: 0,
    totalComments: 0
  });

  // Fetch posts based on sort and filters
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        sort: sortBy,
        category: selectedCategory,
        limit: 20
      });

      const response = await fetch(`/forum-unified-api.php?action=topics&${params}`);
      const data = await response.json();
      
      if (data.success) {
        setPosts(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch trending posts
  const fetchTrending = async () => {
    try {
      const response = await fetch('/forum-unified-api.php?action=trending&limit=5');
      const data = await response.json();
      if (data.success) {
        setTrendingPosts(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch trending:', error);
    }
  };

  // Fetch leaderboard
  const fetchLeaderboard = async () => {
    try {
      const response = await fetch('/forum-unified-api.php?action=leaderboard&limit=10');
      const data = await response.json();
      if (data.success) {
        setLeaderboard(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error);
    }
  };

  // Fetch forum stats
  const fetchStats = async () => {
    try {
      const response = await fetch('/forum-unified-api.php?action=stats');
      const data = await response.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchTrending();
    fetchLeaderboard();
    fetchStats();
  }, [sortBy, selectedCategory]);

  const handleVote = async (postId, voteType) => {
    try {
      const response = await fetch('/forum-unified-api.php?action=vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content_type: 'topic',
          content_id: postId,
          vote_type: voteType
        })
      });
      
      const data = await response.json();
      if (data.success) {
        // Refresh posts to get updated scores
        fetchPosts();
      }
    } catch (error) {
      console.error('Failed to vote:', error);
    }
  };

  const handleBookmark = (postId) => {
    // Implement bookmark functionality
    console.log('Bookmark post:', postId);
  };

  const handleShare = (postId) => {
    // Implement share functionality
    console.log('Share post:', postId);
  };

  const handleReport = (postId) => {
    // Implement report functionality
    console.log('Report post:', postId);
  };

  const sortOptions = [
    { value: 'hot', label: 'Hot', icon: TrendingUp },
    { value: 'new', label: 'New', icon: Clock },
    { value: 'top', label: 'Top', icon: Star },
    { value: 'controversial', label: 'Controversial', icon: Filter }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-900">
                Swiss Tax Forum
              </h1>
              <Badge variant="outline" className="text-orange-500 border-orange-500">
                <Award className="h-3 w-3 mr-1" />
                Expert Community
              </Badge>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              
              <Button className="bg-orange-500 hover:bg-orange-600">
                <Plus className="h-4 w-4 mr-1" />
                Create Post
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Sort Options */}
            <Card className="p-4 mb-6">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">Sort by:</span>
                {sortOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={sortBy === option.value ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSortBy(option.value)}
                    className={sortBy === option.value ? "bg-orange-500 hover:bg-orange-600" : ""}
                  >
                    <option.icon className="h-4 w-4 mr-1" />
                    {option.label}
                  </Button>
                ))}
              </div>
            </Card>

            {/* Posts List */}
            <div className="space-y-4">
              {loading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <Card key={i} className="p-6 animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </Card>
                  ))}
                </div>
              ) : (
                posts.map((post) => (
                  <ForumPostCard
                    key={post.id}
                    post={{
                      id: post.id,
                      title: post.title,
                      content: post.content,
                      author: {
                        id: post.author_id || 1,
                        name: `${post.author_name} ${post.author_lastname}`,
                        karma: post.author_karma || 0,
                        awards: []
                      },
                      category: {
                        name: post.category_name,
                        slug: post.category_slug,
                        color: post.category_color
                      },
                      upvotes: post.upvotes || 0,
                      downvotes: post.downvotes || 0,
                      score: post.score || 0,
                      comments: post.replies_count || 0,
                      views: post.views || 0,
                      createdAt: post.created_at,
                      isHot: post.post_type === 'hot',
                      isTrending: post.post_type === 'trending',
                      userVote: post.user_vote,
                      isBookmarked: false
                    }}
                    onVote={handleVote}
                    onBookmark={handleBookmark}
                    onShare={handleShare}
                    onReport={handleReport}
                  />
                ))
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 space-y-6">
            {/* Community Stats */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Community Stats
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Posts</span>
                  <span className="font-semibold">{stats.totalPosts}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Users</span>
                  <span className="font-semibold">{stats.totalUsers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Comments</span>
                  <span className="font-semibold">{stats.totalComments}</span>
                </div>
              </div>
            </Card>

            {/* Trending Posts */}
            {trendingPosts.length > 0 && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Trending Today
                </h3>
                
                <div className="space-y-3">
                  {trendingPosts.map((post, index) => (
                    <div key={post.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                      <div className="text-lg font-bold text-orange-500">
                        #{index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">
                          {post.title}
                        </div>
                        <div className="text-xs text-gray-500">
                          r/{post.category_slug} • {post.score} points
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Leaderboard */}
            {leaderboard.length > 0 && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Top Contributors
                </h3>
                
                <div className="space-y-3">
                  {leaderboard.slice(0, 5).map((user, index) => (
                    <div key={user.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                      <div className="text-lg font-bold text-orange-500">
                        #{index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium">
                          u/{user.first_name} {user.last_name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {user.karma_points} karma
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Ask a Question
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Award className="h-4 w-4 mr-2" />
                  Expert Help
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Tax Updates
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumPage;
