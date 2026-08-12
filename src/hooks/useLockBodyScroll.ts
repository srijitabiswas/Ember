import { useEffect } from 'react';
import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider';

/** Locks page scroll (both Lenis and native) for as long as `locked` is true. */
export function useLockBodyScroll(locked: boolean): void {
  const { stop, start } = useSmoothScroll();

  useEffect(() => {
    if (!locked) return;
    stop();
    return () => start();
  }, [locked, stop, start]);
}
