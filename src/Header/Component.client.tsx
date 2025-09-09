'use client'
import Link from 'next/link'
import React from 'react'

import type { Header } from '@/payload-types'

import Logo from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  return (
    <header className="bg-white shadow-sm z-20">
      <div className="container py-2 md:py-4 flex justify-between items-center">
        <Link href="/" className="py-1 md:py-2">
          <Logo size="sm" loading="eager" priority="high" className="invert" />
        </Link>
        <HeaderNav data={data} />
      </div>
    </header>
  )
}
