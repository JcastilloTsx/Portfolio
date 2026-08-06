import { howIWork } from '@/lib/content'
import FadeIn from '@/components/ui/FadeIn'

export default function HowIWork() {
  return (
    <section
      id="how-i-work"
      aria-labelledby="how-i-work-heading"
      className="border-t-2 border-line bg-surface py-24 lg:py-32"
    >
      <div className="mx-auto max-w-5xl px-6">
        <FadeIn>
          <header className="mb-16">
            <p className="mb-3 font-body text-xs text-muted">
              <span className="text-accent">$</span> man protocol
            </p>
            <h2
              id="how-i-work-heading"
              className="mb-5 font-display text-4xl font-bold text-text sm:text-5xl"
            >
              How I Work
            </h2>
            <p className="max-w-xl font-body text-lg leading-relaxed text-muted">
              {howIWork.headline}
            </p>
          </header>
        </FadeIn>

        <dl className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2">
          {howIWork.points.map((point, i) => (
            <FadeIn key={point.label} delay={i * 80} className="bg-surface">
              <div className="group relative h-full overflow-hidden p-6 transition-colors duration-150 hover:bg-bg">
                <dt className="mb-2 flex items-baseline gap-2 font-display text-lg font-bold text-text">
                  <span className="text-accent transition-transform duration-150 group-hover:translate-x-1">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {point.label}
                </dt>
                <dd className="font-body text-sm leading-relaxed text-muted">
                  {point.description}
                </dd>
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100"
                  style={{ transitionTimingFunction: 'steps(6, end)' }}
                />
              </div>
            </FadeIn>
          ))}
        </dl>
      </div>
    </section>
  )
}
