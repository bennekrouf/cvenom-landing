import './globals.css'
import { ReactNode } from 'react'
import { Metadata } from 'next'
import PlausibleProvider from 'next-plausible'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Cvenom - AI-Powered CV Sidekick',
    description: 'Transform CV chaos into career confidence. Multilingual, AI-driven, ATS-optimized.',
    alternates: {
      canonical: 'https://cvenom.com',
      languages: {
        'en': 'https://cvenom.com',
        'fr': 'https://cvenom.com/fr',
      }
    },
    openGraph: {
      url: 'https://cvenom.com',
      siteName: 'Cvenom',
      locale: 'en_US',
      alternateLocale: 'fr_FR',
    }
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
