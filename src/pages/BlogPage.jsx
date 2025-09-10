import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getBlogPosts, getFeaturedPosts, blogCategories, getPopularTags, searchPosts } from '@/data/blogPosts.js';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Calendar, 
  User, 
  Search, 
  Filter, 
  Clock, 
  Star, 
  TrendingUp,
  BookOpen,
  Tag,
  ChevronDown,
  X
} from 'lucide-react';

const BlogPostCard = ({ post, index, featured = false }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={featured ? 'md:col-span-2' : ''}
    >
      <Card className={`h-full flex flex-col overflow-hidden card-hover border-steel-blue/20 shadow-lg bg-white group ${
        featured ? 'border-2 border-steel-blue/30' : ''
      }`}>
        <div className="relative overflow-hidden">
          <img  
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            alt={post.imageAlt} 
            src={post.imageUrl} />
          {featured && (
            <div className="absolute top-4 left-4">
              <Badge className="bg-steel-blue text-white">
                <Star className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            </div>
          )}
          <div className="absolute top-4 right-4">
            <Badge className={getDifficultyColor(post.difficulty)}>
              {post.difficulty}
            </Badge>
          </div>
        </div>
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <Badge variant="outline" className="text-xs">
              {post.category}
            </Badge>
            <div className="flex items-center text-xs text-gray-500">
              <Clock className="w-3 h-3 mr-1" />
              {post.readTime}
            </div>
          </div>
          <CardTitle className={`font-bold text-dark-gray leading-tight ${
            featured ? 'text-2xl' : 'text-xl'
          }`}>
            <Link to={`/blog/${post.slug}`} className="hover:text-steel-blue transition-colors">
              {post.title}
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-dark-gray/80 mb-4">{post.summary}</p>
          <div className="flex flex-wrap gap-1">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                <Tag className="w-2 h-2 mr-1" />
                {tag}
              </Badge>
            ))}
            {post.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{post.tags.length - 3} more
              </Badge>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center text-sm text-dark-gray/60 border-t border-steel-blue/10 pt-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <User size={14} />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar size={14} />
              <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
            </div>
          </div>
          <Link to={`/blog/${post.slug}`} className="flex items-center text-steel-blue hover:underline font-medium">
            Read More <ArrowRight size={16} className="ml-1" />
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  
  const allPosts = getBlogPosts();
  const featuredPosts = getFeaturedPosts();
  const popularTags = getPopularTags();
  
  // Filter posts based on search and category
  const filteredPosts = useMemo(() => {
    let posts = allPosts;
    
    // Filter by category
    if (selectedCategory !== 'all') {
      posts = posts.filter(post => post.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      posts = searchPosts(searchQuery);
      if (selectedCategory !== 'all') {
        posts = posts.filter(post => post.category === selectedCategory);
      }
    }
    
    return posts;
  }, [searchQuery, selectedCategory, allPosts]);
  
  return (
    <>
      <Helmet>
        <title>Swiss Tax Blog | Taxed GmbH - Expert Insights for Expats 2025</title>
        <meta name="description" content="Comprehensive Swiss tax blog with expert insights for expats. Learn about Quellensteuer, Pillar 3a, real estate tax, crypto tax, and more from Swiss tax professionals." />
        <meta property="og:title" content="Swiss Tax Blog | Taxed GmbH - Expert Insights for Expats 2025" />
        <meta property="og:description" content="Comprehensive Swiss tax blog with expert insights for expats. Learn about Quellensteuer, Pillar 3a, real estate tax, crypto tax, and more from Swiss tax professionals." />
      </Helmet>
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-steel-blue via-blue-600 to-blue-800 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <BookOpen className="w-5 h-5 text-yellow-400 mr-2" />
              <span className="text-sm font-semibold">Expert Swiss Tax Insights • Updated Daily • 10+ Categories</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Swiss Tax Blog
              <br />
              <span className="text-yellow-400">Expert Insights for Expats</span>
            </h1>
            
            <p className="text-xl lg:text-2xl mb-12 text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Your comprehensive resource for <strong>Swiss tax knowledge</strong>. 
              From Quellensteuer to crypto tax, get expert insights from certified Swiss tax professionals.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search articles, topics, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg bg-white/90 backdrop-blur-sm border-0 rounded-2xl shadow-xl"
                />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">{allPosts.length}+</div>
                <div className="text-sm text-blue-200">Expert Articles</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">{blogCategories.length - 1}</div>
                <div className="text-sm text-blue-200">Tax Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">2025</div>
                <div className="text-sm text-blue-200">Updated Content</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">15+</div>
                <div className="text-sm text-blue-200">Years Experience</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Articles */}
      {!searchQuery && selectedCategory === 'all' && (
        <section className="py-16 bg-light-gray-bg-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-dark-gray mb-4">
                Featured Articles
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our most popular and comprehensive guides to Swiss taxation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post, index) => (
                <BlogPostCard key={post.slug} post={post} index={index} featured={index === 0} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-1/4">
              <div className="sticky top-8 space-y-6">
                {/* Categories */}
                <Card className="border-steel-blue/20 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Filter className="w-5 h-5 mr-2" />
                      Categories
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {blogCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          selectedCategory === category.id
                            ? 'bg-steel-blue text-white'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span>{category.name}</span>
                          <Badge variant="secondary" className="text-xs">
                            {category.count}
                          </Badge>
                        </div>
                      </button>
                    ))}
                  </CardContent>
                </Card>

                {/* Popular Tags */}
                <Card className="border-steel-blue/20 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Popular Tags
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {popularTags.map(({ tag, count }) => (
                        <Badge 
                          key={tag} 
                          variant="outline" 
                          className="cursor-pointer hover:bg-steel-blue hover:text-white transition-colors"
                          onClick={() => setSearchQuery(tag)}
                        >
                          {tag} ({count})
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Newsletter Signup */}
                <Card className="border-green-200 shadow-lg bg-gradient-to-br from-green-50 to-blue-50">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-semibold text-dark-gray mb-2">Stay Updated</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Get the latest Swiss tax insights delivered to your inbox
                    </p>
                    <Button className="w-full bg-steel-blue hover:bg-blue-700 text-white">
                      Subscribe to Newsletter
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:w-3/4">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-dark-gray">
                    {searchQuery ? `Search Results for "${searchQuery}"` : 
                     selectedCategory !== 'all' ? `${selectedCategory} Articles` : 
                     'All Articles'}
                  </h2>
                  <p className="text-gray-600">
                    {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
                  </p>
                </div>
                {(searchQuery || selectedCategory !== 'all') && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="flex items-center"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Clear Filters
                  </Button>
                )}
              </div>

              {/* Articles Grid */}
              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredPosts.map((post, index) => (
              <BlogPostCard key={post.slug} post={post} index={index} />
            ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No articles found</h3>
                  <p className="text-gray-500 mb-6">
                    Try adjusting your search terms or browse our categories
                  </p>
                  <Button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    variant="outline"
                  >
                    View All Articles
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPage;