import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  OrderedListFeature,
  UnorderedListFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

export const TentangBlock: Block = {
  slug: 'tentangBlock',
  interfaceName: 'TentangBlock',
  labels: {
    singular: 'Tentang Block',
    plural: 'Tentang Blocks',
  },
  fields: [
    // Left Column
    {
      name: 'left',
      type: 'group',
      label: 'Left Column',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: false,
        },
        {
          name: 'content',
          type: 'richText',
          required: false,
          editor: lexicalEditor({
            features: ({ defaultFeatures }) => [
              ...defaultFeatures,
              HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4', 'h5'] }),
              FixedToolbarFeature(),
              InlineToolbarFeature(),
              OrderedListFeature(),
              UnorderedListFeature(),
            ],
          }),
        },
      ],
    },

    // Right Column
    {
      name: 'right',
      type: 'group',
      label: 'Right Column',
      fields: [
        {
          name: 'widgets',
          type: 'array',
          dbName: 'wgt',
          labels: { singular: 'Widget', plural: 'Widgets' },
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'items',
              type: 'array',
              dbName: 'itm',
              labels: { singular: 'Item', plural: 'Items' },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                },
                // Use the reusable link field (internal or external) without embedded label/appearance
                link({
                  disableLabel: true,
                  appearances: false,
                  overrides: {
                    fields: (defaultFields) =>
                      defaultFields.map((field) => {
                        if ('name' in field && field.name === 'type') {
                          return { ...field, dbName: 'typ' }
                        }
                        if ('name' in field && field.name === 'reference') {
                          return { ...field, dbName: 'ref' }
                        }
                        return field
                      }),
                  },
                }),
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
