import fs from 'fs';
import RSS from 'rss';
// Import blog posts data
const blogPosts = [
  {
    title: "Swiss Tax Guide for Expats 2024",
    summary: "Complete guide to Swiss tax obligations for expatriates living and working in Switzerland.",
    slug: "swiss-tax-guide-expats-2024",
    author: "Taxed GmbH Team",
    date: "2024-01-15",
    tags: ["Expat Taxes", "Swiss Tax", "Guide"]
  },
  {
    title: "Understanding Quellensteuer: Withholding Tax in Switzerland",
    summary: "Everything you need to know about Quellensteuer and how it affects foreign workers in Switzerland.",
    slug: "quellensteuer-withholding-tax-switzerland",
    author: "Taxed GmbH Team",
    date: "2024-01-10",
    tags: ["Quellensteuer", "Withholding Tax", "Foreign Workers"]
  },
  {
    title: "Digital Tax Filing: The Future of Swiss Tax Returns",
    summary: "How digitalization is transforming the Swiss tax filing process and what it means for taxpayers.",
    slug: "digital-tax-filing-switzerland",
    author: "Taxed GmbH Team",
    date: "2024-01-05",
    tags: ["Digital Filing", "Tax Technology", "Swiss Tax"]
  }
];

function generateRssFeed() {
  const feed = new RSS({
    title: 'Taxed GmbH Blog',
    description: 'Expert insights and guides on Swiss taxes for expatriates.',
    feed_url: 'https://www.taxed.ch/rss.xml',
    site_url: 'https://www.taxed.ch',
    image_url: 'https://www.taxed.ch/logo.png',
    language: 'en',
    pubDate: new Date(),
    copyright: `© ${new Date().getFullYear()} Taxed GmbH`,
  });

  blogPosts.forEach(post => {
    feed.item({
      title: post.title,
      description: post.summary,
      url: `https://www.taxed.ch/blog/${post.slug}`,
      guid: post.slug,
      author: post.author,
      date: post.date,
      categories: post.tags,
    });
  });

  const xml = feed.xml({ indent: true });
  fs.writeFileSync('./public/rss.xml', xml);
  console.log('✅ RSS feed generated successfully!');
}

try {
  generateRssFeed();
} catch (error) {
  console.error('Error generating RSS feed:', error);
}
