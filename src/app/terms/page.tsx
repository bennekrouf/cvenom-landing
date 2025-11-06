'use client';

import { useTranslation } from '../../../lib/i18n';
import { useAppState } from '@/lib/useAppState';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function Terms() {
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

      <main className="container mx-auto px-4 py-20 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">{t.terms.title}</h1>
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-lg text-muted-foreground mb-8">{t.terms.lastUpdated}</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t.terms.sections.acceptance.title}</h2>
            <p className="mb-4">{t.terms.sections.acceptance.content}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t.terms.sections.services.title}</h2>
            <p className="mb-4">{t.terms.sections.services.content}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t.terms.sections.userResponsibilities.title}</h2>
            <p className="mb-4">{t.terms.sections.userResponsibilities.intro}</p>
            <ul className="list-disc pl-6 mb-4">
              {t.terms.sections.userResponsibilities.items.map((item: string, index: number) => (
                <li key={index} className="mb-2">{item}</li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t.terms.sections.intellectualProperty.title}</h2>
            <p className="mb-4">{t.terms.sections.intellectualProperty.content}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t.terms.sections.limitation.title}</h2>
            <p className="mb-4">{t.terms.sections.limitation.content}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t.terms.sections.termination.title}</h2>
            <p className="mb-4">{t.terms.sections.termination.content}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t.terms.sections.governing.title}</h2>
            <p className="mb-4">{t.terms.sections.governing.content}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t.terms.sections.contact.title}</h2>
            <p className="mb-4">{t.terms.sections.contact.content}</p>
          </section>
        </div>
      </main>

      <Footer t={t} />
    </div>
  );
}
