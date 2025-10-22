import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { AboutSection } from '../../blocks/TentangKami/config'
import { Specialities } from '../../blocks/Keunggulan/config'
import { NewsCarousel } from '../../blocks/BeritaTerbaru/config'
import { ContactAndFAQ } from '../../blocks/KontakDanFAQ/config'
import { ContactBlock } from '../../blocks/FormKontak/config'
import { GalleryBlock } from '../../blocks/GaleriKonten/config'
import { ImageGalleryBlock } from '../../blocks/GaleriFoto/config'
import { MapBlock } from '../../blocks/MapBlock/config'
import { InfoRegisterBlock } from '../../blocks/InformasiPendaftaran/config'
import { TentangBlock } from '../../blocks/KontenDanSidebar/config'
import { VideoGallery } from '../../blocks/GaleriVideo/config'
import { VideoSectionBlock } from '../../blocks/BagianVideo/config'
import { hero } from '@/heros/config'
import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidatePageAfterChange, revalidatePageAfterDelete } from './hooks/revalidatePage'
import slug from '../../hooks/slug'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'pages',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                AboutSection,
                Specialities,
                NewsCarousel,
                ContactAndFAQ,
                ContactBlock,
                GalleryBlock,
                ImageGalleryBlock,
                MapBlock,
                InfoRegisterBlock,
                TentangBlock,
                VideoGallery,
                VideoSectionBlock,
              ],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField(),
  ],
  hooks: {
    beforeValidate: [slug()],
    afterChange: [revalidatePageAfterChange],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidatePageAfterDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
