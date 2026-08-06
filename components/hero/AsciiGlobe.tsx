'use client'

import { useEffect, useRef } from 'react'

const COLS = 116
const ROWS = 58
const CHARS = ' .:-=+*#%@'
const LAT_RINGS = 9
const LONG_MERIDIANS = 16
const RING_SAMPLES = 140
const TILT = 0.45
const DISTANCE = 2.6

interface Point3D {
  x: number
  y: number
  z: number
}

function buildWireframe(): Point3D[] {
  const points: Point3D[] = []

  for (let i = 1; i < LAT_RINGS; i++) {
    const lat = (-Math.PI / 2) + (i / LAT_RINGS) * Math.PI
    const ringRadius = Math.cos(lat)
    const y = Math.sin(lat)
    for (let j = 0; j < RING_SAMPLES; j++) {
      const theta = (j / RING_SAMPLES) * Math.PI * 2
      points.push({ x: ringRadius * Math.cos(theta), y, z: ringRadius * Math.sin(theta) })
    }
  }

  for (let i = 0; i < LONG_MERIDIANS; i++) {
    const lon = (i / LONG_MERIDIANS) * Math.PI * 2
    for (let j = 0; j < RING_SAMPLES; j++) {
      const t = (j / RING_SAMPLES) * Math.PI * 2
      points.push({ x: Math.cos(t) * Math.cos(lon), y: Math.sin(t), z: Math.cos(t) * Math.sin(lon) })
    }
  }

  return points
}

const WIREFRAME = buildWireframe()

function renderFrame(angle: number): string {
  const output = new Array(COLS * ROWS).fill(' ')
  const zbuffer = new Array(COLS * ROWS).fill(-Infinity)
  const cosA = Math.cos(angle)
  const sinA = Math.sin(angle)
  const cosT = Math.cos(TILT)
  const sinT = Math.sin(TILT)

  for (const p of WIREFRAME) {
    const x1 = p.x * cosA + p.z * sinA
    const z1 = -p.x * sinA + p.z * cosA
    const y1 = p.y

    const y2 = y1 * cosT - z1 * sinT
    const z2 = y1 * sinT + z1 * cosT

    const scale = DISTANCE / (DISTANCE - z2)
    const xp = Math.floor(COLS / 2 + x1 * scale * (COLS / 4.2))
    const yp = Math.floor(ROWS / 2 - y2 * scale * (ROWS / 4.4))

    if (xp < 0 || xp >= COLS || yp < 0 || yp >= ROWS) continue

    const idx = xp + yp * COLS
    if (z2 > zbuffer[idx]) {
      zbuffer[idx] = z2
      const depth = (z2 + 1) / 2
      const charIdx = Math.max(0, Math.min(CHARS.length - 1, Math.floor(depth * (CHARS.length - 1))))
      output[idx] = CHARS[charIdx]
    }
  }

  let out = ''
  for (let row = 0; row < ROWS; row++) {
    out += output.slice(row * COLS, row * COLS + COLS).join('') + '\n'
  }
  return out
}

export default function AsciiGlobe({ className = '' }: { className?: string }) {
  const preRef = useRef<HTMLPreElement>(null)
  const angle = useRef(0)

  useEffect(() => {
    const node = preRef.current
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || !node) return

    let raf = 0
    function tick() {
      angle.current += 0.012
      if (node) node.textContent = renderFrame(angle.current)
      raf = requestAnimationFrame(tick)
    }

    function handleVisibility() {
      cancelAnimationFrame(raf)
      if (!document.hidden) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    document.addEventListener('visibilitychange', handleVisibility)
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [])

  return (
    <pre
      ref={preRef}
      aria-hidden="true"
      className={`select-none whitespace-pre font-body leading-none text-accent ${className}`}
    >
      {renderFrame(0.6)}
    </pre>
  )
}
