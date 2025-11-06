'use client';

import { FloatingWhatsApp } from '@/components/WhatsApp';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Stats from '@/components/Stats';
import CTA from '@/components/CTA';
import Navigation from '@/components/Navigation';
import { useTranslation } from '../../lib/i18n';
import { useAppState } from '@/lib/useAppState';
import Footer from '@/components/Footer';

export default function Home() {

  const { theme, lang, mobileMenuOpen, mounted, setMobileMenuOpen, toggleTheme, changeLang } = useAppState();
  const t = useTranslation(lang);

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
      <Hero />
      <Features />
      <Stats />
      <CTA />
      <FloatingWhatsApp />
      <Footer t={t} />
    </div>
  );
}
