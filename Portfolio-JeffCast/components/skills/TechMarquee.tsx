'use client'

import {
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiJavascript,
  SiRedux,
  SiNodedotjs,
  SiTailwindcss,
  SiGraphql,
  SiJest,
  SiDocker,
  SiKubernetes,
  SiStorybook,
  SiVite,
  SiWebpack,
  SiRubyonrails,
  SiCypress,
  SiMongodb,
  SiTurborepo,
} from 'react-icons/si'
import type { IconType } from 'react-icons'

interface TechItem {
  name: string
  Icon: IconType
  color: string
}

const ROW_1: TechItem[] = [
  { name: 'React',       Icon: SiReact,          color: '#61DAFB' },
  { name: 'TypeScript',  Icon: SiTypescript,     color: '#3178C6' },
  { name: 'Next.js',     Icon: SiNextdotjs,      color: 'currentColor' },
  { name: 'JavaScript',  Icon: SiJavascript,     color: '#F7DF1E' },
  { name: 'Redux',       Icon: SiRedux,          color: '#764ABC' },
  { name: 'Node.js',     Icon: SiNodedotjs,      color: '#339933' },
  { name: 'Tailwind',    Icon: SiTailwindcss,    color: '#06B6D4' },
  { name: 'GraphQL',     Icon: SiGraphql,        color: '#E10098' },
  { name: 'Jest',        Icon: SiJest,           color: '#C21325' },
  { name: 'Docker',      Icon: SiDocker,         color: '#2496ED' },
  { name: 'Vite',        Icon: SiVite,           color: '#646CFF' },
]

const ROW_2: TechItem[] = [
  { name: 'Kubernetes',    Icon: SiKubernetes,  color: '#326CE5' },
  { name: 'Storybook',     Icon: SiStorybook,   color: '#FF4785' },
  { name: 'Webpack',       Icon: SiWebpack,     color: '#8DD6F9' },
  { name: 'MongoDB',       Icon: SiMongodb,     color: '#47A248' },
  { name: 'Ruby on Rails', Icon: SiRubyonrails, color: '#CC0000' },
  { name: 'Cypress',       Icon: SiCypress,     color: 'currentColor' },
  { name: 'Turborepo',     Icon: SiTurborepo,   color: 'currentColor' },
]

function MarqueeRow({
  items,
  speed,
  reverse = false,
}: {
  items: TechItem[]
  speed: number
  reverse?: boolean
}) {
  const doubled = [...items, ...items]
  return (
    <div className="flex overflow-hidden">
      <div
        className={`flex shrink-0 gap-3 ${reverse ? 'marquee-reverse' : 'marquee-forward'}`}
        style={{ '--marquee-speed': `${speed}s` } as React.CSSProperties}
      >
        {doubled.map((tech, i) => (
          <div
            key={i}
            className="flex items-center gap-2 rounded-lg border border-black/8 bg-surface px-3.5 py-2 dark:border-white/8"
          >
            <tech.Icon
              size={16}
              style={{ color: tech.color === 'currentColor' ? undefined : tech.color, flexShrink: 0 }}
              className={tech.color === 'currentColor' ? 'text-text' : ''}
              aria-hidden="true"
            />
            <span className="whitespace-nowrap font-body text-xs font-medium text-text">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function TechMarquee() {
  return (
    <div
      className="relative mb-16 overflow-hidden py-2"
      aria-label="Technology stack — scrolling showcase"
    >
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-bg to-transparent" />

      <div className="space-y-3">
        <MarqueeRow items={ROW_1} speed={45} />
        <MarqueeRow items={ROW_2} speed={55} reverse />
      </div>
    </div>
  )
}
