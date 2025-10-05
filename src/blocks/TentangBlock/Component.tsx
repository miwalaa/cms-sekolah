'use client'

import React from 'react'
import type { Page, Post } from '@/payload-types'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import type { TentangBlock as TentangBlockType } from '@/payload-types'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

// Define the reference type expected by CMSLink
type CMSLinkReference = {
  relationTo: 'pages' | 'posts'
  value: string | number | Page | Post
}

// Type guard to check if an object is a valid reference
const isCMSLinkReference = (ref: unknown): ref is CMSLinkReference => {
  const r = ref as Record<string, unknown>
  return (
    typeof r === 'object' &&
    r !== null &&
    'relationTo' in r &&
    (r.relationTo === 'pages' || r.relationTo === 'posts') &&
    'value' in r
  )
}

// Define the widget item type
type WidgetItem = {
  id?: string | null
  label?: string | null
  link?: {
    type?: 'reference' | 'custom' | null
    url?: string | null
    reference?: CMSLinkReference | null
    newTab?: boolean | null
  } | null
  icon?: string | null
}

// Define the widget type
type Widget = {
  id?: string | null
  type: string
  title?: string | null
  items?: WidgetItem[] | null
}

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

const TentangBlock: React.FC<TentangBlockType> = ({ left, right }) => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column: 2/3 width */}
        <div className="lg:col-span-2">
          <article className="bg-white rounded-2xl shadow-sm p-6">
            {left?.image ? (
              <div className={`${getImageWidthClass(left?.imageWidth ?? undefined)} mb-6`}>
                <Media resource={left.image} className="rounded-xl shadow-sm w-full object-cover" />
              </div>
            ) : null}
            {left?.content ? (
              <RichText
                data={left.content as unknown as DefaultTypedEditorState}
                className="prose max-w-none prose-headings:font-semibold prose-headings:text-gray-900 prose-p:text-gray-700"
              />
            ) : null}
          </article>
        </div>

        {/* Right column: 1/3 width */}
        <aside className="lg:col-span-1">
          <div className="space-y-8">
            {Array.isArray(right?.widgets) &&
              right.widgets.map((widget: Widget | null | undefined, index: number) => {
                if (!widget || widget.type !== 'menu' || !widget.items) {
                  return null
                }

                return (
                  <div
                    key={widget.id || `widget-${index}`}
                    className="bg-white rounded-2xl shadow-sm p-6"
                  >
                    {widget.title && (
                      <h3 className="mb-4 text-xl font-bold text-gray-900 border-b border-gray-200 pb-2">
                        {widget.title}
                      </h3>
                    )}
                    {widget.items.length > 0 && (
                      <ul className="space-y-2">
                        {widget.items.map((item, itemIndex) => {
                          if (!item?.link) return null

                          const hrefProps = item.link
                          const linkType = hrefProps.type || 'custom'
                          const url = hrefProps.url || '#'
                          const newTab = hrefProps.newTab || false

                          // Handle reference safely
                          let reference:
                            | { relationTo: 'pages' | 'posts'; value: string }
                            | undefined

                          if (hrefProps.reference) {
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
                              } else {
                                reference = {
                                  relationTo: 'pages',
                                  value: String(hrefProps.reference),
                                }
                              }
                            }
                          }

                          return (
                            <li key={item.id || `item-${itemIndex}`}>
                              <CMSLink
                                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                                type={linkType}
                                url={url}
                                reference={reference}
                                newTab={newTab}
                              >
                                {item.icon && (
                                  <span className="w-5 h-5 flex items-center justify-center">
                                    <i className={item.icon} />
                                  </span>
                                )}
                                <span>{item.label}</span>
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
