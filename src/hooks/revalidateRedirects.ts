import type { CollectionAfterChangeHook } from 'payload'

export const revalidateRedirects: CollectionAfterChangeHook = async ({ doc, req: { payload } }) => {
  const revalidateUrl = process.env.NEXT_PUBLIC_SITE_URL
    ? `${process.env.NEXT_PUBLIC_SITE_URL}/api/revalidate/redirects`
    : null

  if (!revalidateUrl) {
    payload.logger.warn('⚠️ NEXT_PUBLIC_SITE_URL not set - skipping redirects revalidation')
    return doc
  }

  if (!process.env.REVALIDATE_SECRET) {
    payload.logger.warn('⚠️ REVALIDATE_SECRET not set - skipping redirects revalidation')
    return doc
  }

  try {
    const response = await fetch(revalidateUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-revalidate-secret': process.env.REVALIDATE_SECRET,
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      payload.logger.error({ error: errorText }, `❌ Redirects revalidation failed`)
    } else {
      const result = await response.json()
      payload.logger.info(result, `✅ Redirects revalidation successful`)
    }
  } catch (error) {
    payload.logger.error({ err: error }, `❌ Error calling redirects revalidation webhook`)
  }

  return doc
}
