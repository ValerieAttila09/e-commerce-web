import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const [totalProducts, totalOrders, totalRevenue, lowStockProducts] =
      await Promise.all([
        prisma.product.count(),
        prisma.order.count(),
        prisma.order.aggregate({
          _sum: {
            total: true,
          },
        }),
        prisma.product.findMany({
          where: {
            stock: {
              lte: 10,
            },
          },
          take: 5,
        }),
      ]);

    const revenue = totalRevenue._sum.total || 0;

    // Get order trends (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const orderTrends = await prisma.order.groupBy({
      by: ['createdAt'],
      where: {
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
      _count: true,
    });

    // Get top products
    const topProducts = await prisma.orderItem.groupBy({
      by: ['productId'],
      _count: true,
      _sum: {
        quantity: true,
      },
      orderBy: {
        _count: {
          productId: 'desc',
        },
      },
      take: 5,
    });

    const topProductsData = await Promise.all(
      topProducts.map(async (item) => {
        const product = await prisma.product.findUnique({
          where: { id: item.productId },
        });
        return {
          ...product,
          totalSold: item._sum.quantity || 0,
        };
      })
    );

    // Get categories with product count
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    return NextResponse.json({
      stats: {
        totalProducts,
        totalOrders,
        totalRevenue: revenue,
        lowStockCount: lowStockProducts.length,
      },
      lowStockProducts,
      topProducts: topProductsData,
      categories,
      orderTrends,
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
