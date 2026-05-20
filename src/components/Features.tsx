import { useLang } from '@/lib/useLang';
import { useTranslation } from '../../lib/i18n';

export default function Features() {
  const lang = useLang();
  const t = useTranslation(lang);

  return (
    <section className="section" id="features">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">{t.features.title}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t.features.subtitle}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
