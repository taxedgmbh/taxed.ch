import fs from 'fs';
import blogPosts from '../src/data/blogPosts.js';

// Lightweight index (no post bodies) so pages can list recent posts
// without pulling the full blog data into their bundle.
const index = [...blogPosts]
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .map(({ slug, title, date, category, readTime }) => ({ slug, title, date, category, readTime }));

fs.writeFileSync('./src/data/blogIndex.json', JSON.stringify(index, null, 2) + '\n');
console.log(`✅ Blog index generated: ${index.length} posts`);
