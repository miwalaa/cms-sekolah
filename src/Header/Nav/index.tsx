'use client'

import React, { useState } from 'react'
import type { Header as HeaderType } from '@/payload-types'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'

import NavItem from './NavItem'
import MobileNav from './MobileNav'
import type { NavItem as NavItemType } from './types'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center space-x-6 text-white">
        {navItems.map((item, index) => (
          <NavItem key={item.id || index} item={item as NavItemType} index={index} />
        ))}
      </nav>
      <Link
        href="/search"
        className="text-white hover:text-gray-200 transition-colors hidden lg:flex"
      >
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 h-5" />
      </Link>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between">
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

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 lg:hidden">
            <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Menu</h2>
                  <button
                    onClick={closeMobileMenu}
                    className="text-gray-500 hover:text-gray-700 transition-colors p-2"
                    aria-label="Close menu"
                  >
                    <div className="w-6 h-6 relative">
                      <span className="absolute block h-0.5 w-full bg-gray-600 rotate-45 top-3"></span>
                      <span className="absolute block h-0.5 w-full bg-gray-600 -rotate-45 top-3"></span>
                    </div>
                  </button>
                </div>

                <MobileNav items={navItems as NavItemType[]} onClose={closeMobileMenu} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
