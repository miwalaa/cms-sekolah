'use client'

import React, { useRef, useEffect } from 'react'
import Link from 'next/link'
import { Media } from '@/components/Media'
import type { Post } from '@/payload-types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import '@/app/(frontend)/globals.css'

export type CarouselClientProps = {
  posts: Array<
    Pick<Post, 'slug' | 'title' | 'publishedAt' | 'meta'> & {
      heroImage?: Post['heroImage']
    }
  >
}

function formatDay(dateStr?: string | Date): string {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.getDate().toString().padStart(2, '0')
}

function formatMonth(dateStr?: string | Date): string {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleString('en-US', { month: 'short' })
}

export const CarouselClient: React.FC<CarouselClientProps> = ({ posts }) => {
  const paginationRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // Just ensure paginationRef exists after mount
  }, [])

  return (
    <div className="relative">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        spaceBetween={30}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        pagination={{
          clickable: true,
          el: paginationRef.current ?? undefined,
        }}
        onSwiper={(swiper) => {
          if (paginationRef.current) {
            swiper.pagination.init()
            swiper.pagination.render()
            swiper.pagination.update()
          }
        }}
        className="pb-4"
      >
        {posts.map((post, idx) => {
          const metaImage = post.meta?.image
          const image = metaImage && typeof metaImage !== 'string' ? metaImage : undefined
          const href = `/posts/${post.slug}`
          const day = formatDay(post.publishedAt as string)
          const month = formatMonth(post.publishedAt as string)

          return (
            <SwiperSlide key={idx}>
              <article className="group overflow-hidden rounded-lg border mb-5 border-gray-200 bg-white shadow-sm transition">
                {/* Image wrapper */}
                <div className="relative aspect-[18/10] w-full overflow-hidden border-b border-gray-200">
                  {image ? (
                    <Media
                      resource={image}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
                      No image
                    </div>
                  )}

                  {/* Date badge */}
                  <div
                    className="absolute left-4 top-4 z-10 border border-gray-200 rounded-md px-3 py-2 text-center shadow-md"
                    style={{ backgroundColor: '#f1ac44' }}
                  >
                    <div className="text-lg font-extrabold text-white">{day}</div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-white/80">
                      {month}
                    </div>
                  </div>

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="mb-3 line-clamp-2 text-lg font-semibold text-gray-900 group-hover:text-blue-900 transition-colors">
                    <Link href={href}>{post.title}</Link>
                  </h3>
                  <Link href={href} className="inline-flex items-center gap-2 font-medium">
                    Read More
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </article>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}
