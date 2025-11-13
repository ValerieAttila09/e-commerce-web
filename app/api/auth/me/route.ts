import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthToken, verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const token = await getAuthToken();

    if (!token) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phoneNumber: user.phoneNumber,
          address: user.address,
          role: user.role,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Get auth error:', error);
    return NextResponse.json(
      { message: 'An error occurred' },
      { status: 500 }
    );
  }
}
