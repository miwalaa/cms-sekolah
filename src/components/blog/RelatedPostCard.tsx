'use client'
import Link from 'next/link'
import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'

export interface RelatedPostCardProps {
  post: Post
}

// Format date helper functions
function formatDay(dateStr?: string): string {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.getDate().toString().padStart(2, '0')
}

function formatMonth(dateStr?: string): string {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleString('en-US', { month: 'short' })
}

export const RelatedPostCard: React.FC<RelatedPostCardProps> = ({ post }) => {
  const { slug, title, meta, heroImage, publishedAt } = post

  const { image: metaImage } = meta || {}
  const featuredImage = heroImage || metaImage
  const href = `/posts/${slug}`
  const day = formatDay(publishedAt as string)
  const month = formatMonth(publishedAt as string)

  return (
    <article className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
      {/* Image wrapper */}
      <div className="relative aspect-[18/10] w-full overflow-hidden border-b border-gray-200">
        {featuredImage && typeof featuredImage !== 'string' ? (
          <Media
            resource={featuredImage}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
            No image
          </div>
        )}

        {/* Date badge */}
        {publishedAt && (
          <div className="absolute left-4 top-4 z-10 border border-gray-200 rounded-md px-3 py-2 text-center shadow-md bg-saffron">
            <div className="text-lg font-extrabold text-white">{day}</div>
            <div className="text-xs font-semibold uppercase tracking-wide text-white/80">
              {month}
            </div>
          </div>
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="mb-3 line-clamp-2 text-lg font-semibold text-gray-900 group-hover:text-blue-900 transition-colors">
          <Link href={href}>{title}</Link>
        </h3>
        <Link href={href} className="inline-flex items-center gap-2 font-medium text-blue-800 hover:text-blue-900">
          Read More
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </article>
  )
}
