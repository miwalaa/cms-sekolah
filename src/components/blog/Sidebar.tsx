import React from 'react'

import type { Category, Post } from '@/payload-types'

import { BlogCategories } from './BlogCategories'
import { RecentPosts } from './RecentPosts'
import { SearchForm } from './SearchForm'

export interface SidebarProps {
  categories?: Category[]
  recentPosts?: Post[]
  showSearch?: boolean
  showCategories?: boolean
  showRecentPosts?: boolean
}

export const Sidebar: React.FC<SidebarProps> = ({
  categories = [],
  recentPosts = [],
  showSearch = true,
  showCategories = true,
  showRecentPosts = true,
}) => {
  return (
    <div className="space-y-6">
      {/* Search Form */}
      {showSearch && <SearchForm />}

      {/* Categories */}
      {showCategories && categories.length > 0 && (
        <BlogCategories categories={categories} />
      )}

      {/* Recent Posts */}
      {showRecentPosts && recentPosts.length > 0 && (
        <RecentPosts posts={recentPosts.slice(0, 5)} /> // Show max 5 recent posts
      )}
    </div>
  )
}
