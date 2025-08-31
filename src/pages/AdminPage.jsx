import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  RefreshCw, 
  Calendar, 
  FileText, 
  Settings, 
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2,
  Newspaper
} from 'lucide-react';
import { 
  generateBlogPost, 
  generateMultipleBlogPosts, 
  saveBlogPost, 
  getAIGeneratedPosts,
  getAIProviderInfo 
} from '../services/aiBlogGenerator';
import { createUniqueBlogImage } from '../services/imageService';

const AdminPage = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPosts, setGeneratedPosts] = useState([]);
  const [lastGeneration, setLastGeneration] = useState(null);
  const [autoGenerationEnabled, setAutoGenerationEnabled] = useState(false);
  const [generationCount, setGenerationCount] = useState(1);
  const [aiProviderInfo, setAiProviderInfo] = useState(null);
  const [autoGenerateNews, setAutoGenerateNews] = useState(false);

  useEffect(() => {
    console.log('AdminPage loaded successfully');
    
    // Load AI provider info
    try {
      const providerInfo = getAIProviderInfo();
      setAiProviderInfo(providerInfo);
    } catch (error) {
      console.error('Error loading AI provider info:', error);
    }
    
    // Load generated posts
    try {
      const posts = getAIGeneratedPosts();
      setGeneratedPosts(posts);
      console.log('Loaded posts:', posts.length);
    } catch (error) {
      console.error('Error loading posts:', error);
    }

    // Check last generation
    const lastGen = localStorage.getItem('lastBlogGeneration');
    setLastGeneration(lastGen);
    
    // Check auto-generation status
    const autoGen = localStorage.getItem('autoGenerationEnabled') === 'true';
    setAutoGenerationEnabled(autoGen);
    
    // Check news auto-generation status
    const autoNews = localStorage.getItem('autoGenerateNews') === 'true';
    setAutoGenerateNews(autoNews);
  }, []);

  const handleGenerateSinglePost = async () => {
    setIsGenerating(true);
    try {
      console.log('Starting single post generation...');
      console.log('Environment check:', {
        provider: import.meta.env.VITE_AI_PROVIDER || import.meta.env.REACT_APP_AI_PROVIDER,
        hasKey: !!(import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.REACT_APP_GEMINI_API_KEY)
      });
      
      const post = await generateBlogPost();
      const postWithImage = createUniqueBlogImage(post);
      saveBlogPost(postWithImage);
      
      // Update the posts list
      const updatedPosts = getAIGeneratedPosts();
      setGeneratedPosts(updatedPosts);
      
      alert(`Successfully generated: "${postWithImage.title}"`);
    } catch (error) {
      console.error('Failed to generate blog post:', error);
      alert(`Failed to generate blog post: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateMultiplePosts = async () => {
    setIsGenerating(true);
    try {
      console.log('Starting multiple post generation...');
      const posts = await generateMultipleBlogPosts(generationCount);
      
      // Save all posts with unique images
      posts.forEach(post => {
        const postWithImage = createUniqueBlogImage(post);
        saveBlogPost(postWithImage);
      });
      
      // Update the posts list
      const updatedPosts = getAIGeneratedPosts();
      setGeneratedPosts(updatedPosts);
      
      alert(`Successfully generated ${posts.length} posts!`);
    } catch (error) {
      console.error('Failed to generate blog posts:', error);
      alert(`Failed to generate blog posts: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleToggleAutoGeneration = () => {
    const newState = !autoGenerationEnabled;
    setAutoGenerationEnabled(newState);
    localStorage.setItem('autoGenerationEnabled', newState.toString());
    
    if (newState) {
      alert('Auto-generation enabled! New posts will be generated daily.');
    } else {
      alert('Auto-generation disabled.');
    }
  };

  const handleToggleNewsAutoGeneration = () => {
    const newState = !autoGenerateNews;
    setAutoGenerateNews(newState);
    localStorage.setItem('autoGenerateNews', newState.toString());
    
    if (newState) {
      alert('News auto-generation enabled! New articles will be generated daily.');
    } else {
      alert('News auto-generation disabled.');
    }
  };

  const handleManualDailyGeneration = async () => {
    try {
      const post = await generateBlogPost();
      const postWithImage = createUniqueBlogImage(post);
      saveBlogPost(postWithImage);
      
      // Update the posts list
      const updatedPosts = getAIGeneratedPosts();
      setGeneratedPosts(updatedPosts);
      
      // Update last generation time
      const now = new Date();
      localStorage.setItem('lastBlogGeneration', now.toDateString());
      setLastGeneration(now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }) + ' at ' + now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Europe/Zurich'
      }));
      
      alert(`Daily generation completed: "${postWithImage.title}" at ${postWithImage.formattedTime}`);
    } catch (error) {
      console.error('Failed to generate daily blog post:', error);
      alert(`Failed to generate daily blog post: ${error.message}`);
    }
  };

  const deletePost = (index) => {
    const posts = [...generatedPosts];
    posts.splice(index, 1);
    localStorage.setItem('aiGeneratedPosts', JSON.stringify(posts));
    setGeneratedPosts(posts);
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

            {/* AI Provider Info */}
            <Card className="border-steel-blue/20 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5 text-steel-blue" />
                  <span>AI Provider</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-steel-blue">
                    {aiProviderInfo ? aiProviderInfo.name : 'Loading...'}
                  </div>
                  <div className="text-sm text-dark-gray/70">
                    {aiProviderInfo?.free ? '🆓 Free' : '💰 Paid'}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs text-dark-gray/60">
                    <strong>Limits:</strong> {aiProviderInfo?.limits || 'Loading...'}
                  </div>
                  <div className="text-xs text-dark-gray/60">
                    <strong>Setup:</strong> {aiProviderInfo?.setup || 'Loading...'}
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-200">
                  <div className="text-xs text-dark-gray/60">
                    <strong>Current Provider:</strong> {import.meta.env.VITE_AI_PROVIDER || import.meta.env.REACT_APP_AI_PROVIDER || 'gemini'}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* News Auto-Generation Section */}
          <Card className="border-green-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Newspaper className="h-5 w-5 text-green-600" />
                <span>News Auto-Generation</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-dark-gray">Daily News Aggregation</h3>
                    <p className="text-sm text-dark-gray/70">
                      Automatically fetch and rewrite Swiss tax news from multiple sources daily
                    </p>
                  </div>
                  <Button
                    onClick={handleToggleNewsAutoGeneration}
                    variant={autoGenerateNews ? "default" : "outline"}
                    className={autoGenerateNews ? "bg-green-600 hover:bg-green-700" : ""}
                  >
                    {autoGenerateNews ? "Enabled" : "Disabled"}
                  </Button>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-dark-gray mb-2">Features:</h4>
                  <ul className="text-sm text-dark-gray/70 space-y-1">
                    <li>• Fetches news from Swiss government sources and major news outlets</li>
                    <li>• AI-powered rewriting to avoid plagiarism</li>
                    <li>• Proper source attribution and references</li>
                    <li>• Automatic categorization and tagging</li>
                    <li>• Daily updates with fresh content</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium text-dark-gray mb-2">Sources:</h4>
                  <ul className="text-sm text-dark-gray/70 space-y-1">
                    <li>• Swiss Federal Administration</li>
                    <li>• Swiss Federal Department of Finance</li>
                    <li>• Swiss Federal Tax Administration</li>
                    <li>• SwissInfo, Le Temps, NZZ</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

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
                      key={post.slug || index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-start space-x-4">
                            {post.imageUrl && (
                              <div className="flex-shrink-0">
                                <img 
                                  src={post.imageUrl} 
                                  alt={post.imageAlt || post.alt} 
                                  className="w-20 h-20 object-cover rounded-lg"
                                />
                              </div>
                            )}
                            <div className="flex-1">
                              <h3 className="font-semibold text-dark-gray mb-2">
                                {post.title}
                              </h3>
                              <p className="text-sm text-dark-gray/70 mb-2">
                                {post.summary}
                              </p>
                              <div className="flex items-center space-x-4 text-xs text-dark-gray/60">
                                <span>By: {post.author}</span>
                                <span>Date: {post.formattedDate || post.date}</span>
                                <span>Time: {post.formattedTime || 'N/A'}</span>
                                <span>Tags: {post.tags?.join(', ')}</span>
                              </div>
                            </div>
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
