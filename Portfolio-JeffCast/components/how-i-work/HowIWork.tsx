import { howIWork } from '@/lib/content'
import FadeIn from '@/components/ui/FadeIn'

export default function HowIWork() {
  return (
    <section
      id="how-i-work"
      aria-labelledby="how-i-work-heading"
      className="border-t border-black/5 bg-surface py-24 dark:border-white/10 lg:py-32"
    >
      <div className="mx-auto max-w-5xl px-6">
        <FadeIn>
          <header className="mb-16">
            <p className="mb-3 font-body text-xs uppercase tracking-widest text-muted">
              02
            </p>
            <h2
              id="how-i-work-heading"
              className="mb-5 font-display text-3xl font-bold text-text sm:text-4xl"
            >
              How I Work
            </h2>
            <p className="max-w-xl font-body text-lg leading-relaxed text-muted">
              {howIWork.headline}
            </p>
          </header>
        </FadeIn>

        <dl className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          {howIWork.points.map((point, i) => (
            <FadeIn key={point.label} delay={i * 80}>
              <div>
                <dt className="mb-2 font-display text-base font-semibold text-text">
                  {point.label}
                </dt>
                <dd className="font-body text-sm leading-relaxed text-muted">
                  {point.description}
                </dd>
              </div>
            </FadeIn>
          ))}
        </dl>
      </div>
    </section>
  )
}
