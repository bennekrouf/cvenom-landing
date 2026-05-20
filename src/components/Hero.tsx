import { useLang } from '@/lib/useLang';
import { useTranslation } from '../../lib/i18n';

export default function Hero() {
  const lang = useLang();
  const t = useTranslation(lang);

  return (
    <section className="section-gradient text-center">
      <div className="container mx-auto px-4 max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-6">
          AI-powered · ATS-optimised · EN / FR / DE
        </span>
        <h1 className="hero-title">{t.hero.title}</h1>
        <p className="hero-subtitle">{t.hero.subtitle}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://studio.cvenom.com" className="btn-primary">
            {t.hero.cta}
          </a>
          <a href="#features" className="btn-secondary">
            {lang === 'fr' ? 'Découvrir les fonctionnalités ↓' : 'See what\'s included ↓'}
          </a>
        </div>
        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-2 mt-8">
          {['📄 CV', '✉️ Cover Letter', '🖼️ Portfolio', '🔗 LinkedIn Match'].map(f => (
            <span key={f} className="rounded-full border border-border bg-card px-3 py-1 text-sm text-muted-foreground">
              {f}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
