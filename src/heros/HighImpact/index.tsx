import React from 'react'
import ImageSlider from '@/components/ImageSlider'
import type { Page } from '@/payload-types'

export const HighImpactHero: React.FC<Page['hero']> = ({ highImpactMedia, title }) => {
  return (
    <div className="relative w-full min-h-[80vh] md:min-h-[70vh] lg:min-h-[60vh] [@media(orientation:landscape)_and_(max-width:1023px)]:min-h-[100vh]">
      {/* Image Slider - Full width and height */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 z-0">
          {highImpactMedia && highImpactMedia.length > 0 && <ImageSlider media={highImpactMedia} />}
        </div>
        <div className="absolute inset-0 bg-black/70 z-[5] pointer-events-none" />
      </div>

      {/* Content - Positioned above the slider */}
      <div
        className="relative z-10 flex items-center justify-center min-h-[80vh] md:min-h-[70vh] lg:min-h-[60vh] [@media(orientation:landscape)_and_(max-width:1023px)]:min-h-[100vh] py-16 text-white"
        style={{ pointerEvents: 'none' }} // Disable pointer events on content
      >
        <div className="container">
          <div
            className="mx-auto max-w-[45rem] text-center"
            style={{ pointerEvents: 'auto' }} // Re-enable pointer events for interactive elements
          >
            {title && <h1 className="text-4xl md:text-5xl lg:text-6xl text-white mb-6">{title}</h1>}
          </div>
        </div>
      </div>
    </div>
  )
}
