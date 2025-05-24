'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';

interface Project {
  id: string;
  name: string;
  status: string;
  progress: number;
  deadline: string;
  update: string;
}

export default function Status() {
  const { data: session, status } = useSession();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/client/projects');
        if (!response.ok) throw new Error('Failed to fetch projects');
        const data = await response.json();
        setProjects(data.projects.map((project: any) => ({
          ...project,
          progress: calculateProgress(project),
          update: getLatestUpdate(project),
        })));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (status === 'authenticated') {
      fetchProjects();
    }
  }, [status]);

  const calculateProgress = (project: any) => {
    const totalItems = project.milestones.length + project.deliverables.length;
    const completedItems = project.milestones.filter((m: any) => m.status === 'COMPLETED').length +
                         project.deliverables.filter((d: any) => d.status === 'COMPLETED').length;
    return Math.round((completedItems / totalItems) * 100);
  };

  const getLatestUpdate = (project: any) => {
    const latestMilestone = project.milestones
      .sort((a: any, b: any) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())[0];
    return latestMilestone ? `Latest milestone: ${latestMilestone.name}` : 'No updates yet';
  };

  if (status === 'loading' || loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-900 to-[#0c1220] text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
      </main>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-900 to-[#0c1220] text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
          <p className="text-slate-400">Please sign in to view project status.</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-900 to-[#0c1220] text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p className="text-red-400">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-[#0c1220] text-white">
      <div className="container mx-auto px-4 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-8">Project Status</h1>
          
          <div className="grid gap-8">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-800/60 rounded-lg p-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">{project.name}</h2>
                  <span className="text-slate-400 text-sm">
                    Deadline: {new Date(project.deadline).toLocaleDateString()}
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${project.progress}%` }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-blue-500 h-2 rounded-full"
                      />
                    </div>
                  </div>

                  <div className="text-slate-300 text-sm">{project.update}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
} 