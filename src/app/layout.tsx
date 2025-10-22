import Script from 'next/script'
import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
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
      <head>
        <script
          defer
          data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
          src="https://plausible.io/js/script.outbound-links.js"
        />
        <Script
          src="https://plausible.io/js/pa-I2L6va00JukQOR_ZLk8dy.js"
          strategy="afterInteractive"
        />
        <Script id="plausible-setup" strategy="afterInteractive">
          {`
    window.plausible = window.plausible || function() { 
      (window.plausible.q = window.plausible.q || []).push(arguments);
    };
    plausible.init();
  `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
