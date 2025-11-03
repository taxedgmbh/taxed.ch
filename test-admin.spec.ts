import { test, expect } from '@playwright/test';

test('Check admin panel loads', async ({ page }) => {
  // Listen for console messages
  page.on('console', msg => {
    console.log(`[Browser Console ${msg.type()}]:`, msg.text());
  });

  // Listen for page errors
  page.on('pageerror', error => {
    console.error('[Page Error]:', error.message);
  });

  // Navigate to admin panel
  await page.goto('http://localhost:5173/admin');

  // Wait for page to load
  await page.waitForTimeout(3000);

  // Take a screenshot
  await page.screenshot({ path: 'admin-panel-test.png', fullPage: true });

  // Check page title
  const title = await page.title();
  console.log('Page title:', title);

  // Check if there's any content
  const bodyText = await page.locator('body').innerText();
  console.log('Body text length:', bodyText.length);
  console.log('First 200 chars:', bodyText.substring(0, 200));

  // Get HTML to debug
  const html = await page.content();
  console.log('HTML includes "Tax Expert Portal":', html.includes('Tax Expert Portal'));
  console.log('HTML includes "Sign in":', html.includes('Sign in'));
});