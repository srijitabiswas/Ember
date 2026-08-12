import { useRef } from 'react';
import { gsap, SplitText, useGSAP, EASE, DURATION, SCROLL_REVEAL } from '@/animations/gsapConfig';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface SplitRevealProps {
  children: string;
  /** 'lines' pairs with GSAP's line-mask reveal (dramatic, for big headlines); 'words' is a lighter stagger fade+rise. */
  splitType?: 'words' | 'lines' | 'chars';
  className?: string;
  /** Seconds before the reveal starts — used to stagger multiple headings inside the same hero. */
  delay?: number;
  stagger?: number;
  /** True (default) ties the reveal to ScrollTrigger; false plays immediately on mount (above-the-fold copy). */
  scrollTriggered?: boolean;
}

/**
 * Wraps a string in an animated split-text reveal. Deliberately renders a
 * plain <span> — the caller supplies the semantic heading tag around it
 * (`<h2><SplitReveal>…</SplitReveal></h2>`) so document outline and SEO
 * stay correct regardless of which visual treatment is used.
 */
export function SplitReveal({
  children,
  splitType = 'words',
  className,
  delay = 0,
  stagger = 0.045,
  scrollTriggered = true,
}: SplitRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion) return;

      const resolvedType = splitType === 'lines' ? 'lines' : splitType === 'chars' ? 'chars' : 'words';

      const split = SplitText.create(el, {
        type: resolvedType,
        mask: resolvedType === 'lines' ? 'lines' : undefined,
        autoSplit: true,
        onSplit: (self) => {
          const targets = resolvedType === 'lines' ? self.lines : resolvedType === 'chars' ? self.chars : self.words;
          return gsap.from(targets, {
            yPercent: 115,
            opacity: 0,
            duration: DURATION.base,
            ease: EASE.premium,
            stagger,
            delay,
            scrollTrigger: scrollTriggered ? { trigger: el, ...SCROLL_REVEAL } : undefined,
          });
        },
      });

      return () => split.revert();
    },
    { scope: ref, dependencies: [children, splitType, scrollTriggered, delay, stagger, prefersReducedMotion] },
  );

  return (
    <span ref={ref} className={className}>
      {children}
    </span>
  );
}
