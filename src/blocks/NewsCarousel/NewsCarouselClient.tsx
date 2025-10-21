'use client'

import React from 'react'
import type { Post } from '@/payload-types'
import { CarouselClient } from './CarouselClient'
import { motion } from 'framer-motion'

type Props = {
  subtitle?: string | null
  heading?: string | null
  posts: Post[]
  className?: string
}

export function NewsCarouselClient({ subtitle, heading, posts, className }: Props) {
  return (
    <motion.section
      className={`container ${className || ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Title area */}
      <div className="mb-8 text-center">
        {subtitle && (
          <p className="text-sm font-medium uppercase tracking-wide text-saffron">{subtitle}</p>
        )}
        {heading && (
          <h2 className="mt-1 text-3xl font-bold leading-tight text-gray-900">{heading}</h2>
        )}
      </div>

      {/* Carousel */}
      <CarouselClient posts={posts} />
    </motion.section>
  )
}
