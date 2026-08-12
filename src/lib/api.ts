import type { ContactFormValues, FormSubmissionResult, ReservationFormValues } from '@/types';
import { delay } from '@/lib/utils';

/**
 * Demo-only submission handlers.
 *
 * This project ships as a static frontend with no backend, so these
 * functions simulate realistic network latency and always resolve
 * successfully — they exist so the Reservation, Contact, and Newsletter
 * forms have one clearly-marked seam to integrate a real API. Swap the body
 * of each function for a `fetch()` call to your own authenticated endpoint,
 * or a form service (Formspree, Getform, etc.), before deploying. Keep any
 * API keys/secrets on that server — never in this frontend project (see
 * .env.example).
 *
 * The calling components already handle the failure path (try/catch around
 * the call, an error-state UI, a re-enabled submit button) so wiring in a
 * real, occasionally-failing endpoint later requires no extra plumbing.
 */

export async function submitReservation(payload: ReservationFormValues): Promise<FormSubmissionResult> {
  await delay(1000);
  void payload; // not sent anywhere yet — see module doc comment
  return {
    status: 'success',
    message: "We've received your request and will confirm by email or phone shortly.",
  };
}

export async function submitContactMessage(payload: ContactFormValues): Promise<FormSubmissionResult> {
  await delay(900);
  void payload;
  return {
    status: 'success',
    message: "Thanks for reaching out — we'll reply within one business day.",
  };
}

export async function subscribeToNewsletter(email: string): Promise<FormSubmissionResult> {
  await delay(600);
  void email;
  return { status: 'success', message: "You're on the list — thank you." };
}
