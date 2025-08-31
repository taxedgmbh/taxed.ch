import fs from 'fs';
import RSS from 'rss';
import { blogPosts } from '../src/data/blogPosts.js';

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
