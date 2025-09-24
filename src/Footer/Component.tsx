import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Logo from '@/components/Logo/Logo'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Media } from '@/components/Media'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  // Fetch recent programs/posts (limit 3)
  const payload = await getPayload({ config: configPromise })
  const postsRes = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 3,
    select: {
      title: true,
      slug: true,
      publishedAt: true,
      meta: true,
      heroImage: true,
    },
    sort: '-publishedAt',
  })
  const recentPosts = postsRes?.docs ?? []

  const CONTACT = {
    address: 'Jl. Contoh No. 123, Kota, Provinsi',
    phone: '0812-3456-7890',
    email: 'info@example.com',
  }

  return (
    <footer className="mt-auto bg-brand/95 text-white">
      {/* Top Section */}
      <div className="container px-4 py-16 md:py-[65px] pt-24">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo & About */}
          <div>
            <Link className="inline-flex items-center" href="/">
              <Logo />
            </Link>
            <p className="mt-4 max-w-sm text-sm text-white/80">
              {/* Optional short description. Update this text or source it from a global when available. */}
              Pendidikan kesetaraan untuk masa depan yang lebih baik. Bersama mewujudkan akses
              pendidikan bagi semua.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4 text-lg font-semibold">Kontak</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                {/* Map Pin Icon */}
                <svg
                  className="mt-0.5 h-5 w-5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10c0 7.5-7.5 11.25-7.5 11.25S4.5 17.5 4.5 10a7.5 7.5 0 1115 0z"
                  ></path>
                </svg>
                <span className="text-white/85">{CONTACT.address}</span>
              </li>
              <li className="flex items-center gap-3">
                {/* Phone Icon */}
                <svg
                  className="h-5 w-5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h1.5a2.25 2.25 0 002.25-2.25v-1.086a1.5 1.5 0 00-1.02-1.423l-3.03-1.01a1.5 1.5 0 00-1.71.53l-.96 1.28a12.035 12.035 0 01-6.24-6.24l1.28-.96a1.5 1.5 0 00.53-1.71l-1.01-3.03A1.5 1.5 0 006.086 3H5a2.25 2.25 0 00-2.25 2.25v1.5z"
                  />
                </svg>
                <span className="text-white/85">{CONTACT.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                {/* Mail Icon */}
                <svg
                  className="h-5 w-5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 8.25v7.5A2.25 2.25 0 0119.5 18H4.5A2.25 2.25 0 012.25 15.75v-7.5M21.75 8.25A2.25 2.25 0 0019.5 6H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-6.75 3.857a2.25 2.25 0 01-2.16 0L3.32 10.41a2.25 2.25 0 01-1.07-1.916V8.25"
                  />
                </svg>
                <span className="text-white/85">{CONTACT.email}</span>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="mb-4 text-lg font-semibold">Program Terbaru</h4>
            <ul className="space-y-4">
              {recentPosts.map((post, i) => {
                // Choose thumbnail from meta.image or heroImage
                const metaImage = (post as any)?.meta?.image
                const heroImage = (post as any)?.heroImage
                const image =
                  metaImage && typeof metaImage !== 'string'
                    ? metaImage
                    : heroImage && typeof heroImage !== 'string'
                      ? heroImage
                      : undefined
                const href = `/posts/${(post as any)?.slug}`
                const date = post?.publishedAt
                  ? new Date(post.publishedAt as string).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'short',
                      day: '2-digit',
                    })
                  : ''

                return (
                  <li key={i} className="flex items-center gap-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-md bg-white/10">
                      {image ? (
                        <Media resource={image} fill className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-white/60">
                          No image
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <Link
                        href={href}
                        className="line-clamp-2 text-sm font-medium hover:underline"
                      >
                        {(post as any)?.title}
                      </Link>
                      <div className="mt-1 flex items-center gap-1 text-xs text-white/70">
                        {/* Calendar Icon */}
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8 7V3m8 4V3m-9 8h10M5.5 21h13A2.5 2.5 0 0021 18.5v-9A2.5 2.5 0 0018.5 7h-13A2.5 2.5 0 003 9.5v9A2.5 2.5 0 005.5 21z"
                          />
                        </svg>
                        <span>{date}</span>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-lg font-semibold">Tautan Cepat</h4>
            <nav className="grid grid-cols-1 gap-2 text-sm">
              {navItems.map(({ link }, i) => (
                <CMSLink key={i} className="hover:underline" {...link} />
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black/30">
        <div className="container px-4 py-4 text-center text-sm text-white/80">
          © {new Date().getFullYear()} PKBM Pemuda Pelopor. All rights reserved
        </div>
      </div>
    </footer>
  )
}
