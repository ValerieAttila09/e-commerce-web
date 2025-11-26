import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const productId = url.searchParams.get('productId')

    if (!productId) return NextResponse.json({ error: 'productId is required' }, { status: 400 })

    const id = Number(productId)

    const reviews = await prisma.review.findMany({
      where: { productId: id },
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { id: true, firstName: true, lastName: true } } },
      take: 50,
    })

    return NextResponse.json(reviews)
  } catch (error) {
    console.error('[GET /api/reviews] error:', error)
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 })
  }
}

export const runtime = 'nodejs'
