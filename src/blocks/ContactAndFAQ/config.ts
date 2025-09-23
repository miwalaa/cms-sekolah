import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const ContactAndFAQ: Block = {
  slug: 'contactAndFAQ',
  interfaceName: 'ContactAndFAQ',
  labels: {
    singular: 'Contact & FAQ',
    plural: 'Contact & FAQs',
  },
  fields: [
    {
      name: 'formSubtitle',
      type: 'text',
      label: 'Form Subtitle',
      defaultValue: 'Tinggalkan Pesan',
    },
    {
      name: 'formTitle',
      type: 'text',
      label: 'Form Title',
      defaultValue: 'Ada Pertanyaan?',
    },
    {
      name: 'formSource',
      type: 'radio',
      label: 'Form Source',
      defaultValue: 'payloadForm',
      options: [
        { label: 'Payload Form (select from Forms collection)', value: 'payloadForm' },
        { label: 'Custom Action URL', value: 'customAction' },
      ],
      admin: {
        layout: 'horizontal',
      },
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      admin: {
        condition: (_, siblingData) => siblingData?.formSource === 'payloadForm',
      },
    },
    {
      name: 'actionUrl',
      type: 'text',
      label: 'Custom Action URL',
      admin: {
        description: 'If provided, the form will POST to this URL.',
        condition: (_, siblingData) => siblingData?.formSource === 'customAction',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'fullNameLabel',
          type: 'text',
          label: 'Full Name Label',
          defaultValue: 'Nama Lengkap',
        },
        {
          name: 'phoneLabel',
          type: 'text',
          label: 'Phone / WhatsApp Label',
          defaultValue: 'Nomor Telepon / WhatsApp',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'emailLabel',
          type: 'text',
          label: 'Email Label',
          defaultValue: 'Email',
        },
        {
          name: 'messageLabel',
          type: 'text',
          label: 'Message Label',
          defaultValue: 'Pesan',
        },
      ],
    },
    {
      name: 'submitLabel',
      type: 'text',
      label: 'Submit Button Label',
      defaultValue: 'Kirim Pesan',
    },
    // FAQ section
    {
      name: 'faqSubtitle',
      type: 'text',
      label: 'FAQ Subtitle',
      defaultValue: 'Tanya Jawab',
    },
    {
      name: 'faqTitle',
      type: 'text',
      label: 'FAQ Title',
      defaultValue: 'Seputar Pendidikan Kesetaraan',
    },
    {
      name: 'faqs',
      type: 'array',
      label: 'FAQs',
      labels: { singular: 'FAQ', plural: 'FAQs' },
      required: false,
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'richText',
          required: true,
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              HeadingFeature({ enabledHeadingSizes: ['h3', 'h4', 'h5'] }),
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
        },
      ],
    },
  ],
}
