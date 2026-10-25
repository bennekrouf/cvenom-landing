'use client';

import { useEffect, useState } from 'react';
import { Check, Gift, Sparkles, Zap } from 'lucide-react';
import { useLang } from '@/lib/useLang';
import { useTranslation } from '../../lib/i18n';

// The three ways to have credits: the free start, one-off top-ups, and the
// mayorana plans. The plans' prices are mayorana's (api0 gateway, via the
// CVenom backend's GET /payment/plans), never kept here; while they load, or
// if they can't, the plans column just links to mayorana.ch/pricing.

const API_URL =
  process.env.NEXT_PUBLIC_CVENOM_API_URL ||
  (process.env.NODE_ENV === 'production' ? 'https://api.cvenom.com' : 'http://127.0.0.1:4002');
const MAYORANA_PRICING_URL = 'https://mayorana.ch/pricing?from=cvenom';
const STUDIO_URL = 'https://studio.cvenom.com';
/** What a CV or cover letter costs in credits. */
const CV_CREDITS = 20;

interface Plan {
  id: string;
  name: string;
  price_cents: number;
  currency: string;
  monthly_credits: number;
}

function formatPrice(plan: Plan, locale: string) {
  const currency = plan.currency.toUpperCase();
  const digits =
    new Intl.NumberFormat(locale, { style: 'currency', currency }).resolvedOptions().maximumFractionDigits ?? 2;
  const value = plan.price_cents / 10 ** digits;
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: Number.isInteger(value) ? 0 : digits,
  }).format(value);
}

function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? ''));
}

export default function Pricing() {
  const lang = useLang();
  const p = useTranslation(lang).pricing;
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/payment/plans`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((body) => setPlans(Array.isArray(body.plans) ? body.plans : []))
      .catch(() => setPlans([]));
  }, []);

  return (
    <section className="section" id="pricing">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="section-title !mb-4">{p.title}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{p.subtitle}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Free */}
          <div className="flex flex-col rounded-2xl border border-border bg-background p-6">
            <Gift className="w-6 h-6 text-primary mb-3" />
            <h3 className="text-xl font-bold">{p.free.title}</h3>
            <p className="mt-2 text-3xl font-semibold">{p.free.price}</p>
            <ul className="mt-5 space-y-2 text-sm flex-1">
              {p.free.items.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
            <a href={STUDIO_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary mt-6 text-center">
              {p.free.cta}
            </a>
          </div>

          {/* Plans — the one we point to */}
          <div className="relative flex flex-col rounded-2xl border border-primary bg-primary/5 ring-1 ring-primary p-6 shadow-lg shadow-primary/10">
            <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
              {p.plans.badge}
            </span>
            <Sparkles className="w-6 h-6 text-primary mb-3" />
            <h3 className="text-xl font-bold">{p.plans.title}</h3>
            {plans.length > 0 ? (
              <ul className="mt-3 space-y-2">
                {plans.map((plan) => (
                  <li key={plan.id} className="text-sm">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-semibold">{plan.name}</span>
                      <span className="whitespace-nowrap font-semibold">
                        {formatPrice(plan, lang)}
                        <span className="font-normal text-muted-foreground">{p.plans.perMonth}</span>
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {fill(p.plans.perPlan, {
                        credits: plan.monthly_credits.toLocaleString(lang),
                        cvs: Math.floor(plan.monthly_credits / CV_CREDITS),
                      })}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-3xl font-semibold">{p.plans.priceFallback}</p>
            )}
            <ul className="mt-5 space-y-2 text-sm flex-1">
              {p.plans.items.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
            <a href={MAYORANA_PRICING_URL} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6 text-center">
              {p.plans.cta}
            </a>
            <p className="mt-3 text-xs text-muted-foreground">{p.plans.note}</p>
          </div>

          {/* Top-up */}
          <div className="flex flex-col rounded-2xl border border-border bg-background p-6">
            <Zap className="w-6 h-6 text-primary mb-3" />
            <h3 className="text-xl font-bold">{p.topUp.title}</h3>
            <p className="mt-2 text-3xl font-semibold">{p.topUp.price}</p>
            <ul className="mt-5 space-y-2 text-sm flex-1">
              {p.topUp.items.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
            <a href={`${STUDIO_URL}/credits`} target="_blank" rel="noopener noreferrer" className="btn-secondary mt-6 text-center">
              {p.topUp.cta}
            </a>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">{p.costs}</p>
      </div>
    </section>
  );
}
