import { PrismaClient, ProjectStatus, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user if not exists
  const adminEmail = 'joseph@jsrob.com';
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('your-secure-password', 10);
    await prisma.user.create({
      data: {
        email: adminEmail,
        name: 'Joseph Robinson',
        password: hashedPassword,
        role: Role.ADMIN,
        bio: 'Full-stack developer passionate about building innovative solutions.',
        emailNotifications: true,
        projectUpdates: true,
        supportMessages: true,
      },
    });
  }

  // Create or update Subpace project
  const subpaceProject = await prisma.project.upsert({
    where: {
      title_userId: {
        title: 'Subpace - Community Management Platform',
        userId: existingAdmin?.id || '',
      },
    },
    update: {},
    create: {
      title: 'Subpace - Community Management Platform',
      description: 'Building Subpace, a SaaS platform for community management, member engagement, and seamless integrations with Discord, Slack, and more. Leading product vision, business strategy, and a cross-functional team to empower creators and organizations to grow and monetize their online communities.',
      status: ProjectStatus.ACTIVE,
      progress: 75,
      dueDate: new Date('2024-12-31'),
      user: {
        connect: {
          email: adminEmail,
        },
      },
      milestones: {
        create: [
          {
            name: 'Multi-Platform Integration',
            status: ProjectStatus.COMPLETED,
          },
          {
            name: 'Advanced Analytics Dashboard',
            status: ProjectStatus.ACTIVE,
          },
          {
            name: 'Secure Access Control',
            status: ProjectStatus.ACTIVE,
          },
        ],
      },
      deliverables: {
        create: [
          {
            name: 'Discord Integration',
            status: ProjectStatus.COMPLETED,
          },
          {
            name: 'WhatsApp Integration',
            status: ProjectStatus.COMPLETED,
          },
          {
            name: 'Slack Integration',
            status: ProjectStatus.ACTIVE,
          },
          {
            name: 'Member Analytics',
            status: ProjectStatus.ACTIVE,
          },
          {
            name: 'Payment Processing',
            status: ProjectStatus.COMPLETED,
          },
        ],
      },
    },
  });

  console.log('Seed completed successfully');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 