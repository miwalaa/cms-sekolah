// src/Footer/hooks/revalidateFooter.ts
import type { GlobalAfterChangeHook } from 'payload'

/**
 * Revalidate all pages when footer changes
 */
export const revalidateFooterAfterChange: GlobalAfterChangeHook = async ({ doc, req }) => {
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
        collection: 'footer',
        slug: 'footer',
        operation: 'update',
      }),
    })

    req.payload.logger.info('✅ Footer revalidated')
  } catch (error) {
    req.payload.logger.error('❌ Error revalidating footer', error)
  }

  return doc
}
