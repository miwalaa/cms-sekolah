import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import type { Post } from '@/payload-types'

import { PostHero } from '@/heros/PostHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { PostDetailContent } from './PostDetailContent'

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config: configPromise })
    const posts = await payload.find({
      collection: 'posts',
      draft: false,
      limit: 1000,
      overrideAccess: false,
      pagination: false,
      select: {
        slug: true,
      },
    })

    const params = posts.docs.map(({ slug }) => {
      return { slug }
    })

    return params
  } catch (error) {
    console.warn('Failed to generate static params for posts:', error)
    return []
  }
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Post({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/posts/' + slug
  const post = await queryPostBySlug({ slug })

  if (!post) return <PayloadRedirects url={url} />

  const payload = await getPayload({ config: configPromise })

  // Fetch categories for sidebar
  const categories = await payload.find({
    collection: 'categories',
    depth: 1,
    limit: 100,
    overrideAccess: false,
  })

  // Fetch recent posts for sidebar
  const recentPosts = await payload.find({
    collection: 'posts',
    depth: 2,
    limit: 5,
    overrideAccess: false,
    sort: '-publishedAt',
  })

  // Fetch default hero image (hero-3.png)
  const {
    docs: [defaultHeroImage],
  } = await payload.find({
    collection: 'media',
    where: {
      filename: { equals: 'hero-3.png' },
    },
    limit: 1,
  })

  return (
    <article className="pb-16">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <PostHero post={post} defaultHeroImage={defaultHeroImage} />

      {/* Two-Column Layout: Content + Sidebar */}
      <PostDetailContent
        post={post}
        categories={categories.docs || []}
        recentPosts={recentPosts.docs || []}
      />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const post = await queryPostBySlug({ slug })

  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
