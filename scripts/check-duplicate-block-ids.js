/**
 * Script to check for duplicate block IDs in the pages collection
 * Run with: pnpm exec tsx scripts/check-duplicate-block-ids.js
 */

import { config as dotenvConfig } from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

// Get directory name for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load environment variables FIRST before importing payload config
const envPath = resolve(__dirname, '../.env')
console.log('Loading .env from:', envPath)
const result = dotenvConfig({ path: envPath })
if (result.error) {
  console.error('Error loading .env:', result.error)
  process.exit(1)
}
console.log('✅ Environment variables loaded')

// NOW import payload after env vars are loaded
const { getPayload } = await import('payload')
const { default: config } = await import('../src/payload.config.ts')

async function checkDuplicateBlockIds() {
  console.log('\n🔍 Checking for duplicate block IDs in pages collection...\n')

  const payload = await getPayload({ config })

  try {
    // Fetch all pages
    const { docs: pages } = await payload.find({
      collection: 'pages',
      depth: 0,
      limit: 1000,
    })

    console.log(`📄 Found ${pages.length} pages to check\n`)

    const duplicates = []
    const allBlockIds = new Map() // Map of blockId -> array of page info

    // Check each page
    for (const page of pages) {
      if (!page.layout || !Array.isArray(page.layout)) continue

      const pageBlockIds = new Set()
      const pageDuplicates = []

      page.layout.forEach((block, index) => {
        if (!block.id) {
          console.warn(`⚠️  Page "${page.title}" (${page.id}): Block at index ${index} has no ID`)
          return
        }

        // Check for duplicates within the same page
        if (pageBlockIds.has(block.id)) {
          pageDuplicates.push({
            blockId: block.id,
            blockType: block.blockType,
            index,
          })
        }
        pageBlockIds.add(block.id)

        // Track all block IDs across pages
        if (!allBlockIds.has(block.id)) {
          allBlockIds.set(block.id, [])
        }
        allBlockIds.get(block.id).push({
          pageId: page.id,
          pageTitle: page.title,
          blockType: block.blockType,
          index,
        })
      })

      if (pageDuplicates.length > 0) {
        duplicates.push({
          pageId: page.id,
          pageTitle: page.title,
          duplicates: pageDuplicates,
        })
      }
    }

    // Report duplicates within pages
    if (duplicates.length > 0) {
      console.log('❌ FOUND DUPLICATE BLOCK IDs WITHIN PAGES:\n')
      duplicates.forEach(({ pageId, pageTitle, duplicates: dups }) => {
        console.log(`Page: "${pageTitle}" (ID: ${pageId})`)
        dups.forEach(({ blockId, blockType, index }) => {
          console.log(`  - Block ID: ${blockId} (Type: ${blockType}, Index: ${index})`)
        })
        console.log('')
      })
    }

    // Check for block IDs used across multiple pages
    const crossPageDuplicates = []
    for (const [blockId, pages] of allBlockIds.entries()) {
      if (pages.length > 1) {
        crossPageDuplicates.push({ blockId, pages })
      }
    }

    if (crossPageDuplicates.length > 0) {
      console.log('⚠️  BLOCK IDs USED ACROSS MULTIPLE PAGES:\n')
      crossPageDuplicates.forEach(({ blockId, pages }) => {
        console.log(`Block ID: ${blockId}`)
        pages.forEach(({ pageId, pageTitle, blockType, index }) => {
          console.log(
            `  - Page: "${pageTitle}" (ID: ${pageId}, Type: ${blockType}, Index: ${index})`,
          )
        })
        console.log('')
      })
    }

    // Summary
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('SUMMARY:')
    console.log(`Total pages checked: ${pages.length}`)
    console.log(`Pages with duplicate block IDs: ${duplicates.length}`)
    console.log(`Block IDs used across multiple pages: ${crossPageDuplicates.length}`)

    if (duplicates.length === 0 && crossPageDuplicates.length === 0) {
      console.log('\n✅ No duplicate block IDs found!')
    } else {
      console.log('\n❌ Issues found. Run fix-duplicate-block-ids.js to fix them.')
    }

    process.exit(0)
  } catch (error) {
    console.error('Error checking for duplicates:', error)
    process.exit(1)
  }
}

checkDuplicateBlockIds()
