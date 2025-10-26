import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'
import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Announcements: CollectionConfig = {
  slug: 'announcements',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'category', 'publishDate', 'priority'],
    useAsTitle: 'title',
    group: 'School Management',
    description: 'Manage school announcements, news, and important notices',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Announcement Title',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'category',
          type: 'select',
          required: true,
          label: 'Category',
          options: [
            { label: 'General', value: 'general' },
            { label: 'Academic', value: 'academic' },
            { label: 'Event', value: 'event' },
            { label: 'Holiday', value: 'holiday' },
            { label: 'Emergency', value: 'emergency' },
            { label: 'Achievement', value: 'achievement' },
            { label: 'Admission', value: 'admission' },
            { label: 'Exam', value: 'exam' },
          ],
          admin: {
            width: '50%',
          },
        },
        {
          name: 'priority',
          type: 'select',
          required: true,
          defaultValue: 'normal',
          label: 'Priority',
          options: [
            { label: 'Low', value: 'low' },
            { label: 'Normal', value: 'normal' },
            { label: 'High', value: 'high' },
            { label: 'Urgent', value: 'urgent' },
          ],
          admin: {
            width: '50%',
            description: 'Urgent announcements will be highlighted',
          },
        },
      ],
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Featured Image',
      admin: {
        description: 'Optional image for the announcement',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Announcement Content',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
    },
    {
      type: 'row',
      fields: [
        {
          name: 'publishDate',
          type: 'date',
          required: true,
          defaultValue: () => new Date().toISOString(),
          label: 'Publish Date',
          admin: {
            width: '50%',
            date: {
              pickerAppearance: 'dayAndTime',
            },
          },
        },
        {
          name: 'expiryDate',
          type: 'date',
          label: 'Expiry Date',
          admin: {
            width: '50%',
            description: 'Announcement will be hidden after this date',
            date: {
              pickerAppearance: 'dayAndTime',
            },
          },
        },
      ],
    },
    {
      name: 'targetAudience',
      type: 'select',
      required: true,
      hasMany: true,
      label: 'Target Audience',
      options: [
        { label: 'All', value: 'all' },
        { label: 'Students', value: 'students' },
        { label: 'Parents', value: 'parents' },
        { label: 'Teachers', value: 'teachers' },
        { label: 'Staff', value: 'staff' },
      ],
      admin: {
        description: 'Who should see this announcement',
      },
    },
    {
      name: 'specificClasses',
      type: 'relationship',
      relationTo: 'classes',
      hasMany: true,
      label: 'Specific Classes',
      admin: {
        description: 'Leave empty to show to all classes',
      },
    },
    {
      name: 'attachments',
      type: 'array',
      label: 'Attachments',
      fields: [
        {
          name: 'file',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'File',
        },
        {
          name: 'description',
          type: 'text',
          label: 'File Description',
        },
      ],
    },
    {
      name: 'isPinned',
      type: 'checkbox',
      label: 'Pin to Top',
      defaultValue: false,
      admin: {
        description: 'Pinned announcements appear at the top',
      },
    },
    {
      name: 'sendNotification',
      type: 'checkbox',
      label: 'Send Email Notification',
      defaultValue: false,
      admin: {
        description: 'Send email to target audience',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      label: 'Author',
      admin: {
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}
