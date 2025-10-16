/**
 * Script to fix duplicate block IDs in the pages collection
 * This will regenerate IDs for duplicate blocks
 * Run with: node scripts/fix-duplicate-block-ids.js
 */

import { getPayload } from 'payload'
import config from '../src/payload.config.js'

function generateId() {
  // Generate a MongoDB-style ObjectId
  const timestamp = Math.floor(Date.now() / 1000).toString(16).padStart(8, '0')
  const random = Math.random().toString(16).substring(2, 18).padStart(16, '0')
  return timestamp + random
}

async function fixDuplicateBlockIds() {
  console.log('🔧 Fixing duplicate block IDs in pages collection...\n')

  const payload = await getPayload({ config })

  try {
    // Fetch all pages
    const { docs: pages } = await payload.find({
      collection: 'pages',
      depth: 0,
      limit: 1000,
    })

    console.log(`📄 Found ${pages.length} pages to check\n`)

    let totalFixed = 0
    const globalBlockIds = new Set()

    // Process each page
    for (const page of pages) {
      if (!page.layout || !Array.isArray(page.layout)) continue

      const pageBlockIds = new Set()
      let pageModified = false
      const newLayout = []

      page.layout.forEach((block, index) => {
        const newBlock = { ...block }

        // Check if block has no ID or duplicate ID
        if (!block.id || pageBlockIds.has(block.id) || globalBlockIds.has(block.id)) {
          const oldId = block.id || 'undefined'
          const newId = generateId()
          
          console.log(`  Fixing block in "${page.title}":`)
          console.log(`    Old ID: ${oldId}`)
          console.log(`    New ID: ${newId}`)
          console.log(`    Type: ${block.blockType}`)
          console.log(`    Index: ${index}\n`)

          newBlock.id = newId
          pageModified = true
          totalFixed++
        }

        pageBlockIds.add(newBlock.id)
        globalBlockIds.add(newBlock.id)
        newLayout.push(newBlock)
      })

      // Update page if modified
      if (pageModified) {
        console.log(`💾 Updating page: "${page.title}" (${page.id})`)
        
        await payload.update({
          collection: 'pages',
          id: page.id,
          data: {
            layout: newLayout,
          },
        })

        console.log(`✅ Updated successfully\n`)
      }
    }

    // Summary
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('SUMMARY:')
    console.log(`Total pages checked: ${pages.length}`)
    console.log(`Total blocks fixed: ${totalFixed}`)

    if (totalFixed === 0) {
      console.log('\n✅ No duplicate block IDs found!')
    } else {
      console.log(`\n✅ Fixed ${totalFixed} duplicate block IDs!`)
      console.log('Run check-duplicate-block-ids.js to verify.')
    }

    process.exit(0)
  } catch (error) {
    console.error('Error fixing duplicates:', error)
    process.exit(1)
  }
}

fixDuplicateBlockIds()
