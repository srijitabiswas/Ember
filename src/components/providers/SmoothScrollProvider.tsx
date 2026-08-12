import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/animations/gsapConfig';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export type ScrollToTarget = string | number | HTMLElement;

interface ScrollToOptions {
  /** Pixels added to the target's natural position — pass a negative value to stop short (e.g. to clear a fixed navbar). */
  offset?: number;
  duration?: number;
}

interface SmoothScrollContextValue {
  lenis: Lenis | null;
  scrollTo: (target: ScrollToTarget, options?: ScrollToOptions) => void;
  /** Halts scrolling entirely (both Lenis and native) — used by the mobile menu and lightbox while open. */
  stop: () => void;
  start: () => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue | null>(null);

/**
 * Owns the single Lenis instance for the page and keeps it in lockstep with
 * GSAP's ticker + ScrollTrigger, per the documented Lenis/GSAP integration:
 * Lenis drives the scroll, GSAP's ticker drives Lenis's RAF loop, and
 * ScrollTrigger is told to recompute on every Lenis scroll event.
 *
 * When the user prefers reduced motion, Lenis is never instantiated at all
 * and every `scrollTo` call falls back to plain native scrolling — this is
 * deliberately more thorough than only slowing the animation down.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.1,
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);
    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
    };
  }, [prefersReducedMotion]);

  // Headline reveals are measured against Playfair Display's metrics; once
  // the real webfont swaps in, box sizes can shift slightly, so re-measure
  // every pinned/triggered animation once fonts are actually ready.
  useEffect(() => {
    document.fonts?.ready
      .then(() => ScrollTrigger.refresh())
      .catch(() => undefined);
  }, []);

  const scrollTo = useCallback(
    (target: ScrollToTarget, options?: ScrollToOptions) => {
      const lenis = lenisRef.current;
      if (lenis) {
        lenis.scrollTo(target, { offset: options?.offset ?? 0, duration: options?.duration });
        return;
      }

      const behavior: ScrollBehavior = prefersReducedMotion ? 'auto' : 'smooth';
      if (typeof target === 'number') {
        window.scrollTo({ top: target + (options?.offset ?? 0), behavior });
        return;
      }
      const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
      el?.scrollIntoView({ behavior, block: 'start' });
    },
    [prefersReducedMotion],
  );

  const stop = useCallback(() => {
    lenisRef.current?.stop();
    document.body.style.overflow = 'hidden';
  }, []);

  const start = useCallback(() => {
    lenisRef.current?.start();
    document.body.style.overflow = '';
  }, []);

  const value = useMemo<SmoothScrollContextValue>(
    () => ({ lenis: lenisInstance, scrollTo, stop, start }),
    [lenisInstance, scrollTo, stop, start],
  );

  return <SmoothScrollContext.Provider value={value}>{children}</SmoothScrollContext.Provider>;
}

export function useSmoothScroll(): SmoothScrollContextValue {
  const ctx = useContext(SmoothScrollContext);
  if (!ctx) {
    throw new Error('useSmoothScroll must be used within a SmoothScrollProvider');
  }
  return ctx;
}
