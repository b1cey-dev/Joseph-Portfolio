import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { Prisma } from '@prisma/client';

// Schema for profile update
const profileSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  bio: z.string().max(500).optional(),
});

// Schema for notification preferences
const notificationSchema = z.object({
  emailNotifications: z.boolean(),
  projectUpdates: z.boolean(),
  supportMessages: z.boolean(),
});

// Schema for password update
const passwordSchema = z.object({
  currentPassword: z.string().min(8),
  newPassword: z.string().min(8),
  confirmPassword: z.string().min(8),
});

export async function PUT(req: Request) {
  try {
    // Get the session
    const session = await getServerSession(authOptions);
    console.log('Session in API:', session);

    // Check if user is authenticated
    if (!session?.user?.email) {
      console.log('No authenticated user found');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { type, data } = body;

    if (!type || !data) {
      return NextResponse.json(
        { error: 'Missing required fields: type and data' },
        { status: 400 }
      );
    }

    console.log('Processing settings update:', { type, userEmail: session.user.email });

    // Verify user exists
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      console.log('User not found:', session.user.email);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    switch (type) {
      case 'profile':
        try {
          const profileData = profileSchema.parse(data);
          await prisma.user.update({
            where: { email: session.user.email },
            data: {
              name: profileData.name,
              email: profileData.email,
              bio: profileData.bio,
            },
          });
          console.log('Profile updated successfully');
        } catch (error) {
          console.error('Profile update error:', error);
          throw error;
        }
        break;

      case 'notifications':
        try {
          const notificationData = notificationSchema.parse(data);
          await prisma.$executeRaw`
            UPDATE "User"
            SET "emailNotifications" = ${notificationData.emailNotifications},
                "projectUpdates" = ${notificationData.projectUpdates},
                "supportMessages" = ${notificationData.supportMessages}
            WHERE email = ${session.user.email}
          `;
          console.log('Notifications updated successfully');
        } catch (error) {
          console.error('Notifications update error:', error);
          throw error;
        }
        break;

      case 'security':
        try {
          const securityData = passwordSchema.parse(data);
          
          if (securityData.newPassword !== securityData.confirmPassword) {
            return NextResponse.json(
              { error: 'Passwords do not match' },
              { status: 400 }
            );
          }

          await prisma.user.update({
            where: { email: session.user.email },
            data: {
              password: securityData.newPassword, // Note: Should be hashed in production
            },
          });
          console.log('Security settings updated successfully');
        } catch (error) {
          console.error('Security settings update error:', error);
          throw error;
        }
        break;

      default:
        return NextResponse.json(
          { error: `Invalid update type: ${type}` },
          { status: 400 }
        );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Settings update error:', {
      error,
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid data', details: error.errors },
        { status: 400 }
      );
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json(
          { error: 'Email already exists' },
          { status: 400 }
        );
      }
    }
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 