'use client'

import { useEffect, useRef, useState } from 'react'
import {
  SiReact, SiTypescript, SiNodedotjs, SiDocker, SiGit, SiJest,
} from 'react-icons/si'
import { FaUniversalAccess, FaGraduationCap, FaAws } from 'react-icons/fa'
import type { IconType } from 'react-icons'
import { courses } from '@/lib/content'

function parseCourse(entry: string): { title: string; author?: string } {
  const [title, author] = entry.split(' · ')
  return { title, author }
}

function courseIcon(title: string): IconType {
  const t = title.toLowerCase()
  if (t.includes('typescript')) return SiTypescript
  if (t.includes('node')) return SiNodedotjs
  if (t.includes('docker') || t.includes('kubernetes')) return SiDocker
  if (t.includes('git')) return SiGit
  if (t.includes('aws') || t.includes('amplify') || t.includes('appsync')) return FaAws
  if (t.includes('accessibility') || t.includes('wcag')) return FaUniversalAccess
  if (t.includes('jest') || t.includes('testing')) return SiJest
  if (t.includes('react')) return SiReact
  return FaGraduationCap
}

export default function CoursesCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  function updateBounds() {
    const el = trackRef.current
    if (!el) return
    setAtStart(el.scrollLeft <= 4)
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 4)
  }

  useEffect(() => {
    updateBounds()
    const el = trackRef.current
    el?.addEventListener('scroll', updateBounds, { passive: true })
    window.addEventListener('resize', updateBounds)
    return () => {
      el?.removeEventListener('scroll', updateBounds)
      window.removeEventListener('resize', updateBounds)
    }
  }, [])

  function scrollByCards(direction: 1 | -1) {
    const el = trackRef.current
    if (!el) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollBy({ left: direction * 528, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="font-body text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
          <span className="text-accent">$</span> cat courses.log
        </h3>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollByCards(-1)}
            disabled={atStart}
            aria-label="Scroll courses left"
            className="border border-line px-2 py-1 font-display text-base text-text transition-colors hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-30"
          >
            [&lt;]
          </button>
          <button
            type="button"
            onClick={() => scrollByCards(1)}
            disabled={atEnd}
            aria-label="Scroll courses right"
            className="border border-line px-2 py-1 font-display text-base text-text transition-colors hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-30"
          >
            [&gt;]
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
        style={{ scrollbarWidth: 'none' }}
      >
        {courses.map((entry) => {
          const { title, author } = parseCourse(entry)
          const Icon = courseIcon(title)
          return (
            <div
              key={entry}
              className="w-[248px] shrink-0 snap-start border-2 border-line bg-surface p-4 transition-transform duration-150 hover:-translate-y-1 hover:border-accent"
            >
              <div className="mb-3 flex items-center justify-between">
                <Icon size={20} className="text-accent" aria-hidden="true" />
                <span className="border border-olive px-1.5 py-0.5 font-display text-xs uppercase tracking-widest text-olive">
                  [done]
                </span>
              </div>
              <p className="font-display text-lg leading-snug text-text">{title}</p>
              {author && (
                <p className="mt-1.5 font-body text-xs text-muted">{author}</p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
