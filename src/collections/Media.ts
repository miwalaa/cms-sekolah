import type { CollectionConfig } from 'payload'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { createClient } from '@supabase/supabase-js'

// Only create Supabase client if env vars are available
const supabase = process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
  ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
  : null

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  upload: {
    mimeTypes: ['image/*'], // tidak perlu staticDir/staticURL
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
  ],
  hooks: {
    afterDelete: [
      async ({ doc }) => {
        if (!doc?.filename) return
        if (!supabase) {
          console.warn('Supabase client not initialized, skipping file deletion')
          return
        }

        const { error } = await supabase.storage
          .from('payload-uploads') // ganti dengan bucket kamu
          .remove([doc.filename])

        if (error) {
          console.error('Failed to delete from Supabase:', error)
        } else {
          console.log(`Deleted ${doc.filename} from Supabase`)
        }
      },
    ],
  },
}
