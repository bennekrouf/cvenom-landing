'use client';

import { useTranslation } from '../../../lib/i18n';
import { useAppState } from '@/lib/useAppState';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';


export default function Privacy() {
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
        <h1 className="text-4xl font-bold mb-8">{t.privacy.title}</h1>
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-lg text-muted-foreground mb-8">{t.privacy.lastUpdated}</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t.privacy.sections.introduction.title}</h2>
            <p className="mb-4">{t.privacy.sections.introduction.content}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t.privacy.sections.dataCollection.title}</h2>
            <p className="mb-4">{t.privacy.sections.dataCollection.intro}</p>
            <ul className="list-disc pl-6 mb-4">
              {t.privacy.sections.dataCollection.items.map((item: string, index: number) => (
                <li key={index} className="mb-2">{item}</li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t.privacy.sections.dataUse.title}</h2>
            <p className="mb-4">{t.privacy.sections.dataUse.intro}</p>
            <ul className="list-disc pl-6 mb-4">
              {t.privacy.sections.dataUse.items.map((item: string, index: number) => (
                <li key={index} className="mb-2">{item}</li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t.privacy.sections.dataProtection.title}</h2>
            <p className="mb-4">{t.privacy.sections.dataProtection.content}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t.privacy.sections.dataSharing.title}</h2>
            <p className="mb-4">{t.privacy.sections.dataSharing.content}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t.privacy.sections.userRights.title}</h2>
            <p className="mb-4">{t.privacy.sections.userRights.intro}</p>
            <ul className="list-disc pl-6 mb-4">
              {t.privacy.sections.userRights.items.map((item: string, index: number) => (
                <li key={index} className="mb-2">{item}</li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t.privacy.sections.contact.title}</h2>
            <p className="mb-4">{t.privacy.sections.contact.content}</p>
          </section>
        </div>
      </main>

      <Footer t={t} />
    </div>
  );
}
