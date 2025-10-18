// src/utilities/revalidationHooks.ts
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload'

/**
 * Sends a revalidation request to the Next.js API
 */
async function sendRevalidationRequest({
  collection,
  slug,
  operation,
  logger,
}: {
  collection: string
  slug: string
  operation: 'update' | 'delete'
  logger: any
}) {
  const revalidateUrl = process.env.NEXT_PUBLIC_SITE_URL
    ? `${process.env.NEXT_PUBLIC_SITE_URL}/api/revalidate`
    : null

  if (!revalidateUrl) {
    logger.warn('⚠️ NEXT_PUBLIC_SITE_URL not set - skipping revalidation')
    return
  }

  if (!process.env.REVALIDATE_SECRET) {
    logger.warn('⚠️ REVALIDATE_SECRET not set - skipping revalidation')
    return
  }

  try {
    const response = await fetch(revalidateUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-revalidate-secret': process.env.REVALIDATE_SECRET,
      },
      body: JSON.stringify({
        collection,
        slug,
        operation,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      logger.error(`❌ Revalidation failed for ${collection}/${slug}: ${errorText}`)
    } else {
      const result = await response.json()
      logger.info(`✅ Revalidation successful for ${collection}/${slug}`, {
        paths: result.paths,
      })
    }
  } catch (error) {
    logger.error(`❌ Error calling revalidation webhook for ${collection}/${slug}:`, error)
  }
}

/**
 * Hook to trigger Next.js revalidation after a document is created or updated
 */
export const revalidateAfterChange: CollectionAfterChangeHook = async ({
  doc,
  req,
  operation,
  collection,
}) => {
  await sendRevalidationRequest({
    collection: collection.slug,
    slug: doc.slug || doc.id,
    operation: operation === 'create' ? 'update' : operation,
    logger: req.payload.logger,
  })

  return doc
}

/**
 * Hook to trigger Next.js revalidation after a document is deleted
 */
export const revalidateAfterDelete: CollectionAfterDeleteHook = async ({
  doc,
  req,
  collection,
}) => {
  await sendRevalidationRequest({
    collection: collection.slug,
    slug: doc.slug || doc.id,
    operation: 'delete',
    logger: req.payload.logger,
  })

  return doc
}

/**
 * Hook to trigger Next.js revalidation after a global is updated
 * Use this for Header, Footer, and other globals
 */
export const revalidateGlobalAfterChange: GlobalAfterChangeHook = async ({ doc, req, global }) => {
  await sendRevalidationRequest({
    collection: global.slug,
    slug: global.slug,
    operation: 'update',
    logger: req.payload.logger,
  })

  return doc
}
