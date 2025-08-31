import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  generateBlogPost, 
  generateMultipleBlogPosts, 
  getAIGeneratedPosts, 
  saveBlogPost,
  scheduleDailyBlogGeneration 
} from '@/services/aiBlogGenerator';
import { 
  Plus, 
  RefreshCw, 
  Calendar, 
  FileText, 
  Settings, 
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';

const AdminPage = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPosts, setGeneratedPosts] = useState([]);
  const [lastGeneration, setLastGeneration] = useState(null);
  const [autoGenerationEnabled, setAutoGenerationEnabled] = useState(false);
  const [generationCount, setGenerationCount] = useState(1);

  useEffect(() => {
    loadGeneratedPosts();
    checkLastGeneration();
  }, []);

  const loadGeneratedPosts = () => {
    const posts = getAIGeneratedPosts();
    setGeneratedPosts(posts);
  };

  const checkLastGeneration = () => {
    const lastGen = localStorage.getItem('lastBlogGeneration');
    setLastGeneration(lastGen);
  };

  const handleGenerateSinglePost = async () => {
    setIsGenerating(true);
    try {
      const post = await generateBlogPost();
      saveBlogPost(post);
      loadGeneratedPosts();
      checkLastGeneration();
    } catch (error) {
      console.error('Failed to generate blog post:', error);
      alert('Failed to generate blog post. Please check your API key and try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateMultiplePosts = async () => {
    setIsGenerating(true);
    try {
      const posts = await generateMultipleBlogPosts(generationCount);
      posts.forEach(post => saveBlogPost(post));
      loadGeneratedPosts();
      checkLastGeneration();
    } catch (error) {
      console.error('Failed to generate blog posts:', error);
      alert('Failed to generate blog posts. Please check your API key and try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleToggleAutoGeneration = () => {
    const newState = !autoGenerationEnabled;
    setAutoGenerationEnabled(newState);
    localStorage.setItem('autoGenerationEnabled', newState.toString());
    
    if (newState) {
      // Schedule daily generation
      scheduleDailyBlogGeneration();
      alert('Auto-generation enabled! New posts will be generated daily.');
    } else {
      alert('Auto-generation disabled.');
    }
  };

  const handleManualDailyGeneration = () => {
    scheduleDailyBlogGeneration();
    loadGeneratedPosts();
    checkLastGeneration();
    alert('Daily generation triggered!');
  };

  const deletePost = (index) => {
    const posts = getAIGeneratedPosts();
    posts.splice(index, 1);
    localStorage.setItem('aiGeneratedPosts', JSON.stringify(posts));
    loadGeneratedPosts();
  };

  return (
    <>
      <Helmet>
        <title>Admin Panel | Taxed GmbH - AI Blog Management</title>
        <meta name="description" content="Manage AI-generated blog posts and content generation settings." />
      </Helmet>
      
      <div className="bg-light-gray-bg-1 min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl lg:text-5xl font-extrabold text-dark-gray mb-4 tracking-tight">
              AI Blog Management
            </h1>
            <p className="text-xl text-dark-gray/80 max-w-3xl mx-auto">
              Generate and manage AI-powered blog content for Swiss tax insights.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Generation Controls */}
            <Card className="border-steel-blue/20 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="h-5 w-5 text-steel-blue" />
                  <span>Generate Content</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={handleGenerateSinglePost}
                  disabled={isGenerating}
                  className="w-full bg-steel-blue hover:bg-steel-blue/90"
                >
                  {isGenerating ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <FileText className="h-4 w-4 mr-2" />
                  )}
                  Generate Single Post
                </Button>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-dark-gray">
                    Number of Posts:
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={generationCount}
                    onChange={(e) => setGenerationCount(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-steel-blue"
                  />
                </div>

                <Button 
                  onClick={handleGenerateMultiplePosts}
                  disabled={isGenerating}
                  variant="outline"
                  className="w-full border-steel-blue text-steel-blue hover:bg-steel-blue hover:text-white"
                >
                  {isGenerating ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <RefreshCw className="h-4 w-4 mr-2" />
                  )}
                  Generate {generationCount} Posts
                </Button>
              </CardContent>
            </Card>

            {/* Auto Generation Settings */}
            <Card className="border-steel-blue/20 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5 text-steel-blue" />
                  <span>Auto Generation</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-dark-gray">Daily Auto-Generation</span>
                  <Button
                    onClick={handleToggleAutoGeneration}
                    variant={autoGenerationEnabled ? "default" : "outline"}
                    size="sm"
                    className={autoGenerationEnabled ? "bg-green-600 hover:bg-green-700" : ""}
                  >
                    {autoGenerationEnabled ? "Enabled" : "Disabled"}
                  </Button>
                </div>

                <Button 
                  onClick={handleManualDailyGeneration}
                  variant="outline"
                  className="w-full border-steel-blue text-steel-blue hover:bg-steel-blue hover:text-white"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Trigger Daily Generation
                </Button>

                {lastGeneration && (
                  <div className="text-sm text-dark-gray/70">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>Last generated: {new Date(lastGeneration).toLocaleDateString()}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card className="border-steel-blue/20 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-steel-blue" />
                  <span>Statistics</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-steel-blue">
                    {generatedPosts.length}
                  </div>
                  <div className="text-sm text-dark-gray/70">
                    AI-Generated Posts
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Total Posts:</span>
                    <span className="font-medium">{generatedPosts.length + 3}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Manual Posts:</span>
                    <span className="font-medium">3</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>AI Posts:</span>
                    <span className="font-medium">{generatedPosts.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Generated Posts List */}
          <Card className="border-steel-blue/20 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-steel-blue" />
                <span>AI-Generated Posts ({generatedPosts.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {generatedPosts.length === 0 ? (
                <div className="text-center py-8 text-dark-gray/60">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No AI-generated posts yet. Generate your first post to get started!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {generatedPosts.map((post, index) => (
                    <motion.div
                      key={post.slug}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-dark-gray mb-2">
                            {post.title}
                          </h3>
                          <p className="text-sm text-dark-gray/70 mb-2">
                            {post.summary}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-dark-gray/60">
                            <span>By: {post.author}</span>
                            <span>Date: {post.date}</span>
                            <span>Tags: {post.tags?.join(', ')}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <Button
                            onClick={() => deletePost(index)}
                            variant="outline"
                            size="sm"
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
