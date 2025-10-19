// src/Footer/hooks/revalidateFooter.ts (WITH DEBUG LOGGING)
import type { GlobalAfterChangeHook } from 'payload'

export const revalidateFooterAfterChange: GlobalAfterChangeHook = async ({ doc, req }) => {
  const revalidateUrl = process.env.NEXT_PUBLIC_SITE_URL
    ? `${process.env.NEXT_PUBLIC_SITE_URL}/api/revalidate`
    : null

  if (!revalidateUrl || !process.env.REVALIDATE_SECRET) {
    console.warn('⚠️ Missing environment variables for footer revalidation')
    return doc
  }

  try {
    const response = await fetch(revalidateUrl, {
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

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Footer revalidation failed:', errorText)
    } else {
      const result = await response.json()
      console.log('✅ Footer revalidated successfully!')
      console.log('📋 Revalidated paths:', result.paths)
      req.payload.logger.info('✅ Footer revalidated', { paths: result.paths })
    }
  } catch (error) {
    console.error('❌ Error revalidating footer:', error)
    req.payload.logger.error('❌ Error revalidating footer', error)
  }

  return doc
}
