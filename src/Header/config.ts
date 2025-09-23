import type { GlobalConfig } from 'payload'

import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        {
          name: 'link',
          type: 'group',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'type',
                  type: 'radio',
                  admin: {
                    layout: 'horizontal',
                    width: '50%',
                  },
                  defaultValue: 'reference',
                  options: [
                    {
                      label: 'Internal link',
                      value: 'reference',
                    },
                    {
                      label: 'Custom URL',
                      value: 'custom',
                    },
                  ],
                },
                {
                  name: 'newTab',
                  type: 'checkbox',
                  admin: {
                    style: {
                      alignSelf: 'flex-end',
                    },
                    width: '50%',
                  },
                  label: 'Open in new tab',
                },
              ],
            },
            {
              name: 'reference',
              type: 'relationship',
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'reference',
              },
              label: 'Document to link to',
              relationTo: ['pages', 'posts'],
              required: false,
            },
            {
              name: 'url',
              type: 'text',
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'custom',
              },
              label: 'Custom URL',
              required: true,
            },
            {
              name: 'label',
              type: 'text',
              admin: {
                width: '50%',
              },
              label: 'Label',
              required: true,
            },
          ],
        },
        {
          name: 'children',
          type: 'array',
          fields: [
            {
              name: 'link',
              type: 'group',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'type',
                      type: 'radio',
                      admin: {
                        layout: 'horizontal',
                        width: '50%',
                      },
                      defaultValue: 'reference',
                      options: [
                        {
                          label: 'Internal link',
                          value: 'reference',
                        },
                        {
                          label: 'Custom URL',
                          value: 'custom',
                        },
                      ],
                    },
                    {
                      name: 'newTab',
                      type: 'checkbox',
                      admin: {
                        style: {
                          alignSelf: 'flex-end',
                        },
                        width: '50%',
                      },
                      label: 'Open in new tab',
                    },
                  ],
                },
                {
                  name: 'reference',
                  type: 'relationship',
                  admin: {
                    condition: (_, siblingData) => siblingData?.type === 'reference',
                  },
                  label: 'Document to link to',
                  relationTo: ['pages', 'posts'],
                  required: true,
                },
                {
                  name: 'url',
                  type: 'text',
                  admin: {
                    condition: (_, siblingData) => siblingData?.type === 'custom',
                  },
                  label: 'Custom URL',
                  required: true,
                },
                {
                  name: 'label',
                  type: 'text',
                  admin: {
                    width: '50%',
                  },
                  label: 'Label',
                  required: true,
                },
              ],
            },
          ],
          admin: {
            description: 'Second level navigation items (dropdown items)',
          },
          label: 'Dropdown Items',
        },
      ],
      maxRows: 7,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
