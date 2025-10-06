import type { Field } from 'payload'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
      ],
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    // High Impact Media (supports multiple images)
    {
      name: 'highImpactMedia',
      type: 'array',
      admin: {
        condition: (_, { type } = {}) => type === 'highImpact',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    // Medium Impact Media (single image)
    {
      name: 'mediumImpactMedia',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, { type } = {}) => type === 'mediumImpact',
      },
      required: true,
    },
  ],
  label: false,
}
