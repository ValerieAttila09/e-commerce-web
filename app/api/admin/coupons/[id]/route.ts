import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const {
      code,
      description,
      discountType,
      discountValue,
      maxUses,
      minOrderValue,
      expiryDate,
      isActive,
    } = body;
    const couponId = parseInt(params.id);

    const coupon = await prisma.coupon.update({
      where: { id: couponId },
      data: {
        code: code ? code.toUpperCase() : undefined,
        description: description || null,
        discountType: discountType || undefined,
        discountValue: discountValue !== undefined ? parseFloat(discountValue) : undefined,
        maxUses: maxUses !== undefined ? parseInt(maxUses) : undefined,
        minOrderValue: minOrderValue !== undefined ? parseFloat(minOrderValue) : undefined,
        expiryDate: expiryDate ? new Date(expiryDate) : null,
        isActive: isActive !== undefined ? isActive : undefined,
      },
    });

    return NextResponse.json(coupon);
  } catch (error) {
    console.error('Error updating coupon:', error);
    return NextResponse.json(
      { error: 'Failed to update coupon' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const couponId = parseInt(params.id);

    await prisma.coupon.delete({
      where: { id: couponId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting coupon:', error);
    return NextResponse.json(
      { error: 'Failed to delete coupon' },
      { status: 500 }
    );
  }
}
