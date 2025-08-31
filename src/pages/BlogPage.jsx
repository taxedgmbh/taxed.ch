import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogPosts } from '@/data/blogPosts.jsx';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Calendar, User } from 'lucide-react';

const BlogPostCard = ({ post, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full flex flex-col overflow-hidden card-hover border-steel-blue/20 shadow-lg bg-light-gray-bg-1">
        <div className="overflow-hidden">
          <img  
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            alt={post.alt} src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
        </div>
        <CardHeader>
          <CardTitle className="text-xl font-bold text-dark-gray leading-tight">
            <Link to={`/blog/${post.slug}`} className="hover:text-steel-blue transition-colors">
              {post.title}
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-dark-gray/80">{post.summary}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center text-sm text-dark-gray/60 border-t border-steel-blue/10 pt-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <User size={14} />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar size={14} />
              <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>
          <Link to={`/blog/${post.slug}`} className="flex items-center text-steel-blue hover:underline">
            Read More <ArrowRight size={16} className="ml-1" />
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const BlogPage = () => {
  return (
    <>
      <Helmet>
        <title>Blog | Taxed GmbH - Swiss Tax Insights for Expats</title>
        <meta name="description" content="Explore articles and guides on Swiss taxes for expats. Learn about Quellensteuer, Pillar 3a, real estate tax, and more from the experts at Taxed GmbH." />
        <meta property="og:title" content="Blog | Taxed GmbH - Swiss Tax Insights for Expats" />
        <meta property="og:description" content="Explore articles and guides on Swiss taxes for expats. Learn about Quellensteuer, Pillar 3a, real estate tax, and more from the experts at Taxed GmbH." />
      </Helmet>
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl lg:text-5xl font-extrabold text-dark-gray mb-4 tracking-tight">
              Tax Insights for Swiss Expats
            </h1>
            <p className="text-xl text-dark-gray/80 max-w-3xl mx-auto">
              Your expert resource for navigating the complexities of the Swiss tax system.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <BlogPostCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPage;