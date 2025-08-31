import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { getBlogPosts } from '@/data/blogPosts.jsx';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BlogPostPage = () => {
  const { slug } = useParams();
  const blogPosts = getBlogPosts();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20">
        <h1 className="text-4xl font-bold mb-4">Post not found</h1>
        <p className="mb-8">Sorry, we couldn't find the blog post you're looking for.</p>
        <Button asChild>
          <Link to="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${post.title} | Taxed GmbH Blog`}</title>
        <meta name="description" content={post.summary} />
        <meta property="og:title" content={`${post.title} | Taxed GmbH Blog`} />
        <meta property="og:description" content={post.summary} />
      </Helmet>
      <div className="bg-white py-12 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-dark-gray tracking-tight mb-4">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center space-x-4 text-sm text-dark-gray/70">
                <div className="flex items-center space-x-2">
                  <User size={14} />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar size={14} />
                  <span>{post.formattedDate || new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-4">
                {post.tags.map(tag => (
                  <span key={tag} className="bg-warm-red-tint text-brand-red text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center">
                    <Tag size={12} className="mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="aspect-w-16 aspect-h-9 mb-12 rounded-lg overflow-hidden shadow-xl">
              <img  
                className="w-full h-full object-cover"
                alt={post.imageAlt || post.alt} 
                src={post.imageUrl || "https://images.unsplash.com/photo-1595872018818-97555653a011"} />
            </div>

            <article className="prose prose-lg max-w-none text-dark-gray/90 prose-h2:text-dark-gray prose-h2:font-bold prose-a:text-steel-blue hover:prose-a:underline">
              {post.content()}
            </article>

            <div className="mt-16 text-center bg-light-gray-bg-1 p-8 rounded-lg border border-steel-blue/20">
              <h2 className="text-2xl font-bold text-dark-gray mb-4">Ready to Simplify Your Swiss Taxes?</h2>
              <p className="text-dark-gray/80 mb-6 max-w-2xl mx-auto">
                Let our experts handle the complexity. Choose a flat-rate package today and get peace of mind.
              </p>
              <Button asChild size="lg">
                <Link to="/store">
                  View Our Packages
                </Link>
              </Button>
            </div>

          </motion.div>
        </div>
      </div>
    </>
  );
};

export default BlogPostPage;