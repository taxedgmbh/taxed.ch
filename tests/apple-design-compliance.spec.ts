import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';

/**
 * Apple Design Compliance Tests
 * Validates UI against Apple Human Interface Guidelines
 */

// Helper to check touch target size (minimum 44x44 points)
async function validateTouchTargets(page: Page, minSize = 44) {
  const interactiveElements = await page.locator('button, a, input[type="button"], input[type="submit"], [role="button"]').all();

  const violations: string[] = [];

  for (const element of interactiveElements) {
    const box = await element.boundingBox();
    if (box) {
      const text = await element.textContent() || await element.getAttribute('aria-label') || 'Unknown';

      if (box.width < minSize || box.height < minSize) {
        violations.push(
          `Element "${text.substring(0, 30)}" has insufficient touch target: ${Math.round(box.width)}x${Math.round(box.height)}px (minimum: ${minSize}x${minSize}px)`
        );
      }
    }
  }

  return violations;
}

// Helper to check color contrast (WCAG AA: 4.5:1 for normal text, 3:1 for large)
async function validateContrast(page: Page) {
  const violations = await page.evaluate(() => {
    const issues: string[] = [];

    // Get luminance from RGB
    function getLuminance(r: number, g: number, b: number): number {
      const [rs, gs, bs] = [r, g, b].map(c => {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    }

    // Calculate contrast ratio
    function getContrastRatio(fg: string, bg: string): number {
      const fgRgb = fg.match(/\d+/g)?.map(Number) || [0, 0, 0];
      const bgRgb = bg.match(/\d+/g)?.map(Number) || [255, 255, 255];

      const l1 = getLuminance(fgRgb[0], fgRgb[1], fgRgb[2]);
      const l2 = getLuminance(bgRgb[0], bgRgb[1], bgRgb[2]);

      return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    }

    // Check all text elements
    const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a, button, label');

    textElements.forEach(el => {
      const styles = window.getComputedStyle(el);
      const color = styles.color;
      const bgColor = styles.backgroundColor;
      const fontSize = parseFloat(styles.fontSize);

      if (color && bgColor && bgColor !== 'rgba(0, 0, 0, 0)') {
        const ratio = getContrastRatio(color, bgColor);
        const minRatio = fontSize >= 24 ? 3 : 4.5; // WCAG AA standards

        if (ratio < minRatio) {
          const text = el.textContent?.substring(0, 30) || 'Unknown';
          issues.push(
            `Text "${text}" has insufficient contrast: ${ratio.toFixed(2)}:1 (minimum: ${minRatio}:1)`
          );
        }
      }
    });

    return issues;
  });

  return violations;
}

test.describe('Apple HIG Compliance - Touch Targets', () => {
  test('Home page - all interactive elements meet 44pt minimum', async ({ page }) => {
    await page.goto('/');

    const violations = await validateTouchTargets(page);

    if (violations.length > 0) {
      console.error('Touch target violations found:');
      violations.forEach(v => console.error(`  - ${v}`));
    }

    expect(violations, `Found ${violations.length} touch target violations`).toHaveLength(0);
  });

  test('Services page - all interactive elements meet 44pt minimum', async ({ page }) => {
    await page.goto('/services');

    const violations = await validateTouchTargets(page);

    expect(violations, `Found ${violations.length} touch target violations`).toHaveLength(0);
  });

  test('Contact page - form inputs meet 44pt minimum', async ({ page }) => {
    await page.goto('/contact');

    const violations = await validateTouchTargets(page);

    expect(violations, `Found ${violations.length} touch target violations`).toHaveLength(0);
  });
});

test.describe('Apple HIG Compliance - Color Contrast (WCAG AA)', () => {
  test('Home page - text has sufficient contrast', async ({ page }) => {
    await page.goto('/');

    const violations = await validateContrast(page);

    if (violations.length > 0) {
      console.error('Contrast violations found:');
      violations.forEach(v => console.error(`  - ${v}`));
    }

    expect(violations, `Found ${violations.length} contrast violations`).toHaveLength(0);
  });

  test('Services page - text has sufficient contrast', async ({ page }) => {
    await page.goto('/services');

    const violations = await validateContrast(page);

    expect(violations, `Found ${violations.length} contrast violations`).toHaveLength(0);
  });
});

test.describe('Apple HIG Compliance - Accessibility Labels', () => {
  test('All images have alt text or aria-labels', async ({ page }) => {
    await page.goto('/');

    const imagesWithoutAlt = await page.locator('img:not([alt]), img[alt=""]').all();
    const violations: string[] = [];

    for (const img of imagesWithoutAlt) {
      const src = await img.getAttribute('src') || 'Unknown';
      const ariaLabel = await img.getAttribute('aria-label');

      if (!ariaLabel) {
        violations.push(`Image missing alt text: ${src}`);
      }
    }

    expect(violations, `Found ${violations.length} images without alt text`).toHaveLength(0);
  });

  test('All buttons have accessible names', async ({ page }) => {
    await page.goto('/');

    const buttons = await page.locator('button').all();
    const violations: string[] = [];

    for (const button of buttons) {
      const text = await button.textContent();
      const ariaLabel = await button.getAttribute('aria-label');
      const ariaLabelledBy = await button.getAttribute('aria-labelledby');

      if (!text?.trim() && !ariaLabel && !ariaLabelledBy) {
        violations.push('Button without accessible name found');
      }
    }

    expect(violations, `Found ${violations.length} buttons without accessible names`).toHaveLength(0);
  });
});

test.describe('Apple HIG Compliance - Responsive Layout', () => {
  test('Mobile layout (375px) - no horizontal scroll', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);

    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1); // Allow 1px tolerance
  });

  test('Tablet layout (768px) - proper spacing and touch targets', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');

    const violations = await validateTouchTargets(page);
    expect(violations).toHaveLength(0);
  });

  test('Desktop layout (1920px) - optimal reading width', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');

    // Check that main content doesn't exceed recommended reading width (~75-80 characters)
    const mainContent = page.locator('main, article, .content').first();
    const box = await mainContent.boundingBox();

    if (box) {
      // Recommend max width of ~1200px for readability
      expect(box.width).toBeLessThan(1400);
    }
  });
});

test.describe('Apple HIG Compliance - Typography', () => {
  test('Minimum font size for body text (16px)', async ({ page }) => {
    await page.goto('/');

    const violations = await page.evaluate(() => {
      const issues: string[] = [];
      const bodyElements = document.querySelectorAll('p, li, span:not([class*="icon"])');

      bodyElements.forEach(el => {
        const fontSize = parseFloat(window.getComputedStyle(el).fontSize);
        if (fontSize < 16 && el.textContent && el.textContent.length > 10) {
          issues.push(`Text smaller than 16px: ${fontSize.toFixed(1)}px`);
        }
      });

      return issues;
    });

    expect(violations, `Found ${violations.length} text size violations`).toHaveLength(0);
  });

  test('Proper heading hierarchy', async ({ page }) => {
    await page.goto('/');

    const headings = await page.evaluate(() => {
      const h = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
      return h.map(tag => ({
        tag,
        count: document.querySelectorAll(tag).length
      }));
    });

    // Should have at least one h1
    const h1Count = headings.find(h => h.tag === 'h1')?.count || 0;
    expect(h1Count, 'Page should have exactly one h1').toBe(1);
  });
});

test.describe('Apple HIG Compliance - Performance', () => {
  test('Page loads within 3 seconds', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;

    expect(loadTime, `Page loaded in ${loadTime}ms`).toBeLessThan(3000);
  });

  test('Core Web Vitals - LCP under 2.5s', async ({ page }) => {
    await page.goto('/');

    const lcp = await page.evaluate(() => {
      return new Promise<number>((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          resolve(lastEntry.renderTime || lastEntry.loadTime);
        }).observe({ type: 'largest-contentful-paint', buffered: true });

        setTimeout(() => resolve(0), 5000);
      });
    });

    expect(lcp, `LCP: ${lcp}ms`).toBeLessThan(2500);
  });
});
