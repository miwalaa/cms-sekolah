'use client'

import React from 'react'
import { motion } from 'framer-motion'
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
    <motion.section
      className={`container mx-auto px-4 pb-12 ${className || ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {videos.map((video: VideoItem, index: number) => {
          const videoId = getYouTubeId(video.youtubeUrl)

          if (!videoId) {
            return (
              <div
                key={index}
                className="rounded-lg border-2 border-red-200 bg-red-50 p-6 text-center"
              >
                <i className="fas fa-exclamation-triangle text-3xl text-red-500 mb-3"></i>
                <p className="text-red-600 font-semibold">Invalid YouTube URL</p>
                <p className="text-sm text-red-500 mt-1">{video.title}</p>
              </div>
            )
          }

          return (
            <div
              key={index}
              className="overflow-hidden rounded-lg bg-white shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* Video Container with 16:9 Aspect Ratio and Border */}
              <div className="p-2">
                <div
                  className="relative w-full overflow-hidden bg-gray-100 rounded-lg border-2 border-gray-100"
                  style={{ paddingBottom: '56.25%' }}
                >
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={video.title}
                    className="absolute left-0 top-0 h-full w-full border-0 rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Video Title with icon */}
              <div className="px-4 pb-4 pt-2">
                <div className="flex items-start gap-2">
                  <i className="fas fa-video text-saffron mt-1 flex-shrink-0"></i>
                  <h3 className="text-base font-semibold text-gray-900 line-clamp-2">
                    {video.title}
                  </h3>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </motion.section>
  )
}
