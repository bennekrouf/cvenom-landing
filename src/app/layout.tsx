import './globals.css'
import { ReactNode } from 'react'
import { Metadata } from 'next'
import PlausibleProvider from 'next-plausible'

export const metadata: Metadata = {
  title: 'Cvenom - AI-Powered CV Sidekick',
  description: 'Transform CV chaos into career confidence. Multilingual, AI-driven, ATS-optimized.',
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
