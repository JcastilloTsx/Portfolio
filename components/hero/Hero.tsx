import Image from 'next/image'
import { person } from '@/lib/content'

export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative flex min-h-screen items-center overflow-hidden pt-14"
    >
      {/* ── Animated ambient orbs ─────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
      </div>

      <div className="relative mx-auto w-full max-w-5xl px-6 py-20 lg:py-0">
        <div className="lg:grid lg:grid-cols-[1fr_300px] lg:items-center lg:gap-20">

          {/* ── Text column ───────────────────────────────────── */}
          <div>
            {/* Mobile photo — small circle above the name */}
            <div className="mb-8 lg:hidden">
              <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-accent/25 shadow-md">
                <Image
                  src="/jeffrey-castillo.jpg"
                  alt="Jeffrey Castillo"
                  fill
                  sizes="64px"
                  className="object-cover object-top"
                  unoptimized
                />
              </div>
            </div>

            <p
              className="animate-fade-up mb-6 font-body text-xs uppercase tracking-widest text-muted"
              style={{ animationDelay: '0ms' }}
            >
              {person.location} · {person.timezone} ·{' '}
              <span className="text-accent">{person.availability}</span>
            </p>

            <h1
              className="animate-fade-up mb-6 font-display text-5xl font-bold leading-[1.02] text-text sm:text-6xl lg:text-7xl"
              style={{ animationDelay: '80ms' }}
            >
              Jeffrey
              <br />
              Castillo
            </h1>

            <p
              className="animate-fade-up mb-10 max-w-md font-body text-lg leading-relaxed text-muted sm:text-xl"
              style={{ animationDelay: '160ms' }}
            >
              {person.positioning}
            </p>

            <div
              className="animate-fade-up flex flex-wrap gap-3"
              style={{ animationDelay: '240ms' }}
            >
              <a
                href={`mailto:${person.email}`}
                className="inline-flex items-center gap-2 rounded bg-accent px-6 py-3 font-display text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#1344b8] dark:hover:bg-[#2d6fe8]"
              >
                Get in touch
                <span aria-hidden="true">→</span>
              </a>
              <a
                href="/jeffrey-castillo-cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded border border-black/15 px-6 py-3 font-display text-sm font-semibold text-text transition-colors duration-150 hover:border-black/30 dark:border-white/15 dark:hover:border-white/30"
              >
                View CV
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          {/* ── Desktop photo ─────────────────────────────────── */}
          <div className="relative hidden lg:flex lg:justify-center">
            {/* Gradient border frame */}
            <div className="rounded-[1.15rem] bg-gradient-to-br from-accent/30 via-transparent to-[var(--color-olive)]/30 p-[1.5px]">
            <div
              className="relative overflow-hidden rounded-2xl shadow-2xl"
              style={{ width: 280, height: 340 }}
            >
              <Image
                src="/jeffrey-castillo.jpg"
                alt="Jeffrey Castillo"
                fill
                sizes="280px"
                className="object-cover object-top"
                priority
                unoptimized
              />
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
