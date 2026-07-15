import type { CaseStudy as CaseStudyType } from '@/lib/content'

interface Props {
  study: CaseStudyType
  index: number
}

export default function CaseStudy({ study, index }: Props) {
  const number = String(index + 1).padStart(2, '0')

  return (
    <article aria-labelledby={`case-title-${study.id}`}>
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="mb-8 flex items-baseline gap-5">
        <span
          className="w-12 shrink-0 font-display text-5xl font-bold leading-none text-black/[0.08] tabular-nums dark:text-white/[0.08]"
          aria-hidden="true"
        >
          {number}
        </span>
        <div>
          <h3
            id={`case-title-${study.id}`}
            className="font-display text-xl font-bold leading-snug text-text sm:text-2xl"
          >
            {study.title}
            {study.confidential && (
              <span className="ml-3 inline-block align-middle font-body text-xs font-normal text-muted rounded border border-black/10 px-2 py-0.5 dark:border-white/10">
                NDA
              </span>
            )}
          </h3>
          <p className="mt-1 font-body text-sm text-muted">{study.client}</p>
        </div>
      </div>

      {/* ── Content grid ───────────────────────────────────────── */}
      <div className="ml-[68px] grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
        {/* Left: Context + Constraint */}
        <div className="space-y-6">
          <div>
            <h4 className="mb-2 font-display text-[10px] font-semibold uppercase tracking-[0.12em] text-accent">
              Context
            </h4>
            <p className="font-body text-sm leading-relaxed text-muted">
              {study.context}
            </p>
          </div>
          <div>
            <h4 className="mb-2 font-display text-[10px] font-semibold uppercase tracking-[0.12em] text-accent">
              Constraint
            </h4>
            <p className="font-body text-sm leading-relaxed text-muted">
              {study.constraint}
            </p>
          </div>
        </div>

        {/* Right: Built + Outcome */}
        <div className="space-y-6">
          <div>
            <h4 className="mb-2 font-display text-[10px] font-semibold uppercase tracking-[0.12em] text-accent">
              What I Built
            </h4>
            <p className="font-body text-sm leading-relaxed text-muted">
              {study.built}
            </p>
          </div>
          <div>
            <h4 className="mb-2 font-display text-[10px] font-semibold uppercase tracking-[0.12em] text-accent">
              Outcome
            </h4>
            <p className="font-body text-sm font-medium leading-relaxed text-text">
              {study.outcome}
            </p>
          </div>
        </div>
      </div>

      {/* ── Stack tags ─────────────────────────────────────────── */}
      <div className="ml-[68px] mt-8 flex flex-wrap gap-2">
        {study.stack.map((tech) => (
          <span
            key={tech}
            className="rounded border border-black/10 bg-surface px-2.5 py-1 font-body text-xs text-muted dark:border-white/10"
          >
            {tech}
          </span>
        ))}
      </div>

      {study.note && (
        <p className="ml-[68px] mt-3 font-body text-xs italic text-muted">
          {study.note}
        </p>
      )}
    </article>
  )
}
