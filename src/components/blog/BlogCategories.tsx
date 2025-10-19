'use client'
import Link from 'next/link'
import React from 'react'

import type { Category } from '@/payload-types'

export interface BlogCategoriesProps {
  categories: Category[]
  title?: string
}

export const BlogCategories: React.FC<BlogCategoriesProps> = ({
  categories,
  title = 'Categories',
}) => {
  if (!categories || categories.length === 0) {
    return null
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
        {title}
      </h3>

      <ul className="space-y-2">
        {categories.map((category, index) => {
          if (typeof category === 'object' && category?.title) {
            const categorySlug = category.slug || category.title.toLowerCase().replace(/\s+/g, '-')
            const href = `/search?category=${encodeURIComponent(categorySlug)}`

            return (
              <li key={index}>
                <Link
                  href={href}
                  className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-gray-50 transition-colors duration-200 group"
                >
                  <span className="text-sm text-gray-700 group-hover:text-yellow-500 transition-colors duration-200">
                    {category.title}
                  </span>
                  <svg
                    className="w-4 h-4 text-gray-400 group-hover:text-yellow-500 transition-colors duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </li>
            )
          }
          return null
        })}
      </ul>
    </div>
  )
}
