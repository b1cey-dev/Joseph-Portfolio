'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

interface UserSettings {
  emailNotifications: boolean;
  projectUpdates: boolean;
  supportMessages: boolean;
  bio: string;
}

export default function SettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<UserSettings>({
    emailNotifications: true,
    projectUpdates: true,
    supportMessages: true,
    bio: '',
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/user/settings', {
          credentials: 'include',
        });

        if (!response.ok) {
          if (response.status === 401) {
            router.push('/login');
            return;
          }
          throw new Error('Failed to fetch settings');
        }

        const data = await response.json();
        setSettings(data);
      } catch (error) {
        console.error('Error fetching settings:', error);
        toast.error('Failed to load settings');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch('/api/user/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(settings),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          router.push('/login');
          return;
        }
        throw new Error(result.error || 'Failed to update settings');
      }

      toast.success('Settings updated successfully');
    } catch (error) {
      console.error('Error updating settings:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <h1 className="text-2xl font-bold text-white mb-8">Settings</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-slate-900 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Notifications</h2>
              <div className="space-y-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={(e) =>
                      setSettings({ ...settings, emailNotifications: e.target.checked })
                    }
                    className="form-checkbox h-5 w-5 text-blue-500 rounded border-slate-700 bg-slate-800 focus:ring-blue-500 focus:ring-offset-slate-900"
                  />
                  <span className="text-white">Email Notifications</span>
                </label>

                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={settings.projectUpdates}
                    onChange={(e) =>
                      setSettings({ ...settings, projectUpdates: e.target.checked })
                    }
                    className="form-checkbox h-5 w-5 text-blue-500 rounded border-slate-700 bg-slate-800 focus:ring-blue-500 focus:ring-offset-slate-900"
                  />
                  <span className="text-white">Project Updates</span>
                </label>

                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={settings.supportMessages}
                    onChange={(e) =>
                      setSettings({ ...settings, supportMessages: e.target.checked })
                    }
                    className="form-checkbox h-5 w-5 text-blue-500 rounded border-slate-700 bg-slate-800 focus:ring-blue-500 focus:ring-offset-slate-900"
                  />
                  <span className="text-white">Support Messages</span>
                </label>
              </div>
            </div>

            <div className="bg-slate-900 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Profile</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">
                    Bio
                  </label>
                  <textarea
                    value={settings.bio}
                    onChange={(e) => setSettings({ ...settings, bio: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </div>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  );
} 