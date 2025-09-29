'use client'
import Link from 'next/link'
import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'

export interface PostCardProps {
  post: Post
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const {
    slug,
    title,
    meta,
    categories,
    publishedAt,
    populatedAuthors,
    heroImage,
  } = post

  const { description, image: metaImage } = meta || {}
  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const hasAuthors = populatedAuthors && Array.isArray(populatedAuthors) && populatedAuthors.length > 0
  
  // Use heroImage if available, otherwise fall back to meta image
  const featuredImage = heroImage || metaImage
  const href = `/posts/${slug}`

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Featured Image */}
      <div className="relative w-full h-48 overflow-hidden bg-gray-100">
        {featuredImage && typeof featuredImage !== 'string' ? (
          <Media 
            resource={featuredImage} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-500">No image</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
          {hasAuthors && (
            <div className="flex items-center gap-1">
              <span className="font-medium">By:</span>
              <span>
                {populatedAuthors?.map((author, index) => (
                  <span key={index}>
                    {author.name}
                    {index < (populatedAuthors?.length || 0) - 1 && ', '}
                  </span>
                ))}
              </span>
            </div>
          )}
          
          {publishedAt && (
            <div className="flex items-center gap-1">
              <span className="font-medium">On:</span>
              <time dateTime={publishedAt}>
                {formatDate(publishedAt)}
              </time>
            </div>
          )}
        </div>

        {/* Categories */}
        {hasCategories && (
          <div className="flex flex-wrap gap-2 mb-4">
            {categories?.map((category, index) => {
              if (typeof category === 'object' && category?.title) {
                return (
                  <span
                    key={index}
                    className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
                  >
                    {category.title}
                  </span>
                )
              }
              return null
            })}
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          <Link 
            href={href}
            className="hover:text-blue-600 transition-colors duration-200"
          >
            {title}
          </Link>
        </h3>

        {/* Excerpt */}
        {description && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {description}
          </p>
        )}

        {/* Read More Button */}
        <Link
          href={href}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          Read More
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  )
}
