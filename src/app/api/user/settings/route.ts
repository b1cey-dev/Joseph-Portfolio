import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    // Get user info from request headers (set by middleware)
    const userHeader = req.headers.get('user');
    if (!userHeader) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = JSON.parse(userHeader);

    // Fetch user settings
    const settings = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        emailNotifications: true,
        projectUpdates: true,
        supportMessages: true,
        bio: true,
      },
    });

    if (!settings) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching user settings:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    // Get user info from request headers (set by middleware)
    const userHeader = req.headers.get('user');
    if (!userHeader) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = JSON.parse(userHeader);
    const data = await req.json();

    // Validate the request body
    const { emailNotifications, projectUpdates, supportMessages, bio } = data;
    if (typeof emailNotifications !== 'boolean' ||
        typeof projectUpdates !== 'boolean' ||
        typeof supportMessages !== 'boolean' ||
        (bio !== null && typeof bio !== 'string')) {
      return NextResponse.json(
        { error: 'Invalid data format' },
        { status: 400 }
      );
    }

    // Update user settings
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        emailNotifications,
        projectUpdates,
        supportMessages,
        bio,
      },
    });

    return NextResponse.json({
      emailNotifications: updatedUser.emailNotifications,
      projectUpdates: updatedUser.projectUpdates,
      supportMessages: updatedUser.supportMessages,
      bio: updatedUser.bio,
    });
  } catch (error) {
    console.error('Error updating user settings:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 