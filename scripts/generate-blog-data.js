const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');
const slugify = require('slugify');
const readingTime = require('reading-time');

function generateBlogData() {
  const blogDir = path.join(process.cwd(), 'content/blog');

  if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir, { recursive: true });
    console.log('Blog directory created');
    return;
  }

  const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.md'));

  const posts = files.map(filename => {
    const filePath = path.join(blogDir, filename);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    const slug = slugify(filename.replace('.md', ''), { lower: true, strict: true });
    const stats = readingTime(content);
    const html = marked(content);

    return {
      slug,
      title: data.title || 'Untitled',
      description: data.description || '',
      date: data.date || new Date().toISOString(),
      author: data.author || 'Cvenom Team',
      tags: data.tags || [],
      lang: data.lang || 'en',
      readingTime: stats.text,
      content: html,
      ...data
    };
  });

  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  const outputPath = path.join(process.cwd(), 'public/blog-data.json');
  fs.writeFileSync(outputPath, JSON.stringify(posts, null, 2));

  console.log(`Generated blog data for ${posts.length} posts`);
}

generateBlogData();
