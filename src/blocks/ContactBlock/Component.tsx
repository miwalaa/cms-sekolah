'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
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
    const emailConfig = {
      emailJsServiceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
      emailJsTemplateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
      emailJsPublicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '',
      recipientEmail: process.env.NEXT_PUBLIC_RECIPIENT_EMAIL || '',
    }

    if (
      !emailConfig.emailJsServiceId ||
      !emailConfig.emailJsTemplateId ||
      !emailConfig.emailJsPublicKey ||
      !emailConfig.recipientEmail
    ) {
      setSubmitStatus({
        success: false,
        message: 'Email configuration is missing',
      })
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        message: data.message,
      }

      await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serviceId: emailConfig.emailJsServiceId,
          templateId: emailConfig.emailJsTemplateId,
          publicKey: emailConfig.emailJsPublicKey,
          templateParams,
        }),
      })

      setSubmitStatus({
        success: true,
        message: 'Your message has been sent successfully!',
      })
      setIsSubmitting(false)
    } catch (error) {
      console.error('Error sending email:', error)
      setSubmitStatus({
        success: false,
        message: 'Failed to send message. Please try again later.',
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
