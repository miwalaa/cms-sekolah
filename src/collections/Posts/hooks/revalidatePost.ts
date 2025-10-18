// src/collections/Posts/hooks/revalidatePost.ts
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

/**
 * Revalidate post after change
 */
export const revalidatePostAfterChange: CollectionAfterChangeHook = async ({
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
        collection: 'posts',
        slug: doc.slug || doc.id,
        operation: operation === 'create' ? 'update' : operation,
      }),
    })

    req.payload.logger.info(`✅ Post revalidated: ${doc.slug || doc.id}`)
  } catch (error) {
    req.payload.logger.error(`❌ Error revalidating post: ${doc.slug || doc.id}`, error)
  }

  return doc
}

/**
 * Revalidate post after delete
 */
export const revalidatePostAfterDelete: CollectionAfterDeleteHook = async ({ doc, req }) => {
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
        collection: 'posts',
        slug: doc.slug || doc.id,
        operation: 'delete',
      }),
    })

    req.payload.logger.info(`✅ Post revalidated after deletion: ${doc.slug || doc.id}`)
  } catch (error) {
    req.payload.logger.error(
      `❌ Error revalidating post after deletion: ${doc.slug || doc.id}`,
      error,
    )
  }

  return doc
}
