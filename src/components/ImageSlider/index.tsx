'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Media as MediaType } from '@/payload-types'
import { Media } from '@/components/Media'

type HeroMedia = {
  image: number | MediaType
  caption?: string | null
  id?: string | null
}

export default function ImageSlider({ media }: { media: HeroMedia[] }) {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)

  const nextSlide = useCallback(
    () => setCurrent((prev) => (prev + 1) % media.length),
    [media.length],
  )

  const prevSlide = useCallback(
    () => setCurrent((prev) => (prev - 1 + media.length) % media.length),
    [media.length],
  )

  // Auto-advance slides
  useEffect(() => {
    if (isPaused) return

    const timer = setInterval(() => {
      nextSlide()
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [current, isPaused, nextSlide])

  return (
    <div
      ref={sliderRef}
      className="image-slider-container relative w-full h-full"
      style={{
        height: '100%',
        touchAction: 'pan-y',
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative w-full h-full overflow-hidden group">
        {media.map((item, index) => (
          <div
            key={item.id || index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === current ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            style={
              {
                cursor: 'default',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                WebkitTouchCallout: 'none',
              } as React.CSSProperties
            }
          >
            <Media
              resource={item.image}
              fill
              imgClassName="object-cover select-none"
              priority={index === 0}
              draggable={false} // ubah ini
            />
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-8 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 border border-white z-20 hover:bg-opacity-75 transition-all duration-300 ease-in-out transform opacity-0 translate-x-[-20px] group-hover:opacity-100 group-hover:translate-x-0 xl:block hidden"
          style={{ pointerEvents: 'auto' }}
          aria-label="Previous slide"
        >
          &larr;
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-8 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 border border-white z-20 hover:bg-opacity-75 transition-all duration-300 ease-in-out transform opacity-0 translate-x-[20px] group-hover:opacity-100 group-hover:translate-x-0 xl:block hidden"
          style={{ pointerEvents: 'auto' }}
          aria-label="Next slide"
        >
          &rarr;
        </button>

        {/* Dots */}
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20"
          style={{ pointerEvents: 'auto' }} // Ensure dots are clickable
        >
          {media.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === current ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
