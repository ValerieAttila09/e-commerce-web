import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const productId = url.searchParams.get('productId')

    if (!productId) return NextResponse.json({ error: 'productId is required' }, { status: 400 })

    const id = Number(productId)
    if (Number.isNaN(id)) {
      return NextResponse.json({ error: 'Invalid productId' }, { status: 400 })
    }

    const product = await prisma.product.findUnique({ where: { id } })
    if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 })

    const related = await prisma.product.findMany({
      where: { categoryId: product.categoryId, NOT: { id } },
      take: 6,
    })

    return NextResponse.json(related)
  } catch (error) {
    console.error('[GET /api/products/related] error:', error)
    return NextResponse.json({ error: 'Failed to fetch related products' }, { status: 500 })
  }
}

export const runtime = 'nodejs'
