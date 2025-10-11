import type { Block } from 'payload'

export const ContactAndFAQ: Block = {
  slug: 'contactAndFAQ',
  interfaceName: 'ContactAndFAQ',
  labels: {
    singular: 'Contact & FAQ',
    plural: 'Contact & FAQs',
  },
  fields: [
    // Form Section
    {
      type: 'row',
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
      ],
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
      fields: [
        {
          name: 'question',
          type: 'text',
          label: 'Question',
          required: true,
        },
        {
          name: 'answer',
          type: 'richText',
          label: 'Answer',
          required: true,
        },
      ],
    },
  ],
}

export default ContactAndFAQ
