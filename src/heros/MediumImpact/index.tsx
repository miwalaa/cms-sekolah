import React from 'react'
import type { Page } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const MediumImpactHero: React.FC<Page['hero']> = ({
  links,
  mediumImpactMedia,
  richText,
}) => {
  return (
    <div className="relative w-full" style={{ minHeight: '60vh' }}>
      {/* Single Image - Full width and height */}
      <div className="absolute inset-0 z-0 w-full h-[60vh] overflow-hidden">
        {mediumImpactMedia && (
          <>
            <Media
              className="w-full h-full object-cover"
              imgClassName="w-full h-full object-cover"
              priority
              resource={mediumImpactMedia}
            />
            <div className="absolute inset-0 bg-black/70 z-10" />
          </>
        )}
      </div>

      {/* Content - Positioned above the image */}
      <div
        className="relative z-10 flex items-center justify-center min-h-[60vh] py-16 text-white"
        style={{ pointerEvents: 'none' }}
      >
        <div className="container">
          <div className="mx-auto max-w-[36.5rem] text-center" style={{ pointerEvents: 'auto' }}>
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
