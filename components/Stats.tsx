import { Translations } from '../lib/types';

export default function Stats({ t }: { t: Translations }) {
  const stats = [
    { value: "1,000+", label: t.stats.users },
    { value: "20+", label: t.stats.countries },
    { value: "40%", label: t.stats.growth },
    { value: "5", label: t.stats.time }
  ];

  return (
    <section className="section-accent">
      <div className="container mx-auto px-4">
        <h2 className="section-title">{t.stats.title}</h2>
        <div className="grid-stats">
          {stats.map((stat, i) => (
            <div key={i}>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
