import { Check, X } from 'lucide-react';
import { useLang } from '@/lib/useLang';
import { useTranslation } from '../../lib/i18n';

// Only the rows where cVenom is strong. cVenom's own column is a tick on every
// row, so it is drawn rather than stored; see `comparison` in messages/*.json.
export default function Comparison() {
  const lang = useLang();
  const t = useTranslation(lang);
  const c = t.comparison;

  return (
    <section className="section-accent" id="compare">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="section-title !mb-4">{c.title}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{c.subtitle}</p>
        </div>

        {/* Scrolls inside its box at phone width rather than squeezing four columns. */}
        <div className="overflow-x-auto rounded-2xl border border-border bg-background">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-border">
                <th
                  scope="col"
                  className="sticky left-0 z-[1] bg-background p-4 text-left font-medium text-muted-foreground"
                >
                  {c.feature}
                </th>
                <th scope="col" className="p-4 text-center font-bold text-primary bg-primary/10">
                  cVenom
                </th>
                {c.competitors.map((name) => (
                  <th key={name} scope="col" className="p-4 text-center font-medium text-muted-foreground">
                    {name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {c.rows.map((row) => (
                <tr key={row.feature} className="border-b border-border last:border-b-0">
                  <th
                    scope="row"
                    className="sticky left-0 z-[1] bg-background p-4 text-left font-medium max-w-[14rem] md:max-w-none"
                  >
                    {row.feature}
                  </th>
                  <td className="p-4 text-center bg-primary/10">
                    <Check className="inline w-5 h-5 text-green-600 dark:text-green-400" aria-label={c.yes} />
                  </td>
                  {row.them.map((value, i) => (
                    <td key={i} className="p-4 text-center">
                      {value === true ? (
                        <Check className="inline w-4 h-4 text-muted-foreground" aria-label={c.yes} />
                      ) : value === false ? (
                        <X className="inline w-4 h-4 text-red-500/80" aria-label={c.no} />
                      ) : (
                        <span className="inline-block max-w-[11rem] text-xs leading-snug text-amber-700 dark:text-amber-300">
                          {value}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-3">{c.note}</p>
      </div>
    </section>
  );
}
