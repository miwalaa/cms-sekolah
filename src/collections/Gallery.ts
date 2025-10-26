import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'

export const Gallery: CollectionConfig = {
  slug: 'gallery',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'category', 'eventDate', 'featured'],
    useAsTitle: 'title',
    group: 'School Management',
    description: 'Manage school photos, videos, and event galleries',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Gallery Title',
      admin: {
        description: 'e.g., Annual Sports Day 2024, Science Fair',
      },
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
            { label: 'Events', value: 'events' },
            { label: 'Academic Activities', value: 'academic' },
            { label: 'Sports', value: 'sports' },
            { label: 'Cultural Programs', value: 'cultural' },
            { label: 'Celebrations', value: 'celebrations' },
            { label: 'Field Trips', value: 'field_trips' },
            { label: 'Competitions', value: 'competitions' },
            { label: 'Graduation', value: 'graduation' },
            { label: 'Infrastructure', value: 'infrastructure' },
            { label: 'Other', value: 'other' },
          ],
          admin: {
            width: '50%',
          },
        },
        {
          name: 'eventDate',
          type: 'date',
          required: true,
          label: 'Event Date',
          admin: {
            width: '50%',
            description: 'Date when the event took place',
          },
        },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      admin: {
        description: 'Brief description of the event or gallery',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Cover Image',
      admin: {
        description: 'Main image representing this gallery',
      },
    },
    {
      name: 'mediaItems',
      type: 'array',
      required: true,
      label: 'Media Items',
      fields: [
        {
          name: 'mediaType',
          type: 'select',
          required: true,
          defaultValue: 'image',
          options: [
            { label: 'Image', value: 'image' },
            { label: 'Video', value: 'video' },
          ],
        },
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Upload Media',
          admin: {
            condition: (data, siblingData) => siblingData?.mediaType === 'image',
          },
        },
        {
          name: 'videoUrl',
          type: 'text',
          label: 'Video URL',
          admin: {
            description: 'YouTube, Vimeo, or other video URL',
            condition: (data, siblingData) => siblingData?.mediaType === 'video',
          },
        },
        {
          name: 'caption',
          type: 'text',
          label: 'Caption',
        },
        {
          name: 'photographer',
          type: 'text',
          label: 'Photographer/Videographer',
        },
      ],
      admin: {
        description: 'Add photos and videos to this gallery',
      },
    },
    {
      name: 'relatedClasses',
      type: 'relationship',
      relationTo: 'classes',
      hasMany: true,
      label: 'Related Classes',
      admin: {
        description: 'Classes involved in this event',
      },
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tags',
      fields: [
        {
          name: 'tag',
          type: 'text',
          label: 'Tag',
        },
      ],
      admin: {
        description: 'Add tags for better searchability',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured Gallery',
      defaultValue: false,
      admin: {
        description: 'Show this gallery on the homepage',
      },
    },
    {
      name: 'viewCount',
      type: 'number',
      defaultValue: 0,
      label: 'View Count',
      admin: {
        readOnly: true,
        description: 'Number of times this gallery has been viewed',
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
      name: 'uploadedBy',
      type: 'relationship',
      relationTo: 'users',
      label: 'Uploaded By',
      admin: {
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}
