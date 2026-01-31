#!/usr/bin/env tsx
/**
 * Migration script to transfer media files from Supabase Storage to Cloudinary
 *
 * Usage:
 *   NODE_OPTIONS='--loader tsx' node --env-file=.env scripts/migrateToCloudinary.ts --dry-run
 *   Or simply: pnpm migrate:dry-run
 *   pnpm migrate:run
 */

import { createClient } from '@supabase/supabase-js'
import { v2 as cloudinary } from 'cloudinary'
import { getPayload } from 'payload'
import config from '../src/payload.config.js'

// Check for dry-run flag
const isDryRun = process.argv.includes('--dry-run')

// Validate environment variables
const requiredEnvVars = {
  supabase: ['SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY'],
  cloudinary: ['CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET'],
  payload: ['PAYLOAD_SECRET', 'DATABASE_URI'],
}

for (const [service, vars] of Object.entries(requiredEnvVars)) {
  for (const varName of vars) {
    if (!process.env[varName]) {
      console.error(`❌ Missing required environment variable: ${varName}`)
      console.error(`\nMake sure to run this script with environment variables loaded:`)
      console.error(`  pnpm tsx --env-file=.env scripts/migrateToCloudinary.ts --dry-run`)
      process.exit(1)
    }
  }
}

// Initialize Supabase client
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

interface MediaDoc {
  id: string
  filename: string
  url?: string
  mimeType?: string
}

async function migrateMedia() {
  console.log('\n🚀 Starting Supabase to Cloudinary migration...\n')

  if (isDryRun) {
    console.log('🔍 DRY RUN MODE - No changes will be made\n')
  }

  try {
    // Initialize Payload
    const payload = await getPayload({ config })

    // Fetch all media documents
    console.log('📥 Fetching media documents from database...')
    const { docs: mediaFiles } = await payload.find({
      collection: 'media',
      limit: 1000,
      pagination: false,
    })

    console.log(`Found ${mediaFiles.length} media files\n`)

    if (mediaFiles.length === 0) {
      console.log('✅ No media files to migrate')
      return
    }

    const bucket = process.env.SUPABASE_BUCKET || 'uploads'
    const prefix = 'media'

    let successCount = 0
    let errorCount = 0
    const errors: Array<{ filename: string; error: string }> = []

    for (let i = 0; i < mediaFiles.length; i++) {
      const media = mediaFiles[i] as unknown as MediaDoc
      const progress = `[${i + 1}/${mediaFiles.length}]`

      console.log(`${progress} Processing: ${media.filename}`)

      try {
        // Construct the Supabase file path
        const supabaseFilePath = `${prefix}/${media.filename}`

        // Download file from Supabase
        const { data: fileData, error: downloadError } = await supabase.storage
          .from(bucket)
          .download(supabaseFilePath)

        if (downloadError) {
          throw new Error(`Supabase download failed: ${downloadError.message}`)
        }

        if (!fileData) {
          throw new Error('No file data received from Supabase')
        }

        // Convert blob to buffer
        const arrayBuffer = await fileData.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        if (!isDryRun) {
          // Upload to Cloudinary
          const publicId = media.filename.replace(/\.[^/.]+$/, '')
          const fullPublicId = `${prefix}/${publicId}`

          const uploadResult = await cloudinary.uploader.upload(
            `data:${media.mimeType || 'image/jpeg'};base64,${buffer.toString('base64')}`,
            {
              public_id: fullPublicId,
              resource_type: 'auto',
              overwrite: true,
            },
          )

          // Update the database record with new Cloudinary URL
          await payload.update({
            collection: 'media',
            id: media.id,
            data: {
              url: uploadResult.secure_url,
            },
          })

          console.log(`  ✅ Migrated successfully`)
          console.log(`  📍 New URL: ${uploadResult.secure_url}`)
        } else {
          console.log(`  🔍 Would migrate (dry-run)`)
          console.log(`  📍 Size: ${(buffer.length / 1024).toFixed(2)} KB`)
        }

        successCount++
      } catch (error) {
        errorCount++
        const errorMessage = error instanceof Error ? error.message : String(error)
        errors.push({ filename: media.filename, error: errorMessage })
        console.log(`  ❌ Error: ${errorMessage}`)
      }

      console.log('')
    }

    // Summary
    console.log('\n' + '='.repeat(60))
    console.log('📊 Migration Summary')
    console.log('='.repeat(60))
    console.log(`Total files: ${mediaFiles.length}`)
    console.log(`✅ Successful: ${successCount}`)
    console.log(`❌ Failed: ${errorCount}`)

    if (isDryRun) {
      console.log('\n🔍 This was a dry run. No changes were made.')
      console.log('Run without --dry-run flag to perform actual migration.')
    }

    if (errors.length > 0) {
      console.log('\n❌ Errors encountered:')
      errors.forEach(({ filename, error }) => {
        console.log(`  - ${filename}: ${error}`)
      })
    }

    console.log('\n✅ Migration process completed!\n')

    process.exit(errorCount > 0 ? 1 : 0)
  } catch (error) {
    console.error('\n❌ Migration failed:', error)
    process.exit(1)
  }
}

// Run migration
migrateMedia()
