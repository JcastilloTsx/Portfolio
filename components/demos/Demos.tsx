import DemoCarousel from './DemoCarousel'
import FadeIn from '@/components/ui/FadeIn'

export default function Demos() {
  return (
    <section
      id="demos"
      aria-labelledby="demos-heading"
      className="border-t-2 border-line bg-surface py-24 lg:py-32"
    >
      <div className="mx-auto max-w-5xl px-6">
        <FadeIn>
          <header className="mb-12">
            <p className="mb-3 font-body text-xs text-muted">
              <span className="text-accent">$</span> ./run live_demo.tsx
            </p>
            <h2
              id="demos-heading"
              className="font-display text-4xl font-bold text-text sm:text-5xl"
            >
              Live Build
            </h2>
            <p className="mt-3 max-w-xl font-body text-sm leading-relaxed text-muted">
              Two interactive components built for this page — live market data via CoinGecko
              (not investment advice) and a Pokédex via PokeAPI. Proof of craft, not client work.
            </p>
          </header>
        </FadeIn>

        <FadeIn delay={80}>
          <DemoCarousel />
        </FadeIn>
      </div>
    </section>
  )
}
