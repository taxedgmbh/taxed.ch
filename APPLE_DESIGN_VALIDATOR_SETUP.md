# Apple Design Validator - CI/CD Setup Guide

## Overview

The Apple Design Validator is an autonomous agent that continuously monitors and fixes UI/UX violations against Apple's Human Interface Guidelines (HIG). It runs automated tests, detects violations, and can autonomously create pull requests with fixes.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     GitHub Actions Workflow                  │
│  (Triggers: push, PR, schedule, manual)                     │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              Playwright Tests (Cross-Platform)               │
│  • iOS Safari (iPhone, iPad)                                │
│  • macOS Safari                                             │
│  • Responsive breakpoints (375px, 768px, 1920px)           │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                 Apple HIG Compliance Tests                   │
│  ✓ Touch targets (≥44×44pt)                                │
│  ✓ Color contrast (WCAG AA)                                │
│  ✓ Accessibility labels                                    │
│  ✓ Typography (min 16px)                                   │
│  ✓ Responsive layouts                                      │
│  ✓ Performance (LCP <2.5s)                                 │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼ (if failures detected)
┌─────────────────────────────────────────────────────────────┐
│            Apple Design Validator Agent                      │
│  1. Analyze failures                                        │
│  2. Generate code fixes                                     │
│  3. Create branch                                           │
│  4. Apply fixes                                             │
│  5. Re-run tests                                            │
│  6. Create PR                                               │
└─────────────────────────────────────────────────────────────┘
```

## Setup Instructions

### 1. Install Dependencies

```bash
cd ~/github/taxedgmbh/taxed.ch
npm install
```

This will install:
- `@playwright/test` - Cross-browser testing framework
- All existing project dependencies

### 2. Install Playwright Browsers

```bash
npx playwright install --with-deps
```

This installs:
- Chromium (for baseline testing)
- WebKit (Safari rendering engine - for iOS/macOS simulation)
- Firefox (optional, for comparison)

### 3. Verify Setup

Run the Apple Design compliance tests locally:

```bash
npm run test:apple-design
```

Expected output:
```
Running 20 tests using 8 workers

  ✓ Apple HIG Compliance - Touch Targets (4 tests)
  ✓ Apple HIG Compliance - Color Contrast (2 tests)
  ✓ Apple HIG Compliance - Accessibility Labels (2 tests)
  ✓ Apple HIG Compliance - Responsive Layout (3 tests)
  ✓ Apple HIG Compliance - Typography (2 tests)
  ✓ Apple HIG Compliance - Performance (2 tests)

  20 passed (1.5m)
```

### 4. GitHub Actions Configuration

The workflow is already configured in `.github/workflows/apple-design-audit.yml`.

**Triggers**:
- Push to `main` or `develop` branches
- Pull requests targeting `main` or `develop`
- Weekly schedule (Mondays at 9am UTC)
- Manual dispatch via GitHub UI

**Required Secrets** (none currently):
The workflow uses `GITHUB_TOKEN` (automatically provided) for:
- Creating issues
- Commenting on PRs
- Uploading artifacts

### 5. Agent Configuration

The Apple Design Validator agent is configured in:
```
~/.claude/agents/apple-design-validator.md
```

To use it locally:
```bash
# Just analyze (no fixes)
npm run validate:design

# Apply automated fixes
npm run validate:design:fix

# Apply fixes and create PR
npm run validate:design:pr
```

## Usage

### Local Development Workflow

1. **During development**, run tests continuously:
```bash
npm run test:ui
# Opens Playwright UI for interactive testing
```

2. **Before committing**, validate design compliance:
```bash
npm run validate:design
```

3. **If violations found**, review the fix plan:
```bash
cat audit-results/fix-plan.md
```

4. **Apply automated fixes**:
```bash
npm run validate:design:fix
```

5. **Create PR with fixes**:
```bash
npm run validate:design:pr
# This creates a new branch and opens a PR
```

### CI/CD Workflow

1. **Push code** to GitHub
2. **GitHub Actions** automatically runs Apple Design Audit
3. **If tests pass**: ✅ Green check, no action needed
4. **If tests fail**:
   - 📊 Playwright report uploaded as artifact
   - 🐛 GitHub issue created with violation details
   - 💬 PR comment added (if applicable)
   - 🤖 Agent analysis triggered

5. **Review agent output** in GitHub issue
6. **Manual or automated PR** created with fixes
7. **Review and merge** the PR

## Test Coverage

### Touch Targets (Apple HIG)
- **Requirement**: All interactive elements ≥44×44 points
- **Reference**: [Apple HIG - Layout](https://developer.apple.com/design/human-interface-guidelines/layout#Best-practices)
- **Tests**: Validates all buttons, links, form inputs

### Color Contrast (WCAG AA)
- **Requirement**:
  - Normal text: 4.5:1 contrast ratio
  - Large text (≥24px): 3:1 contrast ratio
- **Reference**: [WCAG 2.1](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum)
- **Tests**: Analyzes all text elements against backgrounds

### Accessibility
- **Requirements**:
  - All images have alt text or aria-label
  - All buttons have accessible names
  - Proper heading hierarchy (single h1, logical h2-h6)
- **Reference**: [Apple Accessibility](https://developer.apple.com/accessibility/)
- **Tests**: VoiceOver compatibility checks

### Responsive Design
- **Breakpoints**:
  - Mobile: 375px (iPhone SE)
  - Tablet: 768px (iPad)
  - Desktop: 1920px (standard desktop)
- **Tests**: No horizontal scroll, proper spacing, optimal reading width

### Typography
- **Requirements**:
  - Minimum body text: 16px
  - Proper heading hierarchy
  - Legible line height and spacing
- **Tests**: Font size validation, hierarchy checks

### Performance
- **Requirements**:
  - Page load: <3 seconds
  - Largest Contentful Paint (LCP): <2.5s
- **Reference**: [Core Web Vitals](https://web.dev/vitals/)
- **Tests**: Performance timing analysis

## Automated Fixes

The agent can automatically fix common violations:

### Example 1: Touch Target Too Small
**Detection**:
```
Button "Submit" has insufficient touch target: 30×30px (minimum: 44×44px)
```

**Auto-fix**:
```jsx
// Before
<button className="btn">Submit</button>

// After
<button className="btn" style={{ minWidth: '44px', minHeight: '44px' }}>Submit</button>
```

### Example 2: Insufficient Contrast
**Detection**:
```
Text "Secondary label" has insufficient contrast: 3.2:1 (minimum: 4.5:1)
```

**Auto-fix**:
```css
/* Before */
.text-gray {
  color: #9E9E9E; /* 3.2:1 contrast on white */
}

/* After */
.text-gray {
  color: #616161; /* 4.6:1 contrast on white */
}
```

### Example 3: Missing Accessibility Label
**Detection**:
```
Button without accessible name found (icon button)
```

**Auto-fix**:
```jsx
// Before
<button onClick={handleClose}>
  <IconX />
</button>

// After
<button onClick={handleClose} aria-label="Close dialog">
  <IconX />
</button>
```

## Customization

### Add Custom Tests

Create new test files in `tests/`:
```typescript
// tests/custom-brand-compliance.spec.ts
import { test, expect } from '@playwright/test';

test('Brand-specific button styles', async ({ page }) => {
  await page.goto('/');
  const primaryBtn = page.locator('button.primary').first();

  // Check brand color
  const bgColor = await primaryBtn.evaluate(el =>
    window.getComputedStyle(el).backgroundColor
  );

  expect(bgColor).toBe('rgb(0, 100, 200)'); // Your brand blue
});
```

### Modify Validation Rules

Edit `tests/apple-design-compliance.spec.ts`:
```typescript
// Change minimum touch target (default: 44px)
const violations = await validateTouchTargets(page, 48); // Stricter: 48px

// Adjust contrast ratio (default: 4.5:1)
const minRatio = fontSize >= 24 ? 3.5 : 5.0; // Stricter ratios
```

### Add Platform-Specific Tests

For iOS-specific features:
```typescript
test.describe('iOS-specific features', () => {
  test('Dynamic Type support', async ({ page }) => {
    // Test that text scales properly with system font size
    // (Simulated via viewport adjustments)
  });

  test('Safe Area handling', async ({ page }) => {
    // Test that content respects safe areas (notch, home indicator)
  });
});
```

## Troubleshooting

### Tests fail locally but pass in CI
- **Cause**: Different viewport sizes or device emulation
- **Fix**: Check `playwright.config.ts` viewport settings match CI

### Playwright installation issues
```bash
# Reinstall with system dependencies
npx playwright install --with-deps --force
```

### Agent script not executing
```bash
# Ensure script is executable
chmod +x scripts/apple-design-validator.sh

# Run directly
./scripts/apple-design-validator.sh
```

### GitHub Actions workflow not triggering
- Check branch protection rules
- Verify workflow file is on `main` branch
- Manually trigger via GitHub UI: Actions → Apple Design Audit → Run workflow

## Resources

### Apple Documentation
- [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Accessibility](https://developer.apple.com/accessibility/)
- [SF Symbols](https://developer.apple.com/sf-symbols/)
- [WWDC Videos](https://developer.apple.com/videos/)

### Web Standards
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Core Web Vitals](https://web.dev/vitals/)

### Testing Tools
- [Playwright Documentation](https://playwright.dev/)
- [Axe Accessibility Testing](https://www.deque.com/axe/)

### CI/CD
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Dagger (Self-Healing CI)](https://dagger.io/)

## Next Steps

1. ✅ **Setup complete** - All files created
2. 🔧 **Install dependencies**: `npm install`
3. 🎭 **Install Playwright**: `npx playwright install --with-deps`
4. ✅ **Run tests**: `npm run test:apple-design`
5. 🚀 **Commit and push** to trigger CI/CD pipeline
6. 🤖 **Monitor** GitHub Actions for automated validation

---

**Questions or Issues?**
- Review the [agent configuration](~/.claude/agents/apple-design-validator.md)
- Check [GitHub Actions logs](https://github.com/taxedgmbh/taxed.ch/actions)
- File an issue in the repository

🤖 Apple Design Validator - Autonomous Design Compliance
