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
          type: 'select',
          required: true,
          options: [
            { label: 'Certificate', value: 'fa-solid fa-certificate' },
            { label: 'Check', value: 'fa-solid fa-circle-check' },
            { label: 'User', value: 'fa-solid fa-circle-user' },
            { label: 'Earth', value: 'fas fa-earth-americas' },
            { label: 'Hand Holding Dollar', value: 'fa-solid fa-hand-holding-dollar' },
            { label: 'Person Chalkboard', value: 'fa-solid fa-person-chalkboard' },
            { label: 'Chalkboard User', value: 'fa-solid fa-chalkboard-user' },
            { label: 'Clock', value: 'fa-solid fa-clock' },
          ],
          admin: {
            description: 'Choose an icon',
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
          name: 'color',
          type: 'select',
          required: true,
          options: [
            { label: 'Ungu', value: '#695ac7' },
            { label: 'Biru', value: '#4582ff' },
            { label: 'Hijau', value: '#55b56a' },
            { label: 'Merah', value: '#f27676' },
            { label: 'Biru Muda', value: '#35c5fa' },
          ],
          admin: {
            description: 'Choose a background color',
          },
        },
      ],
      admin: {
        description: 'Add speciality items to display in the grid',
      },
    },
  ],
  admin: {
    group: 'Halaman Beranda',
  },
}
