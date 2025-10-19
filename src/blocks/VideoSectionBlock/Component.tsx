'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Media } from '@/components/Media'
import type { VideoSectionBlock as VideoSectionBlockType } from '@/payload-types'

export type VideoSectionBlockProps = VideoSectionBlockType

// Extract YouTube video ID from various YouTube URL formats
const getYouTubeId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]+)/,
    /youtube\.com\/v\/([a-zA-Z0-9_-]+)/,
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
}

const VideoSectionBlock: React.FC<VideoSectionBlockProps> = ({ thumbnail, videoUrl }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const videoId = getYouTubeId(videoUrl || '')

  if (!thumbnail || !videoUrl) {
    return null
  }

  const openModal = () => {
    setIsModalOpen(true)
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setIsModalOpen(false)
    // Restore body scroll
    document.body.style.overflow = 'unset'
  }

  return (
    <>
      <motion.section
        className="mt-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="container mx-auto px-4">
          <div className="row">
            <div className="col-lg-12">
              {/* Outer padding container with gray border */}
              <div className="p-2 border-2 border-gray-100 rounded-lg bg-white">
                <motion.div
                  className="logistic-video-wrap relative overflow-hidden rounded-lg cursor-pointer"
                  onClick={openModal}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  {/* Thumbnail Image */}
                  <div className="relative w-full aspect-video overflow-hidden rounded-lg">
                    {typeof thumbnail !== 'string' && thumbnail ? (
                      <Media
                        resource={thumbnail}
                        className="w-full h-full"
                        imgClassName="object-cover w-full h-full transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">No thumbnail available</span>
                      </div>
                    )}
                  </div>

                  {/* Play Button with Continuous Animation */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <motion.div
                      className="video-play-btn flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/95 shadow-xl"
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        ease: 'easeInOut',
                        repeat: Infinity,
                        repeatType: 'loop',
                      }}
                    >
                      <i className="fas fa-play text-saffron text-2xl md:text-3xl ml-1"></i>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Video Modal */}
      <AnimatePresence>
        {isModalOpen && videoId && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="relative w-full max-w-5xl aspect-video"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute -top-12 right-0 md:-right-12 text-white hover:text-saffron transition-colors duration-200 z-10"
                aria-label="Close video"
              >
                <i className="fas fa-times text-3xl md:text-4xl"></i>
              </button>

              {/* YouTube Video Player */}
              <div className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                  title="Video Player"
                  className="absolute inset-0 w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default VideoSectionBlock
