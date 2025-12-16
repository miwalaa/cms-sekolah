import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const ContactBlock: Block = {
  slug: 'contactBlock',
  interfaceName: 'ContactBlock',
  labels: {
    singular: 'Form Kontak',
    plural: 'Form Kontak',
  },
  fields: [
    // Main Content
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Hubungi Kami',
      label: 'Title',
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Description',
      required: true,
      editor: lexicalEditor(),
    },
    {
      name: 'formTitle',
      type: 'text',
      required: true,
      defaultValue: 'Kirim Pesan',
      label: 'Form Title',
    },

    // Contact Information
    {
      type: 'row',
      fields: [
        {
          name: 'showAddress',
          type: 'checkbox',
          label: 'Show Address',
          defaultValue: true,
          admin: {
            width: '33%',
          },
        },
        {
          name: 'showPhone',
          type: 'checkbox',
          label: 'Show Phone',
          defaultValue: true,
          admin: {
            width: '33%',
          },
        },
        {
          name: 'showEmail',
          type: 'checkbox',
          label: 'Show Email',
          defaultValue: true,
          admin: {
            width: '33%',
          },
        },
      ],
    },
    {
      name: 'address',
      type: 'text',
      label: 'Address',
      defaultValue: 'Jalan Durian Runtuh, RT 05, Kampung Durian Runtuh',
      admin: {
        condition: (_, siblingData) => siblingData.showAddress,
      },
    },
    {
      name: 'phoneNumber',
      type: 'text',
      label: 'Phone Number',
      defaultValue: '0851-2634-8844',
      admin: {
        condition: (_, siblingData) => siblingData.showPhone,
      },
    },
    {
      name: 'emailAddress',
      type: 'text',
      label: 'Email Address',
      defaultValue: 'miwalaksmanaanthony@gmail.com',
      admin: {
        condition: (_, siblingData) => siblingData.showEmail,
      },
    },

    // Form Placeholders
    {
      name: 'formPlaceholders',
      type: 'group',
      label: 'Form Placeholders',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Name Placeholder',
          defaultValue: 'Name',
        },
        {
          name: 'email',
          type: 'text',
          label: 'Email Placeholder',
          defaultValue: 'Email',
        },
        {
          name: 'message',
          type: 'text',
          label: 'Message Placeholder',
          defaultValue: 'Message',
        },
        {
          name: 'submit',
          type: 'text',
          label: 'Submit Button Text',
          defaultValue: 'Submit',
        },
      ],
    },

    // Social Media
    {
      name: 'socialMedia',
      type: 'array',
      label: 'Social Media Links',
      labels: {
        singular: 'Social Media',
        plural: 'Social Media',
      },
      fields: [
        {
          name: 'platform',
          type: 'select',
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Twitter', value: 'twitter' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'TikTok', value: 'tiktok' },
            { label: 'GitHub', value: 'github' },
          ],
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          label: 'Profile URL',
          required: true,
        },
      ],
    },
  ],
  admin: {
    group: 'Halaman Contact',
  },
}

export default ContactBlock
