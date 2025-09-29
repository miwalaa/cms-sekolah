'use client'
import Link from 'next/link'
import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'

export interface RecentPostsProps {
  posts: Post[]
  title?: string
}

export const RecentPosts: React.FC<RecentPostsProps> = ({ posts, title = 'Recent Posts' }) => {
  if (!posts || posts.length === 0) {
    return null
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
        {title}
      </h3>

      <div className="space-y-4">
        {posts.map((post, index) => {
          const { slug, title, meta, publishedAt, heroImage } = post
          const { image: metaImage } = meta || {}
          const featuredImage = heroImage || metaImage
          const href = `/posts/${slug}`

          // Format date
          const formatDate = (dateString: string) => {
            return new Date(dateString).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })
          }

          return (
            <Link
              key={index}
              href={href}
              className="flex gap-3 group hover:bg-gray-50 p-2 rounded-md transition-colors duration-200"
            >
              {/* Thumbnail */}
              <div className="relative w-16 h-16 overflow-hidden bg-gray-100 rounded-md">
                {featuredImage && typeof featuredImage !== 'string' ? (
                  <Media resource={featuredImage} fill className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <svg
                      className="w-6 h-6 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2 mb-1">
                  {title}
                </h4>
                {publishedAt && (
                  <time className="text-xs text-gray-500">{formatDate(publishedAt)}</time>
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
