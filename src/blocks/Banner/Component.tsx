'use client'

import type { BannerBlock as BannerBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import { motion } from 'framer-motion'

type Props = {
  className?: string
} & BannerBlockProps

export const BannerBlock: React.FC<Props> = ({ className, content, style }) => {
  return (
    <motion.div
      className={cn('mx-auto my-8 w-full', className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div
        className={cn('border py-3 px-6 flex items-center rounded', {
          'border-border bg-card': style === 'info',
          'border-error bg-error/30': style === 'error',
          'border-success bg-success/30': style === 'success',
          'border-warning bg-warning/30': style === 'warning',
        })}
      >
        <RichText data={content} enableGutter={false} enableProse={false} />
      </div>
    </motion.div>
  )
}
