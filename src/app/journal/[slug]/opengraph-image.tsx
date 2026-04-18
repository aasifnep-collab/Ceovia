import { ImageResponse } from 'next/og'
import { getJournalArticleBySlug } from '@/lib/journal'

export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

// generateStaticParams must NOT be exported from an OG image route —
// ImageResponse uses the edge runtime, which is incompatible with static
// param generation. Images are rendered dynamically per request.

type Props = {
  params: Promise<{ slug: string }>
}

export default async function JournalArticleOgImage({ params }: Props) {
  const { slug } = await params
  const article = getJournalArticleBySlug(slug)

  const title = article?.title ?? 'CEOVIA Journal'
  const excerpt =
    article?.excerpt ??
    'Thoughtful perspectives on wellness, ingredient intelligence, and clinically structured routines.'

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
            'linear-gradient(160deg, #10261C 0%, #173126 58%, #264939 100%)',
          color: '#F7F6F2',
        }}
      >
        <div
          style={{
            fontSize: 24,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#D4A857',
          }}
        >
          CEOVIA Journal
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div
            style={{
              fontSize: 62,
              lineHeight: 1.06,
              fontWeight: 600,
              maxWidth: 980,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 26,
              lineHeight: 1.4,
              color: 'rgba(247, 246, 242, 0.82)',
              maxWidth: 940,
            }}
          >
            {excerpt}
          </div>
        </div>
      </div>
    ),
    size,
  )
}
