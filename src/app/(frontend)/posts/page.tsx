import type { Metadata } from 'next/types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { Media } from '@/components/Media'
import { PostsContent } from './PostsContent'

export const dynamic = 'force-dynamic'
export const revalidate = 600

type Args = {
  searchParams: Promise<{
    page?: string
  }>
}

export default async function Page({ searchParams: searchParamsPromise }: Args) {
  try {
    const { page: pageParam } = await searchParamsPromise
    const currentPage = Number(pageParam) || 1
    const postsPerPage = 6

    const payload = await getPayload({ config: configPromise })

    // Fetch posts with pagination
    const posts = await payload.find({
      collection: 'posts',
      depth: 2, // Increased depth to get populated authors and categories
      limit: postsPerPage,
      page: currentPage,
      overrideAccess: false,
      sort: '-publishedAt', // Sort by published date descending
    })

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

    // Fetch the hero image from Payload CMS
    const {
      docs: [heroImage],
    } = await payload.find({
      collection: 'media',
      where: {
        filename: { equals: 'hero-3.png' },
      },
      limit: 1,
    })

    return (
      <div className="pb-24">
        <PageClient />

        {/* Page Header - Matches HighImpactHero styling */}
        <div className="relative w-full min-h-[80vh] md:min-h-[70vh] lg:min-h-[60vh] [@media(orientation:landscape)_and_(max-width:1023px)]:min-h-[100vh]">
          {/* Image - Full width and height */}
          <div className="absolute inset-0 z-0 w-full h-full">
            <div className="relative w-full h-full overflow-hidden">
              <Media
                resource={heroImage}
                className="absolute inset-0 w-full h-full"
                imgClassName="object-cover w-full h-full select-none"
                fill
                priority
              />
            </div>
            <div className="absolute inset-0 bg-black/70 z-10" />
          </div>
          <div
            className="relative z-10 flex items-center justify-center min-h-[80vh] md:min-h-[70vh] lg:min-h-[60vh] [@media(orientation:landscape)_and_(max-width:1023px)]:min-h-[100vh] py-16 text-white"
            style={{ pointerEvents: 'none' }}
          >
            <div className="container">
              <div
                className="mx-auto max-w-[36.5rem] text-center"
                style={{ pointerEvents: 'auto' }}
              >
                <div className="payload-richtext max-w-none mx-auto prose md:prose-md mb-6">
                  <h1>Blog</h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Two-Column Blog Layout */}
        <PostsContent
          posts={posts}
          categories={categories.docs || []}
          recentPosts={recentPosts.docs || []}
          currentPage={currentPage}
        />
      </div>
    )
  } catch (error) {
    console.error('Error loading posts page:', error)
    return (
      <div className="pt-24 pb-24">
        <div className="container">
          <div className="text-center py-12">
            <div className="text-red-500 text-lg">Error loading posts. Please try again later.</div>
          </div>
        </div>
      </div>
    )
  }
}

export function generateMetadata(): Metadata {
  return {
    title: `PKBM Pemuda Pelopor`,
  }
}
