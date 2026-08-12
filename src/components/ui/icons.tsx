import type { SVGProps } from 'react';

/**
 * Hand-drawn, single-color line icons for the handful of restaurant-specific
 * glyphs Feather doesn't cover (chef hat, flame, leaf, …). Kept deliberately
 * geometric and simple rather than illustrative, both to match the "minimal
 * icons" brief and to stay crisp at the small sizes badges/cards use.
 *
 * All icons share Feather's visual contract — 24x24 viewBox, currentColor
 * stroke, 1.5 weight, round caps/joins — so they sit naturally next to
 * react-icons/fi glyphs used elsewhere in the UI.
 */

type GlyphProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  xmlns: 'http://www.w3.org/2000/svg',
};

export function IconFlame(props: GlyphProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3c1.5 2.3 2.1 4 1.9 5.6C15.4 6.9 16.6 5.5 17 4c1.4 2 2.5 4.4 2.5 7.1C19.5 15.5 16.1 19 12 19S4.5 15.5 4.5 11.1C4.5 8 6 5.6 8 3.6c.2 2.2.9 3.6 2 4.2C10.6 6.2 11.1 4.7 12 3Z" />
    </svg>
  );
}

export function IconLeaf(props: GlyphProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 20C3.5 14.5 5 8 12 4c7 4 8.5 10.5 6 16-2.2-1-4-1-6 0-2-1-3.8-1-6 0Z" />
      <path d="M12 20V9" />
    </svg>
  );
}

export function IconChefHat(props: GlyphProps) {
  return (
    <svg {...base} {...props}>
      <path d="M8 21v-9.5a4 4 0 1 1 8 0V21" />
      <path d="M6.5 21h11" />
      <path d="M8.5 11.5h7" />
    </svg>
  );
}

export function IconGlass(props: GlyphProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 3h10l-3.3 9a1.8 1.8 0 0 1-3.4 0L7 3Z" />
      <path d="M12 12.5V20M8.5 20h7" />
    </svg>
  );
}

export function IconUtensils(props: GlyphProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 2.5v7c0 1-.7 1.8-1.8 2L5 21.5" />
      <path d="M5.5 2.5v5M8.5 2.5v5" />
      <path d="M17.5 2.5c-1.4 0-2.5 1.7-2.5 4.5S16 11 17.5 11s0 6.5 0 10.5" />
    </svg>
  );
}

export function IconBowl(props: GlyphProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3.5 12h17a8.5 8.5 0 0 1-17 0Z" />
      <path d="M9 7c0-.9-.6-1.2-.6-2S9 3.6 9 2.8" />
      <path d="M12.3 7c0-.9-.6-1.2-.6-2s.6-1.4.6-2.2" />
      <path d="M15.6 7c0-.9-.6-1.2-.6-2s.6-1.4.6-2.2" />
    </svg>
  );
}

export function IconCake(props: GlyphProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 20.5v-7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7Z" />
      <path d="M4 20.5h16" />
      <path d="M9 11.5V9M12 11.5V9M15 11.5V9" />
      <path d="M9 9c0-1 .6-1.3.6-2.2S9 5.2 9 4.5M12 9c0-1 .6-1.3.6-2.2S12 5.2 12 4.5M15 9c0-1 .6-1.3.6-2.2S15 5.2 15 4.5" />
    </svg>
  );
}

export function IconLamp(props: GlyphProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 2.5v3.5" />
      <path d="M7.5 9h9l-1.8 6.5H9.3L7.5 9Z" />
      <path d="M10 19a2 2 0 0 0 4 0v-3.5h-4V19Z" />
    </svg>
  );
}

export function IconFrame(props: GlyphProps) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="4" width="16" height="16" rx="1" />
      <path d="M4 12h16M12 4v16" />
    </svg>
  );
}

export function IconQuoteMark(props: GlyphProps) {
  return (
    <svg viewBox="0 0 32 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M13.6 0C7 2.6 3 8 3 14.6 3 19.8 6.2 24 11.2 24c3.7 0 6.4-2.9 6.4-6.4 0-3.3-2.3-5.8-5.4-5.8-.6 0-1.1.1-1.5.2.6-3.6 3.4-6.8 6.9-8.4L13.6 0Zm16.8 0c-6.6 2.6-10.6 8-10.6 14.6 0 5.2 3.2 9.4 8.2 9.4 3.7 0 6.4-2.9 6.4-6.4 0-3.3-2.3-5.8-5.4-5.8-.6 0-1.1.1-1.5.2.6-3.6 3.4-6.8 6.9-8.4L30.4 0Z" />
    </svg>
  );
}
