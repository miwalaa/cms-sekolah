// src/collections/Pages/hooks/revalidatePage.ts
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

/**
 * Revalidate page after change
 */
export const revalidatePageAfterChange: CollectionAfterChangeHook = async ({
  doc,
  req,
  operation,
}) => {
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
        collection: 'pages',
        slug: doc.slug || doc.id,
        operation: operation === 'create' ? 'update' : operation,
      }),
    })

    req.payload.logger.info(`✅ Page revalidated: ${doc.slug || doc.id}`)
  } catch (error) {
    req.payload.logger.error(`❌ Error revalidating page: ${doc.slug || doc.id}`, error)
  }

  return doc
}

/**
 * Revalidate page after delete
 */
export const revalidatePageAfterDelete: CollectionAfterDeleteHook = async ({ doc, req }) => {
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
        collection: 'pages',
        slug: doc.slug || doc.id,
        operation: 'delete',
      }),
    })

    req.payload.logger.info(`✅ Page revalidated after deletion: ${doc.slug || doc.id}`)
  } catch (error) {
    req.payload.logger.error(
      `❌ Error revalidating page after deletion: ${doc.slug || doc.id}`,
      error,
    )
  }

  return doc
}
