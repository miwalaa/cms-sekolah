import type { Block } from 'payload'

export const ImageGalleryBlock: Block = {
  slug: 'imageGalleryBlock',
  interfaceName: 'ImageGalleryBlock',
  labels: {
    singular: 'Galeri Foto',
    plural: 'Galeri Foto',
  },
  fields: [
    {
      name: 'images',
      type: 'array',
      label: 'Images',
      minRows: 1,
      required: true,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Image',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
        },
      ],
    },
  ],
  admin: {
    group: 'Halaman Galeri Foto',
  },
}
