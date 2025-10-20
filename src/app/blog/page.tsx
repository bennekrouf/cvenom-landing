'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BlogPost } from '../../../lib/types';
import { useTranslation } from '../../../lib/i18n';
import Navigation from '../../../components/Navigation';

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [lang, setLang] = useState<'en' | 'fr'>('en');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const t = useTranslation(lang);

  useEffect(() => {
    setMounted(true);
    const savedTheme = (localStorage.getItem('cvenom-theme') as 'light' | 'dark') || 'light';
    const savedLang = (localStorage.getItem('cvenom-lang') as 'en' | 'fr') || 'en';
    setTheme(savedTheme);
    setLang(savedLang);
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

  if (!mounted) return null;

  return (
    <div className="min-h-screen">
      <Navigation
        lang={lang}
        theme={theme}
        onLangChange={changeLang}
        onThemeChange={toggleTheme}
        t={t}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

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
