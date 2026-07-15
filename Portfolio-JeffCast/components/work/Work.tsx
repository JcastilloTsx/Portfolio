import { caseStudies } from '@/lib/content'
import CaseStudy from './CaseStudy'
import FadeIn from '@/components/ui/FadeIn'

export default function Work() {
  const published = caseStudies.filter((cs) => cs.published)

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="border-t border-black/5 py-24 dark:border-white/10 lg:py-32"
    >
      <div className="mx-auto max-w-5xl px-6">
        <FadeIn>
          <header className="mb-16">
            <p className="mb-3 font-body text-xs uppercase tracking-widest text-muted">
              01
            </p>
            <h2
              id="work-heading"
              className="font-display text-3xl font-bold text-text sm:text-4xl"
            >
              Selected Work
            </h2>
          </header>
        </FadeIn>

        <div className="space-y-24">
          {published.map((cs, i) => (
            <FadeIn key={cs.id} delay={i * 80}>
              <CaseStudy study={cs} index={i} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
