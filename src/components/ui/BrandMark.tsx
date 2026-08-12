import { cn } from '@/lib/utils';

interface BrandMarkProps {
  className?: string;
  withRing?: boolean;
  ringClassName?: string;
}

/**
 * The flame-in-a-ring monogram — identical geometry to public/favicon.svg,
 * but using `currentColor` so it can be recolored per context (clay on the
 * dark hero/loader, ink in the footer, etc.) instead of shipping as a
 * static, fixed-palette image.
 */
export function BrandMark({ className, withRing = true, ringClassName }: BrandMarkProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {withRing && (
        <circle
          cx="16"
          cy="17.3"
          r="8.2"
          stroke="currentColor"
          strokeWidth="1.3"
          className={cn('opacity-40', ringClassName)}
        />
      )}
      <g transform="translate(16,17.3)">
        <path
          d="M0,-7.4 C2.9,-3.6 4.1,-0.4 3.3,2.6 C2.7,5 0.9,6.4 0,6.4 C-0.9,6.4 -2.7,5 -3.3,2.6 C-4.1,-0.4 -2.9,-3.6 0,-7.4 Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}
