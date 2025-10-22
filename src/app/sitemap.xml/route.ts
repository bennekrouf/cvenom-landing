import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://cvenom.com';

const staticRoutes: Array<{
  path: string;
  priority: number;
  changefreq: string;
  lastmod?: string;
}> = [
    { path: '', priority: 1.0, changefreq: 'daily' },
    { path: '/blog', priority: 0.8, changefreq: 'weekly' },
    { path: '/contact', priority: 0.7, changefreq: 'monthly' },
    { path: '/privacy', priority: 0.5, changefreq: 'yearly' },
    { path: '/terms', priority: 0.5, changefreq: 'yearly' },
  ];

function generateSitemap() {
  const blogDir = path.join(process.cwd(), 'content/blog');
  let blogPosts: Array<{
    path: string;
    priority: number;
    changefreq: string;
    lastmod?: string;
  }> = [];

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

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => `  <url>
    <loc>${BASE_URL}${route.path}</loc>
    <lastmod>${route.lastmod || currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
}

export async function GET() {
  const sitemap = generateSitemap();

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
