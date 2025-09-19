/**
 * Blog-related type definitions
 * Defines types for blog posts, categories, and content management
 */

// Blog post structure
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  author: BlogAuthor;
  category: BlogCategory;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  publishedAt?: string;
  updatedAt: string;
  createdAt: string;
  readingTime: number;
  views: number;
  likes: number;
  comments: number;
  seo: BlogSEO;
  isFeatured: boolean;
  isPinned: boolean;
}

// Blog author
export interface BlogAuthor {
  id: string;
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  isActive: boolean;
}

// Blog category
export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  icon?: string;
  parentId?: string;
  postCount: number;
  isActive: boolean;
}

// Blog tag
export interface BlogTag {
  id: string;
  name: string;
  slug: string;
  postCount: number;
  color?: string;
}

// Blog SEO
export interface BlogSEO {
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: 'summary' | 'summary_large_image';
}

// Blog comment
export interface BlogComment {
  id: string;
  postId: string;
  author: {
    name: string;
    email: string;
    website?: string;
  };
  content: string;
  status: 'pending' | 'approved' | 'spam' | 'rejected';
  parentId?: string;
  replies: BlogComment[];
  createdAt: string;
  updatedAt: string;
  isModerated: boolean;
}

// Blog filter options
export interface BlogFilters {
  category?: string;
  tags?: string[];
  author?: string;
  status?: 'draft' | 'published' | 'archived';
  dateFrom?: string;
  dateTo?: string;
  search?: string;
  sortBy?: 'date' | 'title' | 'views' | 'likes';
  sortOrder?: 'asc' | 'desc';
}

// Blog statistics
export interface BlogStats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  averageReadingTime: number;
  topCategories: Array<{
    category: BlogCategory;
    postCount: number;
  }>;
  topTags: Array<{
    tag: BlogTag;
    postCount: number;
  }>;
  monthlyStats: Array<{
    month: string;
    posts: number;
    views: number;
  }>;
}

// Blog newsletter
export interface BlogNewsletter {
  id: string;
  email: string;
  name?: string;
  isActive: boolean;
  subscribedAt: string;
  unsubscribedAt?: string;
  preferences: {
    categories: string[];
    frequency: 'daily' | 'weekly' | 'monthly';
  };
}

// Blog search result
export interface BlogSearchResult {
  posts: BlogPost[];
  categories: BlogCategory[];
  tags: BlogTag[];
  authors: BlogAuthor[];
  totalResults: number;
  searchQuery: string;
  suggestions: string[];
}
