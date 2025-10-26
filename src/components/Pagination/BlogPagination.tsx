'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { cn } from '@/utilities/ui'

export interface BlogPaginationProps {
  currentPage: number
  totalPages: number
  basePath?: string // e.g., '/posts' or '/search'
  className?: string
}

export const BlogPagination: React.FC<BlogPaginationProps> = ({
  currentPage,
  totalPages,
  basePath = '/posts',
  className,
}) => {
  const searchParams = useSearchParams()

  // Build URL with page parameter
  const buildUrl = (page: number): string => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())
    return `${basePath}?${params.toString()}`
  }

  const hasPrevPage = currentPage > 1
  const hasNextPage = currentPage < totalPages

  // Generate page numbers to display
  const getPageNumbers = (): (number | 'ellipsis')[] => {
    const pages: (number | 'ellipsis')[] = []
    const showPages = 5 // Maximum number of page buttons to show

    if (totalPages <= showPages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      if (currentPage > 3) {
        pages.push('ellipsis')
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (currentPage < totalPages - 2) {
        pages.push('ellipsis')
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages)
      }
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  if (totalPages <= 1) {
    return null // Don't show pagination if only one page
  }

  return (
    <nav
      className={cn('pagination-wrapper flex justify-center', className)}
      aria-label="Page navigation"
    >
      <ul className="pagination flex items-center gap-1">
        {/* Previous Button */}
        <li className={cn('page-item', !hasPrevPage && 'disabled')}>
          {hasPrevPage ? (
            <Link
              href={buildUrl(currentPage - 1)}
              className="page-link flex items-center justify-center h-10 w-10 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors"
              aria-label="Previous"
            >
              <span aria-hidden="true">‹</span>
            </Link>
          ) : (
            <span
              className="page-link flex items-center justify-center h-10 w-10 rounded-md border border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
              aria-disabled="true"
              aria-label="Previous"
            >
              <span aria-hidden="true">‹</span>
            </span>
          )}
        </li>

        {/* Page Numbers */}
        {pageNumbers.map((pageNum, index) => {
          if (pageNum === 'ellipsis') {
            return (
              <li key={`ellipsis-${index}`} className="page-item">
                <span className="page-link flex items-center justify-center h-10 w-10 text-gray-500">
                  …
                </span>
              </li>
            )
          }

          const isActive = pageNum === currentPage

          return (
            <li
              key={pageNum}
              className={cn('page-item', isActive && 'active')}
              aria-current={isActive ? 'page' : undefined}
            >
              {isActive ? (
                <span className="page-link flex items-center justify-center h-10 w-10 rounded-md border border-blue-600 bg-blue-600 text-white font-semibold">
                  {pageNum}
                </span>
              ) : (
                <Link
                  href={buildUrl(pageNum)}
                  className="page-link flex items-center justify-center h-10 w-10 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors"
                >
                  {pageNum}
                </Link>
              )}
            </li>
          )
        })}

        {/* Next Button */}
        <li className={cn('page-item', !hasNextPage && 'disabled')}>
          {hasNextPage ? (
            <Link
              href={buildUrl(currentPage + 1)}
              className="page-link flex items-center justify-center h-10 w-10 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors"
              rel="next"
              aria-label="Next"
            >
              <span aria-hidden="true">›</span>
            </Link>
          ) : (
            <span
              className="page-link flex items-center justify-center h-10 w-10 rounded-md border border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
              aria-disabled="true"
              aria-label="Next"
            >
              <span aria-hidden="true">›</span>
            </span>
          )}
        </li>
      </ul>
    </nav>
  )
}
