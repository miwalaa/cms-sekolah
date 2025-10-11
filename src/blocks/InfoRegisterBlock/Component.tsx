'use client'

import React from 'react'
import Link from 'next/link'

type Props = {
  className?: string
  title?: string
  buttonHref?: string
  buttonLabel?: string
}

const InfoRegisterBlock: React.FC<Props> = ({
  className,
  title = 'Informasi & Pendaftaran',
  buttonHref = 'https://pkbm.id/wa',
  buttonLabel = 'Whatsapp',
}) => {
  return (
    <section className={className}>
      <div className="container mx-auto px-4 relative top-10">
        <div className="row">
          <div className="col-lg-12">
            {/* Wrapper with responsive layout */}
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 rounded-2xl bg-saffron p-6 md:p-8 overflow-hidden min-h-[180px] md:min-h-[220px] lg:min-h-[240px]">
              {/* Left content - Illustration (hidden on mobile, BIGGER SIZE) */}
              <div className="hidden md:block absolute -left-4 bottom-0 w-56 md:w-64 lg:w-72 xl:w-80 flex-shrink-0">
                <img
                  src="/vector.svg"
                  alt="Students illustration"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Center content - Title */}
              <div className="flex-1 flex items-center md:pl-48 lg:pl-60 xl:pl-72 md:text-left w-full">
                <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight z-10">
                  {title}
                </h2>
              </div>

              {/* Right content - WhatsApp Button */}
              <div className="flex-shrink-0 w-full md:w-auto">
                <Link
                  href={buttonHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center md:justify-between gap-2 md:gap-3 rounded-full bg-white px-4 md:px-5 py-2.5 md:py-3 font-semibold text-saffron text-base md:text-lg lg:text-2xl md:w-auto"
                  aria-label={`${buttonLabel} link`}
                >
                  <span className="whitespace-nowrap">{buttonLabel}</span>
                  <div className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-saffron flex-shrink-0">
                    <i className="fab fa-whatsapp text-white text-xl md:text-2xl"></i>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default InfoRegisterBlock
