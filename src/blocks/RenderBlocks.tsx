import React, { Fragment } from 'react'
import type { Page } from '@/payload-types'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { AboutSection } from '@/blocks/AboutSection/Component'
import { Specialities } from '@/blocks/Specialities/Component'
import TentangBlock from '@/blocks/TentangBlock/Component'
import NewsCarouselComponent from '@/blocks/NewsCarousel/Component'
import ContactAndFAQComponent from '@/blocks/ContactAndFAQ/Component'
import GalleryBlockComponent from '@/blocks/GalleryBlock/Component'
import MapBlockComponent from '@/blocks/MapBlock/Component'
import InfoRegisterBlock from '@/blocks/InfoRegisterBlock/Component'
import VideoGalleryBlock from '@/blocks/VideoGallery/Component'
import ContactBlock from '@/blocks/ContactBlock/Component'

const blockComponents = {
  mediaBlock: MediaBlock,
  aboutSection: AboutSection,
  specialities: Specialities,
  newsCarousel: NewsCarouselComponent,
  contactAndFAQ: ContactAndFAQComponent,
  galleryBlock: GalleryBlockComponent,
  mapBlock: MapBlockComponent,
  infoRegisterBlock: InfoRegisterBlock,
  tentangBlock: TentangBlock,
  'video-gallery': VideoGalleryBlock,
  contactBlock: ContactBlock,
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
