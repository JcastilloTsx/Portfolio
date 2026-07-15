import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://jeffreycastillo.dev'), // TODO: Replace with actual domain
  title: {
    default: 'Jeffrey Castillo — Senior Frontend Developer',
    template: '%s | Jeffrey Castillo',
  },
  description:
    'Senior Frontend Engineer with 7+ years building enterprise React and TypeScript applications. Available for remote / contract work with US companies.',
  authors: [{ name: 'Jeffrey Castillo' }],
  creator: 'Jeffrey Castillo',
  openGraph: {
    title: 'Jeffrey Castillo — Senior Frontend Developer',
    description:
      'Senior Frontend Engineer — React, TypeScript, Next.js. Open to remote / contract (US).',
    url: 'https://jeffreycastillo.dev', // TODO: Replace with actual domain
    siteName: 'Jeffrey Castillo',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jeffrey Castillo — Senior Frontend Developer',
    description: 'Senior Frontend Engineer — React, TypeScript, Next.js.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        {/* Flash-free dark mode: runs before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme'),d=window.matchMedia('(prefers-color-scheme:dark)').matches;if(t==='dark'||(t===null&&d))document.documentElement.classList.add('dark')}catch(e){}})()`,
          }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded focus:text-sm focus:font-semibold focus:no-underline"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  )
}
