'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Sidebar, RelatedPostCard } from '@/components/blog'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import type { Post, Category } from '@/payload-types'

type PostDetailContentProps = {
  post: Post
  categories: Category[]
  recentPosts: Post[]
}

export const PostDetailContent: React.FC<PostDetailContentProps> = ({
  post,
  categories,
  recentPosts,
}) => {
  return (
    <motion.div
      className="container max-w-7xl mx-auto mt-12 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area (2/3 width on large screens) */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        >
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
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
            >
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
            </motion.div>
          )}
        </motion.div>

        {/* Sidebar Area (1/3 width on large screens) */}
        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
        >
          <div className="lg:sticky lg:top-24">
            <Sidebar
              categories={categories || []}
              recentPosts={recentPosts || []}
              showSearch={true}
              showCategories={true}
              showRecentPosts={true}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
