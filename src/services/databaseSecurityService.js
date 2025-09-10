// 🔐 PRODUCTION-READY DATABASE SECURITY SERVICE
// Enterprise-grade data encryption and secure storage

// Encryption configuration
const ENCRYPTION_CONFIG = {
  ALGORITHM: 'AES-GCM',
  KEY_LENGTH: 256,
  IV_LENGTH: 12,
  TAG_LENGTH: 128,
  KEY_DERIVATION_ALGORITHM: 'PBKDF2',
  KEY_DERIVATION_ITERATIONS: 100000,
  SALT_LENGTH: 32
};

// Secure storage utilities
const secureStorageUtils = {
  // Generate encryption key from password
  async deriveKey(password, salt) {
    const encoder = new TextEncoder();
    const passwordBuffer = encoder.encode(password);
    
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      passwordBuffer,
      { name: ENCRYPTION_CONFIG.KEY_DERIVATION_ALGORITHM },
      false,
      ['deriveBits', 'deriveKey']
    );
    
    return crypto.subtle.deriveKey(
      {
        name: ENCRYPTION_CONFIG.KEY_DERIVATION_ALGORITHM,
        salt: salt,
        iterations: ENCRYPTION_CONFIG.KEY_DERIVATION_ITERATIONS,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: ENCRYPTION_CONFIG.ALGORITHM, length: ENCRYPTION_CONFIG.KEY_LENGTH },
      false,
      ['encrypt', 'decrypt']
    );
  },

  // Generate random salt
  generateSalt() {
    return crypto.getRandomValues(new Uint8Array(ENCRYPTION_CONFIG.SALT_LENGTH));
  },

  // Generate random IV
  generateIV() {
    return crypto.getRandomValues(new Uint8Array(ENCRYPTION_CONFIG.IV_LENGTH));
  },

  // Encrypt data
  async encrypt(data, key) {
    const iv = this.generateIV();
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(JSON.stringify(data));
    
    const encryptedBuffer = await crypto.subtle.encrypt(
      {
        name: ENCRYPTION_CONFIG.ALGORITHM,
        iv: iv
      },
      key,
      dataBuffer
    );
    
    // Combine IV and encrypted data
    const result = new Uint8Array(iv.length + encryptedBuffer.byteLength);
    result.set(iv);
    result.set(new Uint8Array(encryptedBuffer), iv.length);
    
    return result;
  },

  // Decrypt data
  async decrypt(encryptedData, key) {
    const iv = encryptedData.slice(0, ENCRYPTION_CONFIG.IV_LENGTH);
    const data = encryptedData.slice(ENCRYPTION_CONFIG.IV_LENGTH);
    
    const decryptedBuffer = await crypto.subtle.decrypt(
      {
        name: ENCRYPTION_CONFIG.ALGORITHM,
        iv: iv
      },
      key,
      data
    );
    
    const decoder = new TextDecoder();
    return JSON.parse(decoder.decode(decryptedBuffer));
  },

  // Hash sensitive data
  async hashData(data) {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(JSON.stringify(data));
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    
    return Array.from(new Uint8Array(hashBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  },

  // Generate secure random ID
  generateSecureId() {
    return crypto.getRandomValues(new Uint8Array(16))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }
};

// Database security service
export const databaseSecurityService = {
  // Master encryption key (in production, this would be stored securely)
  masterKey: null,

  // Initialize the service
  async initialize(masterPassword) {
    try {
      const salt = secureStorageUtils.generateSalt();
      this.masterKey = await secureStorageUtils.deriveKey(masterPassword, salt);
      
      // Store salt securely
      localStorage.setItem('encryptionSalt', Array.from(salt).map(b => b.toString(16).padStart(2, '0')).join(''));
      
      return { success: true, salt: Array.from(salt) };
    } catch (error) {
      console.error('Failed to initialize encryption:', error);
      return { success: false, error: error.message };
    }
  },

  // Store encrypted data
  async storeSecureData(key, data, options = {}) {
    try {
      if (!this.masterKey) {
        throw new Error('Encryption service not initialized');
      }

      const metadata = {
        version: '1.0',
        timestamp: Date.now(),
        expires: options.expires || null,
        encrypted: true,
        checksum: await secureStorageUtils.hashData(data)
      };

      const dataToEncrypt = {
        data: data,
        metadata: metadata
      };

      const encryptedData = await secureStorageUtils.encrypt(dataToEncrypt, this.masterKey);
      
      // Convert to base64 for storage
      const base64Data = btoa(String.fromCharCode(...encryptedData));
      
      // Store with metadata
      const storageItem = {
        encrypted: base64Data,
        metadata: {
          ...metadata,
          size: base64Data.length,
          algorithm: ENCRYPTION_CONFIG.ALGORITHM
        }
      };

      localStorage.setItem(key, JSON.stringify(storageItem));
      
      return { success: true, metadata: metadata };
    } catch (error) {
      console.error('Failed to store encrypted data:', error);
      return { success: false, error: error.message };
    }
  },

  // Retrieve encrypted data
  async retrieveSecureData(key) {
    try {
      if (!this.masterKey) {
        throw new Error('Encryption service not initialized');
      }

      const storedItem = localStorage.getItem(key);
      if (!storedItem) {
        return { success: false, error: 'Data not found' };
      }

      const parsedItem = JSON.parse(storedItem);
      
      // Check if data is encrypted
      if (!parsedItem.encrypted) {
        return { success: false, error: 'Data is not encrypted' };
      }

      // Check expiration
      if (parsedItem.metadata.expires && Date.now() > parsedItem.metadata.expires) {
        // Remove expired data
        localStorage.removeItem(key);
        return { success: false, error: 'Data has expired' };
      }

      // Convert from base64
      const encryptedData = new Uint8Array(
        atob(parsedItem.encrypted).split('').map(char => char.charCodeAt(0))
      );

      // Decrypt data
      const decryptedData = await secureStorageUtils.decrypt(encryptedData, this.masterKey);
      
      // Verify checksum
      const currentChecksum = await secureStorageUtils.hashData(decryptedData.data);
      if (currentChecksum !== decryptedData.metadata.checksum) {
        return { success: false, error: 'Data integrity check failed' };
      }

      return { 
        success: true, 
        data: decryptedData.data, 
        metadata: decryptedData.metadata 
      };
    } catch (error) {
      console.error('Failed to retrieve encrypted data:', error);
      return { success: false, error: error.message };
    }
  },

  // Update encrypted data
  async updateSecureData(key, newData, options = {}) {
    try {
      // Retrieve existing data to preserve metadata
      const existing = await this.retrieveSecureData(key);
      if (!existing.success) {
        return { success: false, error: 'Failed to retrieve existing data' };
      }

      // Update with new data while preserving metadata
      const updatedMetadata = {
        ...existing.metadata,
        lastModified: Date.now(),
        version: (parseFloat(existing.metadata.version) + 0.1).toFixed(1)
      };

      if (options.expires) {
        updatedMetadata.expires = options.expires;
      }

      return await this.storeSecureData(key, newData, { ...options, metadata: updatedMetadata });
    } catch (error) {
      console.error('Failed to update encrypted data:', error);
      return { success: false, error: error.message };
    }
  },

  // Delete encrypted data
  async deleteSecureData(key) {
    try {
      localStorage.removeItem(key);
      return { success: true };
    } catch (error) {
      console.error('Failed to delete encrypted data:', error);
      return { success: false, error: error.message };
    }
  },

  // List all encrypted keys
  async listEncryptedKeys() {
    try {
      const keys = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
          try {
            const item = JSON.parse(localStorage.getItem(key));
            if (item && item.encrypted) {
              keys.push({
                key: key,
                metadata: item.metadata
              });
            }
          } catch (e) {
            // Skip non-JSON items
          }
        }
      }
      return { success: true, keys: keys };
    } catch (error) {
      console.error('Failed to list encrypted keys:', error);
      return { success: false, error: error.message };
    }
  },

  // Clean up expired data
  async cleanupExpiredData() {
    try {
      const keys = await this.listEncryptedKeys();
      if (!keys.success) {
        return keys;
      }

      let cleanedCount = 0;
      for (const keyInfo of keys.keys) {
        if (keyInfo.metadata.expires && Date.now() > keyInfo.metadata.expires) {
          await this.deleteSecureData(keyInfo.key);
          cleanedCount++;
        }
      }

      return { success: true, cleanedCount: cleanedCount };
    } catch (error) {
      console.error('Failed to cleanup expired data:', error);
      return { success: false, error: error.message };
    }
  },

  // Export encrypted data (for backup)
  async exportEncryptedData(key) {
    try {
      const storedItem = localStorage.getItem(key);
      if (!storedItem) {
        return { success: false, error: 'Data not found' };
      }

      const parsedItem = JSON.parse(storedItem);
      if (!parsedItem.encrypted) {
        return { success: false, error: 'Data is not encrypted' };
      }

      return { 
        success: true, 
        data: parsedItem,
        exportTimestamp: Date.now()
      };
    } catch (error) {
      console.error('Failed to export encrypted data:', error);
      return { success: false, error: error.message };
    }
  },

  // Import encrypted data (for restore)
  async importEncryptedData(key, importedData) {
    try {
      // Validate imported data structure
      if (!importedData.encrypted || !importedData.metadata) {
        return { success: false, error: 'Invalid import data format' };
      }

      // Store imported data
      localStorage.setItem(key, JSON.stringify(importedData));
      
      return { success: true, importedTimestamp: Date.now() };
    } catch (error) {
      console.error('Failed to import encrypted data:', error);
      return { success: false, error: error.message };
    }
  },

  // Get storage statistics
  async getStorageStats() {
    try {
      const keys = await this.listEncryptedKeys();
      if (!keys.success) {
        return keys;
      }

      let totalSize = 0;
      let totalItems = keys.keys.length;
      let expiredItems = 0;
      let activeItems = 0;

      for (const keyInfo of keys.keys) {
        totalSize += keyInfo.metadata.size || 0;
        
        if (keyInfo.metadata.expires && Date.now() > keyInfo.metadata.expires) {
          expiredItems++;
        } else {
          activeItems++;
        }
      }

      return {
        success: true,
        stats: {
          totalItems,
          activeItems,
          expiredItems,
          totalSize: `${(totalSize / 1024).toFixed(2)} KB`,
          encryptionAlgorithm: ENCRYPTION_CONFIG.ALGORITHM,
          keyLength: ENCRYPTION_CONFIG.KEY_LENGTH
        }
      };
    } catch (error) {
      console.error('Failed to get storage stats:', error);
      return { success: false, error: error.message };
    }
  }
};

// Export utilities for external use
export { secureStorageUtils, ENCRYPTION_CONFIG };
