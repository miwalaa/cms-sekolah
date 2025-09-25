'use client'

import React from 'react'
import type { TentangBlock as TentangBlockType } from '@/payload-types'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

function getImageWidthClass(width?: string) {
  switch (width) {
    case 'half':
      return 'w-1/2'
    case 'twoThirds':
      return 'w-2/3'
    case 'threeQuarters':
      return 'w-3/4'
    case 'full':
    default:
      return 'w-full'
  }
}

export default function TentangBlock(props: TentangBlockType) {
  // Payload sometimes nests block fields under `fields`
  const data: any = (props as any)?.fields ?? props
  const left = data?.left
  const right = data?.right

  // Debug the incoming data structure
  console.log('TentangBlock data:', data)

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left column: 2/3 width */}
        <div className="lg:col-span-2">
          <div className="single-knowledgebase-details">
            {left?.image ? (
              <div className={getImageWidthClass(left?.imageWidth)}>
                <Media resource={left.image} className="mb-6" />
              </div>
            ) : null}

            {left?.content ? (
              <RichText data={left.content as any} className="prose max-w-none" />
            ) : null}
          </div>
        </div>

        {/* Right column: 1/3 width */}
        <div className="lg:col-span-1">
          <div className="widget-area space-y-8">
            {Array.isArray(right?.widgets) &&
              right.widgets.map((widget: any) => {
                if (widget.type === 'menu') {
                  return (
                    <div key={widget.id ?? widget.title}>
                      {widget.title ? (
                        <h3 className="mb-3 text-lg font-semibold">{widget.title}</h3>
                      ) : null}
                      <ul className="space-y-2">
                        {Array.isArray(widget.items) &&
                          widget.items.map((item: any) => {
                            const hrefProps = item.link
                            return (
                              <li key={item.id ?? item.label}>
                                <CMSLink
                                  type={
                                    hrefProps?.type ??
                                    (hrefProps?.url
                                      ? 'custom'
                                      : hrefProps?.reference
                                        ? 'reference'
                                        : null)
                                  }
                                  reference={hrefProps?.reference as any}
                                  url={hrefProps?.url ?? undefined}
                                  newTab={hrefProps?.newTab ?? null}
                                  className="inline-flex items-center gap-2 text-primary-600 hover:underline"
                                >
                                  {item.icon ? <i className={item.icon} aria-hidden /> : null}
                                  <span>{item.label}</span>
                                </CMSLink>
                              </li>
                            )
                          })}
                      </ul>
                    </div>
                  )
                }
                return null
              })}
          </div>
        </div>
      </div>
    </div>
  )
}
