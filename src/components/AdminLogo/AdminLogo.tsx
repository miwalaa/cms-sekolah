import React from 'react'
import type { ComponentType } from 'react'
import Logo from '../Logo/Logo'

const AdminLogo: ComponentType = () => {
  return (
    <div className="flex items-center justify-center w-full px-4">
      <Logo size="xl" className="max-w-full" />
    </div>
  )
}

export default AdminLogo
