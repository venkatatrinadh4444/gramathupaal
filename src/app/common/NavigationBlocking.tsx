'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function BlockNavigation() {
  const router = useRouter();

  useEffect(() => {
    const blockNavigation = () => {
      // Always stay on current path
      router.replace(window.location.pathname);
    };

    // Push a dummy history entry to prevent back/forward
    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', blockNavigation);

    return () => {
      window.removeEventListener('popstate', blockNavigation);
    };
  }, [router]);

  return null;
}
