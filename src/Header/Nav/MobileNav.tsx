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

        const href =
          item.link?.type === 'reference' && item.link.reference?.value
            ? `${item.link.reference.relationTo !== 'pages' ? `/${item.link.reference.relationTo}` : ''}/${typeof item.link.reference.value === 'object' ? item.link.reference.value.slug : item.link.reference.value}`
            : item.link?.url || '#'

        const fullPath = parentPath ? `${parentPath}/${href.replace(/^\//, '')}` : href

        return (
          <div key={itemId} className="mb-2">
            <div className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
              <Link
                href={href}
                className="flex-1"
                target={item.link?.newTab ? '_blank' : undefined}
                rel={item.link?.newTab ? 'noopener noreferrer' : undefined}
                onClick={onClose}
              >
                {item.link?.label || 'Untitled'}
              </Link>
              {hasChildren && (
                <button
                  onClick={() => toggleItem(itemId)}
                  className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label={isOpen ? 'Collapse menu' : 'Expand menu'}
                >
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
              )}
            </div>

            {hasChildren && isOpen && (
              <MobileNav
                items={item.children || []}
                parentPath={fullPath}
                level={level + 1}
                onClose={onClose}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default MobileNav
