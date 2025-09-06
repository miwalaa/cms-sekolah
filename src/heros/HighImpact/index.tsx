import React from 'react'
import ImageSlider from '@/components/ImageSlider'
import type { Page } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  return (
    <div className="relative w-full" style={{ minHeight: '60vh' }}>
      {/* Image Slider - Full width and height */}
      <div className="absolute inset-0 z-0 w-full h-[60vh]">
        {media && media.length > 0 && <ImageSlider media={media} />}
      </div>

      {/* Content - Positioned above the slider */}
      <div
        className="relative z-10 flex items-center justify-center min-h-[60vh] py-16 text-white"
        style={{ pointerEvents: 'none' }} // Disable pointer events on content
      >
        <div className="container">
          <div
            className="mx-auto max-w-[36.5rem] text-center"
            style={{ pointerEvents: 'auto' }} // Re-enable pointer events for interactive elements
          >
            {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
            {Array.isArray(links) && links.length > 0 && (
              <ul className="flex justify-center gap-4">
                {links.map(({ link }, i) => (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
