import { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://cvenom.com/fr',
    languages: {
      'en': 'https://cvenom.com',
      'fr': 'https://cvenom.com/fr',
    }
  },
  openGraph: {
    url: 'https://cvenom.com/fr',
    locale: 'fr_FR',
    alternateLocale: 'en_US',
  }
}

export default function FrLayout({ children }: { children: React.ReactNode }) {
  return children
}
