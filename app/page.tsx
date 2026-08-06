import Nav from '@/components/nav/Nav'
import Hero from '@/components/hero/Hero'
import Work from '@/components/work/Work'
import HowIWork from '@/components/how-i-work/HowIWork'
import Skills from '@/components/skills/Skills'
import Demos from '@/components/demos/Demos'
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
        <Demos />
        <Contact />
      </main>
      <footer className="border-t-2 border-line py-8">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 font-body text-xs text-muted">
          <span>© 2026 {person.name}</span>
          <span className="hidden sm:inline">
            [next.js] [typescript] [tailwind]
          </span>
        </div>
      </footer>
    </>
  )
}
