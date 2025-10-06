// AdminLogo.tsx
import React from 'react'
import Image from 'next/image'

const AdminLogo: React.ComponentType = () => (
  <div className="flex items-center justify-center px-4">
    <Image
      alt="PKBM Pemuda Pelopor Logo"
      width={150}
      height={150}
      className="object-contain"
      src="/logo-color.png"
      priority
    />
  </div>
)

export default AdminLogo
