import type { ComponentType, MouseEventHandler, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'outline' | 'ghost';
/** Which background the button sits on — controls outline/ghost contrast. */
type ButtonTone = 'light' | 'dark';
type ButtonSize = 'md' | 'lg';

export interface ButtonProps {
  variant?: ButtonVariant;
  tone?: ButtonTone;
  size?: ButtonSize;
  icon?: ComponentType<{ className?: string }>;
  iconPosition?: 'left' | 'right';
  className?: string;
  children: ReactNode;
  /** Renders an <a> instead of a <button>. External (http) links automatically get target=_blank + rel=noopener noreferrer. */
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  type?: 'button' | 'submit';
  disabled?: boolean;
  ariaLabel?: string;
}

const VARIANT_CLASSES: Record<ButtonVariant, Record<ButtonTone, string>> = {
  primary: {
    light: 'bg-accent text-hero-ink hover:bg-accent-dark',
    dark: 'bg-clay text-hero hover:bg-clay-dark',
  },
  outline: {
    light: 'border border-ink/25 text-ink hover:border-accent hover:text-accent',
    dark: 'border border-hero-ink/30 text-hero-ink hover:border-hero-ink hover:bg-hero-ink hover:text-hero',
  },
  ghost: {
    light: 'text-ink hover:text-accent',
    dark: 'text-hero-ink hover:text-clay',
  },
};

/** Elegant, restrained button — color/opacity transitions only, no bounce or scale gimmicks. */
export function Button({
  variant = 'primary',
  tone = 'light',
  size = 'md',
  icon: Icon,
  iconPosition = 'right',
  className,
  children,
  href,
  onClick,
  type = 'button',
  disabled = false,
  ariaLabel,
}: ButtonProps) {
  const classes = cn(
    'group inline-flex items-center justify-center gap-2.5 whitespace-nowrap font-numeric uppercase tracking-[0.12em]',
    'transition-[background-color,border-color,color] duration-500 ease-premium',
    'disabled:cursor-not-allowed disabled:opacity-50',
    size === 'lg' ? 'px-8 py-4 text-[0.8rem]' : 'px-6 py-3.5 text-[0.7rem]',
    VARIANT_CLASSES[variant][tone],
    className,
  );

  const content = (
    <>
      {Icon && iconPosition === 'left' && (
        <Icon className="h-[1.05em] w-[1.05em] shrink-0 transition-transform duration-500 ease-premium group-hover:-translate-x-0.5" />
      )}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && (
        <Icon className="h-[1.05em] w-[1.05em] shrink-0 transition-transform duration-500 ease-premium group-hover:translate-x-0.5" />
      )}
    </>
  );

  if (href) {
    const isExternal = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        onClick={onClick}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled} aria-label={ariaLabel}>
      {content}
    </button>
  );
}
