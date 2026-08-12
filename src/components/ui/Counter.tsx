import { useRef } from 'react';
import { gsap, useGSAP, SCROLL_REVEAL_ONCE } from '@/animations/gsapConfig';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/utils';

interface CounterProps {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

/** Counts up from 0 to `value` once its container scrolls into view. */
export function Counter({ value, suffix = '', duration = 2, className }: CounterProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const digitsRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      const digitsEl = digitsRef.current;
      if (!digitsEl) return;

      if (prefersReducedMotion) {
        digitsEl.textContent = value.toLocaleString('en-US');
        return;
      }

      const counter = { current: 0 };
      gsap.to(counter, {
        current: value,
        duration,
        ease: 'power2.out',
        scrollTrigger: { trigger: containerRef.current, ...SCROLL_REVEAL_ONCE },
        onUpdate: () => {
          digitsEl.textContent = Math.round(counter.current).toLocaleString('en-US');
        },
      });
    },
    { scope: containerRef, dependencies: [value, duration, prefersReducedMotion] },
  );

  return (
    <span ref={containerRef} className={cn('font-numeric tabular-nums', className)}>
      <span ref={digitsRef}>0</span>
      {suffix}
    </span>
  );
}
