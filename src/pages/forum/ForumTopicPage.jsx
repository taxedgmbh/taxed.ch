import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ForumLayout } from '@/components/features/forum/ForumLayout';
import { ForumTopic } from '@/components/features/forum/ForumTopic';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  Share2,
  Bookmark,
  Heart,
  Clock,
  Eye,
  User,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { getTopic, getPosts, vote } from '@/services/forum';

const ForumTopicPage = () => {
  const { topicSlug } = useParams();
  const navigate = useNavigate();
  const [topic, setTopic] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userLiked, setUserLiked] = useState(false);
  const [userBookmarked, setUserBookmarked] = useState(false);

  // Transform API topic to component format
  const transformTopic = (apiTopic) => ({
    id: apiTopic.id.toString(),
    title: apiTopic.title,
    slug: apiTopic.slug,
    content: apiTopic.content,
    author: {
      id: '1',
      name: `${apiTopic.author_name || 'Anonymous'} ${apiTopic.author_lastname || ''}`.trim(),
      role: apiTopic.author_karma > 100 ? 'expert' : 'member'
    },
    category: {
      id: apiTopic.category_slug,
      name: apiTopic.category_name,
      slug: apiTopic.category_slug,
      color: apiTopic.category_color || '#3B82F6'
    },
    tags: [], // API doesn't return tags yet
    status: apiTopic.status,
    isSolved: apiTopic.is_solved,
    views: apiTopic.views || 0,
    likes: apiTopic.upvotes || 0,
    userLiked: apiTopic.user_vote === 'up',
    userBookmarked: false,
    createdAt: apiTopic.created_at,
    updatedAt: apiTopic.last_reply_at || apiTopic.created_at
  });

  // Transform API post to component format
  const transformPost = (apiPost) => ({
    id: apiPost.id.toString(),
    content: apiPost.content,
    author: {
      id: '1',
      name: `${apiPost.author_name || 'Anonymous'} ${apiPost.author_lastname || ''}`.trim(),
      role: apiPost.is_expert_answer ? 'expert' : 'member',
      reputation: apiPost.author_karma || 0
    },
    isSolution: apiPost.is_solution,
    isExpertAnswer: apiPost.is_expert_answer,
    likes: apiPost.upvotes || 0,
    dislikes: apiPost.downvotes || 0,
    userLiked: apiPost.user_vote === 'up',
    userDisliked: apiPost.user_vote === 'down',
    createdAt: apiPost.created_at,
    updatedAt: apiPost.created_at
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch topic
        const topicData = await getTopic(topicSlug);

        if (!topicData) {
          setError('Topic not found');
          setLoading(false);
          return;
        }

        const transformedTopic = transformTopic(topicData);
        setTopic(transformedTopic);
        setUserLiked(transformedTopic.userLiked);

        // Fetch posts
        const postsData = await getPosts(topicData.id);
        const transformedPosts = postsData.map(transformPost);
        setPosts(transformedPosts);
      } catch (err) {
        console.error('Error fetching topic:', err);
        setError(err.message || 'Failed to load topic');
      } finally {
        setLoading(false);
      }
    };

    if (topicSlug) {
      fetchData();
    }
  }, [topicSlug]);

  const handleLike = async (postId) => {
    if (postId === topic?.id) {
      try {
        await vote('topic', parseInt(topic.id), 'up');
        setUserLiked(!userLiked);
        setTopic(prev => ({
          ...prev,
          likes: userLiked ? prev.likes - 1 : prev.likes + 1
        }));
      } catch (err) {
        console.error('Error voting:', err);
      }
    } else {
      try {
        await vote('post', parseInt(postId), 'up');
        setPosts(prev => prev.map(post =>
          post.id === postId
            ? { ...post, likes: post.userLiked ? post.likes - 1 : post.likes + 1, userLiked: !post.userLiked }
            : post
        ));
      } catch (err) {
        console.error('Error voting:', err);
      }
    }
  };

  const handleDislike = async (postId) => {
    try {
      await vote('post', parseInt(postId), 'down');
      setPosts(prev => prev.map(post =>
        post.id === postId
          ? { ...post, dislikes: post.userDisliked ? post.dislikes - 1 : post.dislikes + 1, userDisliked: !post.userDisliked }
          : post
      ));
    } catch (err) {
      console.error('Error voting:', err);
    }
  };

  const handleBookmark = () => {
    setUserBookmarked(!userBookmarked);
  };

  const handleMarkSolution = (postId) => {
    setPosts(prev => prev.map(post =>
      post.id === postId
        ? { ...post, isSolution: true }
        : { ...post, isSolution: false }
    ));
    setTopic(prev => ({ ...prev, isSolved: true }));
  };

  const handleReply = (content, parentId) => {
    const newPost = {
      id: Date.now().toString(),
      content,
      author: {
        id: 'current-user',
        name: 'You',
        role: 'member',
        reputation: 100
      },
      isSolution: false,
      isExpertAnswer: false,
      likes: 0,
      dislikes: 0,
      userLiked: false,
      userDisliked: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setPosts(prev => [...prev, newPost]);
  };

  const handleEdit = (postId, content) => {
    setPosts(prev => prev.map(post =>
      post.id === postId
        ? { ...post, content, updatedAt: new Date().toISOString() }
        : post
    ));
  };

  const handleDelete = (postId) => {
    setPosts(prev => prev.filter(post => post.id !== postId));
  };

  const handleReport = (postId) => {
    // Reporting not implemented yet
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: topic?.title,
        text: topic?.content,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <ForumLayout>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <span className="ml-2 text-gray-600">Loading topic...</span>
        </div>
      </ForumLayout>
    );
  }

  if (error) {
    return (
      <ForumLayout>
        <div className="text-center py-12">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Topic</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="flex justify-center space-x-4">
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
            <Button variant="outline" onClick={() => navigate('/forum')}>
              Back to Forum
            </Button>
          </div>
        </div>
      </ForumLayout>
    );
  }

  if (!topic) {
    return (
      <ForumLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Topic Not Found</h1>
          <p className="text-gray-600 mb-6">The topic you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/forum')}>
            Back to Forum
          </Button>
        </div>
      </ForumLayout>
    );
  }

  return (
    <ForumLayout>
      <div className="space-y-6">
        {/* Topic Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center space-x-4 mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate(`/forum/category/${topic.category.slug}`)}
              className="flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to {topic.category.name}
            </Button>
          </div>

          <Card className="p-6">
            <div className="space-y-4">
              {/* Title and Meta */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {topic.title}
                  </h1>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      <span className="font-medium">{topic.author.name}</span>
                      <Badge className="ml-2 bg-gray-100 text-gray-800">
                        {topic.author.role}
                      </Badge>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {new Date(topic.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {topic.views} views
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(topic.id)}
                    className={userLiked ? 'text-red-500' : 'text-gray-500'}
                  >
                    <Heart className="w-4 h-4 mr-1" />
                    {topic.likes}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleBookmark}
                    className={userBookmarked ? 'text-blue-500' : 'text-gray-500'}
                  >
                    <Bookmark className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleShare}
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Tags */}
              {topic.tags && topic.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {topic.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Topic Content */}
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {topic.content}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <ForumTopic
            topic={topic}
            posts={posts}
            onLike={handleLike}
            onDislike={handleDislike}
            onBookmark={handleBookmark}
            onMarkSolution={handleMarkSolution}
            onReply={handleReply}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onReport={handleReport}
          />
        </motion.div>
      </div>
    </ForumLayout>
  );
};

export default ForumTopicPage;
