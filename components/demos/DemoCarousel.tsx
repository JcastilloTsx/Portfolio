'use client'

import { useEffect, useRef, useState } from 'react'
import CryptoDashboard from './CryptoDashboard'
import PokedexDemo from './PokedexDemo'

const SLIDES = [
  { key: 'market', label: 'market_watch.tsx', node: <CryptoDashboard /> },
  { key: 'pokedex', label: 'pokedex.tsx', node: <PokedexDemo /> },
]

export default function DemoCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])
  const [active, setActive] = useState(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = slideRefs.current.findIndex((el) => el === entry.target)
            if (idx !== -1) setActive(idx)
          }
        })
      },
      { root: track, threshold: 0.6 },
    )

    slideRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  function goTo(index: number) {
    const track = trackRef.current
    const slide = slideRefs.current[index]
    if (!track || !slide) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    track.scrollTo({ left: slide.offsetLeft, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 font-body text-xs text-muted">
          <button
            type="button"
            onClick={() => goTo(Math.max(0, active - 1))}
            disabled={active === 0}
            aria-label="Previous slide"
            className="border border-line px-2 py-1 font-display text-base text-text transition-colors hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-30"
          >
            [&lt;]
          </button>
          <span>
            slide {active + 1}/{SLIDES.length} — {SLIDES[active].label}
          </span>
          <button
            type="button"
            onClick={() => goTo(Math.min(SLIDES.length - 1, active + 1))}
            disabled={active === SLIDES.length - 1}
            aria-label="Next slide"
            className="border border-line px-2 py-1 font-display text-base text-text transition-colors hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-30"
          >
            [&gt;]
          </button>
        </div>

        <div className="flex gap-1.5" role="tablist" aria-label="Demo slides">
          {SLIDES.map((s, i) => (
            <button
              key={s.key}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-2.5 w-2.5 border border-line transition-colors ${i === active ? 'bg-accent' : 'bg-transparent'}`}
            />
          ))}
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2"
        style={{ scrollbarWidth: 'none' }}
      >
        {SLIDES.map((s, i) => (
          <div
            key={s.key}
            ref={(el) => {
              slideRefs.current[i] = el
            }}
            className="w-full shrink-0 snap-center"
          >
            {s.node}
          </div>
        ))}
      </div>
    </div>
  )
}
