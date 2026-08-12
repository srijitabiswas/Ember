import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'veg' | 'non-veg' | 'accent' | 'outline';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({ children, variant = 'outline', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-numeric text-[0.65rem] uppercase tracking-[0.14em]',
        variant === 'veg' && 'bg-accent/10 text-accent-dark',
        variant === 'non-veg' && 'bg-clay/10 text-clay-dark',
        variant === 'accent' && 'bg-accent text-hero-ink',
        variant === 'outline' && 'border border-ink/20 text-ink-soft',
        className,
      )}
    >
      {(variant === 'veg' || variant === 'non-veg') && (
        <span
          aria-hidden
          className={cn('h-1.5 w-1.5 shrink-0 rounded-full', variant === 'veg' ? 'bg-accent' : 'bg-clay')}
        />
      )}
      {children}
    </span>
  );
}
