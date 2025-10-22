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
    <div className="divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white overflow-hidden">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx
        return (
          <div key={idx} className="transition-all duration-300 ease-in-out">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="flex w-full items-center justify-between gap-4 p-4 text-left transition-colors duration-200"
            >
              <span className="font-medium text-gray-900">{item.question}</span>
              <span
                className={`inline-flex h-6 w-6 items-center justify-center text-xs transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`}
                aria-hidden
              >
                <i className="fa-solid fa-angle-down"></i>
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-4 pb-4 text-gray-700">
                  <RichText enableGutter={false} data={item.answer} />
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Accordion
