import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiMapPin, FiPhone, FiMail, FiClock, FiArrowUpRight, FiCheck } from 'react-icons/fi';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FloatingInput, FloatingTextarea } from '@/components/ui/FormField';
import { Button } from '@/components/ui/Button';
import { CONTACT, BUSINESS_HOURS, SOCIAL_LINKS, SECTION_IDS, SITE } from '@/constants/site';
import { EMAIL_PATTERN, VALIDATION_MESSAGES, normalizeWhitespace } from '@/lib/validators';
import { submitContactMessage } from '@/lib/api';
import { toMailHref } from '@/lib/utils';
import type { ContactFormValues } from '@/types';

export function Contact() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({ mode: 'onBlur' });

  const onSubmit = async (values: ContactFormValues) => {
    setSubmitError(null);
    const payload: ContactFormValues = {
      ...values,
      name: normalizeWhitespace(values.name),
      message: normalizeWhitespace(values.message),
    };

    try {
      const result = await submitContactMessage(payload);
      if (result.status === 'success') {
        setIsSuccess(true);
        reset();
      } else {
        setSubmitError(result.message);
      }
    } catch {
      setSubmitError('Something went wrong — please try again, or reach us by phone.');
    }
  };

  const directionsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${CONTACT.addressLine1}, ${CONTACT.addressLine2}`,
  )}`;

  return (
    <section id={SECTION_IDS.contact} className="scroll-mt-24 bg-bg py-24 lg:py-32">
      <Container>
        <SectionHeading eyebrow="Get In Touch" title="Visit or Write to Us" align="center" className="mx-auto" />

        <div className="mt-16 grid gap-16 lg:mt-20 lg:grid-cols-2 lg:gap-20">
          {/* Info column */}
          <div>
            <ul className="space-y-7">
              <li className="flex gap-4">
                <FiMapPin className="mt-1 h-5 w-5 shrink-0 text-accent" aria-hidden />
                <div>
                  <p className="text-ink">{CONTACT.addressLine1}</p>
                  <p className="text-ink">{CONTACT.addressLine2}</p>
                  <a
                    href={directionsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1.5 inline-flex items-center gap-1 text-sm text-accent transition-colors hover:text-accent-dark"
                  >
                    Get Directions <FiArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <FiPhone className="mt-1 h-5 w-5 shrink-0 text-accent" aria-hidden />
                <a href={CONTACT.phoneHref} className="text-ink transition-colors hover:text-accent">
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li className="flex gap-4">
                <FiMail className="mt-1 h-5 w-5 shrink-0 text-accent" aria-hidden />
                <a href={toMailHref(CONTACT.email)} className="text-ink transition-colors hover:text-accent">
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex gap-4">
                <FiClock className="mt-1 h-5 w-5 shrink-0 text-accent" aria-hidden />
                <div className="space-y-1.5">
                  {BUSINESS_HOURS.map((row) => (
                    <p key={row.days} className="flex gap-3 text-sm text-ink-soft">
                      <span className="w-32 shrink-0 text-ink">{row.days}</span>
                      <span>{row.hours}</span>
                    </p>
                  ))}
                </div>
              </li>
            </ul>

            <div className="mt-9 flex gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-soft transition-colors duration-300 hover:border-accent hover:text-accent"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            <div className="mt-9 aspect-[4/3] w-full overflow-hidden border border-line">
              <iframe
                src={CONTACT.mapEmbedSrc}
                title={`Map to ${SITE.name}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full grayscale-[15%]"
              />
            </div>
          </div>

          {/* Form column */}
          <div>
            {isSuccess ? (
              <div role="status" className="flex items-start gap-4 border border-accent/30 bg-bg-alt p-8">
                <FiCheck className="mt-0.5 h-6 w-6 shrink-0 text-accent" aria-hidden />
                <div>
                  <p className="font-display text-xl text-ink">Message Sent</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    Thanks for reaching out — we&apos;ll reply within one business day.
                  </p>
                  <Button variant="ghost" className="mt-4 px-0!" onClick={() => setIsSuccess(false)}>
                    Send another message
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-7">
                <FloatingInput
                  label="Full Name"
                  id="contact-name"
                  autoComplete="name"
                  error={errors.name?.message}
                  {...register('name', {
                    required: VALIDATION_MESSAGES.required('Name'),
                    minLength: { value: 2, message: VALIDATION_MESSAGES.minLength('Name', 2) },
                    maxLength: { value: 80, message: VALIDATION_MESSAGES.maxLength('Name', 80) },
                  })}
                />
                <FloatingInput
                  label="Email Address"
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  error={errors.email?.message}
                  {...register('email', {
                    required: VALIDATION_MESSAGES.required('Email'),
                    pattern: { value: EMAIL_PATTERN, message: VALIDATION_MESSAGES.email },
                  })}
                />
                <FloatingTextarea
                  label="Message"
                  id="contact-message"
                  rows={5}
                  error={errors.message?.message}
                  {...register('message', {
                    required: VALIDATION_MESSAGES.required('Message'),
                    minLength: { value: 10, message: VALIDATION_MESSAGES.minLength('Message', 10) },
                    maxLength: { value: 1000, message: VALIDATION_MESSAGES.maxLength('Message', 1000) },
                  })}
                />

                {submitError && (
                  <p role="alert" className="text-sm text-clay-dark">
                    {submitError}
                  </p>
                )}

                <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
                  {isSubmitting ? 'Sending…' : 'Send Message'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
