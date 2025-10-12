import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const GalleryBlock: Block = {
  slug: 'galleryBlock',
  interfaceName: 'GalleryBlock',
  labels: {
    singular: 'Gallery Block',
    plural: 'Gallery Blocks',
  },
  fields: [
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
      defaultValue: 'Dokumentasi',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      defaultValue: 'Galeri Kegiatan',
      required: true,
    },
    {
      name: 'items',
      type: 'array',
      label: 'Gallery Items',
      labels: { singular: 'Gallery Item', plural: 'Gallery Items' },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'description',
          type: 'richText',
          required: false,
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              HeadingFeature({ enabledHeadingSizes: ['h3', 'h4', 'h5'] }),
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
        },
      ],
    },
  ],
  admin: {
    group: 'Halaman Beranda',
  },
}
