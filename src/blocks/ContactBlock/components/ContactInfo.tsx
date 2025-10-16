import React from 'react'
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
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-saffron text-white">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Address</h3>
              <p className="text-gray-600">{address}</p>
            </div>
          </div>
        )}

        {showPhone && phoneNumber && (
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-saffron text-white">
              <i className="fas fa-phone-alt"></i>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Phone</h3>
              <a href={`tel:${phoneNumber}`} className="text-saffron hover:text-[#e19b33]">
                {phoneNumber}
              </a>
            </div>
          </div>
        )}

        {showEmail && emailAddress && (
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-saffron text-white">
              <i className="fas fa-envelope"></i>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Email</h3>
              <a href={`mailto:${emailAddress}`} className="text-saffron hover:text-[#e19b33]">
                {emailAddress}
              </a>
            </div>
          </div>
        )}

        <hr className="my-6" />

        {socialMedia.length > 0 && (
          <div className="flex items-start space-x-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Follow Us:</h3>
              <div className="flex space-x-3">
                {socialMedia.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center h-10 w-10 rounded-full bg-saffron text-white hover:bg-[#e19b33] transition-colors"
                    aria-label={social.platform}
                  >
                    <i className={platformIcons[social.platform] || 'fas fa-link'}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
