import React from 'react'

import type { Post, Media as MediaType } from '@/payload-types'

import { Media } from '@/components/Media'

export const PostHero: React.FC<{
  post: Post
  defaultHeroImage?: MediaType | null
}> = ({ post, defaultHeroImage }) => {
  const { categories, title } = post

  // Use hero-3.png as default, fallback to post's heroImage if default not available
  const displayImage =
    defaultHeroImage ||
    (post.heroImage && typeof post.heroImage !== 'string' ? post.heroImage : null)

  return (
    <div className="relative w-full min-h-[80vh] md:min-h-[70vh] lg:min-h-[60vh] [@media(orientation:landscape)_and_(max-width:1023px)]:min-h-[100vh]">
      {/* Hero Image Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          {displayImage ? (
            <Media
              resource={displayImage}
              fill
              htmlElement={null}
              imgClassName="object-cover w-full h-full select-none"
              priority
            />
          ) : (
            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-800 to-gray-900" />
          )}
        </div>
        <div className="absolute inset-0 bg-black/70 z-[5] pointer-events-none" />
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
        </div>
      </div>
    </div>
  )
}
