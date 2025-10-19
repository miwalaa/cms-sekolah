'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import DropdownMenu from './DropdownMenu'
import type { NavItem as NavItemType } from './types'

interface Props {
  item: NavItemType
  index: number
}

const NavItem: React.FC<Props> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false)
  const openTimeout = useRef<NodeJS.Timeout | null>(null)
  const closeTimeout = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current)
    openTimeout.current = setTimeout(() => {
      setIsOpen(true)
    }, 150) // delay before opening
  }

  const handleMouseLeave = () => {
    if (openTimeout.current) clearTimeout(openTimeout.current)
    closeTimeout.current = setTimeout(() => {
      setIsOpen(false)
    }, 250) // delay before closing
  }

  // 🔗 Generate href dengan dukungan staticPath
  let href = '#'

  if (item.link?.type === 'reference' && item.link.reference?.value) {
    // Jika link ke dokumen Pages atau Posts
    href = `${
      item.link.reference.relationTo !== 'pages' ? `/${item.link.reference.relationTo}` : ''
    }/${
      typeof item.link.reference.value === 'object'
        ? item.link.reference.value.slug
        : item.link.reference.value
    }`
  } else if (item.link?.type === 'reference' && item.link?.staticPath) {
    // 🔥 Kalau pilih static internal link seperti /posts
    href = item.link.staticPath
  } else if (item.link?.type === 'custom' && item.link?.url) {
    // Kalau custom URL
    href = item.link.url
  }

  const hasChildren = item.children && item.children.length > 0

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Link
        href={href}
        target={item.link?.newTab ? '_blank' : undefined}
        rel={item.link?.newTab ? 'noopener noreferrer' : undefined}
        className="flex items-center space-x-1 font-semibold hover:text-saffron transition-colors duration-200"
      >
        <span>{item.link?.label || 'Untitled'}</span>
        {hasChildren && (
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        )}
      </Link>

      {hasChildren && isOpen && <DropdownMenu items={item.children || []} />}
    </div>
  )
}

export default NavItem
