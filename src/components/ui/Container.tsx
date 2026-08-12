import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: 'div' | 'section' | 'header' | 'footer' | 'nav' | 'article';
  children: ReactNode;
  className?: string;
}

/** The single source of truth for the site's editorial max-width and gutters. */
export function Container({ as: Tag = 'div', className, children, ...rest }: ContainerProps) {
  return (
    <Tag className={cn('mx-auto w-full max-w-[1440px] px-6 sm:px-8 lg:px-12', className)} {...rest}>
      {children}
    </Tag>
  );
}
