'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function BlockNavigation() {
  const router = useRouter();

  useEffect(() => {
    // Push a dummy state
    history.pushState(null, '', location.href);

    const handlePopState = (e: PopStateEvent) => {
      // Immediately re-push current page to prevent back navigation
      history.pushState(null, '', location.href);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return null;
}


/* 'use client';

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


 */