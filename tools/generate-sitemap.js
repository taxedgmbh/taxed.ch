import fs from 'fs';
import blogPosts from '../src/data/blogPosts.js';

// Public, indexable routes (mirrors src/App.jsx; excludes admin, portal,
// cart/checkout, and legal-utility pages we don't want prioritized).
const BASE = 'https://taxed.ch';

const staticPages = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.9', changefreq: 'monthly' },
  { path: '/services', priority: '0.9', changefreq: 'monthly' },
  { path: '/how-it-works', priority: '0.9', changefreq: 'monthly' },
  { path: '/pricing', priority: '0.9', changefreq: 'monthly' },
  { path: '/contact', priority: '0.9', changefreq: 'monthly' },
  { path: '/store', priority: '0.8', changefreq: 'weekly' },
  { path: '/blog', priority: '0.8', changefreq: 'weekly' },
  { path: '/team', priority: '0.7', changefreq: 'monthly' },
  { path: '/careers', priority: '0.6', changefreq: 'monthly' },
  { path: '/faq', priority: '0.7', changefreq: 'monthly' },
  { path: '/case-studies', priority: '0.7', changefreq: 'monthly' },
  { path: '/testimonials', priority: '0.6', changefreq: 'monthly' },
  { path: '/industry-specializations', priority: '0.6', changefreq: 'monthly' },
  { path: '/partnership', priority: '0.5', changefreq: 'monthly' },
  { path: '/calculators', priority: '0.8', changefreq: 'monthly' },
  { path: '/resources', priority: '0.7', changefreq: 'weekly' },
  { path: '/news', priority: '0.7', changefreq: 'daily' },
  { path: '/law', priority: '0.6', changefreq: 'monthly' },
  { path: '/tax-deadlines', priority: '0.8', changefreq: 'monthly' },
  { path: '/tax-forms', priority: '0.7', changefreq: 'monthly' },
  { path: '/tax-glossary', priority: '0.6', changefreq: 'monthly' },
  { path: '/tax-updates', priority: '0.7', changefreq: 'weekly' },
  { path: '/tax-calculators', skip: true },
  { path: '/technology', priority: '0.5', changefreq: 'monthly' },
  { path: '/security', priority: '0.5', changefreq: 'monthly' },
  { path: '/support', priority: '0.6', changefreq: 'monthly' },
  { path: '/tax-compliance', priority: '0.6', changefreq: 'monthly' },
  { path: '/tax-audit-support', priority: '0.6', changefreq: 'monthly' },
  { path: '/tax-recovery', priority: '0.6', changefreq: 'monthly' },
  { path: '/tax-return-explained', priority: '0.7', changefreq: 'monthly' },
  { path: '/tax-planning-guide', priority: '0.7', changefreq: 'monthly' },
  { path: '/business-tax-guide', priority: '0.7', changefreq: 'monthly' },
  { path: '/expat-tax-guide', priority: '0.8', changefreq: 'monthly' },
  { path: '/international-tax', priority: '0.7', changefreq: 'monthly' },
  { path: '/advanced-tax-tools', priority: '0.6', changefreq: 'monthly' },
  { path: '/events', priority: '0.5', changefreq: 'monthly' },
  { path: '/webinars', priority: '0.5', changefreq: 'monthly' },
  { path: '/forum', priority: '0.5', changefreq: 'weekly' },
  { path: '/impressum', priority: '0.3', changefreq: 'yearly' },
  { path: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms', priority: '0.3', changefreq: 'yearly' },
  { path: '/accessibility', priority: '0.3', changefreq: 'yearly' }
].filter((p) => !p.skip);

const escapeXml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const urlEntry = ({ loc, lastmod, changefreq, priority }) => `  <url>
    <loc>${escapeXml(loc)}</loc>${lastmod ? `
    <lastmod>${lastmod}</lastmod>` : ''}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;

function generateSitemap() {
  const entries = [];

  // Static pages: no lastmod (a fake per-build date is worse than none)
  for (const page of staticPages) {
    entries.push(urlEntry({
      loc: `${BASE}${page.path}`,
      changefreq: page.changefreq,
      priority: page.priority
    }));
  }

  // Blog posts: real publication dates, newest first
  const posts = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
  for (const post of posts) {
    entries.push(urlEntry({
      loc: `${BASE}/blog/${post.slug}`,
      lastmod: post.date,
      changefreq: 'yearly',
      priority: post.featured ? '0.7' : '0.6'
    }));
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>
`;

  fs.writeFileSync('./public/sitemap.xml', xml);
  console.log(`✅ Sitemap generated: ${staticPages.length} pages + ${posts.length} blog posts`);
}

try {
  generateSitemap();
} catch (error) {
  console.error('Error generating sitemap:', error);
  process.exit(1);
}
