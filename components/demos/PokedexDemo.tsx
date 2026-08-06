'use client'

import { useEffect, useState } from 'react'

const SPRITE_BASE = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon'
const classicSprite = (id: number) => `${SPRITE_BASE}/versions/generation-i/red-blue/${id}.png`
const animatedSprite = (id: number) => `${SPRITE_BASE}/versions/generation-v/black-white/animated/${id}.gif`
const modernSprite = (id: number) => `${SPRITE_BASE}/${id}.png`

const ROSTER: { id: number; name: string }[] = [
  { id: 1, name: 'bulbasaur' },
  { id: 3, name: 'venusaur' },
  { id: 4, name: 'charmander' },
  { id: 6, name: 'charizard' },
  { id: 7, name: 'squirtle' },
  { id: 9, name: 'blastoise' },
  { id: 25, name: 'pikachu' },
  { id: 39, name: 'jigglypuff' },
  { id: 52, name: 'meowth' },
  { id: 54, name: 'psyduck' },
  { id: 66, name: 'machop' },
  { id: 94, name: 'gengar' },
  { id: 130, name: 'gyarados' },
  { id: 133, name: 'eevee' },
  { id: 143, name: 'snorlax' },
  { id: 150, name: 'mewtwo' },
]

const TYPE_TONE: Record<string, string> = {
  fire: 'text-danger', fighting: 'text-danger', dragon: 'text-danger', poison: 'text-danger',
  grass: 'text-olive', bug: 'text-olive', ground: 'text-olive',
  water: 'text-accent', ice: 'text-accent', electric: 'text-accent', psychic: 'text-accent', flying: 'text-accent',
}

interface PokemonDetail {
  types: string[]
  height: number
  weight: number
  stats: { name: string; value: number }[]
  flavorText: string
}

function pokedexNumber(id: number): string {
  return `#${String(id).padStart(3, '0')}`
}

function StatMeter({ label, value }: { label: string; value: number }) {
  const filled = Math.round((value / 180) * 10)
  return (
    <div className="flex items-center gap-2">
      <span className="w-24 shrink-0 font-body text-[10px] uppercase tracking-widest text-muted">{label}</span>
      <div className="flex gap-[2px]">
        {Array.from({ length: 10 }, (_, i) => (
          <span key={i} className={`h-2.5 w-1.5 border border-line ${i < filled ? 'bg-accent' : 'bg-transparent'}`} />
        ))}
      </div>
      <span className="font-body text-[10px] text-muted">{value}</span>
    </div>
  )
}

function PokemonModal({ id, name, onClose }: { id: number; name: string; onClose: () => void }) {
  const [detail, setDetail] = useState<PokemonDetail | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')

  useEffect(() => {
    let cancelled = false
    setStatus('loading')

    Promise.all([
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((r) => {
        if (!r.ok) throw new Error('pokemon fetch failed')
        return r.json()
      }),
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then((r) => {
        if (!r.ok) throw new Error('species fetch failed')
        return r.json()
      }),
    ])
      .then(([pokemon, species]) => {
        if (cancelled) return
        const entry = (species?.flavor_text_entries ?? []).find(
          (e: { language: { name: string } }) => e.language.name === 'en',
        )
        const flavorText = (entry?.flavor_text ?? 'No pokedex entry available.')
          .replace(/[\n\f\r]/g, ' ')
          .replace(/\s+/g, ' ')
          .trim()

        setDetail({
          types: (pokemon?.types ?? []).map((t: { type: { name: string } }) => t.type.name),
          height: pokemon?.height ?? 0,
          weight: pokemon?.weight ?? 0,
          stats: (pokemon?.stats ?? []).map((s: { base_stat: number; stat: { name: string } }) => ({
            name: s.stat.name.replace('special-', 'sp. '),
            value: s.base_stat,
          })),
          flavorText,
        })
        setStatus('ready')
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, [id])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg/80 p-4" onClick={onClose}>
      <div
        className="max-h-[85vh] w-full max-w-lg overflow-y-auto border-2 border-line bg-surface"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b-2 border-line px-5 py-3">
          <p className="font-body text-xs text-muted">
            <span className="text-accent">$</span> pokedex --lookup {pokedexNumber(id)}
          </p>
          <button
            onClick={onClose}
            aria-label="Close"
            className="border border-line px-2 py-0.5 font-display text-base text-muted hover:border-danger hover:text-danger"
          >
            [X]
          </button>
        </div>

        <div className="p-5">
          <div className="mb-4 flex items-center gap-4">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center border-2 border-line bg-bg">
              <img
                src={animatedSprite(id)}
                alt={name}
                width={64}
                height={64}
                style={{ imageRendering: 'pixelated' }}
                onError={(e) => {
                  ;(e.target as HTMLImageElement).src = modernSprite(id)
                }}
              />
            </div>
            <div>
              <p className="font-body text-[11px] uppercase tracking-widest text-muted">{pokedexNumber(id)}</p>
              <h3 className="font-display text-2xl capitalize text-text">{name}</h3>
              {status === 'ready' && detail && (
                <div className="mt-1 flex gap-2">
                  {detail.types.map((t) => (
                    <span key={t} className={`border border-line px-1.5 py-0.5 font-display text-sm uppercase ${TYPE_TONE[t] ?? 'text-muted'}`}>
                      [{t}]
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {status === 'loading' && <p className="font-body text-sm text-muted">fetching pokedex entry...</p>}

          {status === 'error' && (
            <p className="border border-accent px-3 py-2 font-body text-xs text-accent">
              [WARN] pokedex entry unavailable — offline or rate-limited
            </p>
          )}

          {status === 'ready' && detail && (
            <div className="space-y-4">
              <p className="font-body text-sm italic leading-relaxed text-text">&ldquo;{detail.flavorText}&rdquo;</p>

              <div className="grid grid-cols-2 gap-3 border-t border-line pt-4 font-body text-xs">
                <div>
                  <div className="text-muted">height:</div>
                  <div className="font-semibold text-text">{(detail.height / 10).toFixed(1)} m</div>
                </div>
                <div>
                  <div className="text-muted">weight:</div>
                  <div className="font-semibold text-text">{(detail.weight / 10).toFixed(1)} kg</div>
                </div>
              </div>

              <div className="space-y-1.5 border-t border-line pt-4">
                {detail.stats.map((s) => (
                  <StatMeter key={s.name} label={s.name} value={s.value} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function PokedexDemo() {
  const [active, setActive] = useState<{ id: number; name: string } | null>(null)

  return (
    <div className="border-2 border-line bg-bg p-5 sm:p-7">
      <div className="mb-6 flex items-center justify-between gap-3 border-b-2 border-line pb-4">
        <p className="font-body text-xs text-muted">
          <span className="text-accent">$</span> ./run pokedex.tsx --gen 1
        </p>
        <span className="border border-line px-2 py-0.5 font-body text-[10px] uppercase tracking-widest text-muted">
          {ROSTER.length} entries
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {ROSTER.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setActive(p)}
            className="group border-2 border-line bg-surface p-3 text-left transition-colors hover:border-accent"
          >
            <div className="mb-2 flex aspect-square items-center justify-center border border-line bg-bg p-2">
              <img
                src={classicSprite(p.id)}
                alt={p.name}
                width={56}
                height={56}
                style={{ imageRendering: 'pixelated' }}
                className="grayscale transition-[filter] duration-150 group-hover:grayscale-0"
                onError={(e) => {
                  ;(e.target as HTMLImageElement).src = modernSprite(p.id)
                }}
              />
            </div>
            <p className="font-body text-[10px] text-muted">{pokedexNumber(p.id)}</p>
            <p className="truncate font-display text-base capitalize text-text">{p.name}</p>
          </button>
        ))}
      </div>

      {active && (
        <PokemonModal id={active.id} name={active.name} onClose={() => setActive(null)} />
      )}
    </div>
  )
}
