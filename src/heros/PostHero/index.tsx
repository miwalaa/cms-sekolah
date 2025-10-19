import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { formatAuthors } from '@/utilities/formatAuthors'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, title } = post

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  return (
    <div className="relative w-full min-h-[80vh] md:min-h-[70vh] lg:min-h-[60vh] [@media(orientation:landscape)_and_(max-width:1023px)]:min-h-[100vh]">
      {/* Hero Image Background */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <div className="relative w-full h-full overflow-hidden">
          {heroImage && typeof heroImage !== 'string' ? (
            <Media
              resource={heroImage}
              className="absolute inset-0 w-full h-full"
              imgClassName="object-cover w-full h-full select-none"
              fill
              priority
            />
          ) : (
            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-800 to-gray-900" />
          )}
        </div>
        <div className="absolute inset-0 bg-black/70 z-10" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[80vh] md:min-h-[70vh] lg:min-h-[60vh] [@media(orientation:landscape)_and_(max-width:1023px)]:min-h-[100vh] py-16 text-white">
        <div className="container max-w-7xl mx-auto px-4">
          {/* Categories */}
          {categories && categories.length > 0 && (
            <div className="text-sm text-gray-200 mb-4 uppercase tracking-wide">
              {categories.map((category, index) => {
                if (typeof category === 'object' && category !== null) {
                  const { title: categoryTitle } = category
                  const titleToUse = categoryTitle || 'Untitled category'
                  const isLast = index === categories.length - 1

                  return (
                    <React.Fragment key={index}>
                      {titleToUse}
                      {!isLast && <span>, </span>}
                    </React.Fragment>
                  )
                }
                return null
              })}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-white mb-6">{title}</h1>

          {/* Author and Date */}
          <div className="flex flex-wrap items-center gap-6 text-gray-200">
            {hasAuthors && (
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-300">
                  <i className="fa-solid fa-user"></i>
                </span>
                <span>{formatAuthors(populatedAuthors)}</span>
              </div>
            )}
            {publishedAt && (
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-300">
                  <i className="fa-solid fa-calendar"></i>
                </span>
                <time dateTime={publishedAt}>{formatDateTime(publishedAt)}</time>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
