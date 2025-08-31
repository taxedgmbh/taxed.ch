import { scheduleDailyBlogGeneration } from './aiBlogGenerator';

// Check if auto-generation is enabled
const isAutoGenerationEnabled = () => {
  return localStorage.getItem('autoGenerationEnabled') === 'true';
};

// Initialize daily blog scheduler
export const initializeDailyBlogScheduler = () => {
  // Check if auto-generation is enabled
  if (isAutoGenerationEnabled()) {
    console.log('Auto-generation is enabled. Checking for daily blog generation...');
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
      console.log('App became visible. Checking for daily blog generation...');
      scheduleDailyBlogGeneration();
    }
  });
};

// Manual trigger for testing
export const triggerDailyGeneration = () => {
  if (isAutoGenerationEnabled()) {
    scheduleDailyBlogGeneration();
    return true;
  }
  return false;
};
