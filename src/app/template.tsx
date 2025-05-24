'use client';

import { useState, useEffect } from 'react';
import Loading from '@/components/Loading';

export default function Template({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      <div className={isLoading ? 'hidden' : ''}>
        {children}
      </div>
    </>
  );
} 