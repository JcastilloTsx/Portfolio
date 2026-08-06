import type { CaseStudy as CaseStudyType } from '@/lib/content'

interface Props {
  study: CaseStudyType
  index: number
}

export default function CaseStudy({ study, index }: Props) {
  const number = String(index + 1).padStart(2, '0')

  return (
    <article
      aria-labelledby={`case-title-${study.id}`}
      className="border-2 border-line bg-surface transition-transform duration-150 hover:-translate-y-1 hover:border-accent hover:shadow-[4px_4px_0_var(--color-line)]"
    >
      {/* ── Process header ───────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-line px-5 py-3">
        <p className="font-body text-xs uppercase tracking-widest text-muted">
          process #{number} <span className="text-text">{study.id}</span>
        </p>
        <div className="flex items-center gap-2">
          {study.confidential && (
            <span className="border border-line px-2 py-0.5 font-display text-sm uppercase tracking-widest text-muted">
              [NDA]
            </span>
          )}
          <span className="border border-olive px-2 py-0.5 font-display text-sm uppercase tracking-widest text-olive">
            [COMPLETE]
          </span>
        </div>
      </div>

      <div className="p-5 sm:p-7">
        <h3
          id={`case-title-${study.id}`}
          className="font-display text-2xl font-bold leading-snug text-text sm:text-3xl"
        >
          {study.title}
        </h3>
        <p className="mt-1 font-body text-sm text-muted">{study.client}</p>

        {/* ── Content grid ─────────────────────────────────────── */}
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
          <div className="space-y-6">
            <div>
              <h4 className="mb-2 font-body text-[11px] font-semibold uppercase tracking-[0.12em] text-accent">
                context:
              </h4>
              <p className="font-body text-sm leading-relaxed text-muted">
                {study.context}
              </p>
            </div>
            <div>
              <h4 className="mb-2 font-body text-[11px] font-semibold uppercase tracking-[0.12em] text-accent">
                constraint:
              </h4>
              <p className="font-body text-sm leading-relaxed text-muted">
                {study.constraint}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="mb-2 font-body text-[11px] font-semibold uppercase tracking-[0.12em] text-accent">
                built:
              </h4>
              <p className="font-body text-sm leading-relaxed text-muted">
                {study.built}
              </p>
            </div>
            <div>
              <h4 className="mb-2 font-body text-[11px] font-semibold uppercase tracking-[0.12em] text-accent">
                outcome:
              </h4>
              <p className="font-body text-sm font-medium leading-relaxed text-text">
                {study.outcome}
              </p>
            </div>
          </div>
        </div>

        {/* ── Stack tags ───────────────────────────────────────── */}
        <div className="mt-8 flex flex-wrap gap-2">
          {study.stack.map((tech) => (
            <span
              key={tech}
              className="border border-line px-2.5 py-1 font-display text-sm text-muted transition-transform duration-150 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
            >
              [{tech}]
            </span>
          ))}
        </div>

        {study.note && (
          <p className="mt-3 font-body text-xs italic text-muted">
            {study.note}
          </p>
        )}
      </div>
    </article>
  )
}
