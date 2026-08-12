import { useState, type ComponentType } from 'react';
import { cn } from '@/lib/utils';

export type ImageTone = 'hero' | 'sage' | 'olive' | 'clay';

const TONE_GRADIENTS: Record<ImageTone, string> = {
  hero: 'linear-gradient(135deg, #1a1a1a 0%, #111111 60%, #0b0b0b 100%)',
  sage: 'linear-gradient(135deg, #f8f8f3 0%, #e3e8dd 100%)',
  olive: 'linear-gradient(135deg, #6b7c5d 0%, #4a5741 100%)',
  clay: 'linear-gradient(135deg, #b98f63 0%, #8a6743 100%)',
};

const TONE_ICON_COLOR: Record<ImageTone, string> = {
  hero: 'text-hero-ink/25',
  sage: 'text-accent/45',
  olive: 'text-hero-ink/30',
  clay: 'text-hero-ink/30',
};

/** Visible edge so the placeholder reads as an intentional chip even when its fill is close to the page background (the 'sage' tone in particular sits very near the page's own cream tones). */
const TONE_BORDER: Record<ImageTone, string> = {
  hero: 'border border-hero-ink/15',
  sage: 'border border-accent/25',
  olive: 'border border-hero-ink/15',
  clay: 'border border-hero-ink/15',
};

export interface ResponsiveImageProps {
  /** Real photo URL. When omitted (or when it fails to load) on-brand placeholder art renders instead. */
  src?: string;
  alt: string;
  icon?: ComponentType<{ className?: string }>;
  tone?: ImageTone;
  /** Small caption shown inside the placeholder art only (e.g. a dish name) — never shown once a real photo loads. */
  label?: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  /** Above-the-fold images should be eager/high-priority; everything else lazy-loads by default. */
  priority?: boolean;
}

/**
 * Renders a real <img> when `src` is provided and loads successfully;
 * otherwise renders elegant, on-brand placeholder art (gradient + line icon
 * + optional label) so the layout never shows a broken-image glyph.
 *
 * This project ships without a licensed photography set (see README §Images)
 * — every section is wired to swap real photos in through this one component.
 */
export function ResponsiveImage({
  src,
  alt,
  icon: Icon,
  tone = 'sage',
  label,
  className,
  imgClassName,
  sizes,
  priority = false,
}: ResponsiveImageProps) {
  const [hasError, setHasError] = useState(false);
  const showPlaceholder = !src || hasError;

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {showPlaceholder ? (
        <div
          role="img"
          aria-label={alt}
          className={cn(
            'bg-grain absolute inset-0 flex items-end justify-start p-5',
            TONE_BORDER[tone],
            imgClassName,
          )}
          style={{ backgroundImage: TONE_GRADIENTS[tone] }}
        >
          {Icon && (
            <Icon
              className={cn(
                'absolute left-1/2 top-1/2 h-[38%] w-[38%] -translate-x-1/2 -translate-y-1/2',
                TONE_ICON_COLOR[tone],
              )}
            />
          )}
          {label && (
            <span
              className={cn(
                'relative font-numeric text-[0.65rem] uppercase tracking-[0.18em]',
                tone === 'sage' ? 'text-ink-soft/70' : 'text-hero-ink/55',
              )}
            >
              {label}
            </span>
          )}
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          sizes={sizes}
          onError={() => setHasError(true)}
          className={cn('absolute inset-0 h-full w-full object-cover', imgClassName)}
        />
      )}
    </div>
  );
}
