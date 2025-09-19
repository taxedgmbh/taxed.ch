/**
 * Storage Service
 * Handles file storage, uploads, and document management
 */

import { apiService } from './api';

// Storage types
export type StorageProvider = 'local' | 's3' | 'cloudinary' | 'azure' | 'gcp';
export type FileType = 'image' | 'document' | 'video' | 'audio' | 'archive' | 'other';
export type AccessLevel = 'public' | 'private' | 'protected';

// File interface
export interface StorageFile {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  type: FileType;
  url: string;
  thumbnailUrl?: string;
  accessLevel: AccessLevel;
  metadata: {
    width?: number;
    height?: number;
    duration?: number;
    format?: string;
    quality?: number;
    [key: string]: any;
  };
  tags: string[];
  folder?: string;
  userId?: string;
  uploadedAt: string;
  updatedAt: string;
}

// Upload progress interface
export interface UploadProgress {
  fileId: string;
  filename: string;
  progress: number;
  status: 'uploading' | 'processing' | 'completed' | 'failed';
  error?: string;
}

// Storage folder interface
export interface StorageFolder {
  id: string;
  name: string;
  path: string;
  parentId?: string;
  files: StorageFile[];
  subfolders: StorageFolder[];
  accessLevel: AccessLevel;
  userId?: string;
  createdAt: string;
  updatedAt: string;
}

// Storage quota interface
export interface StorageQuota {
  total: number;
  used: number;
  available: number;
  percentage: number;
  files: number;
  maxFileSize: number;
  allowedTypes: string[];
}

// Storage configuration interface
export interface StorageConfig {
  provider: StorageProvider;
  maxFileSize: number;
  allowedTypes: string[];
  allowedExtensions: string[];
  imageProcessing: {
    enabled: boolean;
    formats: string[];
    qualities: number[];
    sizes: Array<{ name: string; width: number; height: number }>;
  };
  videoProcessing: {
    enabled: boolean;
    formats: string[];
    qualities: number[];
    maxDuration: number;
  };
  compression: {
    enabled: boolean;
    quality: number;
    formats: string[];
  };
}

class StorageService {
  private config: StorageConfig | null = null;
  private uploadQueue: Map<string, UploadProgress> = new Map();
  private listeners: Array<(progress: UploadProgress) => void> = [];

  constructor() {
    this.initializeConfig();
  }

  /**
   * Initialize storage configuration
   */
  private async initializeConfig(): Promise<void> {
    try {
      const response = await apiService.get<StorageConfig>('/storage/config');
      if (response.success && response.data) {
        this.config = response.data;
      }
    } catch (error) {
      console.error('Failed to initialize storage config:', error);
    }
  }

  /**
   * Subscribe to upload progress
   */
  public subscribe(listener: (progress: UploadProgress) => void): () => void {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  /**
   * Upload file
   */
  public async uploadFile(
    file: File,
    options?: {
      folder?: string;
      accessLevel?: AccessLevel;
      tags?: string[];
      metadata?: Record<string, any>;
      onProgress?: (progress: UploadProgress) => void;
    }
  ): Promise<StorageFile> {
    try {
      // Validate file
      this.validateFile(file);

      const formData = new FormData();
      formData.append('file', file);
      if (options?.folder) formData.append('folder', options.folder);
      if (options?.accessLevel) formData.append('accessLevel', options.accessLevel);
      if (options?.tags) formData.append('tags', JSON.stringify(options.tags));
      if (options?.metadata) formData.append('metadata', JSON.stringify(options.metadata));

      const fileId = this.generateFileId();
      const progress: UploadProgress = {
        fileId,
        filename: file.name,
        progress: 0,
        status: 'uploading'
      };

      this.uploadQueue.set(fileId, progress);
      this.notifyListeners(progress);

      const response = await apiService.post<StorageFile>('/storage/upload', formData, {
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            progress.progress = percentCompleted;
            this.uploadQueue.set(fileId, progress);
            this.notifyListeners(progress);
            options?.onProgress?.(progress);
          }
        }
      });

      if (response.success && response.data) {
        progress.status = 'completed';
        progress.progress = 100;
        this.uploadQueue.set(fileId, progress);
        this.notifyListeners(progress);
        this.uploadQueue.delete(fileId);
        return response.data;
      }

      throw new Error(response.error || 'Upload failed');
    } catch (error) {
      const fileId = this.generateFileId();
      const progress: UploadProgress = {
        fileId,
        filename: file.name,
        progress: 0,
        status: 'failed',
        error: error instanceof Error ? error.message : 'Upload failed'
      };
      this.uploadQueue.set(fileId, progress);
      this.notifyListeners(progress);
      this.uploadQueue.delete(fileId);
      throw error;
    }
  }

  /**
   * Upload multiple files
   */
  public async uploadFiles(
    files: File[],
    options?: {
      folder?: string;
      accessLevel?: AccessLevel;
      tags?: string[];
      metadata?: Record<string, any>;
      onProgress?: (progress: UploadProgress) => void;
    }
  ): Promise<StorageFile[]> {
    const uploadPromises = files.map(file => 
      this.uploadFile(file, options)
    );
    
    return Promise.all(uploadPromises);
  }

  /**
   * Get file by ID
   */
  public async getFile(fileId: string): Promise<StorageFile> {
    try {
      const response = await apiService.get<StorageFile>(`/storage/files/${fileId}`);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.error || 'File not found');
    } catch (error) {
      console.error('Get file error:', error);
      throw error;
    }
  }

  /**
   * Get files with filters
   */
  public async getFiles(filters?: {
    type?: FileType;
    folder?: string;
    tags?: string[];
    accessLevel?: AccessLevel;
    userId?: string;
    page?: number;
    limit?: number;
  }): Promise<{
    files: StorageFile[];
    total: number;
    page: number;
    limit: number;
  }> {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters?.type) queryParams.append('type', filters.type);
      if (filters?.folder) queryParams.append('folder', filters.folder);
      if (filters?.tags?.length) queryParams.append('tags', filters.tags.join(','));
      if (filters?.accessLevel) queryParams.append('accessLevel', filters.accessLevel);
      if (filters?.userId) queryParams.append('userId', filters.userId);
      if (filters?.page) queryParams.append('page', filters.page.toString());
      if (filters?.limit) queryParams.append('limit', filters.limit.toString());

      const response = await apiService.get<{
        files: StorageFile[];
        total: number;
        page: number;
        limit: number;
      }>(`/storage/files?${queryParams.toString()}`);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.error || 'Failed to fetch files');
    } catch (error) {
      console.error('Get files error:', error);
      throw error;
    }
  }

  /**
   * Update file
   */
  public async updateFile(
    fileId: string,
    updates: Partial<StorageFile>
  ): Promise<StorageFile> {
    try {
      const response = await apiService.put<StorageFile>(`/storage/files/${fileId}`, updates);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.error || 'Failed to update file');
    } catch (error) {
      console.error('Update file error:', error);
      throw error;
    }
  }

  /**
   * Delete file
   */
  public async deleteFile(fileId: string): Promise<void> {
    try {
      const response = await apiService.delete(`/storage/files/${fileId}`);

      if (!response.success) {
        throw new Error(response.error || 'Failed to delete file');
      }
    } catch (error) {
      console.error('Delete file error:', error);
      throw error;
    }
  }

  /**
   * Delete multiple files
   */
  public async deleteFiles(fileIds: string[]): Promise<void> {
    try {
      const response = await apiService.post('/storage/files/batch-delete', { fileIds });

      if (!response.success) {
        throw new Error(response.error || 'Failed to delete files');
      }
    } catch (error) {
      console.error('Delete files error:', error);
      throw error;
    }
  }

  /**
   * Get file URL
   */
  public async getFileUrl(
    fileId: string,
    options?: {
      expires?: number; // seconds
      size?: string;
      format?: string;
      quality?: number;
    }
  ): Promise<string> {
    try {
      const queryParams = new URLSearchParams();
      if (options?.expires) queryParams.append('expires', options.expires.toString());
      if (options?.size) queryParams.append('size', options.size);
      if (options?.format) queryParams.append('format', options.format);
      if (options?.quality) queryParams.append('quality', options.quality.toString());

      const response = await apiService.get<{ url: string }>(`/storage/files/${fileId}/url?${queryParams.toString()}`);

      if (response.success && response.data) {
        return response.data.url;
      }

      throw new Error(response.error || 'Failed to get file URL');
    } catch (error) {
      console.error('Get file URL error:', error);
      throw error;
    }
  }

  /**
   * Get folders
   */
  public async getFolders(parentId?: string): Promise<StorageFolder[]> {
    try {
      const queryParams = parentId ? `?parentId=${parentId}` : '';
      const response = await apiService.get<StorageFolder[]>(`/storage/folders${queryParams}`);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.error || 'Failed to fetch folders');
    } catch (error) {
      console.error('Get folders error:', error);
      throw error;
    }
  }

  /**
   * Create folder
   */
  public async createFolder(
    name: string,
    parentId?: string,
    accessLevel: AccessLevel = 'private'
  ): Promise<StorageFolder> {
    try {
      const response = await apiService.post<StorageFolder>('/storage/folders', {
        name,
        parentId,
        accessLevel
      });

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.error || 'Failed to create folder');
    } catch (error) {
      console.error('Create folder error:', error);
      throw error;
    }
  }

  /**
   * Update folder
   */
  public async updateFolder(
    folderId: string,
    updates: Partial<StorageFolder>
  ): Promise<StorageFolder> {
    try {
      const response = await apiService.put<StorageFolder>(`/storage/folders/${folderId}`, updates);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.error || 'Failed to update folder');
    } catch (error) {
      console.error('Update folder error:', error);
      throw error;
    }
  }

  /**
   * Delete folder
   */
  public async deleteFolder(folderId: string, recursive: boolean = false): Promise<void> {
    try {
      const response = await apiService.delete(`/storage/folders/${folderId}?recursive=${recursive}`);

      if (!response.success) {
        throw new Error(response.error || 'Failed to delete folder');
      }
    } catch (error) {
      console.error('Delete folder error:', error);
      throw error;
    }
  }

  /**
   * Get storage quota
   */
  public async getQuota(): Promise<StorageQuota> {
    try {
      const response = await apiService.get<StorageQuota>('/storage/quota');

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.error || 'Failed to fetch storage quota');
    } catch (error) {
      console.error('Get quota error:', error);
      throw error;
    }
  }

  /**
   * Get storage configuration
   */
  public getConfig(): StorageConfig | null {
    return this.config;
  }

  /**
   * Validate file
   */
  private validateFile(file: File): void {
    if (!this.config) {
      throw new Error('Storage configuration not loaded');
    }

    // Check file size
    if (file.size > this.config.maxFileSize) {
      throw new Error(`File size exceeds maximum allowed size of ${this.config.maxFileSize} bytes`);
    }

    // Check file type
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    if (fileExtension && !this.config.allowedExtensions.includes(fileExtension)) {
      throw new Error(`File type .${fileExtension} is not allowed`);
    }

    // Check MIME type
    if (!this.config.allowedTypes.includes(file.type)) {
      throw new Error(`File type ${file.type} is not allowed`);
    }
  }

  /**
   * Generate file ID
   */
  private generateFileId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  /**
   * Notify listeners
   */
  private notifyListeners(progress: UploadProgress): void {
    this.listeners.forEach(listener => listener(progress));
  }

  /**
   * Get upload progress
   */
  public getUploadProgress(fileId: string): UploadProgress | undefined {
    return this.uploadQueue.get(fileId);
  }

  /**
   * Get all upload progress
   */
  public getAllUploadProgress(): UploadProgress[] {
    return Array.from(this.uploadQueue.values());
  }

  /**
   * Clear completed uploads
   */
  public clearCompletedUploads(): void {
    for (const [fileId, progress] of this.uploadQueue.entries()) {
      if (progress.status === 'completed' || progress.status === 'failed') {
        this.uploadQueue.delete(fileId);
      }
    }
  }

  /**
   * Search files
   */
  public async searchFiles(
    query: string,
    filters?: {
      type?: FileType;
      folder?: string;
      tags?: string[];
      accessLevel?: AccessLevel;
    }
  ): Promise<StorageFile[]> {
    try {
      const searchParams = new URLSearchParams();
      searchParams.append('q', query);
      
      if (filters?.type) searchParams.append('type', filters.type);
      if (filters?.folder) searchParams.append('folder', filters.folder);
      if (filters?.tags?.length) searchParams.append('tags', filters.tags.join(','));
      if (filters?.accessLevel) searchParams.append('accessLevel', filters.accessLevel);

      const response = await apiService.get<StorageFile[]>(`/storage/search?${searchParams.toString()}`);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.error || 'File search failed');
    } catch (error) {
      console.error('Search files error:', error);
      throw error;
    }
  }

  /**
   * Get file statistics
   */
  public async getFileStats(): Promise<{
    totalFiles: number;
    totalSize: number;
    byType: Record<FileType, number>;
    byAccessLevel: Record<AccessLevel, number>;
    recentUploads: StorageFile[];
  }> {
    try {
      const response = await apiService.get<{
        totalFiles: number;
        totalSize: number;
        byType: Record<FileType, number>;
        byAccessLevel: Record<AccessLevel, number>;
        recentUploads: StorageFile[];
      }>('/storage/stats');

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.error || 'Failed to fetch file statistics');
    } catch (error) {
      console.error('Get file stats error:', error);
      throw error;
    }
  }
}

// Create singleton instance
export const storageService = new StorageService();

// Export the class for custom instances
export { StorageService };
