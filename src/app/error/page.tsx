'use client';

import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';

const errorMessages: Record<string, string> = {
  Configuration: 'There is a problem with the server configuration.',
  AccessDenied: 'You do not have permission to access this resource.',
  Verification: 'The verification link has expired or has already been used.',
  Default: 'An unexpected error occurred.',
};

export default function Error() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error') || 'Default';
  const message = errorMessages[error] || errorMessages.Default;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-[#0c1220] text-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md text-center"
      >
        <div className="bg-slate-800/60 rounded-lg p-8 shadow-xl">
          <h1 className="text-3xl font-bold mb-4">Authentication Error</h1>
          <p className="text-slate-400 mb-8">{message}</p>

          <div className="space-y-4">
            <Link
              href="/login"
              className="block w-full bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
            >
              Return to Login
            </Link>
            
            <Link
              href="/"
              className="block w-full bg-slate-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-600 transition-colors"
            >
              Go to Homepage
            </Link>
          </div>
        </div>
      </motion.div>
    </main>
  );
} 