'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { BlogPost } from '../../../../lib/types';
import { useAppState } from '@/lib/useAppState';
import Footer from '@/components/Footer';
import { useTranslation } from '../../../../lib/i18n';
import Navigation from '@/components/Navigation';

export default function Blog({ params }: { params: Promise<{ lang: 'en' | 'fr' }> }) {
  const { lang } = use(params);
  const [posts, setPosts] = useState<BlogPost[]>([]);

  const { theme, mobileMenuOpen, mounted, setMobileMenuOpen, toggleTheme } = useAppState();
  const t = useTranslation(lang);

  useEffect(() => {
    fetch('/blog-data.json')
      .then(res => res.json())
      .then((data: BlogPost[]) => setPosts(data.filter((p: BlogPost) => p.lang === lang)))
      .catch(err => console.error('Failed to load blog posts:', err));
  }, [lang]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen">
      <Navigation
        lang={lang}
        theme={theme}
        onThemeChange={toggleTheme}
        t={t}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-12">Blog</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
              <Link
                key={post.slug}
                href={`/${lang}/blog/${post.slug}`}
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

      <Footer lang={lang} t={t} />
    </div>
  );
}
