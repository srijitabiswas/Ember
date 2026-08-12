/**
 * Shared validation primitives for the Reservation and Contact forms.
 * Kept framework-agnostic (plain regex + small predicate functions) so they
 * plug directly into React Hook Form's `register(name, { pattern, validate })`
 * without pulling in a schema-validation dependency for two small forms.
 */

/** Reasonably strict but not pathological email pattern (avoids catastrophic backtracking). */
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Accepts phone numbers with optional leading `+`, spaces, dashes, dots and
 * parentheses, requiring 7–15 significant digits (E.164-ish, permissive).
 */
export const PHONE_PATTERN = /^\+?[\d\s().-]{7,20}$/;

export const VALIDATION_MESSAGES = {
  required: (field: string) => `${field} is required`,
  email: 'Enter a valid email address',
  phone: 'Enter a valid phone number',
  minLength: (field: string, min: number) => `${field} must be at least ${min} characters`,
  maxLength: (field: string, max: number) => `${field} must be under ${max} characters`,
  minGuests: 'Must be at least 1 guest',
  maxGuests: 'For parties over 12, please call us directly',
  pastDate: 'Please choose a date in the future',
} as const;

/** Counts significant digits, used to reject strings like "-------" that pass the loose regex. */
function digitCount(value: string): number {
  return (value.match(/\d/g) ?? []).length;
}

export function isValidPhone(value: string): boolean {
  return PHONE_PATTERN.test(value.trim()) && digitCount(value) >= 7;
}

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim());
}

/** True if the given `YYYY-MM-DD` date string is today or later. */
export function isTodayOrFuture(isoDate: string): boolean {
  if (!isoDate) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const chosen = new Date(`${isoDate}T00:00:00`);
  return chosen.getTime() >= today.getTime();
}

/** Collapse repeated whitespace and trim — applied to free-text fields before submission. */
export function normalizeWhitespace(value: string): string {
  return value.trim().replace(/\s+/g, ' ');
}
