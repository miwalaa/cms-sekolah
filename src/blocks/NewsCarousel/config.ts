import type { Block } from 'payload'

export const NewsCarousel: Block = {
  slug: 'newsCarousel',
  interfaceName: 'NewsCarousel',
  labels: {
    singular: 'News Carousel',
    plural: 'News Carousels',
  },
  fields: [
    {
      name: 'subtitle',
      type: 'text',
      admin: {
        description: 'Small section label, e.g., "Publikasi"',
      },
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      admin: {
        description: 'Section heading, e.g., "News & Blog"',
      },
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 9,
      admin: {
        description: 'Maximum number of posts to show in the carousel',
      },
    },
  ],
  admin: {
    group: 'Halaman Beranda',
  },
}
