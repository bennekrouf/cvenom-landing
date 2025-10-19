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
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('cvenom-theme') || 'light';
                document.documentElement.classList.toggle('dark', theme === 'dark');
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
