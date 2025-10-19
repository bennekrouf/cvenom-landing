'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from '../../lib/i18n';
import Navigation from '../../components/Navigation';
import Hero from '../../components/Hero';
import Features from '../../components/Features';
import Stats from '../../components/Stats';
import CTA from '../../components/CTA';
import Footer from '../../components/Footer';

export default function Home() {
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
      <Hero t={t} />
      <Features t={t} />
      <Stats t={t} />
      <CTA t={t} />
      <Footer t={t} />
    </div>
  );
}
