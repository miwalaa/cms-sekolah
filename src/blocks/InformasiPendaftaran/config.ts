import type { Block } from 'payload'

export const InfoRegisterBlock: Block = {
  slug: 'infoRegisterBlock',
  interfaceName: 'InfoRegisterBlock',
  labels: {
    singular: 'Info Pendaftaran',
    plural: 'Info Pendaftaran',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Heading',
      required: false,
      defaultValue: 'Informasi & Pendaftaran',
    },
    {
      name: 'buttonHref',
      type: 'text',
      label: 'Button Link',
      required: false,
    },
    {
      name: 'buttonLabel',
      type: 'text',
      label: 'Button Label',
      required: false,
      defaultValue: 'Whatsapp',
    },
  ],
  admin: {
    group: 'Halaman Beranda',
  },
}
