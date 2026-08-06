import type { Metadata } from 'next'
import { IBM_Plex_Mono, VT323 } from 'next/font/google'
import './globals.css'

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-mono',
  display: 'swap',
})

const vt323 = VT323({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-vt323',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://jeffreycastillo.dev'), // TODO: Replace with actual domain
  title: {
    default: 'Jeffrey Castillo — Full-Stack Developer',
    template: '%s | Jeffrey Castillo',
  },
  description:
    'Full-stack engineer with 7+ years shipping enterprise React/TypeScript frontends and their backend and integration layers, solo, end to end. Available for remote / contract work with US companies.',
  authors: [{ name: 'Jeffrey Castillo' }],
  creator: 'Jeffrey Castillo',
  openGraph: {
    title: 'Jeffrey Castillo — Full-Stack Developer',
    description:
      'Full-stack engineer — React, TypeScript, Next.js, Node.js/.NET backends. Open to remote / contract (US).',
    url: 'https://jeffreycastillo.dev', // TODO: Replace with actual domain
    siteName: 'Jeffrey Castillo',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jeffrey Castillo — Full-Stack Developer',
    description: 'Full-stack engineer — React, TypeScript, Next.js, Node.js/.NET backends.',
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
    <html lang="en" suppressHydrationWarning className={`${ibmPlexMono.variable} ${vt323.variable}`}>
      <body>
        {/*
THESIS: A portfolio that behaves like an operator console for Jeffrey's systems, not a brochure about them.
OWN-WORLD: terminal + restrained 8-bit — CRT-phosphor dark / thermal-paper light, hard 1-2px blocky borders, no radius, no gradients or glow. VT323 pixel display face carries buttons, badges, tags, and headings; IBM Plex Mono carries body copy, typed commands, and functional labels.
STORY: a recruiter reads a boot/status log that answers who/what/hire-now, then process-log case studies and a resource-meter skills readout prove full-stack ownership.
FIRST VIEWPORT: boot-sequence hero — typed identity/role/status lines, command-styled CTAs, a large real-time ASCII render as the backdrop.
FORM: terminal/CLI + 8-bit game blend, restrained execution — user-pinned direction, no concept roll (brief-pinned direction beats the roll).
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md.
        */}
        {/* Flash-free dark mode: runs before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme'),d=window.matchMedia('(prefers-color-scheme:dark)').matches;if(t==='dark'||(t===null&&d))document.documentElement.classList.add('dark')}catch(e){}})()`,
          }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-bg focus:text-sm focus:font-semibold focus:no-underline"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  )
}
