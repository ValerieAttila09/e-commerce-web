import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  // In some Next.js typings route context.params may be a Promise — await to handle both cases
  const resolvedParams = await params;
  const { id } = resolvedParams || {};
  const pid = Number(id);
  if (Number.isNaN(pid)) {
    return NextResponse.json({ error: 'Invalid product id' }, { status: 400 });
  }

  try {
    const product = await prisma.product.findUnique({
      where: { id: pid },
      include: {
        category: true,
        reviews: { select: { rating: true, comment: true, id: true, createdAt: true, user: { select: { id: true, firstName: true, lastName: true } } } },
      },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const totalReviews = product.reviews?.length || 0;
    const averageRating =
      totalReviews > 0
        ? parseFloat((product.reviews.reduce((s: number, r: any) => s + (r.rating || 0), 0) / totalReviews).toFixed(1))
        : 0;

    const formatted = {
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category?.name || null,
      categoryId: product.categoryId,
      stock: product.stock,
      rating: averageRating,
      reviews: totalReviews,
      inStock: product.stock > 0,
      // include recent reviews for detail page
      recentReviews: product.reviews?.map((r: any) => ({
        id: r.id,
        rating: r.rating,
        comment: r.comment,
        createdAt: r.createdAt,
        user: r.user ? { id: r.user.id, firstName: r.user.firstName, lastName: r.user.lastName } : null,
      })) || [],
    };

    return NextResponse.json(formatted);
  } catch (err) {
    console.error('Error fetching product detail:', err);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}
