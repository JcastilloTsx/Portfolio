import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Jeffrey Castillo — Senior Frontend Developer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#f7f7f5',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px 96px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <p
          style={{
            fontSize: 15,
            color: '#6b7280',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            margin: '0 0 28px 0',
          }}
        >
          Mexico · UTC · Open to remote / contract (US)
        </p>
        <h1
          style={{
            fontSize: 80,
            fontWeight: 700,
            color: '#0d0d0d',
            lineHeight: 1.0,
            margin: '0 0 28px 0',
          }}
        >
          Jeffrey Castillo
        </h1>
        <p
          style={{
            fontSize: 26,
            color: '#6b7280',
            margin: 0,
            lineHeight: 1.4,
          }}
        >
          Senior Frontend Engineer — React, TypeScript, Next.js
        </p>
        <div
          style={{
            position: 'absolute',
            bottom: 80,
            right: 96,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#1a56db',
            }}
          />
          <span style={{ fontSize: 14, color: '#6b7280' }}>
            jeffvaleriano@gmail.com
          </span>
        </div>
      </div>
    ),
    { ...size },
  )
}
