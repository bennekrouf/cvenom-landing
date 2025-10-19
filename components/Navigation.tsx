'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Moon, Sun, Menu, X, Globe } from 'lucide-react';
import { Translations } from '../lib/types';

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
  const [showLangMenu, setShowLangMenu] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl text-foreground">cvenom</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/#features" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            {t.nav.features}
          </Link>
          <Link href="/blog" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            {t.nav.blog}
          </Link>

          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="rounded-full p-2 bg-accent hover:bg-accent/80 transition-colors flex items-center"
            >
              <Globe size={20} className="mr-1" />
              <span className="text-sm font-medium">{lang.toUpperCase()}</span>
            </button>

            {showLangMenu && (
              <div className="absolute right-0 mt-2 w-32 bg-background border border-border rounded-lg shadow-lg py-1 z-50">
                <button
                  onClick={() => { onLangChange('en'); setShowLangMenu(false); }}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-accent transition-colors ${lang === 'en' ? 'text-primary' : 'text-foreground'}`}
                >
                  EN English
                </button>
                <button
                  onClick={() => { onLangChange('fr'); setShowLangMenu(false); }}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-accent transition-colors ${lang === 'fr' ? 'text-primary' : 'text-foreground'}`}
                >
                  FR Français
                </button>
              </div>
            )}
          </div>

          <button
            onClick={onThemeChange}
            className="rounded-full p-2 bg-accent hover:bg-accent/80 transition-colors"
          >
            {mounted && theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <a href="https://studio.cvenom.com" className="px-6 py-2 rounded-lg bg-[#FF6B00] text-white font-semibold hover:bg-[#FF6B00]/90 transition-all">
            {t.nav.tryDemo}
          </a>
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
          </div>
        </div>
      )}
    </header>
  );
}
