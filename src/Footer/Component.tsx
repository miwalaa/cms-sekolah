import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Post } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { FooterClient } from './FooterClient'

export async function Footer() {
  const footerData = await getCachedGlobal('footer', 1)()

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
  type RecentPost = Pick<Post, 'title' | 'slug' | 'publishedAt' | 'meta' | 'heroImage'>
  const recentPosts = (postsRes?.docs as RecentPost[]) ?? []

  const contactInfo = {
    address: (footerData as any)?.contactInfo?.address,
    phone: (footerData as any)?.contactInfo?.phone,
    email: (footerData as any)?.contactInfo?.email,
  }

  return <FooterClient navItems={navItems} recentPosts={recentPosts} contactInfo={contactInfo} />
}
