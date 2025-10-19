import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import type { Post } from '@/payload-types'

import { PostHero } from '@/heros/PostHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Sidebar, RelatedPostCard } from '@/components/blog'
import { Media } from '@/components/Media'

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
      <div className="container max-w-7xl mx-auto mt-12 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area (2/3 width on large screens) */}
          <div className="lg:col-span-2">
            {/* Featured/Meta Image */}
            {post.heroImage && typeof post.heroImage !== 'string' && (
              <div className="w-full aspect-video rounded-lg overflow-hidden bg-gray-200 shadow-sm mb-6">
                <Media
                  resource={post.heroImage}
                  className="w-full h-full"
                  imgClassName="object-cover w-full h-full"
                />
              </div>
            )}

            {/* Author and Date */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-6 border-b border-gray-200">
              {post.populatedAuthors &&
                post.populatedAuthors.length > 0 &&
                (() => {
                  const authors = post.populatedAuthors
                    .map((author) => {
                      if (typeof author === 'object' && author !== null) {
                        return author.name || 'Unknown'
                      }
                      return null
                    })
                    .filter(Boolean)
                    .join(', ')

                  return (
                    authors && (
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-700">
                          <i className="fa-solid fa-user"></i>
                        </span>
                        <span>{authors}</span>
                      </div>
                    )
                  )
                })()}
              {post.publishedAt && (
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-700">
                    <i className="fa-solid fa-calendar"></i>
                  </span>
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
              )}
            </div>

            {/* Post Content - Enhanced with better styling */}
            <div className="bg-white rounded-lg mb-8">
              <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-800 hover:prose-a:text-blue-900 prose-strong:text-gray-900 prose-img:rounded-lg">
                <RichText data={post.content} enableGutter={false} />
              </div>
            </div>

            {/* Related Posts */}
            {post.relatedPosts && post.relatedPosts.length > 0 && (
              <div className="mt-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-1 w-12 bg-saffron rounded-full"></div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Related Blogs</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {post.relatedPosts.map((relatedPost, index) => {
                    if (typeof relatedPost === 'object' && relatedPost !== null) {
                      return (
                        <RelatedPostCard key={relatedPost.id || index} post={relatedPost as Post} />
                      )
                    }
                    return null
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Area (1/3 width on large screens) */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
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
