import { useRef, useState } from 'react';
import { gsap, useGSAP, EASE } from '@/animations/gsapConfig';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { SITE } from '@/constants/site';
import { BrandMark } from '@/components/ui/BrandMark';

interface PageLoaderProps {
  /** Fires once the exit animation finishes — the Hero uses this to start its own entrance timeline. */
  onComplete?: () => void;
}

/** A short, choreographed brand moment shown once on first load, ahead of the cinematic Hero. */
export function PageLoader({ onComplete }: PageLoaderProps) {
  const [isRemoved, setIsRemoved] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLParagraphElement>(null);
  const barTrackRef = useRef<HTMLDivElement>(null);
  const barFillRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      document.documentElement.style.overflow = 'hidden';

      const finish = () => {
        document.documentElement.style.overflow = '';
        setIsRemoved(true);
        onComplete?.();
      };

      if (prefersReducedMotion) {
        const timeoutId = window.setTimeout(finish, 150);
        return () => window.clearTimeout(timeoutId);
      }

      const tl = gsap.timeline({ onComplete: finish });
      tl.set([markRef.current, wordRef.current, barTrackRef.current], { opacity: 0 })
        .to(markRef.current, { opacity: 1, duration: 0.6, ease: EASE.soft })
        .to(wordRef.current, { opacity: 1, duration: 0.6, ease: EASE.soft }, '<0.1')
        .to(barTrackRef.current, { opacity: 1, duration: 0.4 }, '<')
        .fromTo(
          barFillRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 1.1, ease: EASE.premiumInOut, transformOrigin: 'left center' },
          '<0.1',
        )
        .to([markRef.current, wordRef.current, barTrackRef.current], { opacity: 0, duration: 0.4, ease: EASE.soft }, '+=0.15')
        .to(panelRef.current, { yPercent: -100, duration: 0.9, ease: EASE.premium }, '<0.05');

      return () => {
        tl.kill();
      };
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] },
  );

  if (isRemoved) return null;

  return (
    <div
      ref={containerRef}
      role="status"
      aria-live="polite"
      aria-label={`Loading ${SITE.name}`}
      className="fixed inset-0 z-[100]"
    >
      <div ref={panelRef} className="flex h-full w-full flex-col items-center justify-center bg-hero">
        <div ref={markRef} className="mb-5 h-12 w-12 text-clay">
          <BrandMark className="h-full w-full" ringClassName="text-hero-ink/25" />
        </div>
        <p ref={wordRef} className="font-display text-2xl tracking-[0.3em] text-hero-ink">
          {SITE.name}
        </p>
        <div ref={barTrackRef} className="mt-8 h-px w-40 overflow-hidden bg-hero-ink/15">
          <div ref={barFillRef} className="h-full w-full origin-left bg-clay" />
        </div>
      </div>
    </div>
  );
}
