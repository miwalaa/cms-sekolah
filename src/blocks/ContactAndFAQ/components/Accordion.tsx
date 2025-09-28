import React, { useState } from 'react'
import RichText from '@/components/RichText'
import type { ContactAndFAQ as ContactAndFAQType } from '@/payload-types'

interface AccordionItem {
  question: string
  answer: NonNullable<ContactAndFAQType['faqs']>[number]['answer']
}

interface AccordionProps {
  items: AccordionItem[]
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
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

export default Accordion
