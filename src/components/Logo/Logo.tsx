import React from 'react'

interface LogoProps {
  loading?: 'eager' | 'lazy'
  priority?: 'high' | 'low' | 'auto'
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const sizeClasses = {
  sm: 'w-16 h-16',      // 4rem x 4rem (64px x 64px)
  md: 'w-20 h-20',      // 5rem x 5rem (80px x 80px)
  lg: 'w-24 h-24',      // 6rem x 6rem (96px x 96px)
  xl: 'w-32 h-32',      // 8rem x 8rem (128px x 128px)
  admin: 'w-48 h-48',   // 12rem x 12rem (192px x 192px) for admin panel
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
    <div className="flex items-center">
      <img
        alt="PKBM Pemuda Pelopor Logo"
        width={size === 'sm' ? 64 : size === 'md' ? 80 : size === 'lg' ? 96 : 128}
        height={size === 'sm' ? 64 : size === 'md' ? 80 : size === 'lg' ? 96 : 128}
        className={`object-contain ${sizeClass} ${className}`}
        loading={loading}
        fetchPriority={priority}
        src="/logo.png"
      />
    </div>
  )
}

export default Logo
