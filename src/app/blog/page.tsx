'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BlogPost } from '../../../lib/types';
import { Moon, Sun } from 'lucide-react';

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [lang, setLang] = useState<'en' | 'fr'>('en');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('cvenom-theme') || 'light';
    const savedLang = localStorage.getItem('cvenom-lang') || 'en';
    setTheme(savedTheme as 'light' | 'dark');
    setLang(savedLang as 'en' | 'fr');
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  useEffect(() => {
    fetch('/blog-data.json')
      .then(res => res.json())
      .then((data: BlogPost[]) => setPosts(data.filter((p: BlogPost) => p.lang === lang)))
      .catch(err => console.error('Failed to load blog posts:', err));
  }, [lang]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('cvenom-theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const changeLang = (newLang: 'en' | 'fr') => {
    setLang(newLang);
    localStorage.setItem('cvenom-lang', newLang);
  };

  return (
    <div className="min-h-screen">
      {/* Simple Header */}
      <nav className="nav-container">
        <div className="nav-inner">
          <Link href="/" className="nav-logo">cvenom</Link>

          <div className="flex items-center gap-4">
            {/* Language Switch */}
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-accent">
              <button
                onClick={() => changeLang('en')}
                className={`px-2 py-1 rounded text-sm font-medium transition-colors ${lang === 'en' ? 'text-[#FF6B00]' : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                EN
              </button>
              <span className="text-muted-foreground">|</span>
              <button
                onClick={() => changeLang('fr')}
                className={`px-2 py-1 rounded text-sm font-medium transition-colors ${lang === 'fr' ? 'text-[#FF6B00]' : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                FR
              </button>
            </div>

            {/* Theme Toggle */}
            <button onClick={toggleTheme} className="theme-toggle">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-12">
            {lang === 'en' ? 'Blog' : 'Blog'}
          </h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="card hover:shadow-lg transition-shadow"
              >
                <h2 className="card-title text-left">{post.title}</h2>
                <p className="card-description text-left">{post.description}</p>
                <div className="flex justify-between text-sm text-muted-foreground w-full mt-4">
                  <span>{new Date(post.date).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US')}</span>
                  <span>{post.readingTime}</span>
                </div>
              </Link>
            ))}
          </div>

          {posts.length === 0 && (
            <p className="text-center text-muted-foreground">
              {lang === 'en' ? 'No blog posts yet.' : 'Aucun article pour le moment.'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
