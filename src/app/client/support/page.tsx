'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';

interface TicketFormData {
  subject: string;
  description: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
}

export default function Support() {
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState<TicketFormData>({
    subject: '',
    description: '',
    priority: 'MEDIUM',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/client/support', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit ticket');
      }

      setSuccess(true);
      setFormData({
        subject: '',
        description: '',
        priority: 'MEDIUM',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
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
          <p className="text-slate-400">Please sign in to access support.</p>
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
          className="max-w-2xl mx-auto"
        >
          <h1 className="text-3xl font-bold mb-8">Support</h1>
          
          <div className="bg-slate-800/60 rounded-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-900 rounded-lg border border-slate-700 focus:outline-none focus:border-blue-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-900 rounded-lg border border-slate-700 focus:outline-none focus:border-blue-500 transition-colors min-h-[150px]"
                  required
                />
              </div>

              <div>
                <label htmlFor="priority" className="block text-sm font-medium mb-2">
                  Priority
                </label>
                <select
                  id="priority"
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value as 'LOW' | 'MEDIUM' | 'HIGH' })}
                  className="w-full px-4 py-2 bg-slate-900 rounded-lg border border-slate-700 focus:outline-none focus:border-blue-500 transition-colors"
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </select>
              </div>

              {error && (
                <div className="text-red-400 text-sm">{error}</div>
              )}

              {success && (
                <div className="text-green-400 text-sm">
                  Ticket submitted successfully! We'll get back to you soon.
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg font-medium ${
                  loading
                    ? 'bg-blue-500/50 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600 transition-colors'
                }`}
              >
                {loading ? 'Submitting...' : 'Submit Ticket'}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </main>
  );
} 