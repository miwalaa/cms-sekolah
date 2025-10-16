'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Media as MediaType } from '@/payload-types'
import { Media } from '@/components/Media'
import { CgChevronRight } from 'react-icons/cg'
import { CgChevronLeft } from 'react-icons/cg'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'

type HeroMedia = {
  image: number | MediaType
  caption?: string | null
  id?: string | null
}

export default function ImageSlider({ media }: { media: HeroMedia[] }) {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [direction, setDirection] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)

  const nextSlide = useCallback(() => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % media.length)
  }, [media.length])

  const prevSlide = useCallback(() => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + media.length) % media.length)
  }, [media.length])

  // Handle drag end
  const handleDragEnd = useCallback(
    (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const swipeThreshold = 50
      const { offset, velocity } = info

      if (Math.abs(offset.x) > swipeThreshold || Math.abs(velocity.x) > 500) {
        if (offset.x > 0) {
          prevSlide()
        } else {
          nextSlide()
        }
      }
    },
    [nextSlide, prevSlide],
  )

  // Auto-advance slides
  useEffect(() => {
    if (isPaused) return

    const timer = setInterval(() => {
      nextSlide()
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [current, isPaused, nextSlide])

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <div
      ref={sliderRef}
      className="image-slider-container relative w-full h-full z-0"
      style={{
        height: '100%',
        touchAction: 'none',
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative w-full h-full overflow-hidden group z-0">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
            className="absolute inset-0"
            style={{
              cursor: 'grab',
              userSelect: 'none',
              WebkitUserSelect: 'none',
              WebkitTouchCallout: 'none',
            }}
            whileDrag={{ cursor: 'grabbing' }}
          >
            <div className="w-full h-full pointer-events-none">
              <Media
                resource={media[current].image}
                fill
                imgClassName="object-cover select-none"
                priority={current === 0}
                draggable={false}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-8 top-1/2 -translate-y-1/2 bg-brand bg-opacity-30 text-white p-3 border border-white z-[5] hover:bg-white hover:text-brand transition-all duration-500 ease-in-out transform opacity-0 translate-x-[-20px] group-hover:opacity-100 group-hover:translate-x-0 xl:block hidden"
          style={{ pointerEvents: 'auto' }}
          aria-label="Previous slide"
        >
          <CgChevronLeft />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-8 top-1/2 -translate-y-1/2 bg-brand bg-opacity-30 text-white p-3 border border-white z-[5] hover:bg-white hover:text-brand transition-all duration-500 ease-in-out transform opacity-0 translate-x-[20px] group-hover:opacity-100 group-hover:translate-x-0 xl:block hidden"
          style={{ pointerEvents: 'auto' }}
          aria-label="Next slide"
        >
          <CgChevronRight />
        </button>
      </div>
    </div>
  )
}
