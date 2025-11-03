import { defineConfig, devices } from '@playwright/test';

/**
 * Apple Design Validator - Playwright Configuration
 * Tests across Apple devices (iOS Safari, macOS Safari) and web responsiveness
 */
export default defineConfig({
  testDir: './tests',

  // Maximum time one test can run
  timeout: 60 * 1000,

  // Run tests in files in parallel
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI
  workers: process.env.CI ? 1 : undefined,

  // Reporter to use
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['list']
  ],

  use: {
    // Base URL to use in actions like `await page.goto('/')`
    baseURL: process.env.BASE_URL || 'http://localhost:5173',

    // Collect trace when retrying the failed test
    trace: 'on-first-retry',

    // Screenshot on failure
    screenshot: 'only-on-failure',

    // Video on failure
    video: 'retain-on-failure',
  },

  // Configure projects for major browsers and devices
  projects: [
    // Desktop Safari (macOS)
    {
      name: 'Desktop Safari',
      use: {
        ...devices['Desktop Safari'],
        viewport: { width: 1920, height: 1080 },
      },
    },

    // iPhone 15 (iOS Safari)
    {
      name: 'iPhone 15',
      use: {
        ...devices['iPhone 15'],
      },
    },

    // iPhone 15 Pro Max (iOS Safari - largest iPhone)
    {
      name: 'iPhone 15 Pro Max',
      use: {
        ...devices['iPhone 15 Pro Max'],
      },
    },

    // iPad Pro 11 (iOS Safari - tablet)
    {
      name: 'iPad Pro 11',
      use: {
        ...devices['iPad Pro 11'],
      },
    },

    // Mobile Safari (generic)
    {
      name: 'Mobile Safari',
      use: {
        ...devices['iPhone 14'],
        viewport: { width: 375, height: 667 }, // iPhone SE size
      },
    },

    // Tablet breakpoint
    {
      name: 'Tablet',
      use: {
        ...devices['iPad (gen 7)'],
        viewport: { width: 768, height: 1024 },
      },
    },

    // Desktop (large)
    {
      name: 'Desktop Large',
      use: {
        ...devices['Desktop Safari'],
        viewport: { width: 2560, height: 1440 },
      },
    },

    // Chrome for comparison (not Apple, but useful)
    {
      name: 'Desktop Chrome',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
    },
  ],

  // Run your local dev server before starting the tests
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
