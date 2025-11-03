# Apple Design Validator - Quick Start

## Installation (5 minutes)

```bash
# 1. Navigate to project
cd ~/github/taxedgmbh/taxed.ch

# 2. Install dependencies
npm install

# 3. Install Playwright browsers
npx playwright install --with-deps

# 4. Done! ✅
```

## Run Your First Test

```bash
# Run all Apple Design compliance tests
npm run test:apple-design
```

You should see output like:
```
✓ Touch Targets: All interactive elements ≥44×44pt
✓ Color Contrast: WCAG AA compliance
✓ Accessibility: All elements properly labeled
✓ Responsive: Works on mobile, tablet, desktop
✓ Typography: Minimum 16px, proper hierarchy
✓ Performance: LCP <2.5s
```

## If Tests Fail

```bash
# 1. See what failed
npm run test:report

# 2. Generate fix plan
npm run validate:design

# 3. Review fixes
cat audit-results/fix-plan.md

# 4. Apply automated fixes
npm run validate:design:fix

# 5. Create PR with fixes
npm run validate:design:pr
```

## CI/CD Integration

Already configured! Just push to GitHub:

```bash
git add .
git commit -m "Add Apple Design Validator CI/CD"
git push origin main
```

GitHub Actions will automatically:
1. ✅ Run tests on every push
2. 📊 Generate compliance reports
3. 🐛 Create issues if violations found
4. 🤖 Prepare automated fixes

## What Gets Tested

| Category | Test | Apple HIG Reference |
|----------|------|---------------------|
| **Touch Targets** | All buttons/links ≥44×44pt | [Layout Guidelines](https://developer.apple.com/design/human-interface-guidelines/layout#Best-practices) |
| **Color Contrast** | Text contrast ≥4.5:1 (WCAG AA) | [WCAG 2.1](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum) |
| **Accessibility** | Alt text, labels, hierarchy | [Apple Accessibility](https://developer.apple.com/accessibility/) |
| **Responsive** | Mobile (375px), Tablet (768px), Desktop (1920px) | [Adaptivity & Layout](https://developer.apple.com/design/human-interface-guidelines/layout) |
| **Typography** | Min 16px body text, heading hierarchy | [Typography](https://developer.apple.com/design/human-interface-guidelines/typography) |
| **Performance** | LCP <2.5s, page load <3s | [Core Web Vitals](https://web.dev/vitals/) |

## Project Structure

```
taxed.ch/
├── .github/workflows/
│   └── apple-design-audit.yml      # CI/CD workflow
├── tests/
│   └── apple-design-compliance.spec.ts  # Test suite
├── scripts/
│   └── apple-design-validator.sh   # Autonomous fix script
├── playwright.config.ts            # Test configuration
├── audit-results/                  # Generated reports
├── package.json                    # Updated with test scripts
└── APPLE_DESIGN_VALIDATOR_SETUP.md # Full documentation
```

## Available Commands

```bash
# Run tests
npm test                    # All Playwright tests
npm run test:apple-design   # Apple Design tests only
npm run test:ui             # Interactive test UI
npm run test:report         # View last test report

# Validation
npm run validate:design     # Analyze only (no fixes)
npm run validate:design:fix # Apply automated fixes
npm run validate:design:pr  # Fix + create PR
```

## Devices Tested

- ✅ **iPhone 15** (390×844px)
- ✅ **iPhone 15 Pro Max** (430×932px)
- ✅ **iPad Pro 11** (834×1194px)
- ✅ **Desktop Safari** (1920×1080px)
- ✅ **Mobile Safari** (375×667px - iPhone SE)

## Next Steps

1. ✅ **You're all set!** Tests are ready to run
2. 📖 Read [full documentation](./APPLE_DESIGN_VALIDATOR_SETUP.md) for advanced features
3. 🚀 Push to GitHub to activate CI/CD
4. 🤖 Agent will automatically monitor and fix violations

## Troubleshooting

**Tests won't run?**
```bash
# Reinstall Playwright
npx playwright install --with-deps --force
```

**Script permission denied?**
```bash
chmod +x scripts/apple-design-validator.sh
```

**Need help?**
- See [full setup guide](./APPLE_DESIGN_VALIDATOR_SETUP.md)
- Check [agent config](~/.claude/agents/apple-design-validator.md)

---

🤖 **Apple Design Validator** - Autonomous Design Compliance for Apple HIG
