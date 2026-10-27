import './globals.css'
import { ReactNode } from 'react'
import { Metadata } from 'next'
import PlausibleProvider from 'next-plausible'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Cvenom — AI CV, Cover Letter & Portfolio Generator',
    description:
      'Create a professional CV, cover letter, and portfolio in minutes with AI. Match your profile to LinkedIn job postings. ATS-optimised. Start free.',
    alternates: {
      // Canonical points to the English version — the real content URL
      canonical: 'https://cvenom.com/en',
      languages: {
        'en': 'https://cvenom.com/en',
        'fr': 'https://cvenom.com/fr',
        'x-default': 'https://cvenom.com/en',
      },
    },
    openGraph: {
      type: 'website',
      url: 'https://cvenom.com/en',
      siteName: 'Cvenom',
      title: 'Cvenom — AI CV, Cover Letter & Portfolio Generator',
      description:
        'Create a professional CV, cover letter, and portfolio in minutes with AI. Match to LinkedIn jobs. ATS-optimised.',
      locale: 'en_US',
      alternateLocale: 'fr_FR',
      images: [
        {
          url: 'https://cvenom.com/image/logo.png',
          width: 1024,
          height: 1024,
          alt: 'Cvenom — AI-powered CV generator',
        },
      ],
    },
    twitter: {
      card: 'summary',
      title: 'Cvenom — AI CV, Cover Letter & Portfolio Generator',
      description: 'CV, cover letter, portfolio in minutes. ATS-optimised. Start free.',
      images: ['https://cvenom.com/image/logo.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    },
  }
}

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://cvenom.com/#organization',
      name: 'Cvenom',
      url: 'https://cvenom.com',
      logo: 'https://cvenom.com/image/logo.png',
    },
    {
      '@type': 'WebSite',
      '@id': 'https://cvenom.com/#website',
      name: 'Cvenom',
      url: 'https://cvenom.com',
      publisher: { '@id': 'https://cvenom.com/#organization' },
      inLanguage: ['en', 'fr'],
    },
  ],
}

// Applies the saved theme before first paint, so server-rendered pages don't flash light
const themeScript = `try{if(localStorage.getItem('cvenom-theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}`

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        <PlausibleProvider domain="cvenom.com">
          {children}
        </PlausibleProvider>
      </body>
    </html>
  )
}
