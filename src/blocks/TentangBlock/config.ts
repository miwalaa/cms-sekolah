import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
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
          name: 'imageWidth',
          type: 'select',
          dbName: 'iw',
          required: false,
          defaultValue: 'full',
          options: [
            { label: 'Full', value: 'full' },
            { label: 'Three Quarters', value: 'threeQuarters' },
            { label: 'Two Thirds', value: 'twoThirds' },
            { label: 'Half', value: 'half' },
          ],
        },
        {
          name: 'content',
          type: 'richText',
          required: false,
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4', 'h5'] }),
              FixedToolbarFeature(),
              InlineToolbarFeature(),
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
              name: 'type',
              type: 'select',
              dbName: 'typ',
              required: true,
              defaultValue: 'menu',
              options: [{ label: 'Menu', value: 'menu' }],
            },
            {
              name: 'title',
              type: 'text',
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'menu',
              },
            },
            {
              name: 'items',
              type: 'array',
              dbName: 'itm',
              labels: { singular: 'Item', plural: 'Items' },
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'menu',
              },
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
                  name: 'icon',
                  type: 'text',
                  required: false,
                  admin: {
                    description: 'Optional Font Awesome icon name (e.g., fa-solid fa-user)',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
