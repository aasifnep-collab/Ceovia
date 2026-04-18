'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

const images = [
  {
    src: '/images/ceovia-bottle.png',
    alt: 'CEOVIA bottle product image',
    unoptimized: false,
    frameClassName: 'h-[90%] w-[75%] md:h-[91%] md:w-[73%]',
    imageClassName: 'object-contain',
  },
  {
    src: '/images/ceovia-pack.png',
    alt: 'CEOVIA pack with softgel blister packs',
    unoptimized: false,
    frameClassName: 'h-[82%] w-[82%] md:h-[84%] md:w-[80%]',
    imageClassName: 'object-contain',
  },
]

export default function ProductImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)

  const goTo = (index: number) => setCurrentIndex(index)
  const goNext = () => setCurrentIndex((index) => (index + 1) % images.length)
  const goPrev = () => setCurrentIndex((index) => (index - 1 + images.length) % images.length)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentIndex((index) => (index + 1) % images.length)
    }, 3200)

    return () => window.clearInterval(timer)
  }, [])

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(event.touches[0]?.clientX ?? null)
  }

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null) return
    const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX
    const delta = touchStartX - touchEndX

    if (Math.abs(delta) > 40) {
      if (delta > 0) {
        goNext()
      } else {
        goPrev()
      }
    }

    setTouchStartX(null)
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        className="group relative overflow-hidden rounded-[1.75rem] border border-[#DCE5E0] bg-[linear-gradient(180deg,#FFFFFF_0%,#FAFCFB_100%)] p-5 shadow-[0_16px_30px_rgba(16,38,28,0.05)] md:p-8"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="rounded-[1.35rem] border border-[#EDF2EE] bg-white/95 px-4 py-5 md:px-6 md:py-6">
          <div className="relative h-[320px] w-full md:h-[380px]">
            {images.map((image, index) => (
              <div
                key={image.src}
                className={[
                  'absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out',
                  currentIndex === index
                    ? 'translate-x-0 opacity-100'
                    : index < currentIndex
                    ? '-translate-x-3 opacity-0'
                    : 'translate-x-3 opacity-0',
                ].join(' ')}
                aria-hidden={currentIndex !== index}
              >
                <div className={['relative flex items-center justify-center', image.frameClassName].join(' ')}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={500}
                    height={500}
                    className={['h-full w-full', image.imageClassName].join(' ')}
                    priority={index === 0}
                    unoptimized={image.unoptimized}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={goPrev}
          aria-label="Show previous product image"
          className="absolute left-4 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#D8E1DB] bg-white/88 text-[#12452E] opacity-0 shadow-[0_6px_16px_rgba(16,38,28,0.06)] transition-all duration-200 hover:bg-white group-hover:opacity-100 md:flex"
        >
          <span aria-hidden="true" className="text-lg leading-none">‹</span>
        </button>

        <button
          type="button"
          onClick={goNext}
          aria-label="Show next product image"
          className="absolute right-4 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#D8E1DB] bg-white/88 text-[#12452E] opacity-0 shadow-[0_6px_16px_rgba(16,38,28,0.06)] transition-all duration-200 hover:bg-white group-hover:opacity-100 md:flex"
        >
          <span aria-hidden="true" className="text-lg leading-none">›</span>
        </button>
      </div>

      <div className="mt-5 flex justify-center gap-2">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Show product image ${index + 1}`}
            aria-pressed={currentIndex === index}
            className={[
              'h-2.5 w-2.5 rounded-full transition-all duration-300',
              currentIndex === index
                ? 'scale-110 bg-[#12452E]'
                : 'bg-[#D6DDD9] hover:bg-[#BDC8C1]',
            ].join(' ')}
          />
        ))}
      </div>
    </div>
  )
}
