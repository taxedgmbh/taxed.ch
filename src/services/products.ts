/**
 * Products Service
 * Handles product management, inventory, variants, and e-commerce operations
 */

import { apiService } from './api';
import { productsCache } from '@/utils/CacheManager';
import type {
  Product,
  ProductImage,
  ProductCategory,
  ProductInventory,
  ProductVariant,
  ProductAttribute,
  ProductFilter,
  ProductReview,
  ProductAnalytics,
  ProductBundle,
  ProductDimensions,
  ProductSEO
} from '@/types/products';

class ProductsService {
  /**
   * Clear cache
   */
  public clearCache(): void {
    productsCache.clear();
  }

  /**
   * Get all products with filters
   */
  public async getProducts(filters: ProductFilter = {}): Promise<Product[]> {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters.category) queryParams.append('category', filters.category);
      if (filters.tags?.length) queryParams.append('tags', filters.tags.join(','));
      if (filters.priceMin !== undefined) queryParams.append('priceMin', filters.priceMin.toString());
      if (filters.priceMax !== undefined) queryParams.append('priceMax', filters.priceMax.toString());
      if (filters.inStock !== undefined) queryParams.append('inStock', filters.inStock.toString());
      if (filters.attributes) {
        Object.entries(filters.attributes).forEach(([key, values]) => {
          queryParams.append(`attributes.${key}`, values.join(','));
        });
      }
      if (filters.search) queryParams.append('search', filters.search);
      if (filters.sortBy) queryParams.append('sortBy', filters.sortBy);
      if (filters.sortOrder) queryParams.append('sortOrder', filters.sortOrder);

      const cacheKey = `products_${queryParams.toString()}`;
      
      return productsCache.getOrFetch(cacheKey, async () => {
        const response = await apiService.get<Product[]>(`/products?${queryParams.toString()}`);
        
        if (response.success && response.data) {
          return response.data;
        }
        
        throw new Error(response.error || 'Failed to fetch products');
      });
    } catch (error) {
      console.error('Get products error:', error);
      throw error;
    }
  }

  /**
   * Get single product by slug
   */
  public async getProduct(slug: string): Promise<Product> {
    try {
      const cacheKey = `product_${slug}`;
      
      return productsCache.getOrFetch(cacheKey, async () => {
        const response = await apiService.get<Product>(`/products/${slug}`);
        
        if (response.success && response.data) {
          return response.data;
        }
        
        throw new Error(response.error || 'Product not found');
      });
    } catch (error) {
      console.error('Get product error:', error);
      throw error;
    }
  }

  /**
   * Get product by ID
   */
  public async getProductById(id: string): Promise<Product> {
    try {
      const cacheKey = `product_id_${id}`;
      
      return productsCache.getOrFetch(cacheKey, async () => {
        const response = await apiService.get<Product>(`/products/id/${id}`);
        
        if (response.success && response.data) {
          return response.data;
        }
        
        throw new Error(response.error || 'Product not found');
      });
    } catch (error) {
      console.error('Get product by ID error:', error);
      throw error;
    }
  }

  /**
   * Get featured products
   */
  public async getFeaturedProducts(limit: number = 8): Promise<Product[]> {
    try {
      const cacheKey = `featured_products_${limit}`;
      
      return productsCache.getOrFetch(cacheKey, async () => {
        const response = await apiService.get<Product[]>(`/products/featured?limit=${limit}`);
        
        if (response.success && response.data) {
          return response.data;
        }
        
        throw new Error(response.error || 'Failed to fetch featured products');
      });
    } catch (error) {
      console.error('Get featured products error:', error);
      throw error;
    }
  }

  /**
   * Get related products
   */
  public async getRelatedProducts(productId: string, limit: number = 4): Promise<Product[]> {
    try {
      const response = await apiService.get<Product[]>(`/products/${productId}/related?limit=${limit}`);
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.error || 'Failed to fetch related products');
    } catch (error) {
      console.error('Get related products error:', error);
      throw error;
    }
  }

  /**
   * Search products
   */
  public async searchProducts(query: string, filters: ProductFilter = {}): Promise<Product[]> {
    try {
      const searchParams = new URLSearchParams();
      searchParams.append('q', query);
      
      if (filters.category) searchParams.append('category', filters.category);
      if (filters.tags?.length) searchParams.append('tags', filters.tags.join(','));
      if (filters.priceMin !== undefined) searchParams.append('priceMin', filters.priceMin.toString());
      if (filters.priceMax !== undefined) searchParams.append('priceMax', filters.priceMax.toString());
      if (filters.inStock !== undefined) searchParams.append('inStock', filters.inStock.toString());
      if (filters.sortBy) searchParams.append('sortBy', filters.sortBy);
      if (filters.sortOrder) searchParams.append('sortOrder', filters.sortOrder);

      const response = await apiService.get<Product[]>(`/products/search?${searchParams.toString()}`);
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.error || 'Product search failed');
    } catch (error) {
      console.error('Search products error:', error);
      throw error;
    }
  }

  /**
   * Get product categories
   */
  public async getCategories(): Promise<ProductCategory[]> {
    try {
      const cacheKey = 'product_categories';
      
      return productsCache.getOrFetch(cacheKey, async () => {
        const response = await apiService.get<ProductCategory[]>('/products/categories');
        
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
   * Get product attributes
   */
  public async getAttributes(): Promise<ProductAttribute[]> {
    try {
      const cacheKey = 'product_attributes';
      
      return productsCache.getOrFetch(cacheKey, async () => {
        const response = await apiService.get<ProductAttribute[]>('/products/attributes');
        
        if (response.success && response.data) {
          return response.data;
        }
        
        throw new Error(response.error || 'Failed to fetch attributes');
      });
    } catch (error) {
      console.error('Get attributes error:', error);
      throw error;
    }
  }

  /**
   * Get product variants
   */
  public async getProductVariants(productId: string): Promise<ProductVariant[]> {
    try {
      const response = await apiService.get<ProductVariant[]>(`/products/${productId}/variants`);
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.error || 'Failed to fetch product variants');
    } catch (error) {
      console.error('Get product variants error:', error);
      throw error;
    }
  }

  /**
   * Get product reviews
   */
  public async getProductReviews(productId: string, page: number = 1, limit: number = 10): Promise<{
    reviews: ProductReview[];
    total: number;
    averageRating: number;
  }> {
    try {
      const response = await apiService.get<{
        reviews: ProductReview[];
        total: number;
        averageRating: number;
      }>(`/products/${productId}/reviews?page=${page}&limit=${limit}`);
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.error || 'Failed to fetch product reviews');
    } catch (error) {
      console.error('Get product reviews error:', error);
      throw error;
    }
  }

  /**
   * Add product review
   */
  public async addProductReview(productId: string, review: Omit<ProductReview, 'id' | 'createdAt' | 'updatedAt'>): Promise<ProductReview> {
    try {
      const response = await apiService.post<ProductReview>(`/products/${productId}/reviews`, review);
      
      if (response.success && response.data) {
        this.clearCache();
        return response.data;
      }
      
      throw new Error(response.error || 'Failed to add review');
    } catch (error) {
      console.error('Add product review error:', error);
      throw error;
    }
  }

  /**
   * Get product analytics
   */
  public async getProductAnalytics(productId: string): Promise<ProductAnalytics> {
    try {
      const response = await apiService.get<ProductAnalytics>(`/products/${productId}/analytics`);
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.error || 'Failed to fetch product analytics');
    } catch (error) {
      console.error('Get product analytics error:', error);
      throw error;
    }
  }

  /**
   * Track product view
   */
  public async trackProductView(productId: string): Promise<void> {
    try {
      await apiService.post(`/products/${productId}/view`);
    } catch (error) {
      console.error('Track product view error:', error);
      // Don't throw error for view tracking
    }
  }

  /**
   * Get product bundles
   */
  public async getProductBundles(): Promise<ProductBundle[]> {
    try {
      const cacheKey = 'product_bundles';
      
      return productsCache.getOrFetch(cacheKey, async () => {
        const response = await apiService.get<ProductBundle[]>('/products/bundles');
        
        if (response.success && response.data) {
          return response.data;
        }
        
        throw new Error(response.error || 'Failed to fetch product bundles');
      });
    } catch (error) {
      console.error('Get product bundles error:', error);
      throw error;
    }
  }

  /**
   * Get product bundle by ID
   */
  public async getProductBundle(bundleId: string): Promise<ProductBundle> {
    try {
      const response = await apiService.get<ProductBundle>(`/products/bundles/${bundleId}`);
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.error || 'Product bundle not found');
    } catch (error) {
      console.error('Get product bundle error:', error);
      throw error;
    }
  }

  /**
   * Check product availability
   */
  public async checkAvailability(productId: string, variantId?: string, quantity: number = 1): Promise<{
    available: boolean;
    quantity: number;
    message?: string;
  }> {
    try {
      const response = await apiService.post<{
        available: boolean;
        quantity: number;
        message?: string;
      }>('/products/availability', {
        productId,
        variantId,
        quantity
      });
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.error || 'Failed to check availability');
    } catch (error) {
      console.error('Check availability error:', error);
      throw error;
    }
  }

  /**
   * Get product recommendations
   */
  public async getProductRecommendations(productId: string, limit: number = 4): Promise<Product[]> {
    try {
      const response = await apiService.get<Product[]>(`/products/${productId}/recommendations?limit=${limit}`);
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.error || 'Failed to fetch product recommendations');
    } catch (error) {
      console.error('Get product recommendations error:', error);
      throw error;
    }
  }

  /**
   * Get recently viewed products
   */
  public async getRecentlyViewedProducts(limit: number = 5): Promise<Product[]> {
    try {
      const response = await apiService.get<Product[]>(`/products/recently-viewed?limit=${limit}`);
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.error || 'Failed to fetch recently viewed products');
    } catch (error) {
      console.error('Get recently viewed products error:', error);
      throw error;
    }
  }

  /**
   * Get wishlist products
   */
  public async getWishlistProducts(): Promise<Product[]> {
    try {
      const response = await apiService.get<Product[]>('/products/wishlist');
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.error || 'Failed to fetch wishlist products');
    } catch (error) {
      console.error('Get wishlist products error:', error);
      throw error;
    }
  }

  /**
   * Add product to wishlist
   */
  public async addToWishlist(productId: string): Promise<void> {
    try {
      const response = await apiService.post(`/products/${productId}/wishlist`);
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to add to wishlist');
      }
    } catch (error) {
      console.error('Add to wishlist error:', error);
      throw error;
    }
  }

  /**
   * Remove product from wishlist
   */
  public async removeFromWishlist(productId: string): Promise<void> {
    try {
      const response = await apiService.delete(`/products/${productId}/wishlist`);
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to remove from wishlist');
      }
    } catch (error) {
      console.error('Remove from wishlist error:', error);
      throw error;
    }
  }

  /**
   * Get product comparison data
   */
  public async getProductComparison(productIds: string[]): Promise<Product[]> {
    try {
      const response = await apiService.post<Product[]>('/products/compare', { productIds });
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.error || 'Failed to fetch product comparison');
    } catch (error) {
      console.error('Get product comparison error:', error);
      throw error;
    }
  }

  /**
   * Get product filters
   */
  public async getProductFilters(categoryId?: string): Promise<{
    categories: ProductCategory[];
    attributes: ProductAttribute[];
    priceRange: { min: number; max: number };
    tags: string[];
  }> {
    try {
      const queryParams = categoryId ? `?category=${categoryId}` : '';
      const response = await apiService.get<{
        categories: ProductCategory[];
        attributes: ProductAttribute[];
        priceRange: { min: number; max: number };
        tags: string[];
      }>(`/products/filters${queryParams}`);
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.error || 'Failed to fetch product filters');
    } catch (error) {
      console.error('Get product filters error:', error);
      throw error;
    }
  }

  /**
   * Get product stock status
   */
  public async getStockStatus(productId: string, variantId?: string): Promise<{
    inStock: boolean;
    quantity: number;
    lowStock: boolean;
    backorderAvailable: boolean;
  }> {
    try {
      const response = await apiService.get<{
        inStock: boolean;
        quantity: number;
        lowStock: boolean;
        backorderAvailable: boolean;
      }>(`/products/${productId}/stock${variantId ? `?variant=${variantId}` : ''}`);
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.error || 'Failed to fetch stock status');
    } catch (error) {
      console.error('Get stock status error:', error);
      throw error;
    }
  }
}

// Create singleton instance
export const productsService = new ProductsService();

// Export the class for custom instances
export { ProductsService };
