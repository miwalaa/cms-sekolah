import type { Adapter } from '@payloadcms/plugin-cloud-storage/types'
import { createClient } from '@supabase/supabase-js'

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error(
    'Missing required environment variables: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY',
  )
}

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

export const supabaseAdapter: Adapter = ({ prefix }) => {
  return {
    name: 'supabase',
    handleUpload: async ({ data, file, req }) => {
      const bucket = process.env.SUPABASE_BUCKET || 'uploads'
      const filePath = prefix ? `${prefix}/${file.filename}` : file.filename

      const { error } = await supabase.storage.from(bucket).upload(filePath, file.buffer, {
        upsert: true,
        contentType: file.mimeType,
      })

      if (error) throw error

      // Update the data object with the URL instead of returning it
      data.url = `${process.env.SUPABASE_URL}/storage/v1/object/public/${bucket}/${filePath}`
    },
    handleDelete: async ({ doc }) => {
      const bucket = process.env.SUPABASE_BUCKET || 'uploads'
      const filePath = prefix ? `${prefix}/${doc.filename}` : doc.filename

      const { error } = await supabase.storage.from(bucket).remove([filePath])
      if (error) throw error
    },
    generateURL: ({ filename }) => {
      const bucket = process.env.SUPABASE_BUCKET || 'uploads'
      const filePath = prefix ? `${prefix}/${filename}` : filename
      return `${process.env.SUPABASE_URL}/storage/v1/object/public/${bucket}/${filePath}`
    },
    staticHandler: async (req, { params }) => {
      const { filename } = params
      const bucket = process.env.SUPABASE_BUCKET || 'uploads'
      const filePath = prefix ? `${prefix}/${filename}` : filename

      const { data, error } = await supabase.storage.from(bucket).download(filePath)

      if (error) {
        return new Response(null, { status: 404 })
      }

      return new Response(data, {
        headers: {
          'Content-Type': data.type,
          'Content-Length': data.size.toString(),
        },
      })
    },
  }
}
