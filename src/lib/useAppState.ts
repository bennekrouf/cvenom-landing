// lib/useAppState.ts
import { useState, useEffect, useCallback } from 'react';

export function useAppState() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [lang, setLang] = useState<'en' | 'fr'>('en');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

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

  const changeLang = useCallback((newLang: 'en' | 'fr') => {
    setLang(newLang);
    localStorage.setItem('language', newLang);
    // Force immediate DOM update
    document.documentElement.lang = newLang;
    // Trigger re-render
    setMounted(false);
    setTimeout(() => setMounted(true), 0);
  }, []);

  return {
    theme, lang, mobileMenuOpen, mounted,
    setMobileMenuOpen, toggleTheme, changeLang
  };
}
