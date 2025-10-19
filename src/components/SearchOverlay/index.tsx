'use client'

import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { X, Search } from 'lucide-react'

export const SearchOverlay = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isAnimating, setIsAnimating] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Handle animation
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true)
      document.body.style.overflow = 'hidden'
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      document.body.style.overflow = 'unset'
      setTimeout(() => {
        setSearchQuery('')
        setIsAnimating(false)
      }, 300)
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Handle ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      onClose()
    }
  }

  if (!isOpen && !isAnimating) return null

  return (
    <div
      className={`fixed inset-0 z-[100] transition-all duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
      aria-modal="true"
      role="dialog"
      aria-labelledby="search-overlay-title"
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Search Content */}
      <div
        className={`relative h-full flex items-center justify-center px-4 transition-transform duration-300 ${
          isOpen ? 'scale-100' : 'scale-95'
        }`}
      >
        <div className="w-full max-w-3xl">
          {/* Close Button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={onClose}
              className="text-white hover:text-gray-300 transition-colors p-2 rounded-full hover:bg-white/10"
              aria-label="Close search"
            >
              <X className="w-8 h-8" />
            </button>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="relative">
            <div className="relative">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400">
                <Search className="w-6 h-6" />
              </div>

              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari artikel, topik, atau berita..."
                className="w-full px-16 py-6 text-lg bg-white rounded-2xl shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all"
                aria-label="Search input"
                id="search-overlay-title"
              />

              <button
                type="submit"
                disabled={!searchQuery.trim()}
                className="absolute right-3 top-1/2 -translate-y-1/2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium hidden lg:flex"
                aria-label="Submit search"
              >
                Search
              </button>
            </div>

            <p className="mt-4 text-center text-white/80 text-sm hidden lg:flex">
              Tekan <kbd className="px-2 py-1 bg-white/20 rounded">Enter</kbd> untuk mencari atau{' '}
              <kbd className="px-2 py-1 bg-white/20 rounded">Esc</kbd> untuk menutup
            </p>
          </form>

          {/* Quick Links for Blog */}
          {!searchQuery && (
            <div className="mt-8 text-center">
              <p className="text-white/60 text-sm mb-3">Quick links:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  'Pendidikan Kesetaraan',
                  'Kegiatan PKBM',
                  'Informasi Pendaftaran',
                  'Inspirasi Belajar',
                  'Berita & Pengumuman',
                ].map((label) => (
                  <button
                    key={label}
                    onClick={() => setSearchQuery(label)}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm transition-colors"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
