import { SplitReveal } from '@/components/ui/SplitReveal';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  /** Which background this heading sits on. */
  tone?: 'light' | 'dark';
  as?: 'h1' | 'h2' | 'h3';
  splitType?: 'words' | 'lines';
  className?: string;
  id?: string;
}

/** The recurring "eyebrow / big serif title / short blurb" header used at the top of every section. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'light',
  as: Tag = 'h2',
  splitType = 'lines',
  className,
  id,
}: SectionHeadingProps) {
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && (
        <p
          className={cn(
            'mb-4 font-accent text-lg italic tracking-wide',
            tone === 'dark' ? 'text-clay' : 'text-clay-dark',
          )}
        >
          {eyebrow}
        </p>
      )}
      <Tag
        id={id}
        className={cn('text-4xl leading-[1.1] sm:text-5xl lg:text-6xl', tone === 'dark' ? 'text-hero-ink' : 'text-ink')}
      >
        <SplitReveal splitType={splitType}>{title}</SplitReveal>
      </Tag>
      {description && (
        <p
          className={cn(
            'mt-5 text-base leading-relaxed sm:text-lg',
            tone === 'dark' ? 'text-hero-ink/70' : 'text-ink-soft',
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
