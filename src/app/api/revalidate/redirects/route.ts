import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  // Verify the secret token
  const secret = request.headers.get('x-revalidate-secret')

  if (secret !== process.env.REVALIDATE_SECRET) {
    console.error('❌ Invalid revalidation secret for redirects')
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
  }

  try {
    console.log('🔄 Revalidating redirects cache tag')
    
    // Revalidate the redirects cache tag
    revalidateTag('redirects')
    
    console.log('✅ Successfully revalidated redirects')

    return NextResponse.json({
      revalidated: true,
      tag: 'redirects',
      timestamp: new Date().toISOString(),
    })
  } catch (err) {
    console.error('❌ Error revalidating redirects:', err)
    return NextResponse.json(
      {
        message: 'Error revalidating redirects',
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
    message: 'Redirects revalidation API is running',
    timestamp: new Date().toISOString(),
  })
}
