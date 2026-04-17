'use client';

import { use } from 'react';
import { FloatingWhatsApp } from '@/components/WhatsApp';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Stats from '@/components/Stats';
import CTA from '@/components/CTA';
import Navigation from '@/components/Navigation';
import { useTranslation } from '../../../lib/i18n';
import { useAppState } from '@/lib/useAppState';
import Footer from '@/components/Footer';

export default function Home({ params }: { params: Promise<{ lang: 'en' | 'fr' }> }) {
  const { lang } = use(params);
  const { theme, mobileMenuOpen, mounted, setMobileMenuOpen, toggleTheme } = useAppState();
  const t = useTranslation(lang);

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
      <Hero />
      <Features />
      <Stats />
      <CTA />
      <FloatingWhatsApp />
      <Footer lang={lang} t={t} />
    </div>
  );
}
