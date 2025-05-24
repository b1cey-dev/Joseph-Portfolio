import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ProjectStatus } from '@prisma/client';

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

    // Fetch projects count from database
    const [totalProjects, activeProjects, completedProjects] = await Promise.all([
      prisma.project.count({
        where: { userId: user.id },
      }),
      prisma.project.count({
        where: {
          userId: user.id,
          status: ProjectStatus.ACTIVE,
        },
      }),
      prisma.project.count({
        where: {
          userId: user.id,
          status: ProjectStatus.COMPLETED,
        },
      }),
    ]);

    // For now, hardcode notifications count
    // In a real app, you would fetch this from a notifications table
    const notifications = 3;

    return NextResponse.json({
      totalProjects,
      activeProjects,
      completedProjects,
      notifications,
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 