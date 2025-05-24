'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  UserGroupIcon,
  DocumentDuplicateIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { signOut } from 'next-auth/react';

// Dashboard card component
const DashboardCard = ({ title, value, icon: Icon, description, onClick }: {
  title: string;
  value: string | number;
  icon: any;
  description: string;
  onClick?: () => void;
}) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="bg-slate-800 p-6 rounded-xl shadow-lg cursor-pointer"
    onClick={onClick}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-slate-400 text-sm">{title}</p>
        <h3 className="text-2xl font-bold text-white mt-2">{value}</h3>
        <p className="text-slate-400 text-sm mt-2">{description}</p>
      </div>
      <Icon className="w-12 h-12 text-blue-500" />
    </div>
  </motion.div>
);

export default function AdminDashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProjects: 0,
    activeUsers: 0,
  });

  useEffect(() => {
    // Redirect if not admin
    if (status === 'unauthenticated' || (session?.user?.role !== 'ADMIN')) {
      router.push('/login');
    }
  }, [status, session, router]);

  useEffect(() => {
    // Fetch dashboard stats
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/stats');
        const data = await response.json();
        if (response.ok) {
          setStats(data);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };

    if (session?.user?.role === 'ADMIN') {
      fetchStats();
    }
  }, [session]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (status === 'unauthenticated' || (session?.user?.role !== 'ADMIN')) {
    return null; // Will redirect in useEffect
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors"
            >
              <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Total Users"
            value={stats.totalUsers}
            icon={UserGroupIcon}
            description="Registered users on the platform"
            onClick={() => router.push('/admin/users')}
          />
          <DashboardCard
            title="Projects"
            value={stats.totalProjects}
            icon={DocumentDuplicateIcon}
            description="Total projects created"
            onClick={() => router.push('/admin/projects')}
          />
          <DashboardCard
            title="Active Users"
            value={stats.activeUsers}
            icon={ChartBarIcon}
            description="Users active in last 30 days"
            onClick={() => router.push('/admin/analytics')}
          />
          <DashboardCard
            title="Settings"
            value="Manage"
            icon={Cog6ToothIcon}
            description="Configure system settings"
            onClick={() => router.push('/admin/settings')}
          />
        </div>

        {/* Recent Activity */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-white mb-6">Recent Activity</h2>
          <div className="bg-slate-900 rounded-xl p-6">
            <div className="space-y-4">
              {/* Activity items would go here */}
              <p className="text-slate-400 text-sm">No recent activity to display</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 