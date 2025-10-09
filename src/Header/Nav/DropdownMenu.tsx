'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import type { NavItem } from './types'

interface DropdownMenuProps {
  items: NavItem[]
  parentPath?: string
  level?: number
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ items, parentPath = '', level = 0 }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const openTimeout = useRef<NodeJS.Timeout | null>(null)
  const closeTimeout = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = (index: number) => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current)
    openTimeout.current = setTimeout(() => {
      setOpenIndex(index)
    }, 150)
  }

  const handleMouseLeave = () => {
    if (openTimeout.current) clearTimeout(openTimeout.current)
    closeTimeout.current = setTimeout(() => {
      setOpenIndex(null)
    }, 250)
  }

  return (
    <div
      className={`absolute left-0 mt-9 w-64 bg-white rounded-bl-lg rounded-br-lg shadow-lg border border-gray-200 z-50 ${level > 0 ? 'top-0 left-full ml-1' : ''}`}
      onMouseLeave={handleMouseLeave}
    >
      {items.map((item, index) => {
        const href =
          item.link?.type === 'reference' && item.link.reference?.value
            ? `${item.link.reference.relationTo !== 'pages' ? `/${item.link.reference.relationTo}` : ''}/${typeof item.link.reference.value === 'object' ? item.link.reference.value.slug : item.link.reference.value}`
            : item.link?.url || '#'

        const fullPath = parentPath ? `${parentPath}/${href.replace(/^\//, '')}` : href

        const hasChildren = item.children && item.children.length > 0

        return (
          <div
            key={item.id || index}
            className="relative group"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href={href}
              className="flex items-center justify-between  w-full px-4 py-3 text-sm font-semibold text-gray-700 hover:text-white hover:bg-yellow-500 rounded-md transition-colors"
              target={item.link?.newTab ? '_blank' : undefined}
              rel={item.link?.newTab ? 'noopener noreferrer' : undefined}
            >
              <span>{item.link?.label || 'Untitled'}</span>
              {hasChildren && (
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-yellow-500 transition-transform duration-200" />
              )}
            </Link>

            {hasChildren && openIndex === index && (
              <div className="transition-opacity duration-200 ease-out opacity-100">
                <DropdownMenu items={item.children || []} parentPath={fullPath} level={level + 1} />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default DropdownMenu
