const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const slugify = require('slugify');
const readingTime = require('reading-time');

// Full markdown → HTML converter (no external deps)
function mdToHtml(md) {
  const lines = md.split('\n');
  const out = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Headings
    if (/^### /.test(line)) { out.push(`<h3>${inline(line.slice(4))}</h3>`); i++; continue; }
    if (/^## /.test(line))  { out.push(`<h2>${inline(line.slice(3))}</h2>`); i++; continue; }
    if (/^# /.test(line))   { out.push(`<h1>${inline(line.slice(2))}</h1>`); i++; continue; }

    // Horizontal rule
    if (/^---+$/.test(line.trim())) { out.push('<hr>'); i++; continue; }

    // Blockquote
    if (/^> /.test(line)) {
      const qlines = [];
      while (i < lines.length && /^> /.test(lines[i])) {
        qlines.push(inline(lines[i].slice(2)));
        i++;
      }
      out.push(`<blockquote><p>${qlines.join('<br>')}</p></blockquote>`);
      continue;
    }

    // Unordered list
    if (/^- /.test(line)) {
      const items = [];
      while (i < lines.length && /^- /.test(lines[i])) {
        items.push(`<li>${inline(lines[i].slice(2))}</li>`);
        i++;
      }
      out.push(`<ul>${items.join('')}</ul>`);
      continue;
    }

    // Table (lines starting with |)
    if (/^\|/.test(line)) {
      const rows = [];
      while (i < lines.length && /^\|/.test(lines[i])) {
        const raw = lines[i];
        // Skip separator rows like |---|---|
        if (/^\|[\s\-|:]+\|$/.test(raw)) { i++; continue; }
        const cells = raw.replace(/^\||\|$/g, '').split('|').map(c => c.trim());
        rows.push(cells);
        i++;
      }
      if (rows.length > 0) {
        const header = rows[0].map(c => `<th>${inline(c)}</th>`).join('');
        const body = rows.slice(1).map(r =>
          `<tr>${r.map(c => `<td>${inline(c)}</td>`).join('')}</tr>`
        ).join('');
        out.push(`<table><thead><tr>${header}</tr></thead><tbody>${body}</tbody></table>`);
      }
      continue;
    }

    // Fenced code block
    if (/^```/.test(line)) {
      const lang = line.slice(3).trim();
      const codeLines = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i])) {
        codeLines.push(lines[i].replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'));
        i++;
      }
      i++; // skip closing ```
      out.push(`<pre><code${lang ? ` class="language-${lang}"` : ''}>${codeLines.join('\n')}</code></pre>`);
      continue;
    }

    // Empty line
    if (line.trim() === '') { i++; continue; }

    // Paragraph
    const paraLines = [];
    while (i < lines.length && lines[i].trim() !== '' && !/^[#>|`-]/.test(lines[i]) && !/^---/.test(lines[i])) {
      paraLines.push(lines[i]);
      i++;
    }
    if (paraLines.length) {
      out.push(`<p>${inline(paraLines.join(' '))}</p>`);
    }
  }

  return out.join('\n');
}

// Inline markdown: bold, italic, code, links
function inline(text) {
  return text
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
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

  for (const lang of ['en', 'fr']) {
    posts = posts.concat(collectPosts(path.join(contentRoot, lang, 'blog'), lang));
  }

  // Legacy flat structure: content/blog/
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
