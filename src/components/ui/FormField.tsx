import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { cn } from '@/lib/utils';

/**
 * Shared floating-label form primitives. The label "floats" via pure CSS
 * (Tailwind's `peer` + `:placeholder-shown` variants) rather than tracked
 * focus state in React, so there's no risk of it drifting out of sync with
 * the actual input value (e.g. on autofill).
 */

const FIELD_BASE =
  'peer w-full border-b bg-transparent pb-2.5 pt-6 text-[0.95rem] text-ink outline-none transition-colors duration-300 placeholder:text-transparent';

const LABEL_BASE =
  'pointer-events-none absolute left-0 top-6 origin-left text-[0.95rem] text-ink-soft transition-all duration-300 peer-focus:top-1 peer-focus:scale-[0.75] peer-focus:text-accent peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:scale-[0.75]';

function fieldBorder(error?: string) {
  return error ? 'border-clay' : 'border-ink/25 focus:border-accent';
}

function ErrorMessage({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs text-clay-dark">
      {error}
    </p>
  );
}

// ---------------------------------------------------------------------------

interface FloatingInputProps extends Omit<ComponentPropsWithoutRef<'input'>, 'id' | 'className'> {
  label: string;
  id: string;
  error?: string;
  className?: string;
}

export const FloatingInput = forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ label, id, error, className, ...rest }, ref) => (
    <div className="relative">
      <input
        ref={ref}
        id={id}
        placeholder=" "
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(FIELD_BASE, fieldBorder(error), className)}
        {...rest}
      />
      <label htmlFor={id} className={LABEL_BASE}>
        {label}
      </label>
      <ErrorMessage id={id} error={error} />
    </div>
  ),
);
FloatingInput.displayName = 'FloatingInput';

// ---------------------------------------------------------------------------

interface FloatingTextareaProps extends Omit<ComponentPropsWithoutRef<'textarea'>, 'id' | 'className'> {
  label: string;
  id: string;
  error?: string;
  className?: string;
}

export const FloatingTextarea = forwardRef<HTMLTextAreaElement, FloatingTextareaProps>(
  ({ label, id, error, className, rows = 4, ...rest }, ref) => (
    <div className="relative">
      <textarea
        ref={ref}
        id={id}
        rows={rows}
        placeholder=" "
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(FIELD_BASE, 'resize-none', fieldBorder(error), className)}
        {...rest}
      />
      <label htmlFor={id} className={LABEL_BASE}>
        {label}
      </label>
      <ErrorMessage id={id} error={error} />
    </div>
  ),
);
FloatingTextarea.displayName = 'FloatingTextarea';

// ---------------------------------------------------------------------------

interface FloatingSelectProps extends Omit<ComponentPropsWithoutRef<'select'>, 'id' | 'className'> {
  label: string;
  id: string;
  error?: string;
  options: readonly string[];
  className?: string;
}

export const FloatingSelect = forwardRef<HTMLSelectElement, FloatingSelectProps>(
  ({ label, id, error, options, className, ...rest }, ref) => (
    <div className="relative">
      <label htmlFor={id} className="absolute left-0 top-1 origin-left scale-[0.75] text-[0.95rem] text-ink-soft">
        {label}
      </label>
      <select
        ref={ref}
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(FIELD_BASE, 'cursor-pointer appearance-none pr-6', fieldBorder(error), className)}
        {...rest}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <FiChevronDown className="pointer-events-none absolute right-0 top-6 h-4 w-4 text-ink-soft" aria-hidden />
      <ErrorMessage id={id} error={error} />
    </div>
  ),
);
FloatingSelect.displayName = 'FloatingSelect';
