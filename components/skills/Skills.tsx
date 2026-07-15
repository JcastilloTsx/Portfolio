'use client'

import {
  SiReact, SiTypescript, SiNextdotjs, SiJavascript, SiRedux,
  SiNodedotjs, SiTailwindcss, SiGraphql, SiJest, SiDocker,
  SiStorybook, SiVite,
  SiRubyonrails, SiCypress, SiMongodb, SiTurborepo,
} from 'react-icons/si'
import type { IconType } from 'react-icons'
import { skillGroups, courses } from '@/lib/content'
import TechMarquee from './TechMarquee'

const SKILL_ICONS: Record<string, IconType> = {
  'React 18+':                    SiReact,
  'TypeScript (strict mode)':     SiTypescript,
  'Next.js (App Router)':         SiNextdotjs,
  'JavaScript ES6+':              SiJavascript,
  'Redux Toolkit':                SiRedux,
  'Node.js (Express, NestJS)':    SiNodedotjs,
  'Tailwind CSS':                 SiTailwindcss,
  'GraphQL / Apollo Client':      SiGraphql,
  'Jest / React Testing Library': SiJest,
  'Docker / Kubernetes':          SiDocker,
  'Storybook':                    SiStorybook,
  'Webpack / Vite':               SiVite,
  'Ruby on Rails':                SiRubyonrails,
  'Cypress':                      SiCypress,
  'MongoDB':                      SiMongodb,
  'Turborepo / Nx':               SiTurborepo,
}

const levelColors = {
  Expert: {
    label: 'text-[var(--color-olive)]',
    pill: 'bg-olive/10 text-[var(--color-olive)] dark:bg-olive/20',
    dot: 'bg-[var(--color-olive)]',
  },
  Proficient: {
    label: 'text-accent',
    pill: 'bg-accent/10 text-accent dark:bg-accent/20',
    dot: 'bg-accent',
  },
  Familiar: {
    label: 'text-muted',
    pill: 'bg-black/5 text-text dark:bg-white/10',
    dot: 'bg-muted',
  },
} as const

export default function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="border-t border-black/5 py-24 dark:border-white/10 lg:py-32"
    >
      <div className="mx-auto max-w-5xl px-6">
        <header className="mb-12">
          <p className="mb-3 font-body text-xs uppercase tracking-widest text-muted">
            03
          </p>
          <h2
            id="skills-heading"
            className="font-display text-3xl font-bold text-text sm:text-4xl"
          >
            Skills
          </h2>
          <p className="mt-3 font-body text-sm text-muted">
            Grouped by honest depth — no progress bars.
          </p>
        </header>

        {/* ── Scrolling tech ticker ────────────────────────── */}
        <TechMarquee />

        {/* ── Grouped skill pills with icons ───────────────── */}
        <div className="space-y-12">
          {skillGroups.map((group) => {
            const cfg = levelColors[group.level]
            return (
              <div key={group.level}>
                <div className="mb-4 flex items-center gap-3">
                  <span
                    className={`h-2 w-2 shrink-0 rounded-full ${cfg.dot}`}
                    aria-hidden="true"
                  />
                  <h3
                    className={`font-display text-[10px] font-semibold uppercase tracking-[0.14em] ${cfg.label}`}
                  >
                    {group.level}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2" role="list">
                  {group.skills.map((skill) => {
                    const Icon = SKILL_ICONS[skill]
                    return (
                      <span
                        key={skill}
                        role="listitem"
                        className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-body text-sm font-medium transition-opacity hover:opacity-75 ${cfg.pill}`}
                      >
                        {Icon && (
                          <Icon size={13} aria-hidden="true" className="shrink-0" />
                        )}
                        {skill}
                      </span>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {/* ── Courses ─────────────────────────────────────── */}
        <div className="mt-16 border-t border-black/5 pt-12 dark:border-white/10">
          <h3 className="mb-5 font-display text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
            Courses &amp; Continuing Education
          </h3>
          <ul className="grid grid-cols-1 gap-y-2 sm:grid-cols-2" role="list">
            {courses.map((course) => (
              <li
                key={course}
                className="flex items-start gap-2.5 font-body text-sm text-muted"
              >
                <span
                  className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted"
                  aria-hidden="true"
                />
                {course}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
