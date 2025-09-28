import { Block } from 'payload'

export const VideoGallery: Block = {
  slug: 'video-gallery',
  interfaceName: 'VideoGallery',
  fields: [
    {
      name: 'videos',
      type: 'array',
      label: 'Videos',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'youtubeUrl',
          type: 'text',
          label: 'YouTube Embed URL',
          required: true,
          admin: {
            description: 'Enter the YouTube embed URL (e.g., https://www.youtube.com/embed/VIDEO_ID)',
          },
          validate: (value: string | string[] | null | undefined) => {
            if (!value) return true
            // Handle both string and string[] cases
            const stringValue = Array.isArray(value) ? value[0] : value
            if (!stringValue) return true
            // Basic validation for YouTube embed URL
            const youtubeRegex = /^https:\/\/(www\.)?youtube\.com\/embed\/[a-zA-Z0-9_-]+(\?.*)?$/
            return youtubeRegex.test(stringValue) || 'Please enter a valid YouTube embed URL'
          },
        },
        {
          name: 'title',
          type: 'text',
          label: 'Video Title',
          required: true,
          admin: {
            description: 'Enter a title for this video',
          },
        },
      ],
    },
  ],
  admin: {
    group: 'Content',
  },
}
