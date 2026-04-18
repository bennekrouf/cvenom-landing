import { ReactNode, Suspense } from 'react';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import SetHtmlLang from '@/components/SetHtmlLang';
import RefCapture from '@/components/RefCapture';

const supportedLangs = ['en', 'fr'] as const;
type Lang = typeof supportedLangs[number];

function isValidLang(lang: string): lang is Lang {
  return supportedLangs.includes(lang as Lang);
}

type Props = {
  children: ReactNode;
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const validLang = isValidLang(lang) ? lang : 'en';

  return {
    alternates: {
      canonical: `https://cvenom.com/${validLang}`,
      languages: {
        'en': 'https://cvenom.com/en',
        'fr': 'https://cvenom.com/fr',
      },
    },
  };
}

export async function generateStaticParams() {
  return supportedLangs.map(lang => ({ lang }));
}

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params;

  if (!isValidLang(lang)) {
    redirect('/en');
  }

  return (
    <>
      <SetHtmlLang lang={lang} />
      <link rel="alternate" hrefLang="en" href="https://cvenom.com/en" />
      <link rel="alternate" hrefLang="fr" href="https://cvenom.com/fr" />
      <link rel="alternate" hrefLang="x-default" href="https://cvenom.com/en" />
      <Suspense fallback={null}>
        <RefCapture />
      </Suspense>
      {children}
    </>
  );
}
