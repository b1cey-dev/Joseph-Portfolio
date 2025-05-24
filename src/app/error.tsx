"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white px-4">
      <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
      <p className="mb-8 text-center max-w-xl">{error.message}</p>
      <button
        onClick={() => reset()}
        className="px-6 py-2 bg-blue-500 rounded hover:bg-blue-600 transition"
      >
        Try again
      </button>
    </div>
  );
} 