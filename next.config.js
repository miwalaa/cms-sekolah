import { withPayload } from '@payloadcms/next/withPayload'

import redirects from './redirects.js'

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined || process.env.__NEXT_PRIVATE_ORIGIN || 'http://localhost:3000'

// Get Cloudinary cloud name for image optimization
const cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Enable modern image formats for better compression
    formats: ['image/avif', 'image/webp'],
    // Reduce quality for better performance (default is 75)
    minimumCacheTTL: 60,
    // Add remote patterns for image optimization
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
        const url = new URL(item)

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', ''),
        }
      }),
      // Add Cloudinary for image optimization
      ...(cloudinaryCloudName
        ? [
            {
              hostname: 'res.cloudinary.com',
              protocol: 'https',
              pathname: `/${cloudinaryCloudName}/**`,
            },
          ]
        : []),
    ],
  },
  // Enable compression
  compress: true,
  // Optimize production builds

  // Performance optimizations
  poweredByHeader: false,
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  reactStrictMode: true,
  redirects,
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
