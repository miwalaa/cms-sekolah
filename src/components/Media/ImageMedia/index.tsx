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
  let alt = altFromProps
  let src: StaticImageData | string = srcFromProps || ''

  if (!src && resource && typeof resource === 'object') {
    const { alt: altFromResource, height: fullHeight, url, width: fullWidth, updatedAt } = resource

    width = fullWidth!
    height = fullHeight!
    alt = altFromResource || ''

    const cacheTag = updatedAt // Use updatedAt from resource
    src = getMediaUrl(url, cacheTag)
  }

  // If still no src, render nothing
  if (!src) return null

  // Ensure alt always has a sensible default
  if (!alt) alt = 'Image'

  const loading = loadingFromProps || (!priority ? 'lazy' : undefined)

  // Ensure NextImage has valid sizing: if width/height are unknown, force fill
  const imageFill = typeof fill === 'boolean' ? fill : !width || !height

  const isApiUrl = typeof src === 'string' && src.startsWith('/api/')

  // NOTE: this is used by the browser to determine which image to download at different screen sizes
  const sizes = sizeFromProps
    ? sizeFromProps
    : Object.entries(breakpoints)
        .map(([, value]) => `(max-width: ${value}px) ${value}px`)
        .join(', ')

  return (
    <picture className={cn(pictureClassName, { 'relative h-full w-full': imageFill })}>
      <NextImage
        alt={alt || ''}
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
