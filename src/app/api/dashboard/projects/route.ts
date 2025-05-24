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

    // Fetch user's projects with milestones and deliverables
    const projects = await prisma.project.findMany({
      where: { userId: user.id },
      include: {
        milestones: true,
        deliverables: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return NextResponse.json({ projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 