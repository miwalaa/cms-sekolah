// src/collections/Media.ts
import type { CollectionConfig } from 'payload'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { createClient } from '@supabase/supabase-js'
import { revalidateAfterChange, revalidateAfterDelete } from '../utilities/revalidationHooks'

// Only create Supabase client if env vars are available
const supabase =
  process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
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
    mimeTypes: ['image/*'],
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
    // Trigger revalidation when media is created or updated
    afterChange: [revalidateAfterChange],

    // Handle both Supabase deletion and revalidation when media is deleted
    afterDelete: [
      // First, delete from Supabase storage
      async ({ doc }) => {
        if (!doc?.filename) return

        if (!supabase) {
          console.warn('Supabase client not initialized, skipping file deletion')
          return
        }

        const { error } = await supabase.storage.from('payload-uploads').remove([doc.filename])

        if (error) {
          console.error('Failed to delete from Supabase:', error)
        } else {
          console.log(`Deleted ${doc.filename} from Supabase`)
        }
      },

      // Then, trigger Next.js revalidation
      revalidateAfterDelete,
    ],
  },
}
