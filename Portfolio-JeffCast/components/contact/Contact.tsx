'use client'

import { useState, type ChangeEvent, type FormEvent } from 'react'
import { person } from '@/lib/content'

type FormState = 'idle' | 'opened' | 'validating'

interface Fields {
  name: string
  email: string
  message: string
}

type FieldErrors = Partial<Record<keyof Fields, string>>

export default function Contact() {
  const [fields, setFields] = useState<Fields>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<FieldErrors>({})
  const [state, setState] = useState<FormState>('idle')

  function validate(): boolean {
    const next: FieldErrors = {}
    if (!fields.name.trim()) {
      next.name = 'Name is required.'
    }
    if (!fields.email.trim()) {
      next.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      next.email = 'Enter a valid email address.'
    }
    if (fields.message.trim().length < 10) {
      next.message = 'Message must be at least 10 characters.'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setFields((prev) => ({ ...prev, [name]: value }))
    // Clear individual error on change
    const key = name as keyof Fields
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }))
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setState('validating')
    if (!validate()) {
      setState('idle')
      return
    }
    const subject = encodeURIComponent(`Portfolio contact — ${fields.name}`)
    const body = encodeURIComponent(
      `Hi Jeffrey,\n\n${fields.message}\n\n—\n${fields.name}\n${fields.email}`,
    )
    window.location.href = `mailto:${person.email}?subject=${subject}&body=${body}`
    setState('opened')
    setFields({ name: '', email: '', message: '' })
    setErrors({})
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="border-t border-black/5 py-24 dark:border-white/10 lg:py-32"
    >
      <div className="mx-auto max-w-5xl px-6">
        <header className="mb-16">
          <p className="mb-3 font-body text-xs uppercase tracking-widest text-muted">
            04
          </p>
          <h2
            id="contact-heading"
            className="font-display text-3xl font-bold text-text sm:text-4xl"
          >
            Contact
          </h2>
        </header>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* ── Direct links ─────────────────────────────── */}
          <div>
            <p className="mb-8 max-w-sm font-body text-sm leading-relaxed text-muted">
              Available for remote and contract work with US companies.
              Fastest way to reach me:
            </p>
            <ul className="space-y-5" role="list">
              <li>
                <a
                  href={`mailto:${person.email}`}
                  className="group inline-flex items-baseline gap-4 text-text transition-colors duration-150 hover:text-accent"
                >
                  <span className="w-16 shrink-0 font-display text-[10px] font-semibold uppercase tracking-widest text-muted">
                    Email
                  </span>
                  <span className="font-body text-sm font-medium group-hover:underline underline-offset-4">
                    {person.email}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-baseline gap-4 text-text transition-colors duration-150 hover:text-accent"
                >
                  <span className="w-16 shrink-0 font-display text-[10px] font-semibold uppercase tracking-widest text-muted">
                    LinkedIn
                  </span>
                  <span className="font-body text-sm font-medium group-hover:underline underline-offset-4">
                    jeffrey-valeriano-castillo-nuñez
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={person.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-baseline gap-4 text-text transition-colors duration-150 hover:text-accent"
                >
                  <span className="w-16 shrink-0 font-display text-[10px] font-semibold uppercase tracking-widest text-muted">
                    GitHub
                  </span>
                  <span className="font-body text-sm font-medium group-hover:underline underline-offset-4">
                    JcastilloTsx
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* ── Contact form ─────────────────────────────── */}
          <div>
            {state === 'opened' ? (
              <div
                role="status"
                aria-live="polite"
                className="rounded border border-black/10 bg-surface p-6 dark:border-white/10"
              >
                <p className="mb-2 font-display font-semibold text-text">
                  Your email client is open.
                </p>
                <p className="mb-4 font-body text-sm text-muted">
                  The message has been pre-filled — hit send when ready.
                </p>
                <button
                  onClick={() => setState('idle')}
                  className="font-body text-sm text-accent hover:underline underline-offset-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block font-display text-[10px] font-semibold uppercase tracking-widest text-muted"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={fields.name}
                    onChange={handleChange}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    placeholder="Your name"
                    className={`w-full rounded border px-4 py-3 font-body text-sm text-text placeholder:text-muted/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                      errors.name
                        ? 'border-red-400 bg-red-50 dark:bg-red-950/20'
                        : 'border-black/10 bg-surface hover:border-black/20 dark:border-white/10 dark:hover:border-white/20'
                    }`}
                  />
                  {errors.name && (
                    <p
                      id="name-error"
                      role="alert"
                      className="mt-1.5 font-body text-xs text-red-500"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block font-display text-[10px] font-semibold uppercase tracking-widest text-muted"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={fields.email}
                    onChange={handleChange}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    placeholder="you@company.com"
                    className={`w-full rounded border px-4 py-3 font-body text-sm text-text placeholder:text-muted/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                      errors.email
                        ? 'border-red-400 bg-red-50 dark:bg-red-950/20'
                        : 'border-black/10 bg-surface hover:border-black/20 dark:border-white/10 dark:hover:border-white/20'
                    }`}
                  />
                  {errors.email && (
                    <p
                      id="email-error"
                      role="alert"
                      className="mt-1.5 font-body text-xs text-red-500"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-2 block font-display text-[10px] font-semibold uppercase tracking-widest text-muted"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    value={fields.message}
                    onChange={handleChange}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    placeholder="What's the project? What role are you hiring for?"
                    className={`w-full resize-none rounded border px-4 py-3 font-body text-sm text-text placeholder:text-muted/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                      errors.message
                        ? 'border-red-400 bg-red-50 dark:bg-red-950/20'
                        : 'border-black/10 bg-surface hover:border-black/20 dark:border-white/10 dark:hover:border-white/20'
                    }`}
                  />
                  {errors.message && (
                    <p
                      id="message-error"
                      role="alert"
                      className="mt-1.5 font-body text-xs text-red-500"
                    >
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={state === 'validating'}
                  className="w-full rounded bg-accent px-6 py-3 font-display text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#1344b8] disabled:opacity-60"
                >
                  Open email client
                </button>

                <p className="text-center font-body text-xs text-muted">
                  Pre-fills a draft in your mail client. Nothing is sent
                  automatically.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
