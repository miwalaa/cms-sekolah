import type { Metadata } from 'next/types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { Media } from '@/components/Media'
import { PostCard, Sidebar } from '@/components/blog'
import { BlogPagination } from '@/components/Pagination/BlogPagination'
import type { Post } from '@/payload-types'

type Args = {
  searchParams: Promise<{
    q: string
    page?: string
    category?: string
  }>
}

export default async function Page({ searchParams: searchParamsPromise }: Args) {
  const { q: query, page: pageParam, category: categorySlug } = await searchParamsPromise
  const currentPage = Number(pageParam) || 1
  const postsPerPage = 6

  const payload = await getPayload({ config: configPromise })

  // Build the where clause for filtering
  const whereConditions: any = {}
  
  // Add text search conditions
  if (query) {
    whereConditions.or = [
      {
        title: {
          like: query,
        },
      },
      {
        'meta.description': {
          like: query,
        },
      },
      {
        'meta.title': {
          like: query,
        },
      },
      {
        slug: {
          like: query,
        },
      },
    ]
  }
  
  // Add category filter
  if (categorySlug) {
    whereConditions['categories.slug'] = {
      equals: categorySlug,
    }
  }

  // Fetch search results with full depth for proper rendering
  const posts = await payload.find({
    collection: 'posts',
    depth: 2,
    limit: postsPerPage,
    page: currentPage,
    ...(Object.keys(whereConditions).length > 0 ? { where: whereConditions } : {}),
  })

  // Fetch categories for sidebar
  const categories = await payload.find({
    collection: 'categories',
    depth: 1,
    limit: 100,
    overrideAccess: false,
  })

  // Get the selected category name if categorySlug is provided
  const selectedCategory = categorySlug
    ? categories.docs.find((cat) => cat.slug === categorySlug)
    : null

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
            <div className="mx-auto max-w-[45rem] text-center" style={{ pointerEvents: 'auto' }}>
              <div className="payload-richtext max-w-none mx-auto prose md:prose-md mb-6">
                <h1>Search Results</h1>
              </div>
              {query && (
                <p className="text-lg text-gray-200">
                  Showing results for: <span className="font-semibold text-white">&ldquo;{query}&rdquo;</span>
                </p>
              )}
              {!query && selectedCategory && (
                <p className="text-lg text-gray-200">
                  Showing posts in category:{' '}
                  <span className="font-semibold text-white">{selectedCategory.title}</span>
                </p>
              )}
              {query && selectedCategory && (
                <p className="text-base text-gray-300 mt-2">
                  Filtered by category:{' '}
                  <span className="font-semibold text-white">{selectedCategory.title}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Two-Column Blog Layout */}
      <div className="container mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area - Search Results (2/3 width on large screens) */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {posts.docs && posts.docs.length > 0 ? (
                posts.docs.map((post, index) => {
                  if (typeof post === 'object' && post !== null) {
                    return <PostCard key={post.id || index} post={post as Post} />
                  }
                  return null
                })
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-500 text-lg">
                    {query && selectedCategory
                      ? `No results found for "${query}" in category "${selectedCategory.title}".`
                      : query
                        ? `No results found for "${query}". Try different keywords.`
                        : selectedCategory
                          ? `No posts found in category "${selectedCategory.title}".`
                          : 'Enter a search query or select a category to find posts.'}
                  </div>
                </div>
              )}
            </div>

            {/* Results count and Pagination */}
            {posts.docs && posts.docs.length > 0 && (
              <>
                <div className="mt-8 text-center text-gray-600">
                  Found {posts.totalDocs || posts.docs.length} result
                  {(posts.totalDocs || posts.docs.length) !== 1 ? 's' : ''}
                </div>

                {/* Pagination */}
                {posts.totalPages && posts.totalPages > 1 && (
                  <div className="mt-8">
                    <BlogPagination
                      currentPage={currentPage}
                      totalPages={posts.totalPages}
                      basePath="/search"
                    />
                  </div>
                )}
              </>
            )}
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
}

export function generateMetadata(): Metadata {
  return {
    title: `Search - PKBM Pemuda Pelopor`,
  }
}
