import { useLang } from '@/lib/useLang';
import { useTranslation } from '../../lib/i18n';

export default function Earn() {
  const lang = useLang();
  const t = useTranslation(lang);
  const e = t.earn;

  return (
    <section className="section">
      <div className="container mx-auto px-4">
        <div className="rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 p-8 md:p-12 flex flex-col md:flex-row gap-10 items-start md:items-center">

          {/* Left: text */}
          <div className="flex-1 flex flex-col gap-5">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              {e.badge}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">{e.title}</h2>
            <p className="text-muted-foreground leading-relaxed max-w-lg">{e.subtitle}</p>
            <ul className="flex flex-col gap-2.5">
              {e.bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <span className="text-primary font-bold mt-0.5">✓</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <a
              href="https://studio.cvenom.com/en/bd"
              className="btn-primary w-fit mt-2"
            >
              {e.cta}
            </a>
          </div>

          {/* Right: stat cards */}
          <div className="flex flex-row md:flex-col gap-4 w-full md:w-48 flex-shrink-0">
            {e.stats.map((s, i) => (
              <div
                key={i}
                className="flex-1 md:flex-none rounded-2xl border border-border bg-background p-4 text-center"
              >
                <p className="text-2xl font-bold text-primary">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
