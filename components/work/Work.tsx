import { caseStudies } from '@/lib/content'
import CaseStudy from './CaseStudy'
import FadeIn from '@/components/ui/FadeIn'

export default function Work() {
  const published = caseStudies.filter((cs) => cs.published)

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="border-t-2 border-line py-24 lg:py-32"
    >
      <div className="mx-auto max-w-5xl px-6">
        <FadeIn>
          <header className="mb-16">
            <p className="mb-3 font-body text-xs text-muted">
              <span className="text-accent">$</span> ls ./work --published
            </p>
            <h2
              id="work-heading"
              className="font-display text-4xl font-bold text-text sm:text-5xl"
            >
              Selected Work
            </h2>
          </header>
        </FadeIn>

        <div className="space-y-16">
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
