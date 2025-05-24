import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    // Verify admin session
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get total users count
    const totalUsers = await prisma.user.count();

    // Get total projects count
    const totalProjects = await prisma.project.count();

    // Get active users (users who have logged in within the last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const activeUsers = await prisma.user.count({
      where: {
        updatedAt: {
          gte: thirtyDaysAgo
        }
      }
    });

    return NextResponse.json({
      totalUsers,
      totalProjects,
      activeUsers,
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch admin statistics' },
      { status: 500 }
    );
  }
} 