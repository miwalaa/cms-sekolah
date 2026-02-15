'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { Media as MediaType } from '@/payload-types'
import { Media } from '@/components/Media'
import { CgChevronRight } from 'react-icons/cg'
import { CgChevronLeft } from 'react-icons/cg'
import { motion, AnimatePresence } from 'framer-motion'

type HeroMedia = {
  image: number | MediaType
  caption?: string | null
  id?: string | null
}

export default function ImageSlider({ media }: { media: HeroMedia[] }) {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % media.length)
  }, [media.length])

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + media.length) % media.length)
  }, [media.length])

  // Auto-advance slides
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      nextSlide()
    }, 5000) // Change slide every 5 seconds
    return () => clearInterval(timer)
  }, [current, isPaused, nextSlide])

  const variants = {
    enter: {
      opacity: 0,
    },
    center: {
      zIndex: 1,
      opacity: 1,
    },
    exit: {
      zIndex: 0,
      opacity: 0,
    },
  }

  return (
    <div
      ref={sliderRef}
      className="image-slider-container relative w-full h-full z-0"
      style={{
        height: '100%',
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative w-full h-full overflow-hidden group z-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={current}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              opacity: { duration: 0.5, ease: 'easeInOut' },
            }}
            className="absolute inset-0"
          >
            <div className="relative w-full h-full pointer-events-none">
              <Media
                resource={media[current].image}
                fill
                htmlElement={null}
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
          className="absolute left-8 top-1/2 -translate-y-1/2 bg-brand text-white p-3 border-2 border-white shadow-lg shadow-white/50 z-[10] hover:bg-white hover:text-brand transition-all duration-500 ease-in-out transform opacity-0 translate-x-[-20px] group-hover:opacity-100 group-hover:translate-x-0 xl:block hidden"
          style={{ pointerEvents: 'auto' }}
          aria-label="Previous slide"
        >
          <CgChevronLeft />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-8 top-1/2 -translate-y-1/2 bg-brand text-white p-3 border-2 border-white shadow-lg shadow-white/50 z-[10] hover:bg-white hover:text-brand transition-all duration-500 ease-in-out transform opacity-0 translate-x-[20px] group-hover:opacity-100 group-hover:translate-x-0 xl:block hidden"
          style={{ pointerEvents: 'auto' }}
          aria-label="Next slide"
        >
          <CgChevronRight />
        </button>
      </div>
    </div>
  )
}
