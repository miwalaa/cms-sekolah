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
  const data: TentangBlockType =
    typeof (props as unknown as { fields?: TentangBlockType }).fields !== 'undefined'
      ? (props as unknown as { fields: TentangBlockType }).fields
      : props
  const left = data?.left
  const right = data?.right

  return (
    <div className="container mx-auto px-4 pb-12">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        {/* Left column: 2/3 width */}
        <div className="lg:col-span-2">
          <article className="p-6 lg:p-8">
            {left?.image ? (
              <div className={`${getImageWidthClass(left?.imageWidth ?? undefined)} mb-6`}>
                <Media resource={left.image} className="rounded-xl shadow-sm w-full object-cover" />
              </div>
            ) : null}

            {left?.content ? (
              <RichText
                data={left.content}
                className="prose max-w-none prose-headings:font-semibold prose-headings:text-gray-900 prose-p:text-gray-700"
              />
            ) : null}
          </article>
        </div>

        {/* Right column: 1/3 width */}
        <aside className="lg:col-span-1">
          <div className="space-y-8">
            {Array.isArray(right?.widgets) &&
              right.widgets.map((widget: any) => {
                if (widget.type === 'menu') {
                  return (
                    <div
                      key={widget.id ?? widget.title ?? 'menu-widget'}
                      className="bg-white rounded-2xl shadow-sm p-6"
                    >
                      {widget.title ? (
                        <h3 className="mb-4 text-xl font-bold text-gray-900 border-b border-gray-200 pb-2">
                          {widget.title}
                        </h3>
                      ) : null}
                      <ul className="space-y-3">
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
                                  reference={hrefProps?.reference}
                                  url={hrefProps?.url ?? undefined}
                                  newTab={hrefProps?.newTab ?? null}
                                  className="group flex items-center gap-2 rounded-lg px-3 py-2 transition hover:bg-primary-50"
                                >
                                  {item.icon ? (
                                    <i
                                      className={`${item.icon} text-primary-600 group-hover:scale-110 transition`}
                                      aria-hidden
                                    />
                                  ) : null}
                                  <span className="text-gray-700 group-hover:text-primary-700 font-medium">
                                    {item.label}
                                  </span>
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
        </aside>
      </div>
    </div>
  )
}
