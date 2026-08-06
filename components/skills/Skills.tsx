'use client'

import {
  SiReact, SiTypescript, SiNextdotjs, SiJavascript, SiRedux,
  SiNodedotjs, SiTailwindcss, SiGraphql, SiJest, SiDocker,
  SiStorybook, SiVite,
  SiRubyonrails, SiCypress, SiMongodb, SiTurborepo,
} from 'react-icons/si'
import type { IconType } from 'react-icons'
import { skillGroups } from '@/lib/content'
import TechMarquee from './TechMarquee'
import CoursesCarousel from './CoursesCarousel'

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

const LEVEL_METER: Record<string, { fill: number; color: string }> = {
  Expert:     { fill: 10, color: 'bg-olive' },
  Proficient: { fill: 7,  color: 'bg-accent' },
  Familiar:   { fill: 4,  color: 'bg-muted' },
}

const LEVEL_TEXT: Record<string, string> = {
  Expert: 'text-olive',
  Proficient: 'text-accent',
  Familiar: 'text-muted',
}

function LevelMeter({ level }: { level: string }) {
  const cfg = LEVEL_METER[level]
  return (
    <div className="flex gap-[3px]" role="img" aria-label={`${level} — ${cfg.fill}/10`}>
      {Array.from({ length: 10 }, (_, i) => (
        <span
          key={i}
          className={`h-3 w-2 border border-line ${i < cfg.fill ? cfg.color : 'bg-transparent'}`}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

export default function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="border-t-2 border-line py-24 lg:py-32"
    >
      <div className="mx-auto max-w-5xl px-6">
        <header className="mb-12">
          <p className="mb-3 font-body text-xs text-muted">
            <span className="text-accent">$</span> inventory --list
          </p>
          <h2
            id="skills-heading"
            className="font-display text-4xl font-bold text-text sm:text-5xl"
          >
            Skills
          </h2>
          <p className="mt-3 font-body text-sm text-muted">
            Meters read honest depth, not marketing — no skill is padded to look fuller than it is.
          </p>
        </header>

        {/* ── Scrolling tech ticker ────────────────────────── */}
        <TechMarquee />

        {/* ── Grouped skill tags with level meters ─────────── */}
        <div className="space-y-10">
          {skillGroups.map((group) => (
            <div key={group.level} className="border border-line">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-surface px-4 py-3">
                <h3
                  className={`font-display text-base uppercase tracking-[0.14em] ${LEVEL_TEXT[group.level]}`}
                >
                  {group.level}
                </h3>
                <LevelMeter level={group.level} />
              </div>
              <div className="flex flex-wrap gap-2 p-4" role="list">
                {group.skills.map((skill) => {
                  const Icon = SKILL_ICONS[skill]
                  return (
                    <span
                      key={skill}
                      role="listitem"
                      className="inline-flex items-center gap-1.5 border border-line px-3 py-1.5 font-display text-base text-text transition-transform duration-150 hover:-translate-y-0.5 hover:border-accent"
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
          ))}
        </div>

        {/* ── Courses ─────────────────────────────────────── */}
        <div className="mt-16 border-t-2 border-line pt-12">
          <CoursesCarousel />
        </div>
      </div>
    </section>
  )
}
