import { getClientSideURL } from '@/utilities/getURL'

/**
 * Processes media resource URL to ensure proper formatting
 * @param url The original URL from the resource
 * @param cacheTag Optional cache tag to append to the URL
 * @returns Properly formatted URL with cache tag if provided
 */
export const getMediaUrl = (url: string | null | undefined, cacheTag?: string | null): string => {
  if (!url) return ''

  const baseUrl = getClientSideURL()

  // Check if URL already has http/https protocol
  if (url.startsWith('http://') || url.startsWith('https://')) {
    // If running locally, strip localhost URL to allow Next.js image optimization
    if (baseUrl.includes('localhost') && url.startsWith(baseUrl)) {
      const relativeUrl = url.replace(baseUrl, '')
      return relativeUrl
    }
    return cacheTag ? `${url}?${cacheTag}` : url
  }

  if (baseUrl.includes('localhost')) {
    return url || ''
  }

  return cacheTag ? `${baseUrl}${url}?${cacheTag}` : `${baseUrl}${url}`
}
