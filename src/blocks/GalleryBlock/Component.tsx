import React from 'react'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import type { GalleryBlock as GalleryBlockType, Media as MediaType } from '@/payload-types'

export type Props = {
  subtitle?: string
  title: string
  items?: Array<{
    title: string
    image: number | MediaType
    description?: NonNullable<NonNullable<GalleryBlockType['items']>[number]['description']>
  }>
  className?: string
}

export default function GalleryBlockComponent(props: Props) {
  const { subtitle = 'Dokumentasi', title = 'Galeri Kegiatan', items = [], className } = props

  return (
    <section className={className}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          {subtitle ? (
            <span
              className="subtitle block text-sm font-medium uppercase tracking-wide"
              style={{ color: '#f1ac44' }}
            >
              {subtitle}
            </span>
          ) : null}
          {title ? (
            <h2 className="title mt-2 text-3xl font-bold text-gray-900 md:text-4xl">{title}</h2>
          ) : null}
        </div>

        {/* Grid */}
        <div className="row -mx-4 flex flex-wrap">
          {items?.map((item, idx) => {
            const image = item?.image && typeof item.image !== 'number' ? item.image : undefined
            const hasDesc = !!item?.description

            return (
              <div key={idx} className="col-lg-4 col-md-6 mb-8 w-full px-4 md:w-1/2 lg:w-1/3">
                <div className="relative group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
                  {/* Card content */}
                  <div>
                    {/* Image */}
                    <div className="relative aspect-[5/3] w-full overflow-hidden">
                      {image ? (
                        <Media
                          resource={image}
                          fill
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
                          No image
                        </div>
                      )}
                    </div>

                    {/* Title below image */}
                    <div className="content p-4 text-center">
                      <h4 className="title text-base font-medium text-gray-900">{item.title}</h4>
                    </div>
                  </div>

                  {/* Full card hover overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#002a5d] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="px-4 text-center text-white">
                      <h4 className="title text-lg font-semibold">{item.title}</h4>
                      {hasDesc && item.description ? (
                        <div className="mt-2 text-sm text-white/90">
                          <RichText
                            enableGutter={false}
                            enableProse={false}
                            data={item.description}
                          />
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
