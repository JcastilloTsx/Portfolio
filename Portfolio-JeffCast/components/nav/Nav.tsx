import ThemeToggle from '@/components/theme/ThemeToggle'
import { person } from '@/lib/content'

export default function Nav() {
  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-black/5 bg-bg/90 backdrop-blur-sm dark:border-white/10">
      <nav
        aria-label="Site navigation"
        className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6"
      >
        <a
          href="#hero"
          className="font-display text-sm font-semibold text-text transition-opacity hover:opacity-60"
          aria-label={`${person.name} — back to top`}
        >
          JC
        </a>

        <div className="flex items-center gap-6">
          <ul className="flex list-none items-center gap-6" role="list">
            {(
              [
                { href: '#work', label: 'Work' },
                { href: '#how-i-work', label: 'How I work' },
                { href: '#skills', label: 'Skills' },
                { href: '#contact', label: 'Contact' },
              ] as const
            ).map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className="font-body text-sm text-muted transition-colors duration-150 hover:text-text"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
