import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'contactInfo',
      label: 'Contact Information',
      type: 'group',
      fields: [
        {
          name: 'address',
          label: 'Address',
          type: 'text',
        },
        {
          name: 'phone',
          label: 'Phone Number',
          type: 'text',
        },
        {
          name: 'email',
          label: 'Email',
          type: 'text',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
