#!/usr/bin/env node
/**
 * Wrapper script to load environment variables before running the migration
 * This ensures .env is loaded before any ES modules are imported
 */

import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import { spawn } from 'child_process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables
const result = dotenv.config({ path: path.resolve(__dirname, '../.env') })

if (result.error) {
  console.error('❌ Error loading .env file:', result.error)
  process.exit(1)
}

// Pass all arguments to the actual migration script
const args = process.argv.slice(2)

// Run the migration with environment variables already loaded
const child = spawn('pnpm', ['tsx', 'scripts/migrateToCloudinary.ts', ...args], {
  cwd: path.resolve(__dirname, '..'),
  stdio: 'inherit',
  shell: true,
  env: { ...process.env },
})

child.on('exit', (code) => {
  process.exit(code || 0)
})
