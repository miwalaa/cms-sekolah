import React from 'react'

import type { Page } from '@/payload-types'

type LowImpactHeroType =
  | {
      children?: React.ReactNode
      title?: never
    }
  | (Omit<Page['hero'], 'title'> & {
      children?: never
      title?: Page['hero']['title']
    })

export const LowImpactHero: React.FC<LowImpactHeroType> = ({ children, title }) => {
  return (
    <div className="container mt-16">
      <div className="max-w-[48rem]">
        {children ||
          (title && <h1 className="text-4xl md:text-5xl lg:text-6xl text-white mb-6">{title}</h1>)}
      </div>
    </div>
  )
}
