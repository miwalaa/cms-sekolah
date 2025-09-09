import React from 'react'

interface LogoProps {
  loading?: 'eager' | 'lazy'
  priority?: 'high' | 'low' | 'auto'
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const sizeClasses = {
  sm: 'w-12 h-12 md:w-16 md:h-16',      // 3rem-4rem (48px-64px)
  md: 'w-16 h-16 md:w-20 md:h-20',      // 4rem-5rem (64px-80px)
  lg: 'w-20 h-20 md:w-24 md:h-24',      // 5rem-6rem (80px-96px)
  xl: 'w-24 h-24 md:w-32 md:h-32',      // 6rem-8rem (96px-128px)
  admin: 'w-32 h-32 md:w-48 md:h-48',   // 8rem-12rem (128px-192px) for admin panel
}

const Logo: React.FC<LogoProps> = ({ 
  loading, 
  priority, 
  className = '',
  size = 'md' 
}) => {
  // Check if we're in the admin panel
  const isAdminPanel = typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')
  const sizeToUse = isAdminPanel ? 'admin' : size
  const sizeClass = sizeClasses[sizeToUse] || sizeClasses.md
  
  return (
    <div className="flex items-center w-full h-full">
      <img
        alt="PKBM Pemuda Pelopor Logo"
        width={size === 'sm' ? 48 : size === 'md' ? 64 : size === 'lg' ? 80 : size === 'xl' ? 96 : 128}
        height={size === 'sm' ? 48 : size === 'md' ? 64 : size === 'lg' ? 80 : size === 'xl' ? 96 : 128}
        className={`object-contain w-full h-auto ${sizeClass} ${className}`}
        loading={loading}
        fetchPriority={priority}
        src="/logo.png"
      />
    </div>
  )
}

export default Logo
