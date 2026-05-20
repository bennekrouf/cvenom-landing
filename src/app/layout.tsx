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
          url: 'https://cvenom.com/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Cvenom — AI-powered CV generator',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Cvenom — AI CV, Cover Letter & Portfolio Generator',
      description: 'CV, cover letter, portfolio in minutes. ATS-optimised. Start free.',
      images: ['https://cvenom.com/og-image.png'],
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

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <PlausibleProvider domain="cvenom.com">
          {children}
        </PlausibleProvider>
      </body>
    </html>
  )
}
