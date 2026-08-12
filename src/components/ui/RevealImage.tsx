import { useRef, type ReactNode } from 'react';
import { gsap, useGSAP, EASE, SCROLL_REVEAL } from '@/animations/gsapConfig';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/utils';

type CurtainColor = 'sage' | 'hero' | 'surface';

const CURTAIN_CLASSES: Record<CurtainColor, string> = {
  sage: 'bg-bg-alt',
  hero: 'bg-hero',
  surface: 'bg-surface',
};

interface RevealImageProps {
  children: ReactNode;
  className?: string;
  curtainColor?: CurtainColor;
  /** Seconds — lets a grid of images stagger their reveals relative to one another. */
  delay?: number;
}

/**
 * On scroll-into-view: a solid curtain wipes away left-to-right while the
 * content underneath settles from a slight scale — the "clip-path reveal +
 * image scaling" pairing called for in the animation brief, built from a
 * masked container instead of an actual clip-path so it composites on the
 * GPU (transform/opacity only) for guaranteed-smooth 60fps scrolling.
 */
export function RevealImage({ children, className, curtainColor = 'sage', delay = 0 }: RevealImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion || !contentRef.current || !curtainRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: { trigger: containerRef.current, ...SCROLL_REVEAL },
        delay,
      });

      tl.fromTo(
        contentRef.current,
        { scale: 1.18 },
        { scale: 1, duration: 1.6, ease: EASE.premium },
        0,
      ).fromTo(
        curtainRef.current,
        { scaleX: 1 },
        { scaleX: 0, duration: 1.05, ease: EASE.premium, transformOrigin: 'right center' },
        0.08,
      );
    },
    { scope: containerRef, dependencies: [prefersReducedMotion, delay, curtainColor] },
  );

  return (
    <div ref={containerRef} className={cn('reveal-mask relative', className)}>
      <div ref={contentRef} className="h-full w-full will-change-transform">
        {children}
      </div>
      <div
        ref={curtainRef}
        aria-hidden
        className={cn('absolute inset-0 z-10 will-change-transform', CURTAIN_CLASSES[curtainColor])}
      />
    </div>
  );
}
