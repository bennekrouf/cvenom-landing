const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://cvenom.com';

const routes = [
  { path: '', priority: 1.0, changefreq: 'daily' },
  { path: '/blog', priority: 0.8, changefreq: 'weekly' },
  { path: '/about', priority: 0.7, changefreq: 'monthly' },
  { path: '/contact', priority: 0.6, changefreq: 'monthly' },
  { path: '/privacy', priority: 0.5, changefreq: 'yearly' },
  { path: '/terms', priority: 0.5, changefreq: 'yearly' },
];

function generateSitemap() {
  const blogDir = path.join(process.cwd(), 'content/blog');
  let blogPosts = [];

  if (fs.existsSync(blogDir)) {
    blogPosts = fs.readdirSync(blogDir)
      .filter(file => file.endsWith('.md'))
      .map(file => ({
        path: `/blog/${file.replace('.md', '')}`,
        priority: 0.7,
        changefreq: 'monthly'
      }));
  }

  const allRoutes = [...routes, ...blogPosts];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => `  <url>
    <loc>${BASE_URL}${route.path}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(process.cwd(), 'public/sitemap.xml'), sitemap);
  console.log('Sitemap generated successfully!');
}

generateSitemap();
