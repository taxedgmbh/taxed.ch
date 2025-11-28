import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { getPostBySlug, getRelatedPosts } from '@/data/blogPosts.js';
import { ArrowLeft, Calendar, User, Tag, Clock, BookOpen, Maximize2, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ShareButton from '@/components/ui/ShareButton';
import ImmersiveReader from '@/components/ui/ImmersiveReader';
import ReadAloud from '@/components/ui/ReadAloud';

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = getPostBySlug(slug);
  const relatedPosts = post ? getRelatedPosts(post, 3) : [];
  const [isImmersiveOpen, setIsImmersiveOpen] = React.useState(false);
  const [isReadAloudOpen, setIsReadAloudOpen] = React.useState(false);

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20">
        <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-4">Article not found</h1>
        <p className="mb-8 text-gray-600">Sorry, we couldn't find the blog post you're looking for.</p>
        <Button asChild>
          <Link to="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>
      </div>
    );
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Generate Article schema markup
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.summary,
    "image": post.imageUrl,
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Person",
      "name": post.author,
      "jobTitle": post.authorTitle
    },
    "publisher": {
      "@type": "Organization",
      "name": "Taxed GmbH",
      "logo": {
        "@type": "ImageObject",
        "url": "https://taxed.ch/images/og-taxed-logo.jpg"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://taxed.ch/blog/${post.slug}`
    },
    "articleSection": post.category,
    "keywords": post.tags.join(", "),
    "wordCount": post.content.split(' ').length,
    "articleBody": post.content.replace(/<[^>]*>/g, '').substring(0, 1000) + "..."
  };

  return (
    <>
      <Helmet>
        <title>{`${post.title} | Taxed GmbH Blog`}</title>
        <meta name="description" content={post.summary} />
        <meta name="keywords" content={post.tags.join(", ")} />
        <meta property="og:title" content={`${post.title} | Taxed GmbH Blog`} />
        <meta property="og:description" content={post.summary} />
        <meta property="og:image" content={post.imageUrl} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.author} />
        <meta property="article:section" content={post.category} />
        {post.tags.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        <link rel="canonical" href={`https://taxed.ch/blog/${post.slug}`} />

        {/* Article Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      </Helmet>
      
      <div className="bg-white py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-8">
                  <Link to="/blog" className="flex items-center text-steel-blue hover:underline mb-8">
                    <ArrowLeft size={16} className="mr-2" />
                    Back to all articles
                  </Link>
                  
                  {/* Article Meta */}
                  <div className="flex items-center space-x-4 mb-4">
                    <Badge variant="outline">{post.category}</Badge>
                    <Badge className={getDifficultyColor(post.difficulty)}>
                      {post.difficulty}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-dark-gray tracking-tight mb-6">
                    {post.title}
                  </h1>
                  
                  <div className="flex flex-wrap items-center justify-between mb-6">
                    <div className="flex flex-wrap items-center space-x-6 text-sm text-dark-gray/70">
                      <div className="flex items-center space-x-2">
                        <User size={16} />
                        <span>{post.author}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm">{post.authorTitle}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar size={16} />
                        <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setIsImmersiveOpen(true)}
                        className="flex items-center"
                      >
                        <Maximize2 className="w-4 h-4 mr-2" />
                        Immersive Reading
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setIsReadAloudOpen(true)}
                        className="flex items-center"
                      >
                        <Volume2 className="w-4 h-4 mr-2" />
                        Read Aloud
                      </Button>
                      <ShareButton post={post} />
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2 mb-8">
                    {post.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        <Tag size={12} className="mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Featured Image */}
                <div className="mb-12 rounded-lg overflow-hidden shadow-xl bg-gray-100">
                  <img  
                    className="w-full h-64 md:h-80 object-cover"
                    alt={post.imageAlt} 
                    src={post.imageUrl}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop';
                    }} />
                  <div className="magazine-caption">
                    {post.imageAlt}
                  </div>
                </div>

                {/* Article Summary */}
                <div className="mb-8 p-6 bg-gradient-to-r from-steel-blue/5 to-blue-600/5 rounded-xl border border-steel-blue/20">
                  <h3 className="text-lg font-semibold text-dark-gray mb-3">Article Summary</h3>
                  <p className="text-dark-gray/80 leading-relaxed">{post.summary}</p>
                </div>

                {/* Article Content */}
                <article 
                  className="magazine-article max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* CTA Section */}
                <div className="mt-16 text-center bg-gradient-to-r from-steel-blue/5 to-blue-600/5 p-8 rounded-2xl border border-steel-blue/20">
                  <h2 className="text-2xl font-bold text-dark-gray mb-4">Ready to Simplify Your Swiss Taxes?</h2>
                  <p className="text-dark-gray/80 mb-6 max-w-2xl mx-auto">
                    Let our experts handle the complexity. Choose a flat-rate package today and get peace of mind.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg">
                      <Link to="/store">
                        View Our Packages
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                      <Link to="/contact">
                        Get Free Consultation
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-8 space-y-6">
                {/* Author Card */}
                <Card className="border-steel-blue/20 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      About the Author
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-steel-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <User className="w-8 h-8 text-steel-blue" />
                      </div>
                      <h3 className="font-semibold text-dark-gray">{post.author}</h3>
                      <p className="text-sm text-gray-600 mb-3">{post.authorTitle}</p>
                      <p className="text-sm text-gray-500">
                        Expert in Swiss taxation with years of experience helping expats navigate complex tax situations.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Related Articles */}
                {relatedPosts.length > 0 && (
                  <Card className="border-steel-blue/20 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <BookOpen className="w-5 h-5 mr-2" />
                        Related Articles
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {relatedPosts.map((relatedPost) => (
                        <Link
                          key={relatedPost.slug}
                          to={`/blog/${relatedPost.slug}`}
                          className="block p-4 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-steel-blue/20"
                        >
                          <div className="flex space-x-3">
                            <img 
                              src={relatedPost.imageUrl} 
                              alt={relatedPost.imageAlt}
                              className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                              onError={(e) => {
                                e.target.src = 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop';
                              }}
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-dark-gray text-sm mb-1 line-clamp-2">
                                {relatedPost.title}
                              </h4>
                              <div className="flex items-center text-xs text-gray-500">
                                <Clock className="w-3 h-3 mr-1" />
                                {relatedPost.readTime}
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </CardContent>
                  </Card>
                )}

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
          </div>
        </div>
      </div>

      {/* Immersive Reader */}
      <ImmersiveReader 
        post={post} 
        isOpen={isImmersiveOpen} 
        onClose={() => setIsImmersiveOpen(false)} 
      />

      {/* Read Aloud */}
      <ReadAloud 
        post={post} 
        isOpen={isReadAloudOpen} 
        onClose={() => setIsReadAloudOpen(false)} 
      />
    </>
  );
};

export default BlogPostPage;