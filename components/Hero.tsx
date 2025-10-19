import { Translations } from '../lib/types';

export default function Hero({ t }: { t: Translations }) {
  return (
    <section className="section-gradient">
      <div className="container mx-auto px-4 text-center">
        <h1 className="hero-title">{t.hero.title}</h1>
        <p className="hero-subtitle">{t.hero.subtitle}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://studio.cvenom.com" className="btn-primary">
            {t.hero.cta}
          </a>
          <a href="https://studio.cvenom.com" className="btn-secondary">
            {t.hero.studio}
          </a>
        </div>
      </div>
    </section>
  );
}
