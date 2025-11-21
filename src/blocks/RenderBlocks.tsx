import React, { Fragment } from 'react'
import dynamic from 'next/dynamic'
import type { Page } from '@/payload-types'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { AboutSection } from '@/blocks/TentangKami/Component'
import { Specialities } from '@/blocks/Keunggulan/Component'
import TentangBlock from '@/blocks/KontenDanSidebar/Component'
import ContactAndFAQComponent from '@/blocks/KontakDanFAQ/Component'
import InfoRegisterBlock from '@/blocks/InformasiPendaftaran/Component'
import ContactBlock from '@/blocks/FormKontak/Component'
import VideoSectionBlock from '@/blocks/BagianVideo/Component'

// Dynamically import heavy components to reduce initial bundle size
const NewsCarouselComponent = dynamic(() => import('@/blocks/BeritaTerbaru/Component'), {
  loading: () => <div className="container py-8 text-center">Memuat carousel...</div>,
  ssr: true,
})

const GalleryBlockComponent = dynamic(() => import('@/blocks/GaleriKonten/Component'), {
  loading: () => <div className="container py-8 text-center">Memuat galeri...</div>,
  ssr: true,
})

const ImageGalleryBlock = dynamic(() => import('@/blocks/GaleriFoto/Component'), {
  loading: () => <div className="container py-8 text-center">Memuat galeri foto...</div>,
  ssr: true,
})

const MapBlockComponent = dynamic(() => import('@/blocks/MapBlock/Component'), {
  loading: () => <div className="container py-8 text-center">Memuat peta...</div>,
  ssr: true,
})

const VideoGalleryBlock = dynamic(() => import('@/blocks/GaleriVideo/Component'), {
  loading: () => <div className="container py-8 text-center">Memuat galeri video...</div>,
  ssr: true,
})

const blockComponents = {
  mediaBlock: MediaBlock,
  aboutSection: AboutSection,
  specialities: Specialities,
  newsCarousel: NewsCarouselComponent,
  contactAndFAQ: ContactAndFAQComponent,
  galleryBlock: GalleryBlockComponent,
  imageGalleryBlock: ImageGalleryBlock,
  mapBlock: MapBlockComponent,
  infoRegisterBlock: InfoRegisterBlock,
  tentangBlock: TentangBlock,
  'video-gallery': VideoGalleryBlock,
  contactBlock: ContactBlock,
  videoSectionBlock: VideoSectionBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType, id } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              // Generate a stable key - prefer id, but ensure it exists and is valid
              const blockKey = id && typeof id === 'string' ? id : `${blockType}-${index}`

              const isInfoRegisterBlock = blockType === 'infoRegisterBlock'
              const isMapBlock = blockType === 'mapBlock'
              const isContactBlock = blockType === 'contactBlock'

              const shouldHaveMargin = !isMapBlock && !isInfoRegisterBlock && !isContactBlock

              return (
                <div className={shouldHaveMargin ? 'mt-16' : ''} key={blockKey}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
