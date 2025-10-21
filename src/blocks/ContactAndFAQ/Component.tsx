'use client'

import React, { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import emailjs from '@emailjs/browser'
import type { ContactAndFAQ as ContactAndFAQType } from '@/payload-types'
import { ContactForm, Accordion } from './components'
import { motion } from 'framer-motion'

export type Props = {
  formSubtitle?: string
  formTitle?: string
  actionUrl?: string
  fullNameLabel?: string
  phoneLabel?: string
  emailLabel?: string
  messageLabel?: string
  submitLabel?: string
  faqSubtitle?: string
  faqTitle?: string
  faqs?: Array<{
    question: string
    answer: NonNullable<ContactAndFAQType['faqs']>[number]['answer']
  }>
  className?: string
  disableInnerContainer?: boolean
  formID?: string
  redirect?: { url: string }
  confirmationType?: 'message' | 'redirect'
  /**
   * Custom API endpoint for form submission
   * If provided, will use this instead of Payload's /api/form-submissions
   */
  customApiEndpoint?: string
}

export default function ContactAndFAQComponent(props: Props) {
  const {
    className,
    formSubtitle = 'Tinggalkan Pesan',
    formTitle = 'Ada Pertanyaan?',
    fullNameLabel = 'Nama Lengkap',
    phoneLabel = 'Nomor Telepon / WhatsApp',
    emailLabel = 'Email',
    messageLabel = 'Pesan',
    submitLabel = 'Kirim Pesan',
    faqSubtitle = 'Tanya Jawab',
    faqTitle = 'Seputar Pendidikan Kesetaraan',
    faqs = [],
    // Form ID is no longer needed as we're using EmailJS directly
    redirect,
    confirmationType = 'message',
  } = props

  const router = useRouter()

  // Form state management
  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [error, setError] = useState<{ message: string; status?: number } | undefined>(undefined)

  // react-hook-form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<{
    fullName: string
    phone: string
    email: string
    message: string
  }>({
    mode: 'onBlur',
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      message: '',
    },
  })

  // Form submission handler
  // Form submission handler
  const onSubmit = useCallback(
    (data: { fullName: string; phone: string; email: string; message: string }) => {
      let loadingTimerID: ReturnType<typeof setTimeout>

      const submitForm = async () => {
        setError(undefined)
        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          // EmailJS service configuration
          const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'your_service_id'
          const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'your_template_id'
          const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'your_public_key'

          // Prepare the template parameters
          // Prepare the template parameters
          const templateParams = {
            from_name: data.fullName,
            from_email: data.email,
            phone: data.phone,
            message: data.message,
            to_email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'your-default@email.com',
            timestamp: new Date().toLocaleString('id-ID', {
              dateStyle: 'full',
              timeStyle: 'short',
              timeZone: 'Asia/Jakarta',
            }),
          }

          // Send email using EmailJS
          const response = await emailjs.send(serviceID, templateID, templateParams, publicKey)

          console.log('Email sent successfully:', response)
          clearTimeout(loadingTimerID)
          setIsLoading(false)
          setHasSubmitted(true)
          reset()
          clearErrors()

          if (confirmationType === 'redirect' && redirect?.url) {
            router.push(redirect.url)
          }
        } catch (err: unknown) {
          clearTimeout(loadingTimerID)
          setIsLoading(false)
          const error = err as Error
          console.error('Error sending email:', error)
          setError({
            message: error.message || 'Failed to send message. Please try again later.',
            status: 500,
          })
        }
      }

      // Call the submit function
      submitForm()
    },
    [
      router,
      reset,
      clearErrors,
      redirect,
      confirmationType,
      setError,
      setIsLoading,
      setHasSubmitted,
    ],
  )

  return (
    <motion.section
      className={`bg-gray-100 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left: Form */}
          <div className="rounded-2xl p-6">
            <p
              className="text-sm uppercase tracking-wide text-primary"
              style={{ color: '#f1ac44' }}
            >
              {formSubtitle}
            </p>
            <h2 className="mt-1 text-2xl font-bold text-gray-900">{formTitle}</h2>

            <div className="mt-6">
              <ContactForm
                fullNameLabel={fullNameLabel}
                phoneLabel={phoneLabel}
                emailLabel={emailLabel}
                messageLabel={messageLabel}
                submitLabel={submitLabel}
                register={register}
                errors={errors}
                isLoading={isLoading}
                hasSubmitted={hasSubmitted}
                error={error}
                onSubmit={handleSubmit(onSubmit)}
              />
            </div>
          </div>

          {/* Right: FAQ */}
          <div className="rounded-2xl p-6">
            <p className="text-sm uppercase tracking-wide text-primary text-saffron">
              {faqSubtitle}
            </p>
            <h2 className="mt-1 text-2xl font-bold text-gray-900">{faqTitle}</h2>

            <div className="mt-6">
              {faqs?.length ? (
                <Accordion items={faqs.map((f) => ({ question: f.question, answer: f.answer }))} />
              ) : (
                <p className="text-gray-500">Belum ada FAQ.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
