'use client'

import React from 'react'

import type { SpecialitiesBlock as SpecialitiesProps } from '@/payload-types'
import { motion } from 'framer-motion'

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
    <motion.div
      className={`container my-16 ${className || ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className={`${disableInnerContainer ? '' : 'container'} mx-auto px-4`}>
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{sectionTitle}</h2>
        </div>

        {/* Specialities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item, index) => {
            const { icon, title, description, color } = item

            const TitleElement = <h3 className="font-bold text-xl text-gray-900">{title}</h3>

            return (
              <motion.div
                key={index}
                className="w-full h-[360px] flex flex-col justify-center bg-white shadow-[0px_0px_15px_RGBA(0,0,0,0.09)] p-6 sm:p-9 space-y-3 relative overflow-hidden rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
              >
                {/* Icon */}
                {icon && (
                  <div
                    className={`w-24 h-24 rounded-full absolute -left-5 -top-7`}
                    style={{ backgroundColor: color }}
                  >
                    <div className="absolute fill-white bottom-4 right-6 w-9">
                      <i className={`${icon} text-white text-3xl`}></i>
                    </div>
                  </div>
                )}

                {/* Title */}
                <div className="font-bold text-xl">{TitleElement}</div>

                {/* Description */}
                <p className="text-sm text-zinc-500 leading-6">{description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
