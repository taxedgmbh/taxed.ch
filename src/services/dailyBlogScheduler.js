import { scheduleDailyBlogGeneration } from './aiBlogGenerator';

// Check if auto-generation is enabled
const isAutoGenerationEnabled = () => {
  try {
    return localStorage.getItem('autoGenerationEnabled') === 'true';
  } catch (error) {
    console.warn('localStorage not available:', error);
    return false;
  }
};

// Initialize daily blog scheduler
export const initializeDailyBlogScheduler = () => {
  try {
    // Check if auto-generation is enabled
    if (isAutoGenerationEnabled()) {
      scheduleDailyBlogGeneration();
    }

    // Set up interval to check daily (every hour)
    setInterval(() => {
      if (isAutoGenerationEnabled()) {
        scheduleDailyBlogGeneration();
      }
    }, 60 * 60 * 1000); // Check every hour

    // Also check when the app becomes visible (user returns to tab)
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && isAutoGenerationEnabled()) {
        scheduleDailyBlogGeneration();
      }
    });
  } catch (error) {
    // Silently handle scheduler initialization errors
  }
};

// Manual trigger for testing
export const triggerDailyGeneration = () => {
  if (isAutoGenerationEnabled()) {
    scheduleDailyBlogGeneration();
    return true;
  }
  return false;
};
