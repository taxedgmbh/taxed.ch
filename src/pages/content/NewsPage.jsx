import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Search, RefreshCw, ExternalLink, Calendar, Tag, User, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  fetchSwissTaxNews,
  runDailyNewsAggregation,
  getRewrittenNews,
  scheduleDailyNewsUpdate
} from '@/services/newsService';

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const categories = [
    { id: 'all', name: 'All News', icon: '📰' },
    { id: 'government', name: 'Government', icon: '🏛️' },
    { id: 'tax-policy', name: 'Tax Policy', icon: '📋' },
    { id: 'tax-law', name: 'Tax Law', icon: '⚖️' },
    { id: 'news', name: 'General News', icon: '📢' },
    { id: 'business', name: 'Business', icon: '💼' }
  ];

  useEffect(() => {
    loadNews();
    // Schedule daily news updates
    scheduleDailyNewsUpdate();
  }, []);

  const loadNews = async () => {
    setLoading(true);
    try {
      // Get rewritten news from local storage
      const rewrittenNews = getRewrittenNews();
      
      if (rewrittenNews.length === 0) {
        // If no rewritten news exists, fetch from service
        const newsData = await fetchSwissTaxNews();
        setNews(Array.isArray(newsData) ? newsData : []);
      } else {
        setNews(rewrittenNews);
      }
      
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error loading news:', error);
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateNews = async () => {
    setIsGenerating(true);
    try {
      await runDailyNewsAggregation();
      await loadNews();
    } catch (error) {
      // Error handled silently in production
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRefresh = () => {
    loadNews();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryIcon = (category) => {
    const categoryObj = categories.find(cat => cat.id === category);
    return categoryObj ? categoryObj.icon : '📰';
  };

  const filteredNews = news.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (article.content && article.content.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Helmet>
        <title>Swiss Tax News & Updates | Taxed GmbH</title>
        <meta name="description" content="Stay updated with the latest Swiss tax news, policy changes, and regulatory updates. AI-powered news aggregation with expert analysis." />
        <meta name="keywords" content="Swiss tax news, tax updates, Swiss tax law, tax policy, Switzerland tax changes" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-steel-blue to-blue-600 text-white">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Swiss Tax News & Updates
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Stay informed with the latest Swiss tax developments, policy changes, and expert analysis
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  onClick={handleGenerateNews}
                  disabled={isGenerating}
                  className="bg-white text-steel-blue hover:bg-blue-50 px-8 py-3 text-lg font-semibold"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                      Generating News...
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5 mr-2" />
                      Generate New Articles
                    </>
                  )}
                </Button>
                <Button 
                  onClick={handleRefresh}
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-steel-blue px-8 py-3 text-lg font-semibold"
                >
                  <RefreshCw className="w-5 h-5 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Controls Section */}
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Search */}
              <div className="flex-1 w-full lg:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search news articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-3 w-full lg:w-80"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                    className="flex items-center gap-2"
                  >
                    <span>{category.icon}</span>
                    {category.name}
                  </Button>
                ))}
              </div>

              {/* Last Updated */}
              {lastUpdated && (
                <div className="text-sm text-gray-600 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Last updated: {formatDate(lastUpdated)} at {formatTime(lastUpdated)}
                </div>
              )}
            </div>
          </div>

          {/* News Grid */}
          {loading ? (
            <div className="text-center py-12">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-steel-blue" />
              <p className="text-gray-600">Loading news articles...</p>
            </div>
          ) : filteredNews.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
                <div className="text-6xl mb-4">📰</div>
                <h3 className="text-xl font-semibold mb-2">No news articles found</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm || selectedCategory !== 'all' 
                    ? 'Try adjusting your search or filter criteria.'
                    : 'Generate some news articles to get started.'
                  }
                </p>
                {!searchTerm && selectedCategory === 'all' && (
                  <Button onClick={handleGenerateNews} className="bg-steel-blue hover:bg-blue-600">
                    Generate News Articles
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNews.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-steel-blue to-blue-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-xl mb-8 text-blue-100">
              Get the latest Swiss tax news and updates delivered to your inbox
            </p>
            <div className="max-w-2xl mx-auto">
              {/* HubSpot Newsletter Signup Form */}
              <div className="hubspot-newsletter-container bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <iframe 
                  src="https://share-eu1.hsforms.com/1uITtAEHOS8OOaBP67HZnYQ2ds4ox"
                  width="100%"
                  height="300"
                  frameBorder="0"
                  scrolling="no"
                  title="Taxed GmbH Newsletter Signup - News"
                  className="border-0 rounded-lg"
                  style={{ minHeight: '300px' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const NewsCard = ({ article }) => {
  const [showFullContent, setShowFullContent] = useState(false);

  return (
    <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {/* Image */}
      {article.image && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={article.image}
            alt={article.imageAlt || article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <Badge className="bg-steel-blue text-white">
              {getCategoryIcon(article.category)} {article.category}
            </Badge>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Date and Source */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {formatDate(article.publishedAt)}
          </div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            {article.source}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {article.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-3">
          {article.description}
        </p>

        {/* Full Content (if available) */}
        {article.content && (
          <div className="mb-4">
            {showFullContent ? (
              <div className="text-gray-700 text-sm leading-relaxed">
                <div dangerouslySetInnerHTML={{ __html: article.content }} />
              </div>
            ) : (
              <Button
                variant="link"
                onClick={() => setShowFullContent(true)}
                className="p-0 h-auto text-steel-blue hover:text-blue-600"
              >
                Read full article
              </Button>
            )}
          </div>
        )}

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="text-sm text-gray-500">
            {article.isRewritten ? (
              <span className="flex items-center gap-1">
                🤖 AI Rewritten
              </span>
            ) : (
              <span className="flex items-center gap-1">
                📰 Original Source
              </span>
            )}
          </div>
          
          {article.originalUrl && (
            <Button 
              variant="outline" 
              size="sm"
              className="border-steel-blue text-steel-blue hover:bg-steel-blue hover:text-white"
              onClick={() => {
                try {
                  if (article.originalUrl && article.originalUrl !== '#' && article.originalUrl.startsWith('http')) {
                    window.open(article.originalUrl, '_blank');
                  } else {
                    alert('This is a demonstration article. In a real implementation, this would link to the actual news source.');
                  }
                } catch (error) {
                  console.error('Error opening URL:', error);
                  alert('Unable to open the source link. Please try again later.');
                }
              }}
            >
              View Source
              <ExternalLink className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default NewsPage;
