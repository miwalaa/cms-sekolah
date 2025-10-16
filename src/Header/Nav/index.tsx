'use client'

import React, { useState } from 'react'
import type { Header as HeaderType } from '@/payload-types'
import { SearchIcon } from 'lucide-react'

import NavItem from './NavItem'
import MobileNav from './MobileNav'
import type { NavItem as NavItemType } from './types'
import { SearchOverlay } from '@/components/SearchOverlay'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const openSearch = () => {
    setIsSearchOpen(true)
  }

  const closeSearch = () => {
    setIsSearchOpen(false)
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center space-x-6 text-white">
        {navItems.map((item, index) => (
          <NavItem key={item.id || index} item={item as NavItemType} index={index} />
        ))}
      </nav>
      <button
        onClick={openSearch}
        className="text-white hover:text-saffron transition-colors hidden lg:flex items-center"
        aria-label="Open search"
      >
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 h-5" />
      </button>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <div className="flex items-center gap-2">
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="text-white hover:text-gray-200 transition-colors p-2"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <div className="w-6 h-6 relative">
              <span
                className={`absolute block h-0.5 w-full bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 top-3' : 'top-1'}`}
              ></span>
              <span
                className={`absolute block h-0.5 w-full bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'top-3'}`}
              ></span>
              <span
                className={`absolute block h-0.5 w-full bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 top-3' : 'top-5'}`}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu Dropdown Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 z-50 lg:hidden"
            onClick={closeMobileMenu}
            aria-modal="true"
            role="dialog"
          >
            {/* Backdrop with blur */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" />

            {/* Dropdown Menu */}
            <div
              className="relative bg-white shadow-2xl animate-in slide-in-from-top duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Menu</h2>
                <button
                  onClick={closeMobileMenu}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Close menu"
                >
                  <div className="w-6 h-6 relative">
                    <span className="absolute block h-0.5 w-full bg-gray-600 rotate-45 top-3"></span>
                    <span className="absolute block h-0.5 w-full bg-gray-600 -rotate-45 top-3"></span>
                  </div>
                </button>
              </div>

              {/* Navigation Content */}
              <div className="px-6 py-4 max-h-[calc(100vh-80px)] overflow-y-auto">
                {/* Search Button */}
                <button
                  onClick={() => {
                    closeMobileMenu()
                    openSearch()
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 mb-4 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors"
                >
                  <SearchIcon className="w-5 h-5" />
                  <span className="font-medium">Search</span>
                </button>

                {/* Navigation Links */}
                <MobileNav items={navItems as NavItemType[]} onClose={closeMobileMenu} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={closeSearch} navItems={navItems as any[]} />
    </>
  )
}
