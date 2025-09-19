/**
 * Blog Service
 * Handles blog posts, categories, comments, and content management
 */

import { apiService } from './api';
import type {
  BlogPost,
  BlogAuthor,
  BlogCategory,
  BlogTag,
  BlogComment,
  BlogFilters,
  BlogStats,
  BlogNewsletter,
  BlogSearchResult,
  BlogSEO
} from '@/types/blog';

class BlogService {
  private cache: Map<string, any> = new Map();
  private cacheExpiry: Map<string, number> = new Map();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  /**
   * Get cached data or fetch from API
   */
  private async getCachedData<T>(
    key: string,
    fetcher: () => Promise<T>,
    useCache: boolean = true
  ): Promise<T> {
    if (useCache && this.cache.has(key)) {
      const expiry = this.cacheExpiry.get(key);
      if (expiry && Date.now() < expiry) {
        return this.cache.get(key);
      }
    }

    const data = await fetcher();
    
    if (useCache) {
      this.cache.set(key, data);
      this.cacheExpiry.set(key, Date.now() + this.CACHE_DURATION);
    }
    
    return data;
  }

  /**
   * Clear cache
   */
  public clearCache(): void {
    this.cache.clear();
    this.cacheExpiry.clear();
  }

  /**
   * Get all blog posts with filters
   */
  public async getPosts(filters: BlogFilters = {}): Promise<BlogPost[]> {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters.category) queryParams.append('category', filters.category);
      if (filters.tags?.length) queryParams.append('tags', filters.tags.join(','));
      if (filters.author) queryParams.append('author', filters.author);
      if (filters.status) queryParams.append('status', filters.status);
      if (filters.dateFrom) queryParams.append('dateFrom', filters.dateFrom);
      if (filters.dateTo) queryParams.append('dateTo', filters.dateTo);
      if (filters.search) queryParams.append('search', filters.search);
      if (filters.sortBy) queryParams.append('sortBy', filters.sortBy);
      if (filters.sortOrder) queryParams.append('sortOrder', filters.sortOrder);

      const cacheKey = `posts_${queryParams.toString()}`;
      
      return this.getCachedData(cacheKey, async () => {
        const response = await apiService.get<BlogPost[]>(`/blog/posts?${queryParams.toString()}`);
        
        if (response.success && response.data) {
          return response.data;
        }
        
        throw new Error(response.error || 'Failed to fetch blog posts');
      });
    } catch (error) {
      console.error('Get posts error:', error);
      throw error;
    }
  }

  /**
   * Get single blog post by slug
   */
  public async getPost(slug: string): Promise<BlogPost> {
    try {
      const cacheKey = `post_${slug}`;
      
      return this.getCachedData(cacheKey, async () => {
        const response = await apiService.get<BlogPost>(`/blog/posts/${slug}`);
        
        if (response.success && response.data) {
          return response.data;
        }
        
        throw new Error(response.error || 'Blog post not found');
      });
    } catch (error) {
      console.error('Get post error:', error);
      throw error;
    }
  }

  /**
   * Get featured blog posts
   */
  public async getFeaturedPosts(limit: number = 3): Promise<BlogPost[]> {
    try {
      const cacheKey = `featured_posts_${limit}`;
      
      return this.getCachedData(cacheKey, async () => {
        const response = await apiService.get<BlogPost[]>(`/blog/posts/featured?limit=${limit}`);
        
        if (response.success && response.data) {
          return response.data;
        }
        
        throw new Error(response.error || 'Failed to fetch featured posts');
      });
    } catch (error) {
      console.error('Get featured posts error:', error);
      throw error;
    }
  }

  /**
   * Get related blog posts
   */
  public async getRelatedPosts(postId: string, limit: number = 3): Promise<BlogPost[]> {
    try {
      const response = await apiService.get<BlogPost[]>(`/blog/posts/${postId}/related?limit=${limit}`);
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.error || 'Failed to fetch related posts');
    } catch (error) {
      console.error('Get related posts error:', error);
      throw error;
    }
  }

  /**
   * Create new blog post
   */
  public async createPost(post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'likes' | 'comments'>): Promise<BlogPost> {
    try {
      const response = await apiService.post<BlogPost>('/blog/posts', post);
      
      if (response.success && response.data) {
        this.clearCache();
        return response.data;
      }
      
      throw new Error(response.error || 'Failed to create blog post');
    } catch (error) {
      console.error('Create post error:', error);
      throw error;
    }
  }

  /**
   * Update blog post
   */
  public async updatePost(id: string, updates: Partial<BlogPost>): Promise<BlogPost> {
    try {
      const response = await apiService.put<BlogPost>(`/blog/posts/${id}`, updates);
      
      if (response.success && response.data) {
        this.clearCache();
        return response.data;
      }
      
      throw new Error(response.error || 'Failed to update blog post');
    } catch (error) {
      console.error('Update post error:', error);
      throw error;
    }
  }

  /**
   * Delete blog post
   */
  public async deletePost(id: string): Promise<void> {
    try {
      const response = await apiService.delete(`/blog/posts/${id}`);
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to delete blog post');
      }
      
      this.clearCache();
    } catch (error) {
      console.error('Delete post error:', error);
      throw error;
    }
  }

  /**
   * Get blog categories
   */
  public async getCategories(): Promise<BlogCategory[]> {
    try {
      const cacheKey = 'categories';
      
      return this.getCachedData(cacheKey, async () => {
        const response = await apiService.get<BlogCategory[]>('/blog/categories');
        
        if (response.success && response.data) {
          return response.data;
        }
        
        throw new Error(response.error || 'Failed to fetch categories');
      });
    } catch (error) {
      console.error('Get categories error:', error);
      throw error;
    }
  }

  /**
   * Get blog tags
   */
  public async getTags(): Promise<BlogTag[]> {
    try {
      const cacheKey = 'tags';
      
      return this.getCachedData(cacheKey, async () => {
        const response = await apiService.get<BlogTag[]>('/blog/tags');
        
        if (response.success && response.data) {
          return response.data;
        }
        
        throw new Error(response.error || 'Failed to fetch tags');
      });
    } catch (error) {
      console.error('Get tags error:', error);
      throw error;
    }
  }

  /**
   * Get blog authors
   */
  public async getAuthors(): Promise<BlogAuthor[]> {
    try {
      const cacheKey = 'authors';
      
      return this.getCachedData(cacheKey, async () => {
        const response = await apiService.get<BlogAuthor[]>('/blog/authors');
        
        if (response.success && response.data) {
          return response.data;
        }
        
        throw new Error(response.error || 'Failed to fetch authors');
      });
    } catch (error) {
      console.error('Get authors error:', error);
      throw error;
    }
  }

  /**
   * Get blog comments for a post
   */
  public async getComments(postId: string): Promise<BlogComment[]> {
    try {
      const response = await apiService.get<BlogComment[]>(`/blog/posts/${postId}/comments`);
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.error || 'Failed to fetch comments');
    } catch (error) {
      console.error('Get comments error:', error);
      throw error;
    }
  }

  /**
   * Add comment to blog post
   */
  public async addComment(postId: string, comment: Omit<BlogComment, 'id' | 'createdAt' | 'updatedAt' | 'replies'>): Promise<BlogComment> {
    try {
      const response = await apiService.post<BlogComment>(`/blog/posts/${postId}/comments`, comment);
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.error || 'Failed to add comment');
    } catch (error) {
      console.error('Add comment error:', error);
      throw error;
    }
  }

  /**
   * Update comment
   */
  public async updateComment(commentId: string, updates: Partial<BlogComment>): Promise<BlogComment> {
    try {
      const response = await apiService.put<BlogComment>(`/blog/comments/${commentId}`, updates);
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.error || 'Failed to update comment');
    } catch (error) {
      console.error('Update comment error:', error);
      throw error;
    }
  }

  /**
   * Delete comment
   */
  public async deleteComment(commentId: string): Promise<void> {
    try {
      const response = await apiService.delete(`/blog/comments/${commentId}`);
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to delete comment');
      }
    } catch (error) {
      console.error('Delete comment error:', error);
      throw error;
    }
  }

  /**
   * Like blog post
   */
  public async likePost(postId: string): Promise<{ likes: number }> {
    try {
      const response = await apiService.post<{ likes: number }>(`/blog/posts/${postId}/like`);
      
      if (response.success && response.data) {
        this.clearCache();
        return response.data;
      }
      
      throw new Error(response.error || 'Failed to like post');
    } catch (error) {
      console.error('Like post error:', error);
      throw error;
    }
  }

  /**
   * Track post view
   */
  public async trackView(postId: string): Promise<void> {
    try {
      await apiService.post(`/blog/posts/${postId}/view`);
    } catch (error) {
      console.error('Track view error:', error);
      // Don't throw error for view tracking
    }
  }

  /**
   * Search blog posts
   */
  public async searchPosts(query: string, filters: BlogFilters = {}): Promise<BlogSearchResult> {
    try {
      const searchParams = new URLSearchParams();
      searchParams.append('q', query);
      
      if (filters.category) searchParams.append('category', filters.category);
      if (filters.tags?.length) searchParams.append('tags', filters.tags.join(','));
      if (filters.author) searchParams.append('author', filters.author);
      if (filters.dateFrom) searchParams.append('dateFrom', filters.dateFrom);
      if (filters.dateTo) searchParams.append('dateTo', filters.dateTo);

      const response = await apiService.get<BlogSearchResult>(`/blog/search?${searchParams.toString()}`);
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.error || 'Search failed');
    } catch (error) {
      console.error('Search posts error:', error);
      throw error;
    }
  }

  /**
   * Get blog statistics
   */
  public async getStats(): Promise<BlogStats> {
    try {
      const cacheKey = 'blog_stats';
      
      return this.getCachedData(cacheKey, async () => {
        const response = await apiService.get<BlogStats>('/blog/stats');
        
        if (response.success && response.data) {
          return response.data;
        }
        
        throw new Error(response.error || 'Failed to fetch blog stats');
      });
    } catch (error) {
      console.error('Get blog stats error:', error);
      throw error;
    }
  }

  /**
   * Subscribe to newsletter
   */
  public async subscribeNewsletter(email: string, name?: string, preferences?: BlogNewsletter['preferences']): Promise<BlogNewsletter> {
    try {
      const response = await apiService.post<BlogNewsletter>('/blog/newsletter/subscribe', {
        email,
        name,
        preferences
      });
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.error || 'Newsletter subscription failed');
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      throw error;
    }
  }

  /**
   * Unsubscribe from newsletter
   */
  public async unsubscribeNewsletter(email: string): Promise<void> {
    try {
      const response = await apiService.post('/blog/newsletter/unsubscribe', { email });
      
      if (!response.success) {
        throw new Error(response.error || 'Newsletter unsubscription failed');
      }
    } catch (error) {
      console.error('Newsletter unsubscription error:', error);
      throw error;
    }
  }

  /**
   * Get RSS feed
   */
  public async getRSSFeed(): Promise<string> {
    try {
      const response = await apiService.get<string>('/blog/rss');
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.error || 'Failed to fetch RSS feed');
    } catch (error) {
      console.error('Get RSS feed error:', error);
      throw error;
    }
  }

  /**
   * Generate SEO metadata for blog post
   */
  public generateSEOMetadata(post: BlogPost): BlogSEO {
    return {
      metaTitle: post.seo.metaTitle || post.title,
      metaDescription: post.seo.metaDescription || post.excerpt,
      metaKeywords: post.seo.metaKeywords || post.tags,
      canonicalUrl: post.seo.canonicalUrl || `/blog/${post.slug}`,
      ogTitle: post.seo.ogTitle || post.title,
      ogDescription: post.seo.ogDescription || post.excerpt,
      ogImage: post.seo.ogImage || post.featuredImage,
      twitterCard: post.seo.twitterCard || 'summary_large_image'
    };
  }

  /**
   * Get popular posts
   */
  public async getPopularPosts(limit: number = 5): Promise<BlogPost[]> {
    try {
      const cacheKey = `popular_posts_${limit}`;
      
      return this.getCachedData(cacheKey, async () => {
        const response = await apiService.get<BlogPost[]>(`/blog/posts/popular?limit=${limit}`);
        
        if (response.success && response.data) {
          return response.data;
        }
        
        throw new Error(response.error || 'Failed to fetch popular posts');
      });
    } catch (error) {
      console.error('Get popular posts error:', error);
      throw error;
    }
  }

  /**
   * Get recent posts
   */
  public async getRecentPosts(limit: number = 5): Promise<BlogPost[]> {
    try {
      const cacheKey = `recent_posts_${limit}`;
      
      return this.getCachedData(cacheKey, async () => {
        const response = await apiService.get<BlogPost[]>(`/blog/posts/recent?limit=${limit}`);
        
        if (response.success && response.data) {
          return response.data;
        }
        
        throw new Error(response.error || 'Failed to fetch recent posts');
      });
    } catch (error) {
      console.error('Get recent posts error:', error);
      throw error;
    }
  }
}

// Create singleton instance
export const blogService = new BlogService();

// Export the class for custom instances
export { BlogService };
