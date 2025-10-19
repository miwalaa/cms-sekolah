import type { Block } from 'payload'

export const VideoSectionBlock: Block = {
  slug: 'videoSectionBlock',
  interfaceName: 'VideoSectionBlock',
  labels: {
    singular: 'Video Section Block',
    plural: 'Video Section Blocks',
  },
  fields: [
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      label: 'Video Thumbnail',
      required: true,
      admin: {
        description: 'Upload a thumbnail image for the video',
      },
    },
    {
      name: 'videoUrl',
      type: 'text',
      label: 'YouTube Video URL',
      required: true,
      admin: {
        description: 'Enter the full YouTube video URL (e.g., https://www.youtube.com/watch?v=VIDEO_ID)',
        placeholder: 'https://www.youtube.com/watch?v=...',
      },
    },
  ],
}
