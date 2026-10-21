/**
 * useRoutePrefetch - Prefetch route chunks on hover/viewport intersection
 * 
 * Phase 8: Technical Performance
 * Reduces navigation latency by preloading JS chunks before the user clicks.
 */

import { useCallback, useRef } from 'react';

// Map of routes to their lazy import functions for prefetching
const ROUTE_PREFETCH_MAP: Record<string, () => Promise<unknown>> = {
  '/blog': () => import('@/pages/BlogPage'),
  '/auth': () => import('@/pages/Auth'),
};

const prefetchedRoutes = new Set<string>();

export function useRoutePrefetch() {
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const prefetch = useCallback((path: string) => {
    // Normalize path
    const route = path.replace(/\/$/, '') || '/';
    
    if (prefetchedRoutes.has(route)) return;

    // Check exact match first
    const importFn = ROUTE_PREFETCH_MAP[route];
    if (importFn) {
      prefetchedRoutes.add(route);
      // Use requestIdleCallback for non-blocking prefetch
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => importFn().catch(() => {}));
      } else {
        setTimeout(() => importFn().catch(() => {}), 100);
      }
    }
  }, []);

  const onMouseEnter = useCallback((path: string) => {
    // Small delay to avoid prefetching on accidental hovers
    timerRef.current = setTimeout(() => prefetch(path), 65);
  }, [prefetch]);

  const onMouseLeave = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  return { prefetch, onMouseEnter, onMouseLeave };
}

/**
 * Prefetch critical routes during idle time after initial load
 */
export function prefetchCriticalRoutes() {
  const criticalRoutes = ['/blog'];
  
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      criticalRoutes.forEach((route) => {
        const importFn = ROUTE_PREFETCH_MAP[route];
        if (importFn && !prefetchedRoutes.has(route)) {
          prefetchedRoutes.add(route);
          importFn().catch(() => {});
        }
      });
    }, { timeout: 5000 });
  }
}
