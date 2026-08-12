import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiCheck } from 'react-icons/fi';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { RevealImage } from '@/components/ui/RevealImage';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { Button } from '@/components/ui/Button';
import { FloatingInput, FloatingSelect, FloatingTextarea } from '@/components/ui/FormField';
import { IconChefHat } from '@/components/ui/icons';
import { EMAIL_PATTERN, PHONE_PATTERN, VALIDATION_MESSAGES, isTodayOrFuture, normalizeWhitespace } from '@/lib/validators';
import { submitReservation } from '@/lib/api';
import { todayISODate, unsplashUrl } from '@/lib/utils';
import { GUEST_OPTIONS, RESERVATION_TIME_SLOTS, SECTION_IDS, SITE } from '@/constants/site';
import type { ReservationFormValues } from '@/types';

export function Reservation() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReservationFormValues>({
    mode: 'onBlur',
    defaultValues: { guests: '2', time: RESERVATION_TIME_SLOTS[2] },
  });

  const onSubmit = async (values: ReservationFormValues) => {
    setSubmitError(null);
    const payload: ReservationFormValues = {
      ...values,
      name: normalizeWhitespace(values.name),
      specialRequest: values.specialRequest ? normalizeWhitespace(values.specialRequest) : undefined,
    };

    try {
      const result = await submitReservation(payload);
      if (result.status === 'success') {
        setIsSuccess(true);
        reset();
      } else {
        setSubmitError(result.message);
      }
    } catch {
      setSubmitError("Something went wrong on our end — please try again, or call us directly.");
    }
  };

  return (
    <section id={SECTION_IDS.reservation} className="scroll-mt-24 bg-surface py-24 lg:py-32">
      <Container>
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <RevealImage curtainColor="surface" className="order-2 aspect-[4/5] w-full lg:order-1">
            <ResponsiveImage
              src={unsplashUrl('1735183263607-3655df81fe3d', 900)}
              tone="clay"
              icon={IconChefHat}
              alt={`A table set for an evening at ${SITE.name}`}
              className="h-full w-full"
              imgClassName="h-full w-full"
            />
          </RevealImage>

          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="Reserve"
              title="Book Your Table"
              description="Tell us a little about your visit and we'll confirm within a few hours."
            />

            {isSuccess ? (
              <div role="status" className="mt-10 flex items-start gap-4 border border-accent/30 bg-bg p-8">
                <FiCheck className="mt-0.5 h-6 w-6 shrink-0 text-accent" aria-hidden />
                <div>
                  <p className="font-display text-xl text-ink">Reservation Requested</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    We&apos;ve received your request and will confirm by email or phone shortly. We look forward to
                    hosting you.
                  </p>
                  <Button variant="ghost" className="mt-4 px-0!" onClick={() => setIsSuccess(false)}>
                    Book another table
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-10 space-y-7">
                <div className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
                  <FloatingInput
                    label="Full Name"
                    id="res-name"
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
                    id="res-email"
                    type="email"
                    autoComplete="email"
                    error={errors.email?.message}
                    {...register('email', {
                      required: VALIDATION_MESSAGES.required('Email'),
                      pattern: { value: EMAIL_PATTERN, message: VALIDATION_MESSAGES.email },
                    })}
                  />
                </div>

                <div className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
                  <FloatingInput
                    label="Phone Number"
                    id="res-phone"
                    type="tel"
                    autoComplete="tel"
                    error={errors.phone?.message}
                    {...register('phone', {
                      required: VALIDATION_MESSAGES.required('Phone'),
                      pattern: { value: PHONE_PATTERN, message: VALIDATION_MESSAGES.phone },
                    })}
                  />
                  <FloatingSelect
                    label="Guests"
                    id="res-guests"
                    options={GUEST_OPTIONS}
                    error={errors.guests?.message}
                    {...register('guests', { required: VALIDATION_MESSAGES.required('Guests') })}
                  />
                </div>

                <div className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
                  <FloatingInput
                    label="Date"
                    id="res-date"
                    type="date"
                    min={todayISODate()}
                    error={errors.date?.message}
                    {...register('date', {
                      required: VALIDATION_MESSAGES.required('Date'),
                      validate: (value) => isTodayOrFuture(value) || VALIDATION_MESSAGES.pastDate,
                    })}
                  />
                  <FloatingSelect
                    label="Time"
                    id="res-time"
                    options={RESERVATION_TIME_SLOTS}
                    error={errors.time?.message}
                    {...register('time', { required: VALIDATION_MESSAGES.required('Time') })}
                  />
                </div>

                <FloatingTextarea
                  label="Special Request (optional)"
                  id="res-note"
                  rows={3}
                  maxLength={500}
                  {...register('specialRequest', {
                    maxLength: { value: 500, message: VALIDATION_MESSAGES.maxLength('Special request', 500) },
                  })}
                  error={errors.specialRequest?.message}
                />

                {submitError && (
                  <p role="alert" className="text-sm text-clay-dark">
                    {submitError}
                  </p>
                )}

                <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
                  {isSubmitting ? 'Sending…' : 'Request Reservation'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
