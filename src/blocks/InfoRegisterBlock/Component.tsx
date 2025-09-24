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
            {/* Wrapper with Tailwind background + padding */}
            <div className="flex flex-col items-start justify-between gap-4 rounded-xl bg-blue-100 p-6 md:flex-row md:items-center">
              {/* Left content */}
              <div className="left-content-wrap">
                <h2 className="text-4xl font-semibold text-blue-900 flex items-center gap-3">
                  <i className="fas fa-info-circle" aria-hidden="true"></i>
                  {title}
                </h2>
              </div>

              {/* Right content */}
              <div className="right-content-wrap">
                <div className="btn-wrapper text-2xl">
                  <Link
                    href={buttonHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 font-medium text-white transition hover:bg-green-600"
                    aria-label={`${buttonLabel} link`}
                  >
                    <i className="fab fa-whatsapp"></i>
                    <span>{buttonLabel}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default InfoRegisterBlock
