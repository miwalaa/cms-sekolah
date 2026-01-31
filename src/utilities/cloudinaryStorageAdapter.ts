import type { Adapter } from '@payloadcms/plugin-cloud-storage/types'
import { v2 as cloudinary } from 'cloudinary'

// Only throw error if not running in script mode
const isScriptMode = process.argv.some((arg) => arg.includes('scripts/'))

// Validate environment variables (but allow scripts to load .env first)
function validateEnvVars() {
  if (
    !isScriptMode &&
    (!process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET)
  ) {
    throw new Error(
      'Missing required environment variables: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET',
    )
  }
}

// Configure Cloudinary (will be called when adapter is used)
function configureCloudinary() {
  if (
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  ) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    })
  }
}

export const cloudinaryAdapter: Adapter = ({ prefix }) => {
  return {
    name: 'cloudinary',
    handleUpload: async ({ data, file }) => {
      validateEnvVars()
      configureCloudinary()

      const folder = prefix || 'uploads'

      // Remove file extension from filename to use as public_id
      const publicId = file.filename.replace(/\.[^/.]+$/, '')
      const fullPublicId = `${folder}/${publicId}`

      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(
        `data:${file.mimeType};base64,${file.buffer.toString('base64')}`,
        {
          public_id: fullPublicId,
          resource_type: 'auto',
          overwrite: true,
        },
      )

      // Update the data object with the Cloudinary URL
      data.url = result.secure_url
    },
    handleDelete: async ({ doc }) => {
      configureCloudinary()

      const folder = prefix || 'uploads'

      // Remove file extension from filename to get public_id
      const publicId = doc.filename.replace(/\.[^/.]+$/, '')
      const fullPublicId = `${folder}/${publicId}`

      await cloudinary.uploader.destroy(fullPublicId, {
        resource_type: 'image',
      })
    },
    generateURL: ({ filename }) => {
      const folder = prefix || 'uploads'
      const publicId = filename.replace(/\.[^/.]+$/, '')
      const cloudName = process.env.CLOUDINARY_CLOUD_NAME

      // Generate Cloudinary URL
      return `https://res.cloudinary.com/${cloudName}/image/upload/${folder}/${publicId}`
    },
    staticHandler: async (req, { params }) => {
      configureCloudinary()

      const { filename } = params
      const folder = prefix || 'uploads'
      const publicId = filename.replace(/\.[^/.]+$/, '')
      const fullPublicId = `${folder}/${publicId}`

      try {
        // Get the resource from Cloudinary
        const result = await cloudinary.api.resource(fullPublicId, {
          resource_type: 'image',
        })

        // Redirect to the Cloudinary URL
        return Response.redirect(result.secure_url, 302)
      } catch (error) {
        return new Response(null, { status: 404 })
      }
    },
  }
}
