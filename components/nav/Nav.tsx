import ThemeToggle from '@/components/theme/ThemeToggle'
import { person } from '@/lib/content'

const LINKS = [
  { href: '#work', label: 'work', key: 'F1' },
  { href: '#how-i-work', label: 'how-i-work', key: 'F2' },
  { href: '#skills', label: 'skills', key: 'F3' },
  { href: '#demos', label: 'demos', key: 'F4' },
  { href: '#contact', label: 'contact', key: 'F5' },
] as const

export default function Nav() {
  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b-2 border-line bg-bg">
      <nav
        aria-label="Site navigation"
        className="mx-auto flex h-12 max-w-5xl items-center justify-between px-6 font-body"
      >
        <a
          href="#hero"
          className="font-display text-lg text-text transition-colors hover:text-accent"
          aria-label={`${person.name} — back to top`}
        >
          jeffrey@portfolio<span className="text-accent">:~$</span>
        </a>

        <div className="flex items-center gap-5">
          <ul className="hidden list-none items-center gap-5 sm:flex" role="list">
            {LINKS.map(({ href, label, key }) => (
              <li key={href}>
                <a
                  href={href}
                  className="group relative inline-block font-display text-sm text-muted transition-colors duration-150 hover:text-accent"
                >
                  <span className="mr-1 border border-line px-1 py-0.5 font-body text-[10px] text-muted group-hover:border-accent group-hover:text-accent">
                    {key}
                  </span>
                  {label}
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-accent transition-transform duration-200 group-hover:scale-x-100"
                    style={{ transitionTimingFunction: 'steps(4, end)' }}
                  />
                </a>
              </li>
            ))}
          </ul>

          <span className="hidden items-center gap-2 border border-line px-2 py-1 text-[10px] uppercase tracking-widest text-olive sm:flex">
            <span
              className="status-led h-1.5 w-1.5 shrink-0 bg-olive"
              aria-hidden="true"
            />
            online
          </span>

          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
