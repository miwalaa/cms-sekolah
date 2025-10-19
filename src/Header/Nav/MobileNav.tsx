'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import type { NavItem } from './types'

interface MobileNavProps {
  items: NavItem[]
  parentPath?: string
  level?: number
  onClose?: () => void
}

const MobileNav: React.FC<MobileNavProps> = ({ items, parentPath = '', level = 0, onClose }) => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <div className={`${level > 0 ? 'ml-4 border-l-2 border-gray-200 pl-4' : ''}`}>
      {items.map((item, index) => {
        const hasChildren = item.children && item.children.length > 0
        const itemId = item.id || `item-${index}`
        const isOpen = openItems[itemId]
        const submenuId = `${itemId}-submenu`

        // 🔧 Tambahan dukungan staticPath
        const href =
          item.link?.staticPath ||
          (item.link?.type === 'reference' && item.link.reference?.value
            ? `${
                item.link.reference.relationTo !== 'pages'
                  ? `/${item.link.reference.relationTo}`
                  : ''
              }/${
                typeof item.link.reference.value === 'object'
                  ? item.link.reference.value.slug
                  : item.link.reference.value
              }`
            : item.link?.url || '#')

        const fullPath = parentPath ? `${parentPath}/${href.replace(/^\//, '')}` : href

        return (
          <div key={itemId} className="mb-2">
            {hasChildren ? (
              <div
                className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => toggleItem(itemId)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    toggleItem(itemId)
                  }
                }}
                role="button"
                aria-expanded={!!isOpen}
                aria-controls={submenuId}
                tabIndex={0}
              >
                <span className="flex-1">{item.link?.label || 'Untitled'}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleItem(itemId)
                  }}
                  className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label={isOpen ? 'Collapse menu' : 'Expand menu'}
                >
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
              </div>
            ) : (
              <Link
                href={href}
                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                target={item.link?.newTab ? '_blank' : undefined}
                rel={item.link?.newTab ? 'noopener noreferrer' : undefined}
                onClick={onClose}
              >
                {item.link?.label || 'Untitled'}
              </Link>
            )}

            {hasChildren && (
              <div
                id={submenuId}
                className={`overflow-hidden transition-all duration-200 ease-in-out ${
                  isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <MobileNav
                  items={item.children || []}
                  parentPath={fullPath}
                  level={level + 1}
                  onClose={onClose}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default MobileNav
