import { useLang } from '@/lib/useLang';
import { useTranslation } from '../../lib/i18n';

export default function CTA() {
  const lang = useLang();
  const t = useTranslation(lang);

  return (
    <section className="section">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.cta.title}</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">{t.cta.subtitle}</p>
        <a href="https://studio.cvenom.com" className="btn-primary">
          {t.cta.button}
        </a>
      </div>
    </section>
  );
}
