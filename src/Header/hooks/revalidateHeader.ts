// src/Header/hooks/revalidateHeader.ts
import type { GlobalAfterChangeHook } from 'payload'

/**
 * Revalidate all pages when header changes
 */
export const revalidateHeaderAfterChange: GlobalAfterChangeHook = async ({ doc, req }) => {
  const revalidateUrl = process.env.NEXT_PUBLIC_SITE_URL
    ? `${process.env.NEXT_PUBLIC_SITE_URL}/api/revalidate`
    : null

  if (!revalidateUrl || !process.env.REVALIDATE_SECRET) {
    return doc
  }

  try {
    await fetch(revalidateUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-revalidate-secret': process.env.REVALIDATE_SECRET,
      },
      body: JSON.stringify({
        collection: 'header',
        slug: 'header',
        operation: 'update',
      }),
    })

    req.payload.logger.info('✅ Header revalidated')
  } catch (error) {
    req.payload.logger.error('❌ Error revalidating header', error)
  }

  return doc
}
