import React from 'react'
import Link from 'next/link'

import type { SpecialitiesBlock as SpecialitiesProps } from '@/payload-types'

type Props = SpecialitiesProps & {
  className?: string
  disableInnerContainer?: boolean
}

export const Specialities: React.FC<Props> = (props) => {
  const {
    sectionTitle = 'Kenapa PKBM Pemuda Pelopor?',
    items,
    className,
    disableInnerContainer = false,
  } = props

  if (!items || items.length === 0) {
    return null
  }

  return (
    <div className={`container my-16 ${className || ''}`}>
      <div className={`${disableInnerContainer ? '' : 'container'} mx-auto px-4`}>
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{sectionTitle}</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        {/* Specialities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item, index) => {
            const { icon, title, description, link, backgroundColor = '#ffffff' } = item

            const TitleElement = link ? (
              <Link
                href={link}
                className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200"
              >
                {title}
              </Link>
            ) : (
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            )

            const safeBackgroundColor =
              backgroundColor && backgroundColor.trim() !== '' ? backgroundColor : '#ffffff'

            return (
              <div
                key={index}
                className={`
                  rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300
                  p-6 flex flex-col items-center text-center
                  border border-gray-100
                `}
                style={{ backgroundColor: safeBackgroundColor }}
              >
                {/* Icon */}
                {icon && (
                  <div className="mb-4">
                    <div
                      className={`w-16 h-16 flex items-center justify-center rounded-full bg-blue-50 text-blue-600`}
                    >
                      <i className={`${icon} text-2xl`}></i>
                    </div>
                  </div>
                )}

                {/* Title */}
                <div className="mb-3">{TitleElement}</div>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed flex-grow">{description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
