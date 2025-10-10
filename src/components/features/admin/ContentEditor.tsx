import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Save, 
  Eye, 
  Send, 
  Trash2, 
  Upload,
  Image,
  Link,
  Bold,
  Italic,
  List,
  Quote,
  Code,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  Settings,
  Calendar,
  Tag,
  User
} from 'lucide-react';

interface ContentEditorProps {
  initialContent?: {
    id?: string;
    title: string;
    content: string;
    excerpt: string;
    status: 'draft' | 'published' | 'archived';
    category: string;
    tags: string[];
    author: string;
    publishedAt?: string;
    featuredImage?: string;
    seoTitle?: string;
    seoDescription?: string;
  };
  onSave?: (content: any) => void;
  onPublish?: (content: any) => void;
  onPreview?: (content: any) => void;
  className?: string;
}

export const ContentEditor: React.FC<ContentEditorProps> = ({
  initialContent,
  onSave,
  onPublish,
  onPreview,
  className = ''
}) => {
  const [content, setContent] = useState({
    id: initialContent?.id || '',
    title: initialContent?.title || '',
    content: initialContent?.content || '',
    excerpt: initialContent?.excerpt || '',
    status: initialContent?.status || 'draft',
    category: initialContent?.category || '',
    tags: initialContent?.tags || [],
    author: initialContent?.author || '',
    publishedAt: initialContent?.publishedAt || '',
    featuredImage: initialContent?.featuredImage || '',
    seoTitle: initialContent?.seoTitle || '',
    seoDescription: initialContent?.seoDescription || ''
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [newTag, setNewTag] = useState('');

  const categories = [
    'Tax Tips',
    'Business Advice',
    'Swiss Law',
    'Personal Finance',
    'Investment',
    'Compliance',
    'News',
    'Tutorials'
  ];

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      onSave?.(content);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      onPublish?.({ ...content, status: 'published', publishedAt: new Date().toISOString() });
    } finally {
      setIsPublishing(false);
    }
  };

  const handlePreview = () => {
    setShowPreview(!showPreview);
    onPreview?.(content);
  };

  const addTag = () => {
    if (newTag.trim() && !content.tags.includes(newTag.trim())) {
      setContent(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setContent(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {content.id ? 'Edit Content' : 'Create New Content'}
            </h1>
            <p className="text-gray-600">
              Create and manage your content with our powerful editor
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={handlePreview}
              className="flex items-center space-x-2"
            >
              <Eye className="w-4 h-4" />
              <span>{showPreview ? 'Edit' : 'Preview'}</span>
            </Button>
            
            <Button
              variant="outline"
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Saving...' : 'Save Draft'}</span>
            </Button>
            
            <Button
              onClick={handlePublish}
              disabled={isPublishing}
              className="flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>{isPublishing ? 'Publishing...' : 'Publish'}</span>
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Editor */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="p-6">
            {/* Title */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <Input
                type="text"
                value={content.title}
                onChange={(e) => setContent(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter content title..."
                className="text-xl"
              />
            </div>

            {/* Content Editor */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Content
                </label>
                
                {/* Toolbar */}
                <div className="flex items-center space-x-2 border border-gray-300 rounded-lg p-1">
                  <Button variant="outline" size="sm" className="w-8 h-8 p-0">
                    <Bold className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="w-8 h-8 p-0">
                    <Italic className="w-4 h-4" />
                  </Button>
                  <div className="w-px h-6 bg-gray-300"></div>
                  <Button variant="outline" size="sm" className="w-8 h-8 p-0">
                    <AlignLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="w-8 h-8 p-0">
                    <AlignCenter className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="w-8 h-8 p-0">
                    <AlignRight className="w-4 h-4" />
                  </Button>
                  <div className="w-px h-6 bg-gray-300"></div>
                  <Button variant="outline" size="sm" className="w-8 h-8 p-0">
                    <List className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="w-8 h-8 p-0">
                    <Quote className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="w-8 h-8 p-0">
                    <Code className="w-4 h-4" />
                  </Button>
                  <div className="w-px h-6 bg-gray-300"></div>
                  <Button variant="outline" size="sm" className="w-8 h-8 p-0">
                    <Undo className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="w-8 h-8 p-0">
                    <Redo className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <textarea
                value={content.content}
                onChange={(e) => setContent(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Write your content here..."
                className="w-full h-96 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              />
            </div>

            {/* Excerpt */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Excerpt
              </label>
              <textarea
                value={content.excerpt}
                onChange={(e) => setContent(prev => ({ ...prev, excerpt: e.target.value }))}
                placeholder="Brief description of your content..."
                className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              />
            </div>

            {/* Featured Image */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Featured Image
              </label>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <Input
                    type="url"
                    value={content.featuredImage}
                    onChange={(e) => setContent(prev => ({ ...prev, featuredImage: e.target.value }))}
                    placeholder="Image URL..."
                  />
                </div>
                <Button variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Sidebar */}
        <motion.div variants={itemVariants} className="space-y-6">
          {/* Publish Settings */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Publish Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={content.status}
                  onChange={(e) => setContent(prev => ({ ...prev, status: e.target.value as any }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={content.category}
                  onChange={(e) => setContent(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Author
                </label>
                <Input
                  type="text"
                  value={content.author}
                  onChange={(e) => setContent(prev => ({ ...prev, author: e.target.value }))}
                  placeholder="Author name"
                />
              </div>

              {content.publishedAt && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Published At
                  </label>
                  <p className="text-sm text-gray-600">
                    {formatDate(content.publishedAt)}
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* Tags */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
            
            <div className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add tag..."
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                />
                <Button onClick={addTag} size="sm">
                  <Tag className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {content.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="flex items-center space-x-1">
                    <span>{tag}</span>
                    <button
                      onClick={() => removeTag(tag)}
                      className="ml-1 hover:text-red-600"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </Card>

          {/* SEO Settings */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SEO Title
                </label>
                <Input
                  type="text"
                  value={content.seoTitle}
                  onChange={(e) => setContent(prev => ({ ...prev, seoTitle: e.target.value }))}
                  placeholder="SEO optimized title..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SEO Description
                </label>
                <textarea
                  value={content.seoDescription}
                  onChange={(e) => setContent(prev => ({ ...prev, seoDescription: e.target.value }))}
                  placeholder="SEO description..."
                  className="w-full h-20 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                />
              </div>
            </div>
          </Card>

          {/* Actions */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
            
            <div className="space-y-3">
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full"
                variant="outline"
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save Draft'}
              </Button>
              
              <Button
                onClick={handlePublish}
                disabled={isPublishing}
                className="w-full"
              >
                <Send className="w-4 h-4 mr-2" />
                {isPublishing ? 'Publishing...' : 'Publish'}
              </Button>
              
              <Button
                variant="outline"
                className="w-full text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};





