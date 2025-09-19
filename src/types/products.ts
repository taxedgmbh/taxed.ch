/**
 * Product-related type definitions
 * Defines types for product management, inventory, and e-commerce
 */

// Product structure
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  sku: string;
  price: number;
  comparePrice?: number;
  costPrice?: number;
  currency: string;
  images: ProductImage[];
  category: ProductCategory;
  tags: string[];
  status: 'active' | 'inactive' | 'draft' | 'archived';
  inventory: ProductInventory;
  variants: ProductVariant[];
  attributes: ProductAttribute[];
  seo: ProductSEO;
  isDigital: boolean;
  isDownloadable: boolean;
  weight?: number;
  dimensions?: ProductDimensions;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

// Product image
export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  isPrimary: boolean;
  order: number;
  sizes?: {
    thumbnail: string;
    small: string;
    medium: string;
    large: string;
  };
}

// Product category
export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  level: number;
  path: string[];
  isActive: boolean;
  productCount: number;
  seo: ProductSEO;
}

// Product inventory
export interface ProductInventory {
  trackQuantity: boolean;
  quantity: number;
  allowBackorder: boolean;
  lowStockThreshold: number;
  sku: string;
  barcode?: string;
  location?: string;
}

// Product variant
export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  price: number;
  comparePrice?: number;
  costPrice?: number;
  quantity: number;
  weight?: number;
  attributes: Record<string, string>;
  image?: string;
  isActive: boolean;
}

// Product attribute
export interface ProductAttribute {
  id: string;
  name: string;
  type: 'text' | 'number' | 'select' | 'multiselect' | 'boolean' | 'date';
  values: string[];
  isRequired: boolean;
  isFilterable: boolean;
  isVisible: boolean;
  order: number;
}

// Product dimensions
export interface ProductDimensions {
  length: number;
  width: number;
  height: number;
  unit: 'cm' | 'in' | 'm' | 'ft';
}

// Product SEO
export interface ProductSEO {
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

// Product filter
export interface ProductFilter {
  category?: string;
  tags?: string[];
  priceMin?: number;
  priceMax?: number;
  inStock?: boolean;
  attributes?: Record<string, string[]>;
  search?: string;
  sortBy?: 'name' | 'price' | 'created' | 'popularity' | 'rating';
  sortOrder?: 'asc' | 'desc';
}

// Product review
export interface ProductReview {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userEmail: string;
  rating: number;
  title: string;
  comment: string;
  isVerified: boolean;
  isApproved: boolean;
  helpful: number;
  notHelpful: number;
  createdAt: string;
  updatedAt: string;
  images?: string[];
}

// Product analytics
export interface ProductAnalytics {
  views: number;
  clicks: number;
  conversions: number;
  revenue: number;
  averageRating: number;
  reviewCount: number;
  wishlistCount: number;
  cartAdds: number;
  timeOnPage: number;
  bounceRate: number;
}

// Product bundle
export interface ProductBundle {
  id: string;
  name: string;
  description: string;
  products: Array<{
    product: Product;
    quantity: number;
    discount?: number;
  }>;
  price: number;
  discount: number;
  isActive: boolean;
  validFrom?: string;
  validTo?: string;
}
