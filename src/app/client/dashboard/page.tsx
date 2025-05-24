'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';

interface Project {
  id: string;
  name: string;
  status: string;
  milestones: { id: string; name: string; status: string; }[];
  deliverables: { id: string; name: string; status: string; }[];
}

export default function Dashboard() {
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
        setProjects(data.projects);
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
          <p className="text-slate-400">Please sign in to view your dashboard.</p>
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
          <h1 className="text-3xl font-bold mb-8">Project Dashboard</h1>
          
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
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    project.status === 'ACTIVE' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'
                  }`}>
                    {project.status}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Milestones</h3>
                    <ul className="space-y-2">
                      {project.milestones.map((milestone) => (
                        <li key={milestone.id} className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${
                            milestone.status === 'COMPLETED' ? 'bg-green-400' : 'bg-slate-400'
                          }`} />
                          {milestone.name}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Deliverables</h3>
                    <ul className="space-y-2">
                      {project.deliverables.map((deliverable) => (
                        <li key={deliverable.id} className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${
                            deliverable.status === 'COMPLETED' ? 'bg-green-400' : 'bg-slate-400'
                          }`} />
                          {deliverable.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
} 