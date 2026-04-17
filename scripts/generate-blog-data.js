const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const slugify = require('slugify');
const readingTime = require('reading-time');

// marked is ESM-only in v5+; use a simple inline renderer instead
function mdToHtml(md) {
  return md
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
    .replace(/^\| (.+) \|$/gm, (_, row) => `<tr>${row.split(' | ').map(c => `<td>${c}</td>`).join('')}</tr>`)
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[hlubtpo])/gm, '')
    ;
}

function collectPosts(dir, defaultLang) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(file => file.endsWith('.md'))
    .map(filename => {
      const filePath = path.join(dir, filename);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);

      if (data.status && data.status !== 'published') return null;

      const slug = slugify(filename.replace('.md', ''), { lower: true, strict: true });
      const stats = readingTime(content);
      const html = mdToHtml(content);

      return {
        slug,
        title: data.title || 'Untitled',
        description: data.description || '',
        date: data.date || new Date().toISOString(),
        author: data.author || 'Cvenom Team',
        tags: data.tags || [],
        lang: data.lang || defaultLang,
        readingTime: stats.text,
        content: html,
        ...data,
      };
    })
    .filter(Boolean);
}

function generateBlogData() {
  const contentRoot = path.join(process.cwd(), 'content');
  let posts = [];

  // New structure: content/{lang}/blog/
  for (const lang of ['en', 'fr']) {
    posts = posts.concat(collectPosts(path.join(contentRoot, lang, 'blog'), lang));
  }

  // Legacy flat structure: content/blog/ (backwards compat)
  posts = posts.concat(collectPosts(path.join(contentRoot, 'blog'), 'en'));

  // Deduplicate by slug+lang
  const seen = new Set();
  posts = posts.filter(p => {
    const key = `${p.lang}:${p.slug}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

  fs.writeFileSync(path.join(publicDir, 'blog-data.json'), JSON.stringify(posts, null, 2));

  const en = posts.filter(p => p.lang === 'en').length;
  const fr = posts.filter(p => p.lang === 'fr').length;
  console.log(`✓ Generated blog-data.json — ${posts.length} posts (${en} en, ${fr} fr)`);
}

generateBlogData();
