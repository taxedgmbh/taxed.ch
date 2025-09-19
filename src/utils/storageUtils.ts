/**
 * Storage utility functions
 * Comprehensive local storage, session storage, and data persistence functions
 */

import { STORAGE_KEYS } from './constants';

/**
 * Local Storage Operations
 */

/**
 * Sets an item in localStorage
 */
export const setLocalStorage = (key: string, value: any): void => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error('Error setting localStorage item:', error);
  }
};

/**
 * Gets an item from localStorage
 */
export const getLocalStorage = <T = any>(key: string, defaultValue?: T): T | null => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue || null;
  } catch (error) {
    console.error('Error getting localStorage item:', error);
    return defaultValue || null;
  }
};

/**
 * Removes an item from localStorage
 */
export const removeLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing localStorage item:', error);
  }
};

/**
 * Clears all localStorage
 */
export const clearLocalStorage = (): void => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};

/**
 * Checks if a key exists in localStorage
 */
export const hasLocalStorage = (key: string): boolean => {
  try {
    return localStorage.getItem(key) !== null;
  } catch {
    return false;
  }
};

/**
 * Gets all keys from localStorage
 */
export const getLocalStorageKeys = (): string[] => {
  try {
    return Object.keys(localStorage);
  } catch {
    return [];
  }
};

/**
 * Session Storage Operations
 */

/**
 * Sets an item in sessionStorage
 */
export const setSessionStorage = (key: string, value: any): void => {
  try {
    const serializedValue = JSON.stringify(value);
    sessionStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error('Error setting sessionStorage item:', error);
  }
};

/**
 * Gets an item from sessionStorage
 */
export const getSessionStorage = <T = any>(key: string, defaultValue?: T): T | null => {
  try {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue || null;
  } catch (error) {
    console.error('Error getting sessionStorage item:', error);
    return defaultValue || null;
  }
};

/**
 * Removes an item from sessionStorage
 */
export const removeSessionStorage = (key: string): void => {
  try {
    sessionStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing sessionStorage item:', error);
  }
};

/**
 * Clears all sessionStorage
 */
export const clearSessionStorage = (): void => {
  try {
    sessionStorage.clear();
  } catch (error) {
    console.error('Error clearing sessionStorage:', error);
  }
};

/**
 * Checks if a key exists in sessionStorage
 */
export const hasSessionStorage = (key: string): boolean => {
  try {
    return sessionStorage.getItem(key) !== null;
  } catch {
    return false;
  }
};

/**
 * IndexedDB Operations
 */

/**
 * Opens an IndexedDB database
 */
export const openIndexedDB = (name: string, version: number = 1): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(name, version);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      // Add object stores here if needed
    };
  });
};

/**
 * Adds data to IndexedDB
 */
export const addToIndexedDB = async (
  dbName: string,
  storeName: string,
  data: any
): Promise<void> => {
  const db = await openIndexedDB(dbName);
  const transaction = db.transaction([storeName], 'readwrite');
  const store = transaction.objectStore(storeName);
  
  return new Promise((resolve, reject) => {
    const request = store.add(data);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

/**
 * Gets data from IndexedDB
 */
export const getFromIndexedDB = async <T = any>(
  dbName: string,
  storeName: string,
  key: string
): Promise<T | null> => {
  const db = await openIndexedDB(dbName);
  const transaction = db.transaction([storeName], 'readonly');
  const store = transaction.objectStore(storeName);
  
  return new Promise((resolve, reject) => {
    const request = store.get(key);
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
};

/**
 * Updates data in IndexedDB
 */
export const updateIndexedDB = async (
  dbName: string,
  storeName: string,
  key: string,
  data: any
): Promise<void> => {
  const db = await openIndexedDB(dbName);
  const transaction = db.transaction([storeName], 'readwrite');
  const store = transaction.objectStore(storeName);
  
  return new Promise((resolve, reject) => {
    const request = store.put(data, key);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

/**
 * Deletes data from IndexedDB
 */
export const deleteFromIndexedDB = async (
  dbName: string,
  storeName: string,
  key: string
): Promise<void> => {
  const db = await openIndexedDB(dbName);
  const transaction = db.transaction([storeName], 'readwrite');
  const store = transaction.objectStore(storeName);
  
  return new Promise((resolve, reject) => {
    const request = store.delete(key);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

/**
 * Cookie Operations
 */

/**
 * Sets a cookie
 */
export const setCookie = (
  name: string,
  value: string,
  options: {
    expires?: Date | number;
    path?: string;
    domain?: string;
    secure?: boolean;
    sameSite?: 'strict' | 'lax' | 'none';
  } = {}
): void => {
  let cookieString = `${name}=${encodeURIComponent(value)}`;
  
  if (options.expires) {
    const expires = options.expires instanceof Date ? options.expires : new Date(Date.now() + options.expires * 24 * 60 * 60 * 1000);
    cookieString += `; expires=${expires.toUTCString()}`;
  }
  
  if (options.path) {
    cookieString += `; path=${options.path}`;
  }
  
  if (options.domain) {
    cookieString += `; domain=${options.domain}`;
  }
  
  if (options.secure) {
    cookieString += '; secure';
  }
  
  if (options.sameSite) {
    cookieString += `; samesite=${options.sameSite}`;
  }
  
  document.cookie = cookieString;
};

/**
 * Gets a cookie value
 */
export const getCookie = (name: string): string | null => {
  const cookies = document.cookie.split(';');
  
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split('=');
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  
  return null;
};

/**
 * Removes a cookie
 */
export const removeCookie = (name: string, path: string = '/'): void => {
  setCookie(name, '', { expires: new Date(0), path });
};

/**
 * Gets all cookies
 */
export const getAllCookies = (): Record<string, string> => {
  const cookies: Record<string, string> = {};
  
  document.cookie.split(';').forEach(cookie => {
    const [name, value] = cookie.trim().split('=');
    if (name && value) {
      cookies[name] = decodeURIComponent(value);
    }
  });
  
  return cookies;
};

/**
 * Application-specific Storage Functions
 */

/**
 * Saves user data to localStorage
 */
export const saveUser = (user: any): void => {
  setLocalStorage(STORAGE_KEYS.USER, user);
};

/**
 * Gets user data from localStorage
 */
export const getUser = (): any => {
  return getLocalStorage(STORAGE_KEYS.USER);
};

/**
 * Removes user data from localStorage
 */
export const removeUser = (): void => {
  removeLocalStorage(STORAGE_KEYS.USER);
};

/**
 * Saves authentication token
 */
export const saveToken = (token: string): void => {
  setLocalStorage(STORAGE_KEYS.TOKEN, token);
};

/**
 * Gets authentication token
 */
export const getToken = (): string | null => {
  return getLocalStorage(STORAGE_KEYS.TOKEN);
};

/**
 * Removes authentication token
 */
export const removeToken = (): void => {
  removeLocalStorage(STORAGE_KEYS.TOKEN);
};

/**
 * Saves cart data
 */
export const saveCart = (cart: any): void => {
  setLocalStorage(STORAGE_KEYS.CART, cart);
};

/**
 * Gets cart data
 */
export const getCart = (): any => {
  return getLocalStorage(STORAGE_KEYS.CART, []);
};

/**
 * Removes cart data
 */
export const removeCart = (): void => {
  removeLocalStorage(STORAGE_KEYS.CART);
};

/**
 * Saves user preferences
 */
export const savePreferences = (preferences: any): void => {
  setLocalStorage(STORAGE_KEYS.PREFERENCES, preferences);
};

/**
 * Gets user preferences
 */
export const getPreferences = (): any => {
  return getLocalStorage(STORAGE_KEYS.PREFERENCES, {});
};

/**
 * Storage Event Listeners
 */

/**
 * Adds a storage event listener
 */
export const addStorageListener = (callback: (event: StorageEvent) => void): void => {
  window.addEventListener('storage', callback);
};

/**
 * Removes a storage event listener
 */
export const removeStorageListener = (callback: (event: StorageEvent) => void): void => {
  window.removeEventListener('storage', callback);
};

/**
 * Storage Quota Information
 */

/**
 * Gets storage quota information
 */
export const getStorageQuota = async (): Promise<{
  quota: number;
  usage: number;
  available: number;
}> => {
  if ('storage' in navigator && 'estimate' in navigator.storage) {
    const estimate = await navigator.storage.estimate();
    return {
      quota: estimate.quota || 0,
      usage: estimate.usage || 0,
      available: (estimate.quota || 0) - (estimate.usage || 0),
    };
  }
  
  return { quota: 0, usage: 0, available: 0 };
};

/**
 * Clears all application storage
 */
export const clearAllStorage = (): void => {
  clearLocalStorage();
  clearSessionStorage();
  
  // Clear cookies
  const cookies = getAllCookies();
  Object.keys(cookies).forEach(cookieName => {
    removeCookie(cookieName);
  });
};
