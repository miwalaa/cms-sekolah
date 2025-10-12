import type { Block } from 'payload'

export const AboutSection: Block = {
  slug: 'aboutSection',
  interfaceName: 'AboutSection',
  fields: [
    {
      name: 'leftImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'buttonText',
      type: 'text',
    },
    {
      name: 'buttonLink',
      type: 'text',
      admin: {
        description: 'URL for the button link',
      },
    },
  ],
  admin: {
    group: 'Halaman Beranda',
  },
}
