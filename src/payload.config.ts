// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage'
import { cloudinaryAdapter } from './utilities/cloudinaryStorageAdapter'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'
import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'
import { en } from '@payloadcms/translations/languages/en'
import { id } from '@payloadcms/translations/languages/id'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      graphics: {
        Logo: '@/components/AdminLogo/AdminLogo#AdminLogo',
      },
      providers: ['@/components/AdminRoot/AdminRoot#AdminRoot'],
      views: {
        Dashboard: {
          Component: '@/components/Dashboard/Dashboard#Dashboard',
        },
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    theme: 'dark',
    // meta: {
    //   titleSuffix: '- CMS Sekolah',
    // },
    livePreview: {
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },
  i18n: {
    supportedLanguages: { en, id },
    fallbackLanguage: 'en',
  },
  editor: defaultLexical,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  collections: [Pages, Posts, Media, Categories, Users],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer],
  plugins: [
    ...plugins,
    cloudStoragePlugin({
      collections: {
        media: {
          adapter: cloudinaryAdapter,
          prefix: 'media',
        },
      },
    }),
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        if (req.user) return true
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },
})
