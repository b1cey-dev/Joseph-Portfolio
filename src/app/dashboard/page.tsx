'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ChartBarIcon,
  FolderIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  BellIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';

interface DashboardStats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  notifications: number;
}

interface Project {
  id: string;
  title: string;
  description: string | null;
  status: 'ACTIVE' | 'PENDING' | 'COMPLETED' | 'ARCHIVED';
  progress: number;
  dueDate: string | null;
  milestones: Array<{
    id: string;
    name: string;
    status: string;
  }>;
  deliverables: Array<{
    id: string;
    name: string;
    status: string;
  }>;
}

const DashboardCard = ({ title, value, icon: Icon, description }: {
  title: string;
  value: string | number;
  icon: any;
  description: string;
}) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="bg-slate-800 p-6 rounded-xl shadow-lg"
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

export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    totalProjects: 0,
    activeProjects: 0,
    completedProjects: 0,
    notifications: 0,
  });
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsResponse, projectsResponse] = await Promise.all([
          fetch('/api/dashboard/stats', {
            credentials: 'include',
          }),
          fetch('/api/dashboard/projects', {
            credentials: 'include',
          }),
        ]);

        if (statsResponse.ok && projectsResponse.ok) {
          const [statsData, projectsData] = await Promise.all([
            statsResponse.json(),
            projectsResponse.json(),
          ]);

          setStats(statsData);
          setProjects(projectsData.projects);
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        router.push('/login');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <button className="text-slate-400 hover:text-white transition-colors">
                <BellIcon className="w-6 h-6" />
              </button>
              <button className="text-slate-400 hover:text-white transition-colors">
                <UserCircleIcon className="w-6 h-6" />
              </button>
              <button
                onClick={handleLogout}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeftOnRectangleIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <DashboardCard
                title="Total Projects"
                value={stats.totalProjects}
                icon={FolderIcon}
                description="All your projects"
              />
              <DashboardCard
                title="Active Projects"
                value={stats.activeProjects}
                icon={ChartBarIcon}
                description="Projects in progress"
              />
              <DashboardCard
                title="Completed"
                value={stats.completedProjects}
                icon={ChartBarIcon}
                description="Finished projects"
              />
              <DashboardCard
                title="Notifications"
                value={stats.notifications}
                icon={BellIcon}
                description="Unread notifications"
              />
            </div>

            {/* Recent Activity */}
            <section className="mt-12">
              <h2 className="text-xl font-semibold text-white mb-6">Recent Activity</h2>
              <div className="bg-slate-900 rounded-xl p-6">
                <div className="space-y-6">
                  {/* Activity Item */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-500/10 p-2 rounded-lg">
                        <ChartBarIcon className="w-6 h-6 text-blue-500" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium">Project Update</h3>
                        <p className="text-slate-400 text-sm">New milestone achieved in Project X</p>
                      </div>
                    </div>
                    <span className="text-slate-400 text-sm">2 hours ago</span>
                  </div>

                  {/* Activity Item */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-green-500/10 p-2 rounded-lg">
                        <FolderIcon className="w-6 h-6 text-green-500" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium">New Project</h3>
                        <p className="text-slate-400 text-sm">Started working on Project Y</p>
                      </div>
                    </div>
                    <span className="text-slate-400 text-sm">1 day ago</span>
                  </div>

                  {/* Activity Item */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-purple-500/10 p-2 rounded-lg">
                        <Cog6ToothIcon className="w-6 h-6 text-purple-500" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium">Settings Updated</h3>
                        <p className="text-slate-400 text-sm">Modified notification preferences</p>
                      </div>
                    </div>
                    <span className="text-slate-400 text-sm">2 days ago</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Projects Overview */}
            <section className="mt-12">
              <h2 className="text-xl font-semibold text-white mb-6">Projects Overview</h2>
              <div className="bg-slate-900 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-800">
                    <thead className="bg-slate-800">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                          Project
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                          Progress
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                          Due Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {projects.map((project) => (
                        <tr key={project.id} className="hover:bg-slate-800/50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-white">{project.title}</div>
                            <div className="text-sm text-slate-400">{project.description}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${
                                project.status === 'ACTIVE'
                                  ? 'bg-green-500/10 text-green-500'
                                  : project.status === 'PENDING'
                                  ? 'bg-yellow-500/10 text-yellow-500'
                                  : project.status === 'COMPLETED'
                                  ? 'bg-blue-500/10 text-blue-500'
                                  : 'bg-red-500/10 text-red-500'
                              }`}
                            >
                              {project.status.charAt(0) + project.status.slice(1).toLowerCase()}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="w-full bg-slate-700 rounded-full h-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: `${project.progress}%` }}
                              ></div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                            {project.dueDate
                              ? new Date(project.dueDate).toLocaleDateString()
                              : 'No due date'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
} 