'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { PostCard, Sidebar } from '@/components/blog'
import { BlogPagination } from '@/components/Pagination/BlogPagination'
import type { Post, Category } from '@/payload-types'

type PostsContentProps = {
  posts: {
    docs: Post[]
    totalPages: number
  }
  categories: Category[]
  recentPosts: Post[]
  currentPage: number
}

export const PostsContent: React.FC<PostsContentProps> = ({
  posts,
  categories,
  recentPosts,
  currentPage,
}) => {
  return (
    <motion.div
      className="container mt-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
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
            {posts.totalPages && posts.totalPages > 1 && (
              <BlogPagination
                currentPage={currentPage}
                totalPages={posts.totalPages}
                basePath="/posts"
              />
            )}
          </div>
        </div>

        {/* Sidebar Area (1/3 width on large screens) */}
        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        >
          <Sidebar
            categories={categories || []}
            recentPosts={recentPosts || []}
            showSearch={true}
            showCategories={true}
            showRecentPosts={true}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}
