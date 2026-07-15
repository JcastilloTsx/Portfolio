import Nav from '@/components/nav/Nav'
import Hero from '@/components/hero/Hero'
import Work from '@/components/work/Work'
import HowIWork from '@/components/how-i-work/HowIWork'
import Skills from '@/components/skills/Skills'
import Contact from '@/components/contact/Contact'
import { person } from '@/lib/content'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: person.name,
  jobTitle: person.title,
  email: person.email,
  url: 'https://jeffreycastillo.dev', // TODO: Replace with actual domain
  sameAs: [person.github, person.linkedin],
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main id="main-content">
        <Hero />
        <Work />
        <HowIWork />
        <Skills />
        <Contact />
      </main>
      <footer className="border-t border-black/5 py-8 dark:border-white/10">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 text-xs font-body text-muted">
          <span>© 2026 {person.name}</span>
          <span className="hidden sm:inline">
            Built with Next.js · TypeScript · Tailwind CSS
          </span>
        </div>
      </footer>
    </>
  )
}
