import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const FeedbackSchema = z.object({
  name: z.string().min(1, 'Nama harus diisi').max(100, 'Nama terlalu panjang'),
  email: z.string().email('Email tidak valid').max(100, 'Email terlalu panjang'),
  message: z.string().min(1, 'Pesan harus diisi').max(1000, 'Pesan terlalu panjang'),
  category: z.string().optional().default('Feedback'),
})

export async function GET() {
  try {
    const feedbacks = await prisma.feedback.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
    })

    return NextResponse.json(feedbacks)
  } catch (error) {
    console.error('[GET /api/feedback] Database error:', error instanceof Error ? error.message : String(error))
    return NextResponse.json(
      { error: 'Gagal memuat feedback' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('[POST /api/feedback] Request body:', JSON.stringify(body))

    // Validate with zod
    const validation = FeedbackSchema.safeParse(body)

    if (!validation.success) {
      const errors = validation.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join('; ')
      console.warn('[POST /api/feedback] Validation failed:', errors)
      return NextResponse.json(
        { error: `Validasi gagal: ${errors}` },
        { status: 400 }
      )
    }

    const { name, email, message, category } = validation.data

    console.log('[POST /api/feedback] Creating feedback for:', email)

    const created = await prisma.feedback.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        message: message.trim(),
        category: category || 'Feedback',
      },
    })

    console.log('[POST /api/feedback] Feedback created with id:', created.id)
    return NextResponse.json(created, { status: 201 })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    const errorStack = error instanceof Error ? error.stack : ''
    console.error('[POST /api/feedback] Error details:', { message: errorMessage, stack: errorStack })
    return NextResponse.json(
      {
        error: 'Gagal membuat feedback',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined,
      },
      { status: 500 }
    )
  }
}

export const runtime = 'nodejs'
