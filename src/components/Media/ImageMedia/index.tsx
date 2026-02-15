'use client'

import type { StaticImageData } from 'next/image'

import { cn } from '@/utilities/ui'
import NextImage from 'next/image'
import React from 'react'

import type { Props as MediaProps } from '../types'

import { cssVariables } from '@/cssVariables'
import { getMediaUrl } from '@/utilities/getMediaUrl'

const { breakpoints } = cssVariables

export const ImageMedia: React.FC<MediaProps> = (props) => {
  const {
    alt: altFromProps,
    fill,
    pictureClassName,
    imgClassName,
    priority,
    resource,
    size: sizeFromProps,
    src: srcFromProps,
    loading: loadingFromProps,
  } = props

  let width: number | undefined
  let height: number | undefined
  let alt = altFromProps || ''
  let src: StaticImageData | string = srcFromProps || ''

  if (!src && resource) {
    if (typeof resource === 'object') {
      const {
        alt: altFromResource,
        height: fullHeight,
        url,
        width: fullWidth,
        updatedAt,
      } = resource

      width = fullWidth ?? undefined
      height = fullHeight ?? undefined
      alt = altFromResource || alt || 'Image'

      const cacheTag = updatedAt
      src = getMediaUrl(url, cacheTag)
    } else if (typeof resource === 'number' || typeof resource === 'string') {
      // If we only have an ID but no src, we can't render anything useful without a URL.
      // However, Payload should ideally handle this population.
      // We'll keep it as empty for now but avoid returning null too early if there's a chance.
      src = getMediaUrl(null)
    }
  }

  if (!src) return null

  // Ensure alt is never empty
  if (!alt) alt = 'Image'

  const loading = loadingFromProps || (!priority ? 'lazy' : undefined)

  // If fill is explicitly set, use it; otherwise, use fill when dimensions are missing
  const imageFill = fill ?? (!width || !height)

  const isApiUrl = typeof src === 'string' && src.startsWith('/api/')

  const sizes = sizeFromProps
    ? sizeFromProps
    : Object.entries(breakpoints)
        .map(([, value]) => `(max-width: ${value}px) ${value}px`)
        .join(', ')

  return (
    <picture className={cn(pictureClassName, { 'relative w-full h-full block': imageFill })}>
      <NextImage
        alt={alt}
        className={cn(imgClassName)}
        fill={imageFill}
        height={!imageFill ? height : undefined}
        priority={priority}
        quality={85}
        loading={loading}
        sizes={sizes}
        src={src}
        unoptimized={isApiUrl}
        width={!imageFill ? width : undefined}
      />
    </picture>
  )
}
