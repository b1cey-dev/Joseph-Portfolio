import Link from 'next/link';
import { UserCircleIcon, ClipboardDocumentListIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

export default function ClientArea() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-[#0c1220] text-white">
      <section className="container mx-auto px-4 pt-32 pb-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center mb-4">
            <UserCircleIcon className="w-12 h-12 text-blue-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome, Client</h1>
          <p className="text-slate-400 text-lg">
            Access your dashboard, track project progress, and get support—all in one place.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Dashboard Card */}
          <div className="bg-slate-800/50 p-8 rounded-lg backdrop-blur-sm hover:bg-slate-800 transition-all hover:scale-105 group text-center">
            <ClipboardDocumentListIcon className="w-10 h-10 mx-auto text-blue-500 mb-4" />
            <h2 className="text-xl font-bold mb-2">Project Dashboard</h2>
            <p className="text-slate-400 mb-4">View all your active and completed projects, milestones, and deliverables.</p>
            <Link href="/client/dashboard" className="text-blue-500 font-semibold hover:underline">Go to Dashboard</Link>
          </div>

          {/* Project Status Card */}
          <div className="bg-slate-800/50 p-8 rounded-lg backdrop-blur-sm hover:bg-slate-800 transition-all hover:scale-105 group text-center">
            <ClipboardDocumentListIcon className="w-10 h-10 mx-auto text-blue-500 mb-4" />
            <h2 className="text-xl font-bold mb-2">Project Status</h2>
            <p className="text-slate-400 mb-4">Check the latest updates, deadlines, and progress for your ongoing projects.</p>
            <Link href="/client/status" className="text-blue-500 font-semibold hover:underline">View Status</Link>
          </div>

          {/* Support Card */}
          <div className="bg-slate-800/50 p-8 rounded-lg backdrop-blur-sm hover:bg-slate-800 transition-all hover:scale-105 group text-center">
            <ChatBubbleLeftRightIcon className="w-10 h-10 mx-auto text-blue-500 mb-4" />
            <h2 className="text-xl font-bold mb-2">Support & Messages</h2>
            <p className="text-slate-400 mb-4">Need help? Contact support or view your message history with Joseph Robinson.</p>
            <Link href="/client/support" className="text-blue-500 font-semibold hover:underline">Contact Support</Link>
          </div>
        </div>
      </section>
    </main>
  );
} 