'use client'

import React, { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { FormBlock as PayloadFormBlock } from '@/blocks/Form/Component'
import type { ContactAndFAQ as ContactAndFAQType, Form as PayloadFormType } from '@/payload-types'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'
import { ContactForm, Accordion } from './components'

export type Props = {
  formSubtitle?: string
  formTitle?: string
  formSource?: 'payloadForm' | 'customAction'
  form?: number | PayloadFormType
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
    formSource = 'payloadForm',
    form,
    fullNameLabel = 'Nama Lengkap',
    phoneLabel = 'Nomor Telepon / WhatsApp',
    emailLabel = 'Email',
    messageLabel = 'Pesan',
    submitLabel = 'Kirim Pesan',
    faqSubtitle = 'Tanya Jawab',
    faqTitle = 'Seputar Pendidikan Kesetaraan',
    faqs = [],
    formID = '1', // Using actual Payload form ID
    redirect,
    confirmationType = 'message',
    customApiEndpoint,
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

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          // Determine which endpoint to use
          const endpoint = customApiEndpoint || `/api/form-submissions`
          const payload = customApiEndpoint
            ? dataToSend // For custom API, send data directly
            : {
                form: formID, // This should be the actual Payload form document ID
                submissionData: dataToSend,
              }

          const req = await fetch(endpoint, {
            body: JSON.stringify(payload),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const res = await req.json()
          console.log('Form submission response:', res) // debug

          clearTimeout(loadingTimerID)

          if (!req.ok) {
            setIsLoading(false)
            setError({
              message:
                res?.errors?.[0]?.message || res.message || res.error || 'Internal Server Error',
              status: req.status,
            })
            return
          }

          setIsLoading(false)
          setHasSubmitted(true)
          reset()
          clearErrors()

          if (confirmationType === 'redirect' && redirect?.url) {
            router.push(redirect.url)
          }
        } catch (err: unknown) {
          console.error('Form submission error:', err)
          setIsLoading(false)
          setError({ message: 'Something went wrong.' })
        }
      }

      void submitForm()
    },
    [router, reset, clearErrors, formID, redirect, confirmationType, customApiEndpoint],
  )

  return (
    <section className={className + ' bg-gray-50 pb-10'}>
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
              {formSource === 'payloadForm' && form && typeof form !== 'number' ? (
                <PayloadFormBlock enableIntro={false} form={form as unknown as FormType} />
              ) : (
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
              )}
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
    </section>
  )
}
