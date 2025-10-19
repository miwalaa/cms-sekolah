// src/app/api/revalidate/route.ts
import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

type RevalidateRequestBody = {
  collection: string
  slug: string
  operation: 'update' | 'delete'
}

export async function POST(request: NextRequest) {
  // Verify the secret token
  const secret = request.headers.get('x-revalidate-secret')

  if (secret !== process.env.REVALIDATE_SECRET) {
    console.error('❌ Invalid revalidation secret')
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
  }

  try {
    const body: RevalidateRequestBody = await request.json()
    const { collection, slug, operation } = body

    console.log(`🔄 Revalidating: ${collection}/${slug} (${operation})`)

    // Define paths to revalidate based on collection
    const pathsToRevalidate: string[] = []

    switch (collection) {
      case 'pages':
        // Revalidate the specific page
        if (slug === 'home' || slug === 'index') {
          pathsToRevalidate.push('/')
        } else {
          pathsToRevalidate.push(`/${slug}`)
        }
        break

      case 'posts':
        // Revalidate the post page and the blog listing pages
        pathsToRevalidate.push(`/posts/${slug}`)
        pathsToRevalidate.push('/posts')
        // Also revalidate paginated blog pages (first 5 pages)
        for (let i = 1; i <= 5; i++) {
          pathsToRevalidate.push(`/posts/page/${i}`)
        }
        break

      case 'media':
        // Media changes might affect any page, revalidate common pages
        pathsToRevalidate.push('/')
        pathsToRevalidate.push('/posts')
        break

      case 'categories':
        // Category changes affect blog pages
        pathsToRevalidate.push('/posts')
        break

      case 'header':
        // Header changes affect all pages - revalidate main routes
        pathsToRevalidate.push('/')
        pathsToRevalidate.push('/posts')
        pathsToRevalidate.push('/search')
        // Revalidate by tag for all pages that use header
        try {
          revalidateTag('header')
          console.log('✅ Revalidated header tag')
        } catch (err) {
          console.error('❌ Error revalidating header tag:', err)
        }
        break

      case 'footer':
        // Footer changes affect all pages - revalidate main routes
        pathsToRevalidate.push('/')
        pathsToRevalidate.push('/posts')
        pathsToRevalidate.push('/search')
        // Revalidate by tag for all pages that use footer
        try {
          revalidateTag('footer')
          console.log('✅ Revalidated footer tag')
        } catch (err) {
          console.error('❌ Error revalidating footer tag:', err)
        }
        break

      default:
        console.warn(`⚠️ Unknown collection: ${collection}`)
        // Try to revalidate home page as fallback
        pathsToRevalidate.push('/')
    }

    // Revalidate all paths
    const revalidationResults = []

    for (const path of pathsToRevalidate) {
      try {
        revalidatePath(path)
        console.log(`✅ Revalidated: ${path}`)
        revalidationResults.push({ path, success: true })
      } catch (err) {
        console.error(`❌ Failed to revalidate ${path}:`, err)
        revalidationResults.push({
          path,
          success: false,
          error: err instanceof Error ? err.message : 'Unknown error',
        })
      }
    }

    const failedPaths = revalidationResults.filter((r) => !r.success)

    if (failedPaths.length > 0) {
      return NextResponse.json(
        {
          message: 'Some paths failed to revalidate',
          failed: failedPaths,
          revalidated: revalidationResults.filter((r) => r.success).map((r) => r.path),
        },
        { status: 207 }, // Multi-Status
      )
    }

    return NextResponse.json({
      revalidated: true,
      paths: pathsToRevalidate,
      collection,
      slug,
      operation,
      timestamp: new Date().toISOString(),
    })
  } catch (err) {
    console.error('❌ Error in revalidation:', err)
    return NextResponse.json(
      {
        message: 'Error revalidating',
        error: err instanceof Error ? err.message : 'Unknown error',
      },
      { status: 500 },
    )
  }
}

// Optional: Add GET endpoint for health check
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Revalidation API is running',
    timestamp: new Date().toISOString(),
  })
}
