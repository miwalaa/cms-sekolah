import type { Block } from 'payload'

export const Specialities: Block = {
  slug: 'specialities',
  interfaceName: 'SpecialitiesBlock',
  fields: [
    {
      name: 'sectionTitle',
      type: 'text',
      required: false,
      defaultValue: 'Kenapa PKBM Pemuda Pelopor?',
      admin: {
        description: 'Title for the specialities section',
      },
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'icon',
          type: 'text',
          required: true,
          admin: {
            description: 'CSS class for the icon (e.g., "fas fa-star", "material-icons school")',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'link',
          type: 'text',
          required: false,
          admin: {
            description: 'Optional URL link for the title',
          },
        },
        {
          name: 'backgroundColor',
          type: 'text',
          required: false,
          admin: {
            description: 'Optional background color (Hex code)',
          },
        },
      ],
      admin: {
        description: 'Add speciality items to display in the grid',
      },
    },
  ],
}
