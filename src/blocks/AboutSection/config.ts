import type { Block } from 'payload'
import { HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import {
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  StrikethroughFeature,
  OrderedListFeature,
  UnorderedListFeature,
  LinkFeature,
  IndentFeature,
} from '@payloadcms/richtext-lexical'

export const AboutSection: Block = {
  slug: 'aboutSection',
  interfaceName: 'AboutSection',
  fields: [
    {
      name: 'leftImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Left Side Image',
      admin: {
        description: 'Recommended size: 800x600px',
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
      admin: {
        description: 'Optional subtitle text',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Description',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          BoldFeature(),
          ItalicFeature(),
          UnderlineFeature(),
          StrikethroughFeature(),
          HeadingFeature(),
          OrderedListFeature(),
          UnorderedListFeature(),
          LinkFeature(),
          IndentFeature(),
        ],
      }),
    },
    {
      name: 'buttonText',
      type: 'text',
      label: 'Button Text',
      admin: {
        condition: (data) => Boolean(data?.buttonLink),
      },
    },
    {
      name: 'buttonLink',
      type: 'text',
      label: 'Button Link',
      validate: (val?: string | null) => {
        if (!val) return true
        if (!val.startsWith('http://') && !val.startsWith('https://') && !val.startsWith('/')) {
          return 'Please enter a valid URL starting with http://, https://, or /'
        }
        return true
      },
      admin: {
        description: 'URL for the button link',
        condition: (data) => Boolean(data?.buttonText),
      },
    },
  ],
  labels: {
    singular: 'About Section',
    plural: 'About Sections',
  },
  admin: {
    group: 'Halaman Beranda',
  },
}

export default AboutSection
