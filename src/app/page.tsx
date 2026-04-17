import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export default async function RootPage() {
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language') ?? '';

  // Parse the first preferred language
  const preferredLang = acceptLanguage
    .split(',')[0]
    .split(';')[0]
    .trim()
    .toLowerCase()
    .slice(0, 2);

  const lang = preferredLang === 'fr' ? 'fr' : 'en';
  redirect(`/${lang}`);
}
