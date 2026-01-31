// src/collections/Media.ts
import type { CollectionConfig } from 'payload'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { revalidateAfterChange, revalidateAfterDelete } from '../utilities/revalidationHooks'

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
    // Trigger revalidation when media is deleted (adapter handles file deletion)
    afterDelete: [revalidateAfterDelete],
  },
}
