'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { BlogPost } from '../../../../../lib/types';
import { useAppState } from '@/lib/useAppState';
import { useTranslation } from '../../../../../lib/i18n';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

function ShareButtons({ lang, title, slug }: { lang: string; title: string; slug: string }) {
  const url = `https://cvenom.com/${lang}/blog/${slug}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  const label = lang === 'fr' ? 'Partager' : 'Share';

  return (
    <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <span className="text-sm font-medium text-muted-foreground">{label}:</span>
      <div className="flex gap-3">
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-accent transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          X / Twitter
        </a>
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-accent transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          LinkedIn
        </a>
        <button
          onClick={() => navigator.clipboard?.writeText(url)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-accent transition-colors"
          title={lang === 'fr' ? 'Copier le lien' : 'Copy link'}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>
          </svg>
          {lang === 'fr' ? 'Copier le lien' : 'Copy link'}
        </button>
      </div>
    </div>
  );
}

export default function BlogPostPage({ params }: { params: Promise<{ lang: 'en' | 'fr'; slug: string }> }) {
  const { lang, slug } = use(params);

  const [post, setPost] = useState<BlogPost | null>(null);
  const [notFound, setNotFound] = useState(false);

  const { theme, mobileMenuOpen, mounted, setMobileMenuOpen, toggleTheme } = useAppState();
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
        <Navigation lang={lang} theme={theme} onThemeChange={toggleTheme} t={t} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
        <div className="pt-32 pb-16 container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-muted-foreground mb-8">Post not found.</p>
          <Link href={`/${lang}/blog`} className="btn-primary">← {lang === 'fr' ? 'Retour au blog' : 'Back to blog'}</Link>
        </div>
        <Footer lang={lang} t={t} />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen">
        <Navigation lang={lang} theme={theme} onThemeChange={toggleTheme} t={t} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
        <div className="pt-32 pb-16 container mx-auto px-4 text-center">
          <p className="text-muted-foreground">Loading…</p>
        </div>
        <Footer lang={lang} t={t} />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation lang={lang} theme={theme} onThemeChange={toggleTheme} t={t} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      <article className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">

          {/* Back */}
          <Link href={`/${lang}/blog`} className="text-sm text-muted-foreground hover:text-foreground mb-8 inline-block">
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

          {/* Share */}
          <ShareButtons lang={lang} title={post.title} slug={slug} />

        </div>
      </article>

      <Footer lang={lang} t={t} />
    </div>
  );
}
