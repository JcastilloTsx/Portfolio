'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ScanlineGrid from '@/components/ui/ScanlineGrid'

interface CryptoData {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  price_change_percentage_24h: number
  total_volume: number
  high_24h: number
  low_24h: number
  sparkline_in_7d: { price: number[] }
}

const DEFAULT_IDS = [
  'bitcoin', 'ethereum', 'binancecoin', 'solana',
  'cardano', 'ripple', 'dogecoin', 'polkadot',
]

function fallbackAvatar(symbol: string): string {
  const initial = (symbol.charAt(0) || '?').toUpperCase()
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><rect width="28" height="28" fill="#838a6c"/><text x="14" y="19" font-family="monospace" font-size="13" fill="#0b0d0a" text-anchor="middle">${initial}</text></svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

const MOCK_DATA: CryptoData[] = [
  {
    id: 'bitcoin', symbol: 'btc', name: 'Bitcoin',
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
    current_price: 43250.5, market_cap: 847500000000,
    price_change_percentage_24h: 2.45, total_volume: 18500000000,
    high_24h: 44100.25, low_24h: 42800.75,
    sparkline_in_7d: { price: [42000, 42500, 43000, 42800, 43200, 43500, 43250] },
  },
  {
    id: 'ethereum', symbol: 'eth', name: 'Ethereum',
    image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
    current_price: 2650.75, market_cap: 318500000000,
    price_change_percentage_24h: -1.25, total_volume: 12500000000,
    high_24h: 2720.5, low_24h: 2620.25,
    sparkline_in_7d: { price: [2700, 2680, 2650, 2670, 2640, 2660, 2650] },
  },
  {
    id: 'binancecoin', symbol: 'bnb', name: 'BNB',
    image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png',
    current_price: 315.25, market_cap: 47200000000,
    price_change_percentage_24h: 0.85, total_volume: 1250000000,
    high_24h: 320.5, low_24h: 312.75,
    sparkline_in_7d: { price: [310, 312, 315, 318, 314, 316, 315] },
  },
  {
    id: 'solana', symbol: 'sol', name: 'Solana',
    image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
    current_price: 98.45, market_cap: 43500000000,
    price_change_percentage_24h: 3.75, total_volume: 2100000000,
    high_24h: 102.25, low_24h: 95.5,
    sparkline_in_7d: { price: [95, 97, 99, 96, 98, 100, 98] },
  },
  {
    id: 'cardano', symbol: 'ada', name: 'Cardano',
    image: fallbackAvatar('ada'),
    current_price: 0.45, market_cap: 16000000000,
    price_change_percentage_24h: 1.2, total_volume: 300000000,
    high_24h: 0.46, low_24h: 0.44,
    sparkline_in_7d: { price: [0.44, 0.445, 0.45, 0.448, 0.452, 0.447, 0.45] },
  },
  {
    id: 'ripple', symbol: 'xrp', name: 'XRP',
    image: fallbackAvatar('xrp'),
    current_price: 0.62, market_cap: 34000000000,
    price_change_percentage_24h: -0.5, total_volume: 1200000000,
    high_24h: 0.63, low_24h: 0.6,
    sparkline_in_7d: { price: [0.61, 0.615, 0.62, 0.618, 0.622, 0.619, 0.62] },
  },
  {
    id: 'dogecoin', symbol: 'doge', name: 'Dogecoin',
    image: fallbackAvatar('doge'),
    current_price: 0.15, market_cap: 21000000000,
    price_change_percentage_24h: 4.2, total_volume: 900000000,
    high_24h: 0.155, low_24h: 0.142,
    sparkline_in_7d: { price: [0.144, 0.146, 0.15, 0.148, 0.152, 0.149, 0.15] },
  },
  {
    id: 'polkadot', symbol: 'dot', name: 'Polkadot',
    image: fallbackAvatar('dot'),
    current_price: 6.8, market_cap: 9500000000,
    price_change_percentage_24h: -1.8, total_volume: 180000000,
    high_24h: 7.0, low_24h: 6.7,
    sparkline_in_7d: { price: [6.95, 6.9, 6.8, 6.85, 6.75, 6.82, 6.8] },
  },
]

const formatPrice = (price: number): string => {
  if (price < 0.01) return `$${price.toFixed(6)}`
  if (price < 1) return `$${price.toFixed(4)}`
  if (price < 100) return `$${price.toFixed(2)}`
  return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

const formatMarketCap = (value: number): string => {
  if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`
  return `$${value.toLocaleString()}`
}

const formatPercentage = (value: number): string =>
  `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`

function useElementSize<T extends HTMLElement>(): [React.RefObject<T | null>, { width: number; height: number }] {
  const ref = useRef<T>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const update = () => setSize({ width: node.clientWidth, height: node.clientHeight })
    update()
    const ro = new ResizeObserver(update)
    ro.observe(node)
    return () => ro.disconnect()
  }, [])

  return [ref, size]
}

function Sparkline({ data, positive }: { data: number[]; positive: boolean }) {
  const [containerRef, { width }] = useElementSize<HTMLDivElement>()
  const [hoverIdx, setHoverIdx] = useState<number | null>(null)
  const height = 120
  const padding = { top: 8, right: 4, bottom: 4, left: 4 }
  const innerW = Math.max(0, width - padding.left - padding.right)
  const innerH = Math.max(0, height - padding.top - padding.bottom)

  const minV = Math.min(...data)
  const maxV = Math.max(...data)
  const range = maxV - minV || 1

  const points = useMemo(
    () =>
      data.map(
        (v, i) =>
          [
            data.length <= 1 ? 0 : (i / (data.length - 1)) * innerW,
            innerH - ((v - minV) / range) * innerH,
          ] as const,
      ),
    [data, innerW, innerH, minV, range],
  )

  const linePath = points.map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`)).join(' ')
  const areaPath = points.length > 1 ? `${linePath} L ${innerW} ${innerH} L 0 ${innerH} Z` : ''
  const color = positive ? 'var(--color-olive)' : 'var(--color-danger)'

  function handleMove(clientX: number) {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = clientX - rect.left - padding.left
    if (x < 0 || x > innerW) {
      setHoverIdx(null)
      return
    }
    const idx = Math.round((x / innerW) * (data.length - 1))
    setHoverIdx(Math.max(0, Math.min(data.length - 1, idx)))
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full cursor-crosshair"
      style={{ height }}
      onMouseMove={(e) => handleMove(e.clientX)}
      onMouseLeave={() => setHoverIdx(null)}
      onTouchStart={(e) => e.touches[0] && handleMove(e.touches[0].clientX)}
      onTouchMove={(e) => e.touches[0] && handleMove(e.touches[0].clientX)}
      onTouchEnd={() => setHoverIdx(null)}
    >
      <svg width={width} height={height} className="overflow-visible">
        <g transform={`translate(${padding.left},${padding.top})`}>
          {areaPath && <path d={areaPath} fill={color} fillOpacity={0.12} stroke="none" />}
          <path d={linePath} fill="none" stroke={color} strokeWidth={2} />
          {hoverIdx !== null && points[hoverIdx] && (
            <>
              <line
                x1={points[hoverIdx][0]}
                y1={0}
                x2={points[hoverIdx][0]}
                y2={innerH}
                stroke="var(--color-muted)"
                strokeDasharray="3 3"
                strokeWidth={1}
              />
              <rect
                x={points[hoverIdx][0] - 4}
                y={points[hoverIdx][1] - 4}
                width={8}
                height={8}
                fill="var(--color-bg)"
                stroke={color}
                strokeWidth={2}
              />
            </>
          )}
        </g>
      </svg>

      {hoverIdx !== null && points[hoverIdx] && (
        <div
          className="pointer-events-none absolute border border-line bg-bg px-2 py-1 font-body text-[11px] text-text"
          style={{
            top: Math.max(0, points[hoverIdx][1] - 28),
            left: Math.min(Math.max(points[hoverIdx][0] - 30, 0), Math.max(width - 64, 0)),
          }}
        >
          {formatPrice(data[hoverIdx])}
        </div>
      )}
    </div>
  )
}

function CoinCard({ coin, onOpen }: { coin: CryptoData; onOpen: (coin: CryptoData) => void }) {
  const positive = coin.price_change_percentage_24h >= 0

  return (
    <button
      type="button"
      onClick={() => onOpen(coin)}
      className="w-full border-2 border-line bg-surface p-4 text-left transition-colors hover:border-accent"
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={coin.image}
            alt={coin.name}
            width={28}
            height={28}
            className="border border-line"
            onError={(e) => {
              ;(e.target as HTMLImageElement).src = fallbackAvatar(coin.symbol)
            }}
          />
          <div className="min-w-0">
            <h3 className="truncate font-display text-lg leading-tight text-text">{coin.name}</h3>
            <p className="font-body text-[11px] uppercase tracking-widest text-muted">{coin.symbol}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="font-display text-xl leading-tight text-text">{formatPrice(coin.current_price)}</div>
          <div className={`font-body text-xs font-semibold ${positive ? 'text-olive' : 'text-danger'}`}>
            {positive ? '▲' : '▼'} {formatPercentage(coin.price_change_percentage_24h)}
          </div>
        </div>
      </div>

      <div className="mb-3 border border-line">
        <Sparkline data={coin.sparkline_in_7d?.price ?? []} positive={positive} />
      </div>

      <div className="grid grid-cols-2 gap-3 border-t border-line pt-3 font-body text-xs">
        <div>
          <div className="text-muted">mkt_cap:</div>
          <div className="font-semibold text-text">{formatMarketCap(coin.market_cap)}</div>
        </div>
        <div>
          <div className="text-muted">vol_24h:</div>
          <div className="font-semibold text-text">{formatMarketCap(coin.total_volume)}</div>
        </div>
        <div>
          <div className="text-muted">high_24h:</div>
          <div className="font-semibold text-olive">{formatPrice(coin.high_24h)}</div>
        </div>
        <div>
          <div className="text-muted">low_24h:</div>
          <div className="font-semibold text-danger">{formatPrice(coin.low_24h)}</div>
        </div>
      </div>

      <p className="mt-3 border-t border-line pt-2 text-center font-body text-[11px] text-muted">
        click for details →
      </p>
    </button>
  )
}

interface CoinDetail {
  description: string
  homepage?: string
  ath: number
  ath_change_percentage: number
  circulating_supply: number
  max_supply: number | null
}

function CoinDetailModal({ coin, onClose }: { coin: CryptoData; onClose: () => void }) {
  const [detail, setDetail] = useState<CoinDetail | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')

  useEffect(() => {
    let cancelled = false
    setStatus('loading')
    fetch(`https://api.coingecko.com/api/v3/coins/${coin.id}?localization=false&tickers=false&community_data=false&developer_data=false`)
      .then((res) => {
        if (!res.ok) throw new Error('detail fetch failed')
        return res.json()
      })
      .then((data) => {
        if (cancelled) return
        const rawDescription: string = data?.description?.en ?? ''
        const description = rawDescription.split('. ').slice(0, 2).join('. ').replace(/<[^>]*>/g, '')
        setDetail({
          description: description || 'No description available.',
          homepage: data?.links?.homepage?.[0] || undefined,
          ath: data?.market_data?.ath?.usd ?? 0,
          ath_change_percentage: data?.market_data?.ath_change_percentage?.usd ?? 0,
          circulating_supply: data?.market_data?.circulating_supply ?? 0,
          max_supply: data?.market_data?.max_supply ?? null,
        })
        setStatus('ready')
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })
    return () => {
      cancelled = true
    }
  }, [coin.id])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const positive = coin.price_change_percentage_24h >= 0

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg/80 p-4" onClick={onClose}>
      <div
        className="max-h-[85vh] w-full max-w-lg overflow-y-auto border-2 border-line bg-surface"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b-2 border-line px-5 py-3">
          <p className="font-body text-xs text-muted">
            <span className="text-accent">$</span> cat {coin.id}.json
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
          <div className="mb-4 flex items-center gap-3">
            <img
              src={coin.image}
              alt={coin.name}
              width={36}
              height={36}
              className="border border-line"
              onError={(e) => {
                ;(e.target as HTMLImageElement).src = fallbackAvatar(coin.symbol)
              }}
            />
            <div>
              <h3 className="font-display text-2xl text-text">{coin.name}</h3>
              <p className="font-body text-xs uppercase tracking-widest text-muted">{coin.symbol}</p>
            </div>
            <div className="ml-auto text-right">
              <div className="font-display text-xl text-text">{formatPrice(coin.current_price)}</div>
              <div className={`font-body text-xs font-semibold ${positive ? 'text-olive' : 'text-danger'}`}>
                {positive ? '▲' : '▼'} {formatPercentage(coin.price_change_percentage_24h)}
              </div>
            </div>
          </div>

          {status === 'loading' && (
            <p className="font-body text-sm text-muted">fetching coin data...</p>
          )}

          {status === 'error' && (
            <p className="border border-accent px-3 py-2 font-display text-sm text-accent">
              [WARN] details unavailable — offline or rate-limited
            </p>
          )}

          {status === 'ready' && detail && (
            <div className="space-y-4">
              <p className="font-body text-sm leading-relaxed text-text">{detail.description}</p>

              <div className="grid grid-cols-2 gap-3 border-t border-line pt-4 font-body text-xs">
                <div>
                  <div className="text-muted">all_time_high:</div>
                  <div className="font-semibold text-text">{formatPrice(detail.ath)}</div>
                </div>
                <div>
                  <div className="text-muted">from_ath:</div>
                  <div className="font-semibold text-danger">{detail.ath_change_percentage.toFixed(1)}%</div>
                </div>
                <div>
                  <div className="text-muted">circulating_supply:</div>
                  <div className="font-semibold text-text">{Math.round(detail.circulating_supply).toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-muted">max_supply:</div>
                  <div className="font-semibold text-text">
                    {detail.max_supply ? Math.round(detail.max_supply).toLocaleString() : 'uncapped'}
                  </div>
                </div>
              </div>

              {detail.homepage && (
                <a
                  href={detail.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border-2 border-line px-4 py-2 font-display text-base text-text transition-colors hover:border-accent hover:text-accent"
                >
                  $ open --homepage
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function SearchModal({
  onClose,
  onAdd,
}: {
  onClose: () => void
  onAdd: (coin: CryptoData) => void
}) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<CryptoData[]>([])
  const [loading, setLoading] = useState(false)

  const search = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([])
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(q)}`)
      if (!res.ok) throw new Error('search failed')
      const data = await res.json()
      const ids = (data.coins ?? []).slice(0, 5).map((c: { id: string }) => c.id).join(',')
      if (!ids) {
        setResults([])
        return
      }
      const detailRes = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&sparkline=true&price_change_percentage=24h`,
      )
      if (!detailRes.ok) throw new Error('details failed')
      setResults(await detailRes.json())
    } catch {
      const q2 = q.toLowerCase()
      setResults(MOCK_DATA.filter((c) => c.name.toLowerCase().includes(q2) || c.symbol.includes(q2)))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const id = setTimeout(() => search(query), 300)
    return () => clearTimeout(id)
  }, [query, search])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-bg/80 p-4 pt-24" onClick={onClose}>
      <div className="w-full max-w-lg border-2 border-line bg-surface" onClick={(e) => e.stopPropagation()}>
        <div className="border-b-2 border-line p-3">
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search_coin --query"
            className="w-full border border-line bg-bg px-3 py-2 font-body text-sm text-text placeholder:text-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          />
        </div>
        <div className="max-h-72 overflow-y-auto">
          {loading ? (
            <p className="p-6 text-center font-body text-sm text-muted">searching...</p>
          ) : results.length > 0 ? (
            results.map((coin) => (
              <button
                key={coin.id}
                onClick={() => {
                  onAdd(coin)
                  onClose()
                }}
                className="flex w-full items-center gap-3 border-b border-line p-3 text-left transition-colors hover:bg-bg"
              >
                <img
                  src={coin.image}
                  alt={coin.name}
                  width={24}
                  height={24}
                  className="border border-line"
                  onError={(e) => {
                    ;(e.target as HTMLImageElement).src = fallbackAvatar(coin.symbol)
                  }}
                />
                <div>
                  <div className="font-display text-base text-text">{coin.name}</div>
                  <div className="font-body text-xs uppercase text-muted">{coin.symbol}</div>
                </div>
              </button>
            ))
          ) : (
            <p className="p-6 text-center font-body text-sm text-muted">
              {query ? 'no results found' : 'start typing to search'}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default function CryptoDashboard() {
  const [coins, setCoins] = useState<CryptoData[]>(MOCK_DATA)
  const [ids, setIds] = useState<string[]>(DEFAULT_IDS)
  const [loading, setLoading] = useState(true)
  const [notice, setNotice] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [activeCoin, setActiveCoin] = useState<CryptoData | null>(null)

  const fetchCoins = useCallback(async () => {
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids.join(',')}&order=market_cap_desc&sparkline=true&price_change_percentage=24h`,
      )
      if (!res.ok) throw new Error('feed unavailable')
      const data = await res.json()
      if (!Array.isArray(data) || data.length === 0) throw new Error('empty feed')
      setCoins(data)
      setNotice(null)
    } catch {
      setCoins(MOCK_DATA.filter((c) => ids.includes(c.id)))
      setNotice('live feed unavailable — showing cached snapshot')
    } finally {
      setLoading(false)
    }
  }, [ids])

  useEffect(() => {
    fetchCoins()
    const interval = setInterval(fetchCoins, 60000)
    return () => clearInterval(interval)
  }, [fetchCoins])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  function addCoin(coin: CryptoData) {
    if (!ids.includes(coin.id)) setIds((prev) => [...prev, coin.id])
    setCoins((prev) => (prev.some((c) => c.id === coin.id) ? prev : [...prev, coin]))
  }

  return (
    <div className="relative overflow-hidden border-2 border-line bg-bg p-5 sm:p-7">
      <ScanlineGrid className="absolute inset-0" />
      <div className="relative">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b-2 border-line pb-4">
          <p className="font-body text-xs text-muted">
            <span className="text-accent">$</span> ./run market_watch.tsx
          </p>
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 border border-line px-3 py-1.5 font-display text-base text-text transition-colors hover:border-accent hover:text-accent"
          >
            search_coin
            <kbd className="border border-line px-1.5 py-0.5 text-[10px] text-muted">⌘K</kbd>
          </button>
        </div>

        {notice && (
          <p className="mb-4 border border-accent px-3 py-2 font-display text-sm text-accent">
            [WARN] {notice}
          </p>
        )}

        {loading ? (
          <p className="p-8 text-center font-body text-sm text-muted">loading market data...</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {coins.map((coin) => (
              <CoinCard key={coin.id} coin={coin} onOpen={setActiveCoin} />
            ))}
          </div>
        )}
      </div>

      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} onAdd={addCoin} />}
      {activeCoin && <CoinDetailModal coin={activeCoin} onClose={() => setActiveCoin(null)} />}
    </div>
  )
}
