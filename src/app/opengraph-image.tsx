import { ImageResponse } from 'next/og'

export const alt = 'CEOVIA — clinically structured wellness'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '56px',
          background:
            'linear-gradient(160deg, #0D2F22 0%, #133C2B 60%, #1D4D38 100%)',
          color: '#F6F6F2',
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#D4A857',
          }}
        >
          CEOVIA
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div
            style={{
              fontSize: 72,
              lineHeight: 1,
              maxWidth: 900,
              fontWeight: 600,
            }}
          >
            Clinically structured wellness, grounded in disciplined evidence.
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.4,
              color: 'rgba(246, 246, 242, 0.84)',
              maxWidth: 920,
            }}
          >
            Premium Sea Buckthorn system design for skin, energy, and whole-body
            support.
          </div>
        </div>
      </div>
    ),
    size,
  )
}
