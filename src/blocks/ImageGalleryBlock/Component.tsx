'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Media } from '@/components/Media'
import type { ImageGalleryBlock as ImageGalleryBlockType } from '@/payload-types'

export type Props = {
  images?: ImageGalleryBlockType['images']
  className?: string
}

export default function ImageGalleryBlock(props: Props) {
  const { images = [], className } = props
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const closeOverlay = () => {
    setSelectedIndex(null)
  }

  const goToPrevious = () => {
    if (selectedIndex === null || !images) return
    setSelectedIndex((selectedIndex - 1 + images.length) % images.length)
  }

  const goToNext = () => {
    if (selectedIndex === null || !images) return
    setSelectedIndex((selectedIndex + 1) % images.length)
  }

  // Handle keyboard navigation
  useEffect(() => {
    if (selectedIndex === null) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeOverlay()
      } else if (e.key === 'ArrowLeft') {
        goToPrevious()
      } else if (e.key === 'ArrowRight') {
        goToNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex])

  // Lock body scroll when overlay is open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedIndex])

  const openOverlay = (index: number) => {
    setSelectedIndex(index)
  }

  if (!images || images.length === 0) {
    return (
      <div className={`container mx-auto px-4 py-8 ${className || ''}`}>
        <div className="text-center text-gray-500">
          <p>No images available.</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <motion.section
        className={`container mx-auto px-4 pb-12 ${className || ''}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {images.map((item, index) => {
            const image = item?.image && typeof item.image !== 'number' ? item.image : null

            return (
              <div
                key={index}
                className="overflow-hidden rounded-lg bg-white shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => openOverlay(index)}
              >
                {/* Image Container with padding and border */}
                <div className="p-2">
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100 rounded-lg border-2 border-gray-100">
                    {image ? (
                      <Media
                        resource={image}
                        className="w-full h-full"
                        imgClassName="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <i className="fas fa-image text-4xl text-gray-400"></i>
                      </div>
                    )}
                  </div>
                </div>

                {/* Image Title with icon */}
                <div className="px-4 pb-4 pt-2">
                  <div className="flex items-start gap-2">
                    <i className="fas fa-image text-saffron mt-1 flex-shrink-0"></i>
                    <h3 className="text-base font-semibold text-gray-900 line-clamp-2">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </motion.section>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {selectedIndex !== null && images[selectedIndex] && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeOverlay}
          >
            {/* Close Button */}
            <button
              onClick={closeOverlay}
              className="absolute top-4 right-4 md:top-8 md:right-8 z-10 text-white hover:text-saffron transition-colors duration-200"
              aria-label="Close overlay"
            >
              <i className="fas fa-times text-3xl md:text-4xl"></i>
            </button>

            {/* Previous Button */}
            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  goToPrevious()
                }}
                className="absolute left-4 md:left-8 z-10 text-white hover:text-saffron transition-colors duration-200"
                aria-label="Previous image"
              >
                <i className="fas fa-chevron-left text-3xl md:text-4xl"></i>
              </button>
            )}

            {/* Next Button */}
            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  goToNext()
                }}
                className="absolute right-4 md:right-8 z-10 text-white hover:text-saffron transition-colors duration-200"
                aria-label="Next image"
              >
                <i className="fas fa-chevron-right text-3xl md:text-4xl"></i>
              </button>
            )}

            {/* Image Container */}
            <motion.div
              className="relative max-w-6xl w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full max-h-[80vh] flex items-center justify-center">
                {(() => {
                  const currentImage =
                    images[selectedIndex]?.image && typeof images[selectedIndex].image !== 'number'
                      ? images[selectedIndex].image
                      : null

                  return currentImage ? (
                    <Media
                      resource={currentImage}
                      className="max-w-full max-h-[80vh] rounded-lg shadow-2xl"
                      imgClassName="object-contain w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-96 bg-gray-800 rounded-lg flex items-center justify-center">
                      <i className="fas fa-image text-6xl text-gray-600"></i>
                    </div>
                  )
                })()}
              </div>

              {/* Image Title */}
              <div className="mt-4 text-center">
                <h3 className="text-xl md:text-2xl font-semibold text-white">
                  {images[selectedIndex].title}
                </h3>
                {images.length > 1 && (
                  <p className="text-sm text-gray-400 mt-2">
                    {selectedIndex + 1} / {images.length}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
