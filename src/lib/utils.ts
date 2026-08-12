import { clsx } from 'clsx';
import type { ClassValue } from 'clsx';

/**
 * Merge conditional class names. A thin wrapper around `clsx` so every
 * component imports class-merging logic from one place; if we ever need
 * Tailwind-conflict resolution (`tailwind-merge`) it only has to be added
 * here.
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

/** Clamp a number between a minimum and maximum (inclusive). */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Format a number as a USD-style menu price, e.g. `42` -> `"$42"`, `18.5` -> `"$18.50"`. */
export function formatPrice(value: number): string {
  const hasCents = !Number.isInteger(value);
  return `$${value.toLocaleString('en-US', {
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: 2,
  })}`;
}

/** Strip everything except digits and a leading `+`, for building `tel:` hrefs. */
export function toTelHref(phone: string): string {
  const cleaned = phone.replace(/[^\d+]/g, '');
  return `tel:${cleaned}`;
}

/** Build a `mailto:` href from a plain email address. */
export function toMailHref(email: string): string {
  return `mailto:${email}`;
}

/** Today's date as an `YYYY-MM-DD` string, for min-date constraints on <input type="date">. */
export function todayISODate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/** Small promise-based delay, used to simulate realistic network latency in demo form handlers. */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Builds a properly-sized Unsplash CDN URL from a bare photo id. Centralizing
 * this means every real photo in the project requests an appropriately
 * sized asset (not a full 3000px original) and shares the same quality/
 * format params, instead of each call site hand-rolling a query string.
 */
export function unsplashUrl(photoId: string, width: number): string {
  return `https://images.unsplash.com/photo-${photoId}?q=80&w=${width}&auto=format&fit=crop`;
}

/** Type guard / helper for exhaustiveness checks in switch statements. */
export function assertUnreachable(value: never): never {
  throw new Error(`Unhandled case: ${JSON.stringify(value)}`);
}
