'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { ContactForm } from './components/ContactForm'
import { ContactInfo } from './components/ContactInfo'
import type { SocialMedia } from './components/ContactInfo'

type ContactBlockProps = {
  title?: string
  description: any
  formTitle?: string
  showAddress?: boolean
  address?: string
  showPhone?: boolean
  phoneNumber?: string
  showEmail?: boolean
  emailAddress?: string
  formPlaceholders?: {
    name?: string
    email?: string
    message?: string
    submit?: string
  }
  socialMedia?: SocialMedia[]
}

const ContactBlock: React.FC<ContactBlockProps> = ({
  title = 'Get In Touch',
  description,
  formTitle = 'Send a Message',
  showAddress = true,
  address = '',
  showPhone = true,
  phoneNumber = '',
  showEmail = true,
  emailAddress = '',
  formPlaceholders = {
    name: 'Name',
    email: 'E-mail address',
    message: 'Message',
    submit: 'Submit',
  },
  socialMedia = [],
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean
    message: string
  } | null>(null)

  const handleFormSubmit = async (data: { name: string; email: string; message: string }) => {
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // EmailJS service configuration
      const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || ''
      const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || ''
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''

      if (!serviceID || !templateID || !publicKey) {
        throw new Error('Email configuration is missing')
      }

      // Prepare the template parameters
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        message: data.message,
        to_email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || '',
        timestamp: new Date().toLocaleString('id-ID', {
          dateStyle: 'full',
          timeStyle: 'short',
          timeZone: 'Asia/Jakarta',
        }),
      }

      // Send email using EmailJS
      const response = await emailjs.send(serviceID, templateID, templateParams, publicKey)

      console.log('Email sent successfully:', response)
      setSubmitStatus({
        success: true,
        message: 'Your message has been sent successfully!',
      })
      setIsSubmitting(false)
    } catch (error) {
      console.error('Error sending email:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to send message. Please try again later.'
      setSubmitStatus({
        success: false,
        message: errorMessage,
      })
      setIsSubmitting(false)
    }
  }

  return (
    <motion.section
      className="py-16 bg-gray-100"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          >
            <ContactInfo
              title={title}
              description={description}
              showAddress={showAddress}
              address={address}
              showPhone={showPhone}
              phoneNumber={phoneNumber}
              showEmail={showEmail}
              emailAddress={emailAddress}
              socialMedia={socialMedia}
            />
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
          >
            <ContactForm
              formTitle={formTitle}
              formPlaceholders={formPlaceholders}
              onSubmit={handleFormSubmit}
              isSubmitting={isSubmitting}
              submitStatus={submitStatus}
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
export default ContactBlock
