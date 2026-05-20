import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

// Export static metadata so Google sees something meaningful at /
export const metadata = {
  title: 'Cvenom — AI-Powered CV, Cover Letter & Portfolio Generator',
  description:
    'Create a professional CV, cover letter, and portfolio in minutes with AI. Match your profile to LinkedIn job postings. ATS-optimised. Start free.',
  alternates: {
    canonical: 'https://cvenom.com/en',
    languages: {
      en: 'https://cvenom.com/en',
      fr: 'https://cvenom.com/fr',
    },
  },
};

export default async function RootPage() {
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language') ?? '';

  const preferredLang = acceptLanguage
    .split(',')[0]
    .split(';')[0]
    .trim()
    .toLowerCase()
    .slice(0, 2);

  const lang = preferredLang === 'fr' ? 'fr' : 'en';

  // 'permanent' emits 308 — Google treats this as a definitive redirect
  // and passes full PageRank to the destination.
  redirect(`/${lang}`);
}
