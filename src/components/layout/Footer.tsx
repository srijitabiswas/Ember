import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiArrowRight } from 'react-icons/fi';
import { Container } from '@/components/ui/Container';
import { BrandMark } from '@/components/ui/BrandMark';
import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider';
import { NAV_LINKS, SOCIAL_LINKS, CONTACT, SITE, BUSINESS_HOURS } from '@/constants/site';
import { EMAIL_PATTERN, VALIDATION_MESSAGES } from '@/lib/validators';
import { subscribeToNewsletter } from '@/lib/api';
import { toMailHref } from '@/lib/utils';

interface NewsletterFormValues {
  email: string;
}

export function Footer() {
  const { scrollTo } = useSmoothScroll();
  const [subscribed, setSubscribed] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterFormValues>({ mode: 'onBlur' });

  const onSubmit = async (values: NewsletterFormValues) => {
    await subscribeToNewsletter(values.email);
    setSubscribed(true);
    reset();
  };

  return (
    <footer id="footer" className="bg-hero text-hero-ink">
      <Container className="grid gap-12 py-20 lg:grid-cols-[1.3fr_0.8fr_0.9fr_1.1fr] lg:gap-8 lg:py-24">
        <div>
          <a
            href="#home"
            onClick={(event) => {
              event.preventDefault();
              scrollTo('#home');
            }}
            className="inline-flex items-center gap-2.5"
          >
            <BrandMark className="h-9 w-9 text-clay" />
            <span className="font-display text-2xl tracking-[0.18em]">{SITE.name}</span>
          </a>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-hero-ink/60">{SITE.shortDescription}</p>
          <div className="mt-7 flex gap-3">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-hero-ink/15 text-hero-ink/70 transition-colors duration-300 hover:border-clay hover:text-clay"
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-numeric text-xs uppercase tracking-[0.18em] text-hero-ink/45">Quick Links</h3>
          <ul className="mt-5 space-y-3">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  onClick={(event) => {
                    event.preventDefault();
                    scrollTo(link.href, { offset: -96 });
                  }}
                  className="text-sm text-hero-ink/70 transition-colors hover:text-hero-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-numeric text-xs uppercase tracking-[0.18em] text-hero-ink/45">Visit</h3>
          <address className="mt-5 space-y-3 text-sm not-italic text-hero-ink/70">
            <p>{CONTACT.addressLine1}</p>
            <p>{CONTACT.addressLine2}</p>
            <p>
              <a href={CONTACT.phoneHref} className="transition-colors hover:text-hero-ink">
                {CONTACT.phoneDisplay}
              </a>
            </p>
            <p>
              <a href={toMailHref(CONTACT.email)} className="transition-colors hover:text-hero-ink">
                {CONTACT.email}
              </a>
            </p>
          </address>
        </div>

        <div>
          <h3 className="font-numeric text-xs uppercase tracking-[0.18em] text-hero-ink/45">Stay in the Loop</h3>
          <p className="mt-5 text-sm leading-relaxed text-hero-ink/60">
            Seasonal menus and chef&apos;s-table evenings — no spam, unsubscribe anytime.
          </p>

          {subscribed ? (
            <p className="mt-5 text-sm text-clay" role="status">
              You&apos;re on the list — thank you.
            </p>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-5">
              <div className="flex items-end gap-3 border-b border-hero-ink/25 pb-2 focus-within:border-clay">
                <input
                  type="email"
                  placeholder="Your email address"
                  aria-label="Email address"
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={errors.email ? 'newsletter-email-error' : undefined}
                  className="w-full flex-1 bg-transparent text-sm text-hero-ink outline-none placeholder:text-hero-ink/40"
                  {...register('email', {
                    required: VALIDATION_MESSAGES.required('Email'),
                    pattern: { value: EMAIL_PATTERN, message: VALIDATION_MESSAGES.email },
                  })}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-label="Subscribe"
                  className="pb-1 text-hero-ink transition-colors hover:text-clay disabled:opacity-50"
                >
                  <FiArrowRight className="h-5 w-5" />
                </button>
              </div>
              {errors.email && (
                <p id="newsletter-email-error" role="alert" className="mt-2 text-xs text-clay">
                  {errors.email.message}
                </p>
              )}
            </form>
          )}
        </div>
      </Container>

      <div className="border-t border-hero-ink/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-center text-xs text-hero-ink/45 sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} {SITE.legalName}. All rights reserved.
          </p>
          <p>
            {BUSINESS_HOURS[0]?.days}: {BUSINESS_HOURS[0]?.hours}
          </p>
        </Container>
      </div>
    </footer>
  );
}
