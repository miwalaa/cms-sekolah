'use client'

import React from 'react'
import { motion } from 'framer-motion'
import RichText from '@/components/RichText'

export type SocialMedia = {
  platform: string
  url: string
}

type ContactInfoProps = {
  title?: string
  description: any
  showAddress?: boolean
  address?: string
  showPhone?: boolean
  phoneNumber?: string
  showEmail?: boolean
  emailAddress?: string
  socialMedia?: SocialMedia[]
}

const platformIcons: Record<string, string> = {
  facebook: 'fab fa-facebook-f',
  twitter: 'fab fa-twitter',
  instagram: 'fab fa-instagram',
  linkedin: 'fab fa-linkedin-in',
  youtube: 'fab fa-youtube',
  tiktok: 'fab fa-tiktok',
  github: 'fab fa-github',
}

export const ContactInfo: React.FC<ContactInfoProps> = ({
  title = 'Get In Touch',
  description,
  showAddress = true,
  address = '',
  showPhone = true,
  phoneNumber = '',
  showEmail = true,
  emailAddress = '',
  socialMedia = [],
}) => {
  return (
    <div className="space-y-5">
      <h2 className="text-3xl font-bold text-gray-900">{title}</h2>

      {description && (
        <div className="prose text-gray-600">
          <RichText data={description} />
        </div>
      )}

      <div className="space-y-6">
        {showAddress && address && (
          <motion.div
            className="flex items-start space-x-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
          >
            <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-saffron text-white">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Address</h3>
              <p className="text-gray-600">{address}</p>
            </div>
          </motion.div>
        )}

        {showPhone && phoneNumber && (
          <motion.div
            className="flex items-start space-x-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: 0.2 }}
          >
            <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-saffron text-white">
              <i className="fas fa-phone-alt"></i>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Phone</h3>
              <a href={`tel:${phoneNumber}`} className="text-saffron hover:text-[#e19b33]">
                {phoneNumber}
              </a>
            </div>
          </motion.div>
        )}

        {showEmail && emailAddress && (
          <motion.div
            className="flex items-start space-x-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: 0.3 }}
          >
            <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-saffron text-white">
              <i className="fas fa-envelope"></i>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Email</h3>
              <a href={`mailto:${emailAddress}`} className="text-saffron hover:text-[#e19b33]">
                {emailAddress}
              </a>
            </div>
          </motion.div>
        )}

        <hr className="my-6" />

        {socialMedia.length > 0 && (
          <motion.div
            className="flex items-start space-x-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: 0.5 }}
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Follow Us:</h3>
              <div className="flex space-x-3">
                {socialMedia.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center h-10 w-10 rounded-full bg-saffron text-white hover:bg-[#e19b33] transition-colors"
                    aria-label={social.platform}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, ease: 'easeOut', delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <i className={platformIcons[social.platform] || 'fas fa-link'}></i>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
