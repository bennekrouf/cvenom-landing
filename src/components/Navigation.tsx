'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Moon, Sun, Menu, X, Globe } from 'lucide-react';
import { Translations } from '../../lib/types';

interface NavigationProps {
  lang: 'en' | 'fr';
  theme: 'light' | 'dark';
  onLangChange: (lang: 'en' | 'fr') => void;
  onThemeChange: () => void;
  t: Translations;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export default function Navigation({
  lang,
  theme,
  onLangChange,
  onThemeChange,
  t,
  mobileMenuOpen,
  setMobileMenuOpen
}: NavigationProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const toggleLanguage = () => {
    onLangChange(lang === 'en' ? 'fr' : 'en');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl text-foreground whitespace-nowrap">cvenom</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/#features" className="text-sm font-medium text-foreground hover:text-primary transition-colors whitespace-nowrap">
            {t.nav.features}
          </Link>
          <Link href="/blog" className="text-sm font-medium text-foreground hover:text-primary transition-colors whitespace-nowrap">
            {t.nav.blog}
          </Link>

          <Link href="/contact" className="text-sm font-medium text-foreground hover:text-primary transition-colors whitespace-nowrap">
            Contact
          </Link>

          {/* Fixed width container for stable positioning */}
          <div className="flex items-center space-x-4 min-w-[160px] justify-end">
            <button
              onClick={toggleLanguage}
              className="rounded-full p-2 bg-accent hover:bg-accent/80 transition-colors flex items-center w-[60px] justify-center"
            >
              <Globe size={20} className="mr-1 flex-shrink-0" />
              <span className="text-sm font-medium">{lang.toUpperCase()}</span>
            </button>

            <button
              onClick={onThemeChange}
              className="rounded-full p-2 bg-accent hover:bg-accent/80 transition-colors w-[44px] h-[44px] flex items-center justify-center"
            >
              {mounted && theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Fixed width container for Launch Studio button */}
          <div className="w-[140px] flex justify-center">
            <a href="https://studio.cvenom.com" className="px-6 py-2 rounded-lg bg-[#FF6B00] text-white font-semibold hover:bg-[#FF6B00]/90 transition-all whitespace-nowrap text-center min-w-[120px]">
              {t.nav.tryDemo}
            </a>
          </div>
        </nav>

        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2">
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border">
          <div className="container mx-auto px-4 py-4 space-y-3">
            <Link href="/#features" className="block py-2 text-foreground" onClick={() => setMobileMenuOpen(false)}>{t.nav.features}</Link>
            <Link href="/blog" className="block py-2 text-foreground" onClick={() => setMobileMenuOpen(false)}>{t.nav.blog}</Link>

            <div className="pt-2 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Language:</span>
                <button
                  onClick={toggleLanguage}
                  className="px-4 py-2 text-sm rounded bg-accent hover:bg-accent/80 transition-colors flex items-center"
                >
                  <Globe size={16} className="mr-2" />
                  {lang === 'en' ? 'Switch to FR' : 'Passer en EN'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
