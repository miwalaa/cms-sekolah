// src/blocks/TentangBlock/Component.tsx
'use client'

import React from 'react'
import { motion } from 'framer-motion'
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
    <motion.div
      className="container mx-auto px-4 py-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column: 2/3 width */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        >
          <article className="bg-white rounded-2xl">
            {left?.image && (
              <div className="mb-6 overflow-hidden">
                <Media
                  resource={left.image}
                  className="w-full max-h-[350px] md:max-h-[400px] lg:max-h-[600px] object-cover object-center flex items-center justify-center"
                />
              </div>
            )}
            {left?.content && (
              <div>
                <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-800 hover:prose-a:text-blue-900 prose-strong:text-gray-900 prose-img:rounded-lg">
                  <RichText
                    data={left.content as unknown as DefaultTypedEditorState}
                    enableGutter={false}
                  />
                </div>
              </div>
            )}
          </article>
        </motion.div>

        {/* Right column: 1/3 width */}
        <motion.aside
          className="lg:col-span-1"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
        >
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
                      {/* Title */}
                      {'title' in widget && widget.title && (
                        <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                          {widget.title}
                        </h3>
                      )}

                      {/* Items */}
                      {'items' in widget &&
                        Array.isArray(widget.items) &&
                        widget.items.length > 0 && (
                          <div className="space-y-4">
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
                                  <CMSLink
                                    key={itemKey}
                                    className="flex gap-3 group hover:bg-gray-50 p-2 rounded-md transition-colors duration-200"
                                    type={linkType}
                                    url={url}
                                    reference={reference}
                                    newTab={newTab}
                                  >
                                    {/* Thumbnail */}
                                    <div className="relative w-16 h-16 overflow-hidden bg-gray-100 rounded-md flex-shrink-0">
                                      {isMediaType(item.image) ? (
                                        <Media
                                          resource={item.image}
                                          fill
                                          className="w-full h-full object-cover"
                                        />
                                      ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                          <svg
                                            className="w-6 h-6 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth={2}
                                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                          </svg>
                                        </div>
                                      )}
                                    </div>

                                    {/* Label */}
                                    {'label' in item && item.label && (
                                      <span className="flex items-center text-sm font-medium text-gray-900 group-hover:text-saffron transition-colors duration-200 line-clamp-2">
                                        {item.label}
                                      </span>
                                    )}
                                  </CMSLink>
                                )
                              })}
                          </div>
                        )}
                    </div>
                  )
                })}
          </div>
        </motion.aside>
      </div>
    </motion.div>
  )
}

export default TentangBlock
