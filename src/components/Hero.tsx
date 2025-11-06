import { useAppState } from '@/lib/useAppState';
import { useTranslation } from '../../lib/i18n';

export default function Hero() {
  const { lang } = useAppState();
  const t = useTranslation(lang);

  return (
    <section className="section-gradient text-center">
      <div className="container mx-auto px-4">
        <h1 className="hero-title">{t.hero.title}</h1>
        <p className="hero-subtitle">{t.hero.subtitle}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://studio.cvenom.com" className="btn-primary">
            {t.hero.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
