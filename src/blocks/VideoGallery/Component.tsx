'use client'

import React from 'react'
import type { VideoGalleryType, VideoItem } from './types'

export type Props = {
  videos?: VideoGalleryType['videos']
  className?: string
}

export default function VideoGalleryBlock(props: Props) {
  const { videos = [], className } = props

  // Extract YouTube video ID from embed URL
  const getYouTubeId = (url: string): string | null => {
    const match = url.match(/\/embed\/([a-zA-Z0-9_-]+)/)
    return match ? match[1] : null
  }

  if (!videos.length) {
    return (
      <div className={`container mx-auto px-4 py-8 ${className || ''}`}>
        <div className="text-center text-gray-500">
          <p>No videos available.</p>
        </div>
      </div>
    )
  }

  return (
    <section className={`container mx-auto px-4 pb-12 ${className || ''}`}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {videos.map((video: VideoItem, index: number) => {
          const videoId = getYouTubeId(video.youtubeUrl)

          if (!videoId) {
            return (
              <div
                key={index}
                className="rounded-xl border border-red-200 bg-red-50 p-6 text-center"
              >
                <p className="text-red-600">Invalid YouTube URL</p>
                <p className="text-sm text-red-500 mt-1">{video.title}</p>
              </div>
            )
          }

          return (
            <div
              key={index}
              className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:border-gray-300"
            >
              {/* Video Container with 16:9 Aspect Ratio */}
              <div
                className="relative w-full overflow-hidden bg-gray-100"
                style={{ paddingBottom: '56.25%' }}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={video.title}
                  className="absolute left-0 top-0 h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>

              {/* Video Title */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors duration-200">
                  {video.title}
                </h3>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
