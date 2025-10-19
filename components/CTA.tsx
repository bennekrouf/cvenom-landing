import { Translations } from '../lib/types';

export default function CTA({ t }: { t: Translations }) {
  return (
    <section className="section">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.cta.title}</h2>
        <p className="text-xl mb-12 text-muted-foreground">{t.cta.subtitle}</p>
        <a href="https://studio.cvenom.com" className="btn-primary">
          {t.cta.button}
        </a>
      </div>
    </section>
  );
}
