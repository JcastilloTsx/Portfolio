import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Jeffrey Castillo — Full-Stack Developer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0b0d0a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px 96px',
          fontFamily: 'monospace',
        }}
      >
        <p
          style={{
            fontSize: 20,
            color: '#ffb000',
            margin: '0 0 24px 0',
          }}
        >
          {'> whoami'}
        </p>
        <h1
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: '#dfe3cf',
            lineHeight: 1.0,
            margin: '0 0 28px 0',
          }}
        >
          Jeffrey Castillo
        </h1>
        <p
          style={{
            fontSize: 26,
            color: '#dfe3cf',
            margin: '0 0 12px 0',
          }}
        >
          {'> role --current'}
        </p>
        <p
          style={{
            fontSize: 30,
            fontWeight: 700,
            color: '#ffb000',
            margin: 0,
          }}
        >
          Full-Stack Developer
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
              width: 10,
              height: 10,
              background: '#9fc93c',
            }}
          />
          <span style={{ fontSize: 16, color: '#838a6c' }}>
            jeffvaleriano@gmail.com
          </span>
        </div>
      </div>
    ),
    { ...size },
  )
}
