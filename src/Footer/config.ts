import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooterAfterChange } from './hooks/revalidateFooter'

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
          defaultValue:
            'Jl. Siliwangi Gg. Kopi No.RT 05/02, Cikole, Kec. Cikole, Kota Sukabumi, Jawa Barat 43113',
        },
        {
          name: 'phone',
          label: 'Phone Number',
          type: 'text',
          defaultValue: '0857-2326-2812',
        },
        {
          name: 'email',
          label: 'Email',
          type: 'text',
          defaultValue: 'pkbmpemudapelopor@gmail.com',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooterAfterChange],
  },
}
