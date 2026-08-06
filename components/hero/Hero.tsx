import ScanlineGrid from '@/components/ui/ScanlineGrid'
import AsciiGlobe from '@/components/hero/AsciiGlobe'
import { person } from '@/lib/content'

export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative flex min-h-screen items-center overflow-hidden pt-12"
    >
      <ScanlineGrid className="absolute inset-0" />

      <div className="relative mx-auto w-full max-w-6xl px-6 py-20 lg:py-0">
        <div className="lg:grid lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-10 xl:gap-16">

          {/* ── Boot log ──────────────────────────────────────── */}
          <div>
            <div className="border-2 border-line bg-surface p-5 sm:p-7 xl:p-9">
              <div className="mb-4 flex items-center gap-2 border-b-2 border-line pb-3">
                <span className="h-2.5 w-2.5 bg-danger" aria-hidden="true" />
                <span className="h-2.5 w-2.5 bg-accent" aria-hidden="true" />
                <span className="h-2.5 w-2.5 bg-olive" aria-hidden="true" />
                <span className="ml-2 text-[11px] uppercase tracking-widest text-muted">
                  boot_sequence.log
                </span>
              </div>

              <p className="mb-1 font-body text-xs text-muted sm:text-sm">
                <span className="text-accent">&gt;</span> whoami
              </p>
              <h1 className="type-line mb-4 font-display text-4xl font-bold leading-none text-text sm:text-6xl lg:text-6xl xl:text-7xl">
                <span
                  style={{
                    '--type-steps': person.name.length,
                    '--type-width': `${person.name.length}ch`,
                    '--type-delay': '0.1s',
                  } as React.CSSProperties}
                >
                  {person.name}
                </span>
              </h1>

              <p className="mb-1 font-body text-xs text-muted sm:text-sm">
                <span className="text-accent">&gt;</span> role --current
              </p>
              <p
                className="animate-fade-up mb-4 font-body text-lg font-semibold text-accent sm:text-xl xl:text-2xl"
                style={{ animationDelay: '0.7s' }}
              >
                {person.title}
              </p>

              <p className="mb-1 font-body text-xs text-muted sm:text-sm">
                <span className="text-accent">&gt;</span> status
              </p>
              <p
                className="animate-fade-up mb-1 font-body text-sm leading-relaxed text-text sm:text-base xl:text-lg"
                style={{ animationDelay: '1.1s' }}
              >
                [<span className="text-olive">ONLINE</span>] {person.availability} — {person.location} · {person.timezone}
              </p>

              <p className="mt-4 font-body text-sm text-muted sm:text-base">
                <span className="text-accent">&gt;</span>
                <span className="caret" aria-hidden="true" />
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`mailto:${person.email}`}
                className="inline-flex items-center gap-2 border-2 border-text bg-accent px-5 py-3 font-display text-lg text-bg shadow-[3px_3px_0_var(--color-text)] transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_var(--color-text)]"
              >
                $ mail --compose
              </a>
              <a
                href="/jeffrey-castillo-cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-2 border-line px-5 py-3 font-display text-lg text-text transition-colors duration-150 hover:border-accent hover:text-accent"
              >
                $ cat resume.pdf
              </a>
            </div>
          </div>

          {/* ── Ascii viewport ────────────────────────────────── */}
          <div className="relative mt-10 lg:mt-0">
            <div className="relative border-2 border-line bg-surface">
              <div className="flex items-center gap-2 border-b-2 border-line px-4 py-3">
                <span className="h-2.5 w-2.5 bg-danger" aria-hidden="true" />
                <span className="h-2.5 w-2.5 bg-accent" aria-hidden="true" />
                <span className="h-2.5 w-2.5 bg-olive" aria-hidden="true" />
                <span className="ml-2 text-[11px] uppercase tracking-widest text-muted">
                  global_net.render
                </span>
              </div>

              <div className="relative flex items-center justify-center overflow-hidden px-6 py-12 sm:py-16 lg:py-20 xl:py-24">
                <span className="pointer-events-none absolute left-3 top-3 h-5 w-5 border-l-2 border-t-2 border-accent" aria-hidden="true" />
                <span className="pointer-events-none absolute right-3 top-3 h-5 w-5 border-r-2 border-t-2 border-accent" aria-hidden="true" />
                <span className="pointer-events-none absolute bottom-3 left-3 h-5 w-5 border-b-2 border-l-2 border-accent" aria-hidden="true" />
                <span className="pointer-events-none absolute bottom-3 right-3 h-5 w-5 border-b-2 border-r-2 border-accent" aria-hidden="true" />

                <AsciiGlobe className="w-full text-[5px] sm:text-[6px] lg:text-[6.5px] xl:text-[8px]" />
              </div>

              <div className="flex items-center justify-between border-t-2 border-line px-4 py-2">
                <span className="font-display text-base text-olive">
                  [LIVE] rotating_wireframe.tsx
                </span>
                <span className="hidden font-body text-[10px] uppercase tracking-widest text-muted sm:inline">
                  realtime · 60fps
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
