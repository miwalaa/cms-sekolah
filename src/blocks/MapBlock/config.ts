import type { Block } from 'payload'

export const MapBlock: Block = {
  slug: 'mapBlock',
  interfaceName: 'MapBlock',
  labels: {
    singular: 'Peta Lokasi',
    plural: 'Peta Lokasi',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: false,
    },
    {
      name: 'latitude',
      type: 'number',
      label: 'Latitude',
      required: true,
      defaultValue: -6.88837356492601,
    },
    {
      name: 'longitude',
      type: 'number',
      label: 'Longitude',
      required: true,
      defaultValue: 106.9410537775636,
    },
    {
      name: 'zoom',
      type: 'number',
      label: 'Zoom Level',
      defaultValue: 15,
    },
    {
      name: 'label',
      type: 'text',
      label: 'Marker Label',
      defaultValue: 'CMS Sekolah',
    },
  ],
  admin: {
    group: 'Halaman Beranda',
  },
}
