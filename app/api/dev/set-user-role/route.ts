import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

// This is a temporary endpoint for development/testing purposes only
// In production, this should be removed or protected
export async function POST(request: NextRequest) {
  try {
    // Check if this is development environment
    if (process.env.NODE_ENV !== 'development') {
      return NextResponse.json(
        { error: 'This endpoint is only available in development' },
        { status: 403 }
      );
    }

    const { email, role } = await request.json();

    if (!email || !role) {
      return NextResponse.json(
        { error: 'Email and role are required' },
        { status: 400 }
      );
    }

    if (!['admin', 'customer'].includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role' },
        { status: 400 }
      );
    }

    const user = await prisma.user.update({
      where: { email },
      data: { role }
    });

    return NextResponse.json({
      message: 'User role updated',
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update user role' },
      { status: 500 }
    );
  }
}
