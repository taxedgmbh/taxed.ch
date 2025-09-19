/**
 * URL utility functions
 * Comprehensive URL manipulation and validation functions
 */

/**
 * Checks if a string is a valid URL
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Parses a URL and returns its components
 */
export const parseUrl = (url: string): {
  protocol: string;
  hostname: string;
  port: string;
  pathname: string;
  search: string;
  hash: string;
  origin: string;
} | null => {
  try {
    const urlObj = new URL(url);
    return {
      protocol: urlObj.protocol,
      hostname: urlObj.hostname,
      port: urlObj.port,
      pathname: urlObj.pathname,
      search: urlObj.search,
      hash: urlObj.hash,
      origin: urlObj.origin,
    };
  } catch {
    return null;
  }
};

/**
 * Gets the domain from a URL
 */
export const getDomain = (url: string): string => {
  try {
    return new URL(url).hostname;
  } catch {
    return '';
  }
};

/**
 * Gets the protocol from a URL
 */
export const getProtocol = (url: string): string => {
  try {
    return new URL(url).protocol;
  } catch {
    return '';
  }
};

/**
 * Gets the pathname from a URL
 */
export const getPathname = (url: string): string => {
  try {
    return new URL(url).pathname;
  } catch {
    return '';
  }
};

/**
 * Gets the search parameters from a URL
 */
export const getSearchParams = (url: string): URLSearchParams => {
  try {
    return new URL(url).searchParams;
  } catch {
    return new URLSearchParams();
  }
};

/**
 * Gets a specific search parameter from a URL
 */
export const getSearchParam = (url: string, key: string): string | null => {
  try {
    return new URL(url).searchParams.get(key);
  } catch {
    return null;
  }
};

/**
 * Sets a search parameter in a URL
 */
export const setSearchParam = (url: string, key: string, value: string): string => {
  try {
    const urlObj = new URL(url);
    urlObj.searchParams.set(key, value);
    return urlObj.toString();
  } catch {
    return url;
  }
};

/**
 * Removes a search parameter from a URL
 */
export const removeSearchParam = (url: string, key: string): string => {
  try {
    const urlObj = new URL(url);
    urlObj.searchParams.delete(key);
    return urlObj.toString();
  } catch {
    return url;
  }
};

/**
 * Gets all search parameters as an object
 */
export const getSearchParamsObject = (url: string): Record<string, string> => {
  try {
    const params = new URL(url).searchParams;
    const result: Record<string, string> = {};
    params.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  } catch {
    return {};
  }
};

/**
 * Builds a URL with search parameters
 */
export const buildUrl = (baseUrl: string, params: Record<string, string | number | boolean>): string => {
  try {
    const url = new URL(baseUrl);
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, String(value));
    });
    return url.toString();
  } catch {
    return baseUrl;
  }
};

/**
 * Joins URL paths
 */
export const joinPaths = (...paths: string[]): string => {
  return paths
    .map(path => path.replace(/^\/+|\/+$/g, ''))
    .filter(path => path.length > 0)
    .join('/');
};

/**
 * Normalizes a URL by removing trailing slashes and fixing protocols
 */
export const normalizeUrl = (url: string): string => {
  try {
    const urlObj = new URL(url);
    
    // Remove trailing slash from pathname
    if (urlObj.pathname !== '/' && urlObj.pathname.endsWith('/')) {
      urlObj.pathname = urlObj.pathname.slice(0, -1);
    }
    
    // Ensure HTTPS for production URLs
    if (urlObj.protocol === 'http:' && urlObj.hostname !== 'localhost') {
      urlObj.protocol = 'https:';
    }
    
    return urlObj.toString();
  } catch {
    return url;
  }
};

/**
 * Checks if a URL is absolute
 */
export const isAbsoluteUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Checks if a URL is relative
 */
export const isRelativeUrl = (url: string): boolean => {
  return !isAbsoluteUrl(url);
};

/**
 * Converts a relative URL to absolute
 */
export const toAbsoluteUrl = (relativeUrl: string, baseUrl: string): string => {
  try {
    return new URL(relativeUrl, baseUrl).toString();
  } catch {
    return relativeUrl;
  }
};

/**
 * Gets the file extension from a URL
 */
export const getFileExtension = (url: string): string => {
  try {
    const pathname = new URL(url).pathname;
    const lastDot = pathname.lastIndexOf('.');
    return lastDot !== -1 ? pathname.slice(lastDot + 1).toLowerCase() : '';
  } catch {
    return '';
  }
};

/**
 * Checks if a URL points to an image
 */
export const isImageUrl = (url: string): boolean => {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'ico'];
  const extension = getFileExtension(url);
  return imageExtensions.includes(extension);
};

/**
 * Checks if a URL points to a PDF
 */
export const isPdfUrl = (url: string): boolean => {
  return getFileExtension(url) === 'pdf';
};

/**
 * Gets the filename from a URL
 */
export const getFilename = (url: string): string => {
  try {
    const pathname = new URL(url).pathname;
    return pathname.split('/').pop() || '';
  } catch {
    return '';
  }
};

/**
 * Encodes a URL component
 */
export const encodeUrlComponent = (component: string): string => {
  return encodeURIComponent(component);
};

/**
 * Decodes a URL component
 */
export const decodeUrlComponent = (component: string): string => {
  try {
    return decodeURIComponent(component);
  } catch {
    return component;
  }
};

/**
 * Encodes a URL
 */
export const encodeUrl = (url: string): string => {
  try {
    return encodeURI(url);
  } catch {
    return url;
  }
};

/**
 * Decodes a URL
 */
export const decodeUrl = (url: string): string => {
  try {
    return decodeURI(url);
  } catch {
    return url;
  }
};

/**
 * Creates a data URL from a string
 */
export const createDataUrl = (data: string, mimeType: string = 'text/plain'): string => {
  return `data:${mimeType};base64,${btoa(data)}`;
};

/**
 * Creates a blob URL from a blob
 */
export const createBlobUrl = (blob: Blob): string => {
  return URL.createObjectURL(blob);
};

/**
 * Revokes a blob URL
 */
export const revokeBlobUrl = (url: string): void => {
  URL.revokeObjectURL(url);
};

/**
 * Checks if a URL is a data URL
 */
export const isDataUrl = (url: string): boolean => {
  return url.startsWith('data:');
};

/**
 * Checks if a URL is a blob URL
 */
export const isBlobUrl = (url: string): boolean => {
  return url.startsWith('blob:');
};

/**
 * Gets the origin from a URL
 */
export const getOrigin = (url: string): string => {
  try {
    return new URL(url).origin;
  } catch {
    return '';
  }
};

/**
 * Checks if two URLs have the same origin
 */
export const hasSameOrigin = (url1: string, url2: string): boolean => {
  try {
    return new URL(url1).origin === new URL(url2).origin;
  } catch {
    return false;
  }
};

/**
 * Creates a URL with a different protocol
 */
export const changeProtocol = (url: string, protocol: string): string => {
  try {
    const urlObj = new URL(url);
    urlObj.protocol = protocol;
    return urlObj.toString();
  } catch {
    return url;
  }
};

/**
 * Creates a URL with a different hostname
 */
export const changeHostname = (url: string, hostname: string): string => {
  try {
    const urlObj = new URL(url);
    urlObj.hostname = hostname;
    return urlObj.toString();
  } catch {
    return url;
  }
};

/**
 * Creates a URL with a different port
 */
export const changePort = (url: string, port: string | number): string => {
  try {
    const urlObj = new URL(url);
    urlObj.port = String(port);
    return urlObj.toString();
  } catch {
    return url;
  }
};
