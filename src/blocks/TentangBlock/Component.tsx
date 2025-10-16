// src/blocks/TentangBlock/Component.tsx
'use client'

import React from 'react'
import type { Page, Post, Media as MediaType } from '@/payload-types'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import type { TentangBlock as TentangBlockType } from '@/payload-types'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

// Type guard for CMSLink reference
const isCMSLinkReference = (
  ref: unknown,
): ref is {
  relationTo: 'pages' | 'posts'
  value: string | number | Page | Post
} => {
  if (!ref || typeof ref !== 'object') return false
  const r = ref as Record<string, unknown>
  return 'relationTo' in r && (r.relationTo === 'pages' || r.relationTo === 'posts') && 'value' in r
}

// Type guard for MediaType
const isMediaType = (item: unknown): item is MediaType => {
  return typeof item === 'object' && item !== null && 'id' in item && 'url' in item
}

const TentangBlock: React.FC<TentangBlockType> = ({ left, right }) => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column: 2/3 width */}
        <div className="lg:col-span-2">
          <article className="bg-white rounded-2xl">
            {left?.image && (
              <div className="mb-6">
                <Media
                  resource={left.image}
                  className="w-full object-cover flex items-center justify-center"
                />
              </div>
            )}
            {left?.content && (
              <RichText
                data={left.content as unknown as DefaultTypedEditorState}
                className="prose max-w-none prose-headings:font-semibold prose-headings:text-gray-900 prose-p:text-gray-700"
              />
            )}
          </article>
        </div>

        {/* Right column: 1/3 width */}
        <aside className="lg:col-span-1">
          <div className="space-y-8">
            {Array.isArray(right?.widgets) &&
              right.widgets
                .filter(
                  (widget): widget is NonNullable<typeof widget> =>
                    widget !== null &&
                    widget !== undefined &&
                    (!('type' in widget) || widget.type === 'menu'),
                )
                .map((widget, index) => {
                  const widgetKey = `widget-${widget.id || `index-${index}`}`

                  return (
                    <div
                      key={widgetKey}
                      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                    >
                      {'title' in widget && widget.title && (
                        <h3 
                          className="mb-4 text-xl font-bold text-gray-900 border-b border-gray-200 pb-2"
                        >
                          {widget.title}
                        </h3>
                      )}

                      {'items' in widget &&
                        Array.isArray(widget.items) &&
                        widget.items.length > 0 && (
                          <ul className="space-y-2">
                            {widget.items
                              .filter(
                                (item): item is NonNullable<typeof item> & { link?: any } =>
                                  item !== null && item !== undefined && item.link !== undefined,
                              )
                              .map((item, itemIndex) => {
                                const itemKey = `item-${item.id || `index-${itemIndex}`}`
                                const hrefProps = item.link
                                const linkType = hrefProps?.type || 'custom'
                                const url = hrefProps?.url || '#'
                                const newTab = hrefProps?.newTab || false

                                let reference:
                                  | { relationTo: 'pages' | 'posts'; value: string }
                                  | undefined

                                if (hrefProps?.reference) {
                                  if (isCMSLinkReference(hrefProps.reference)) {
                                    reference = {
                                      relationTo: hrefProps.reference.relationTo,
                                      value: String(hrefProps.reference.value),
                                    }
                                  } else {
                                    const ref = hrefProps.reference as Record<string, unknown>
                                    if (ref && typeof ref === 'object' && 'value' in ref) {
                                      reference = {
                                        relationTo: 'pages',
                                        value: String(ref.value),
                                      }
                                    }
                                  }
                                }

                                return (
                                  <li key={itemKey}>
                                    <CMSLink
                                      className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                                      type={linkType}
                                      url={url}
                                      reference={reference}
                                      newTab={newTab}
                                    >
                                      {isMediaType(item.image) ? (
                                        <Media 
                                          resource={item.image} 
                                        />
                                      ) : (
                                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                          <span className="text-gray-500">?</span>
                                        </div>
                                      )}
                                      {'label' in item && item.label && (
                                        <span>{item.label}</span>
                                      )}
                                    </CMSLink>
                                  </li>
                                )
                              })}
                          </ul>
                        )}
                    </div>
                  )
                })}
          </div>
        </aside>
      </div>
    </div>
  )
}

export default TentangBlock
