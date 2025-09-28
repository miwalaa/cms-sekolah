'use client'

import React, { useState } from 'react'
import { FormBlock as PayloadFormBlock } from '@/blocks/Form/Component'
import RichText from '@/components/RichText'
import type { ContactAndFAQ as ContactAndFAQType, Form as PayloadFormType } from '@/payload-types'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'

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
  faqs?: Array<{ question: string; answer: NonNullable<ContactAndFAQType['faqs']>[number]['answer'] }>
  className?: string
  disableInnerContainer?: boolean
}

const Accordion: React.FC<{
  items: { question: string; answer: NonNullable<ContactAndFAQType['faqs']>[number]['answer'] }[]
}> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx
        return (
          <div key={idx} className="">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="flex w-full items-center justify-between gap-4 p-4 text-left"
            >
              <span className="font-medium text-gray-900">{item.question}</span>
              <span
                className={`inline-flex h-6 w-6 items-center justify-center rounded-md border text-xs transition-transform ${
                  isOpen ? 'rotate-45' : ''
                }`}
                aria-hidden
              >
                +
              </span>
            </button>
            {isOpen && (
              <div className="px-4 pb-4 text-gray-700">
                <RichText enableGutter={false} data={item.answer} />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default function ContactAndFAQComponent(props: Props) {
  const {
    className,
    formSubtitle = 'Tinggalkan Pesan',
    formTitle = 'Ada Pertanyaan?',
    formSource = 'payloadForm',
    form,
    actionUrl,
    fullNameLabel = 'Nama Lengkap',
    phoneLabel = 'Nomor Telepon / WhatsApp',
    emailLabel = 'Email',
    messageLabel = 'Pesan',
    submitLabel = 'Kirim Pesan',
    faqSubtitle = 'Tanya Jawab',
    faqTitle = 'Seputar Pendidikan Kesetaraan',
    faqs = [],
  } = props

  return (
    <section className={className}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left: Form */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500 uppercase tracking-wide text-primary">
              {formSubtitle}
            </p>
            <h2 className="mt-1 text-2xl font-bold text-gray-900">{formTitle}</h2>

            <div className="mt-6">
              {formSource === 'payloadForm' && form && typeof form !== 'number' ? (
                <PayloadFormBlock enableIntro={false} form={form as unknown as FormType} />
              ) : (
                <form action={actionUrl} method="post" className="space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      {fullNameLabel}
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        {phoneLabel}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        {emailLabel}
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      {messageLabel}
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 font-medium text-white shadow-sm hover:opacity-95"
                    >
                      {submitLabel}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right: FAQ */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
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
