interface Props {
  className?: string
  live?: boolean
}

/**
 * Authored CRT scanline overlay — replaces generic decorative patterns
 * with a texture native to the terminal/CRT world. Pure CSS, no assets.
 */
export default function ScanlineGrid({ className = '', live = false }: Props) {
  return (
    <div
      aria-hidden="true"
      className={`scanline-grid pointer-events-none ${live ? 'is-live' : ''} ${className}`}
    />
  )
}
