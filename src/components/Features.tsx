import { useAppState } from '@/lib/useAppState';
import { useTranslation } from '../../lib/i18n';

export default function Features() {
  const { lang } = useAppState();
  const t = useTranslation(lang);

  return (
    <section className="section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">{t.features.title}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t.features.subtitle}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.features.items.map((feature, i) => (
            <div key={i} className="card">
              <h3 className="card-title">{feature.title}</h3>
              <p className="card-description">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
