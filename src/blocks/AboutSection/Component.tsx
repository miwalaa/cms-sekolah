'use client'

import React, { FC } from 'react'
import Link from 'next/link'
import { cn } from '@/utilities/cn'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import type { AboutSection as AboutSectionType } from '@/payload-types'
import { motion } from 'framer-motion'

type AboutSectionProps = AboutSectionType & {
  className?: string
  disableInnerContainer?: boolean
  description?: DefaultTypedEditorState
}

export const AboutSection: FC<AboutSectionProps> = ({
  leftImage,
  subtitle,
  title,
  description,
  buttonText,
  buttonLink,
  className,
  disableInnerContainer = false,
}) => {
  return (
    <motion.div
      className={cn('container my-16', className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className={cn({ container: !disableInnerContainer })}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left column - Image */}
          <div className="flex justify-center lg:justify-start order-1 lg:order-1">
            {leftImage && (
              <Media
                resource={leftImage}
                className="w-full max-w-[250px] sm:max-w-[300px] md:max-w-[350px] lg:max-w-[500px] max-h-[250px] sm:max-h-[300px] md:max-h-[400px] lg:max-h-[500px] object-contain rounded-lg"
              />
            )}
          </div>

          {/* Right column - Content */}
          <div className="order-2 lg:order-2">
            {subtitle && (
              <p
                className="text-sm font-medium uppercase tracking-wide mb-2"
                style={{ color: '#f1ac44' }}
              >
                {subtitle}
              </p>
            )}
            {title && <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>}
            {description && (
              <div className="prose prose-md text-gray-600 mb-6">
                <RichText data={description} />
              </div>
            )}
            {buttonText && buttonLink && (
              <Link
                href={buttonLink}
                className="inline-flex items-center gap-2.5 px-6 py-3 text-white rounded-lg font-medium bg-saffron hover:bg-[#e19b33] transition-colors duration-200"
              >
                <i className="fa-brands fa-whatsapp text-2xl"></i>
                <span>{buttonText}</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
