import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { NewsCarousel as NewsCarouselProps, Post } from '@/payload-types'
import { NewsCarouselClient } from './NewsCarouselClient'

export type Props = NewsCarouselProps & {
  className?: string
  disableInnerContainer?: boolean
}

export default async function NewsCarouselComponent(props: Props) {
  const {
    subtitle,
    heading,
    limit = 9,
    className,
    disableInnerContainer: _disableInnerContainer = false,
  } = props

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

  return <NewsCarouselClient subtitle={subtitle} heading={heading} posts={posts} className={className} />
}
