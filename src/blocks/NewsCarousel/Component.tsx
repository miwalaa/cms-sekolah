import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { NewsCarousel as NewsCarouselProps, Post } from '@/payload-types'
import { CarouselClient } from './CarouselClient'

export type Props = NewsCarouselProps & {
  className?: string
  disableInnerContainer?: boolean
}

export default async function NewsCarouselComponent(props: Props) {
  const { subtitle, heading, limit = 9, className, disableInnerContainer = false } = props

  const payload = await getPayload({ config: configPromise })
  const limitToUse: number | undefined = typeof limit === 'number' ? limit : undefined

  const result = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: limitToUse,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      publishedAt: true,
      meta: true,
      heroImage: true,
    },
    sort: '-publishedAt',
  })

  const posts = result.docs as Post[]

  return (
    <section className={`container ${className || ''}`}>
      {/* Title area */}
      <div className="mb-8 text-center">
        {subtitle && (
          <p className="text-sm font-medium uppercase tracking-wide text-gray-500">{subtitle}</p>
        )}
        {heading && (
          <h2 className="mt-1 text-3xl font-bold leading-tight text-gray-900">{heading}</h2>
        )}
      </div>

      {/* Carousel */}
      <CarouselClient posts={posts} />
    </section>
  )
}
