import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

// Development-only endpoint for seeding test data
export async function POST(request: NextRequest) {
  try {
    if (process.env.NODE_ENV !== 'development') {
      return NextResponse.json(
        { error: 'This endpoint is only available in development' },
        { status: 403 }
      );
    }

    // Create categories
    const categories = await prisma.category.createMany({
      data: [
        { name: 'Electronics' },
        { name: 'Fashion' },
        { name: 'Home & Garden' },
        { name: 'Sports' },
        { name: 'Books' }
      ],
      skipDuplicates: true
    });

    // Get all categories
    const allCategories = await prisma.category.findMany();

    // Create sample products
    const products = await prisma.product.createMany({
      data: [
        {
          name: 'Wireless Headphones',
          description: 'High-quality wireless headphones with noise cancellation',
          price: 199.99,
          stock: 15,
          categoryId: allCategories[0].id,
          image: 'https://via.placeholder.com/400?text=Headphones'
        },
        {
          name: 'Running Shoes',
          description: 'Comfortable running shoes for everyday use',
          price: 89.99,
          stock: 25,
          categoryId: allCategories[1].id,
          image: 'https://via.placeholder.com/400?text=Shoes'
        },
        {
          name: 'Coffee Maker',
          description: 'Programmable coffee maker with timer',
          price: 49.99,
          stock: 8,
          categoryId: allCategories[2].id,
          image: 'https://via.placeholder.com/400?text=CoffeeMaker'
        },
        {
          name: 'Yoga Mat',
          description: 'Non-slip yoga mat for exercise',
          price: 29.99,
          stock: 3,
          categoryId: allCategories[3].id,
          image: 'https://via.placeholder.com/400?text=YogaMat'
        },
        {
          name: 'JavaScript Guide',
          description: 'Complete guide to JavaScript programming',
          price: 39.99,
          stock: 50,
          categoryId: allCategories[4].id,
          image: 'https://via.placeholder.com/400?text=Book'
        }
      ],
      skipDuplicates: true
    });

    // Create sample coupons
    const coupons = await prisma.coupon.createMany({
      data: [
        {
          code: 'SAVE10',
          description: '10% off on all products',
          discountType: 'percentage',
          discountValue: 10,
          maxUses: -1,
          minOrderValue: 50,
          isActive: true
        },
        {
          code: 'WELCOME20',
          description: '$20 off on first order',
          discountType: 'fixed',
          discountValue: 20,
          maxUses: 1,
          minOrderValue: 100,
          isActive: true,
          expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
        }
      ],
      skipDuplicates: true
    });

    return NextResponse.json({
      message: 'Test data seeded successfully',
      data: {
        categoriesCreated: categories.count,
        productsCreated: products.count,
        couponsCreated: coupons.count
      }
    });
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to seed data' },
      { status: 500 }
    );
  }
}
