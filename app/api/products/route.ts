import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        reviews: {
          select: {
            rating: true,
          },
        },
      },
    });

    // Format response
    const formattedProducts = products.map((product) => {
      const totalReviews = product.reviews.length;
      const averageRating =
        totalReviews > 0
          ? (product.reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
          : 0;

      return {
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        image: product.image,
        category: product.category.name,
        categoryId: product.categoryId,
        stock: product.stock,
        rating: parseFloat(String(averageRating)),
        reviews: totalReviews,
        inStock: product.stock > 0,
      };
    });

    return NextResponse.json(formattedProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
