// src/Header/hooks/revalidateHeader.ts (WITH DEBUG LOGGING)
import type { GlobalAfterChangeHook } from 'payload'

export const revalidateHeaderAfterChange: GlobalAfterChangeHook = async ({ doc, req }) => {
  const revalidateUrl = process.env.NEXT_PUBLIC_SITE_URL
    ? `${process.env.NEXT_PUBLIC_SITE_URL}/api/revalidate`
    : null

  if (!revalidateUrl || !process.env.REVALIDATE_SECRET) {
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
        collection: 'header',
        slug: 'header',
        operation: 'update',
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Error revalidating header:', errorText)
      req.payload.logger.error('❌ Error revalidating header', errorText)
    } else {
      const result = await response.json()
      console.log('✅ Header revalidated successfully!')
      console.log('📋 Revalidated paths:', result.paths)
      req.payload.logger.info('✅ Header revalidated', { paths: result.paths })
    }
  } catch (error) {
    console.error('❌ Error revalidating header:', error)
    req.payload.logger.error('❌ Error revalidating header', error)
  }

  return doc
}
