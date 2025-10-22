const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://cvenom.com';

const staticRoutes = [
  { path: '', priority: 1.0, changefreq: 'daily' },
  { path: '/blog', priority: 0.8, changefreq: 'weekly' },
  { path: '/contact', priority: 0.7, changefreq: 'monthly' },
  { path: '/privacy', priority: 0.5, changefreq: 'yearly' },
  { path: '/terms', priority: 0.5, changefreq: 'yearly' },
];

function generateSitemap() {
  const blogDir = path.join(process.cwd(), 'content/blog');
  let blogPosts = [];

  // Add blog posts if directory exists
  if (fs.existsSync(blogDir)) {
    blogPosts = fs.readdirSync(blogDir)
      .filter(file => file.endsWith('.md'))
      .map(file => ({
        path: `/blog/${file.replace('.md', '')}`,
        priority: 0.7,
        changefreq: 'monthly',
        lastmod: fs.statSync(path.join(blogDir, file)).mtime.toISOString().split('T')[0]
      }));
  }

  const allRoutes = [...staticRoutes, ...blogPosts];
  const currentDate = new Date().toISOString().split('T')[0];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => `  <url>
    <loc>${BASE_URL}${route.path}</loc>
    <lastmod>${route.lastmod || currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
  console.log(`✓ Sitemap generated with ${allRoutes.length} URLs`);
}

generateSitemap();
