import { cn } from '@/utilities/ui'
import React from 'react'
import Image from 'next/image'

interface LogoProps {
  loading?: 'eager' | 'lazy'
  priority?: 'high' | 'low' | 'auto'
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const Logo: React.FC<LogoProps> = ({ loading, priority, className = '', size = 'sm' }) => {
  return (
    <div className="flex items-center">
      <Image
        alt="PKBM Pemuda Pelopor Logo"
        className={cn(`object-contain h-auto ${className}`, {
          'w-16 h-16': size === 'sm',
          'w-24 h-24': size === 'md',
          'w-32 h-32': size === 'lg',
        })}
        loading={loading}
        fetchPriority={priority}
        src="/logo.png"
        width={128}
        height={128}
        priority={priority === 'high'}
      />
    </div>
  )
}

export default Logo
