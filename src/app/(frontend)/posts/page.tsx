import type { Metadata } from 'next/types'

import { Pagination } from '@/components/Pagination'
import { PostCard, Sidebar } from '@/components/blog'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  try {
    const payload = await getPayload({ config: configPromise })

    // Fetch posts with more fields for the new layout
    const posts = await payload.find({
      collection: 'posts',
      depth: 2, // Increased depth to get populated authors and categories
      limit: 12,
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

    return (
      <div className="pb-24">
        <PageClient />

        {/* Page Header */}
        <div className="relative w-full" style={{ minHeight: '60vh' }}>
          <div className="absolute inset-0 z-0 w-full h-[60vh] overflow-hidden">
            <div className="w-full h-full object-cover">
              <picture>
                <img
                  alt="School 1"
                  width={2917}
                  height={1634}
                  decoding="async"
                  data-nimg="1"
                  className="w-full h-full object-cover"
                  style={{ color: 'transparent' }}
                  sizes="(max-width: 1920px) 3840w, (max-width: 1536px) 3072w, (max-width: 1280px) 2560w, (max-width: 1024px) 2048w, (max-width: 768px) 1536w, (max-width: 640px) 1280w"
                  srcSet="/images/school-1.webp 16w, /images/school-1.webp 32w, /images/school-1.webp 48w, /images/school-1.webp 64w, /images/school-1.webp 96w, /images/school-1.webp 128w, /images/school-1.webp 256w, /images/school-1.webp 384w, /images/school-1.webp 640w, /images/school-1.webp 750w, /images/school-1.webp 828w, /images/school-1.webp 1080w, /images/school-1.webp 1200w, /images/school-1.webp 1920w, /images/school-1.webp 2048w, /images/school-1.webp 3840w"
                  src="/images/school-1.webp"
                />
              </picture>
            </div>
            <div className="absolute inset-0 bg-black/70 z-10"></div>
          </div>
          <div
            className="relative z-10 flex items-center justify-center min-h-[60vh] py-16 text-white"
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
        <div className="container mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Area - Posts List (2/3 width on large screens) */}
            <div className="lg:col-span-2">
              <div className="space-y-8">
                {posts.docs?.map((post, index) => {
                  if (typeof post === 'object' && post !== null) {
                    return <PostCard key={index} post={post} />
                  }
                  return null
                })}

                {/* Show message when no posts */}
                {!posts.docs ||
                  (posts.docs.length === 0 && (
                    <div className="text-center py-12">
                      <div className="text-gray-500 text-lg">No posts found.</div>
                    </div>
                  ))}
              </div>

              {/* Pagination at the bottom of posts */}
              <div className="mt-12">
                {posts.totalPages && posts.totalPages > 1 && posts.page && (
                  <Pagination page={posts.page} totalPages={posts.totalPages} />
                )}
              </div>
            </div>

            {/* Sidebar Area (1/3 width on large screens) */}
            <div className="lg:col-span-1">
              <Sidebar
                categories={categories.docs || []}
                recentPosts={recentPosts.docs || []}
                showSearch={true}
                showCategories={true}
                showRecentPosts={true}
              />
            </div>
          </div>
        </div>
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
