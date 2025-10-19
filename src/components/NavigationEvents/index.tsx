'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export function NavigationEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const url = `${pathname}${searchParams ? `?${searchParams}` : ''}`
    // You can add analytics or other side effects here
    console.log('Navigation to:', url)
  }, [pathname, searchParams])

  return null
}
