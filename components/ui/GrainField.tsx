'use client'

import { useEffect, useRef } from 'react'

const TILE = 512

function drawGrain(ctx: CanvasRenderingContext2D) {
  const imageData = ctx.createImageData(TILE, TILE)
  const data = imageData.data
  for (let i = 0; i < data.length; i += 4) {
    const v = Math.random() * 255
    data[i] = v
    data[i + 1] = v
    data[i + 2] = v
    data[i + 3] = Math.random() < 0.35 ? 46 : 0
  }
  ctx.putImageData(imageData, 0, 0)
}

/**
 * Site-wide CRT ambience: a low, theme-aware glow behind the scene plus a
 * chunky (pixelated, not photographic) animated static grain on top.
 */
export default function GrainField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    canvas.width = TILE
    canvas.height = TILE
    drawGrain(ctx)

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    let raf = 0
    let frame = 0
    function tick() {
      frame++
      if (frame % 4 === 0) drawGrain(ctx!)
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
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.10] dark:opacity-[0.16]"
        style={{
          background: 'radial-gradient(circle 640px at 50% 10%, var(--color-accent), transparent 70%)',
        }}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-[0.5]"
        style={{ imageRendering: 'pixelated' }}
      />
    </div>
  )
}
