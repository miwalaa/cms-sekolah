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
      defaultValue: -6.910885460422086,
    },
    {
      name: 'longitude',
      type: 'number',
      label: 'Longitude',
      required: true,
      defaultValue: 106.93640189572253,
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
      defaultValue: 'PKBM Pemuda Pelopor - Sekolah Kesetaraan Sukabumi',
    },
  ],
  admin: {
    group: 'Halaman Beranda',
  },
}
