import React from 'react'
import Link from 'next/link'

import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

import type { AboutSection as AboutSectionProps } from '@/payload-types'

type Props = AboutSectionProps & {
  className?: string
  disableInnerContainer?: boolean
}

export const AboutSection: React.FC<Props> = (props) => {
  const {
    leftImage,
    subtitle,
    title,
    description,
    buttonText,
    buttonLink,
    className,
    disableInnerContainer = false,
  } = props

  return (
    <div className={`container my-16 ${className || ''}`}>
      <div className={`${disableInnerContainer ? '' : 'container'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left column - Image */}
          <div className="flex justify-center lg:justify-start order-1 lg:order-1">
            {leftImage && (
              <Media resource={leftImage} className="max-w-[500px] max-h-[500px] rounded-lg" />
            )}
          </div>

          {/* Right column - Content */}
          <div className="order-2 lg:order-2">
            {subtitle && (
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                {subtitle}
              </p>
            )}

            {title && <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>}

            {description && (
              <div className="prose prose-lg text-gray-600 mb-6">
                <RichText data={description} />
              </div>
            )}

            {buttonText && buttonLink && (
              <Link
                href={buttonLink}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg mt-4 hover:bg-blue-700 transition-colors duration-200"
              >
                {buttonText}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
