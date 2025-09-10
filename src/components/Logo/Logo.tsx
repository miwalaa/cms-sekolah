import { cn } from '@/utilities/ui'
import React from 'react'

interface LogoProps {
  loading?: 'eager' | 'lazy'
  priority?: 'high' | 'low' | 'auto'
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const Logo: React.FC<LogoProps> = ({ loading, priority, className = '', size = 'sm' }) => {
  return (
    <div className="flex items-center w-full h-full">
      <img
        alt="PKBM Pemuda Pelopor Logo"
        className={cn(`object-contain h-auto ${className}`, {
          'w-16': size === 'sm',
          'w-24': size === 'md',
          'w-32': size === 'lg',
        })}
        loading={loading}
        fetchPriority={priority}
        src="/logo.png"
      />
    </div>
  )
}

export default Logo
