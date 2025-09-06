'use client'

import { useState, useEffect, useRef } from 'react'
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
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)

  const nextSlide = () => setCurrent((prev) => (prev + 1) % media.length)
  const prevSlide = () => setCurrent((prev) => (prev - 1 + media.length) % media.length)

  // Auto-advance slides
  useEffect(() => {
    if (isPaused) return
    
    const timer = setInterval(() => {
      nextSlide()
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [current, isPaused])

  const handleMoveStart = (clientX: number) => {
    setTouchStart(clientX)
    setTouchEnd(clientX)
    setIsDragging(true)
  }

  const handleMove = (clientX: number) => {
    if (!isDragging) return
    setTouchEnd(clientX)
  }

  const handleMoveEnd = () => {
    if (!isDragging) return
    
    const diff = touchStart - touchEnd
    
    // Consider it a swipe if moved more than 50px
    if (diff > 50) {
      nextSlide()
    } else if (diff < -50) {
      prevSlide()
    }
    
    // Reset state
    setTouchStart(0)
    setTouchEnd(0)
    setIsDragging(false)
  }

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    handleMoveStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    e.preventDefault()
    handleMove(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    handleMoveEnd()
  }

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    handleMoveStart(e.clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()
    handleMove(e.clientX)
  }

  const handleMouseUp = () => {
    handleMoveEnd()
  }

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMoveEnd()
    }
  }

  return (
    <div
      ref={sliderRef}
      className="image-slider-container relative w-full h-full touch-pan-y"
      style={{
        height: '100%',
        touchAction: 'pan-y',
      }}
      // Touch events
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      // Mouse events
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseEnter={() => !isDragging && setIsPaused(true)}
      onMouseLeave={() => {
        if (!isDragging) setIsPaused(false)
        handleMouseLeave()
      }}
    >
      <div className="relative w-full h-full overflow-hidden">
        {media.map((item, index) => (
          <div
            key={item.id || index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === current ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            style={{
              cursor: isDragging ? 'grabbing' : 'grab',
              touchAction: 'pan-y',
              userSelect: 'none',
              WebkitUserSelect: 'none',
              WebkitTouchCallout: 'none',
            } as React.CSSProperties}
          >
            <Media
              resource={item.image}
              fill
              imgClassName="object-cover select-none"
              priority={index === 0}
              draggable={true}
            />
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full z-20 hover:bg-opacity-75 transition-all"
          style={{ pointerEvents: 'auto' }} // Ensure buttons are clickable
          aria-label="Previous slide"
        >
          &larr;
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full z-20 hover:bg-opacity-75 transition-all"
          style={{ pointerEvents: 'auto' }} // Ensure buttons are clickable
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
