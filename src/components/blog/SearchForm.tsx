'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export const SearchForm: React.FC = () => {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">Search</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search posts..."
            className="w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-800 text-white text-sm font-medium rounded-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-offset-2 transition-colors duration-200"
        >
          Search
        </button>
      </form>
    </div>
  )
}
