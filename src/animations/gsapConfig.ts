import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

/**
 * Plugins are registered exactly once, here. Every component imports gsap /
 * ScrollTrigger / SplitText / useGSAP from this file (instead of the
 * packages directly) so registration is guaranteed to have already run.
 * (ScrollTrigger and SplitText have shipped free in core `gsap` since v3.13.)
 */
gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export { gsap, ScrollTrigger, SplitText, useGSAP };

/** Shared easing tokens — restrained, no bounce/elastic, per the brand's motion rules. */
export const EASE = {
  premium: 'power3.out',
  premiumInOut: 'power2.inOut',
  soft: 'power1.out',
  snappy: 'power4.out',
} as const;

/** Shared duration tokens (seconds), so pacing stays consistent across every section. */
export const DURATION = {
  fast: 0.5,
  base: 0.9,
  slow: 1.4,
  cinematic: 2,
} as const;

/** Common ScrollTrigger defaults for a "fade/slide in once, and reverse if scrolled back past" reveal. */
export const SCROLL_REVEAL = {
  start: 'top 82%',
  toggleActions: 'play none none reverse',
} as const;

/** Same as SCROLL_REVEAL, but never reverses — used for one-shot moments like counters. */
export const SCROLL_REVEAL_ONCE = {
  start: 'top 85%',
  toggleActions: 'play none none none',
  once: true,
} as const;
