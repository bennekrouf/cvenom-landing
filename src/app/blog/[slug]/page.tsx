'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { BlogPost } from '../../../../lib/types';
import { useAppState } from '@/lib/useAppState';
import { useTranslation } from '../../../../lib/i18n';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [notFound, setNotFound] = useState(false);

  const { theme, lang, mobileMenuOpen, mounted, setMobileMenuOpen, toggleTheme, changeLang } = useAppState();
  const t = useTranslation(lang);

  useEffect(() => {
    if (!slug) return;
    fetch('/blog-data.json')
      .then(res => res.json())
      .then((data: BlogPost[]) => {
        // Find post matching slug + current lang, fall back to any lang
        const match = data.find(p => p.slug === slug && p.lang === lang)
          ?? data.find(p => p.slug === slug);
        if (match) setPost(match);
        else setNotFound(true);
      })
      .catch(() => setNotFound(true));
  }, [slug, lang]);

  if (!mounted) return null;

  if (notFound) {
    return (
      <div className="min-h-screen">
        <Navigation lang={lang} theme={theme} onLangChange={changeLang} onThemeChange={toggleTheme} t={t} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
        <div className="pt-32 pb-16 container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-muted-foreground mb-8">Post not found.</p>
          <Link href="/blog" className="btn-primary">← Back to blog</Link>
        </div>
        <Footer t={t} />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen">
        <Navigation lang={lang} theme={theme} onLangChange={changeLang} onThemeChange={toggleTheme} t={t} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
        <div className="pt-32 pb-16 container mx-auto px-4 text-center">
          <p className="text-muted-foreground">Loading…</p>
        </div>
        <Footer t={t} />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation lang={lang} theme={theme} onLangChange={changeLang} onThemeChange={toggleTheme} t={t} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      <article className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">

          {/* Back */}
          <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground mb-8 inline-block">
            ← {lang === 'fr' ? 'Retour au blog' : 'Back to blog'}
          </Link>

          {/* Header */}
          <header className="mb-10">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map(tag => (
                <span key={tag} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <p className="text-lg text-muted-foreground mb-6">{post.description}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground border-t border-b py-4">
              <span>{post.author}</span>
              <span>·</span>
              <span>{new Date(post.date).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span>·</span>
              <span>{post.readingTime}</span>
            </div>
          </header>

          {/* Content */}
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>

      <Footer t={t} />
    </div>
  );
}
