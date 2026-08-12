import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FiStar } from 'react-icons/fi';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { IconQuoteMark } from '@/components/ui/icons';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { TESTIMONIALS } from '@/data/testimonials';
import { SECTION_IDS } from '@/constants/site';
import { cn } from '@/lib/utils';
import type { Testimonial } from '@/types';

export function Testimonials() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section id={SECTION_IDS.testimonials} className="scroll-mt-24 bg-bg-alt py-24 lg:py-32">
      <Container>
        <SectionHeading eyebrow="In Their Words" title="What Our Guests Say" align="center" className="mx-auto" />

        <div className="mt-16 lg:mt-20">
          <Swiper
            modules={[Autoplay, Pagination]}
            slidesPerView={1}
            spaceBetween={28}
            loop={TESTIMONIALS.length > 3}
            autoplay={prefersReducedMotion ? false : { delay: 5500, disableOnInteraction: false, pauseOnMouseEnter: true }}
            pagination={{ clickable: true, el: '.testimonial-pagination' }}
            breakpoints={{ 768: { slidesPerView: 2 }, 1280: { slidesPerView: 3 } }}
            className="pb-2"
          >
            {TESTIMONIALS.map((testimonial) => (
              <SwiperSlide key={testimonial.id} className="h-auto py-1">
                <TestimonialCard testimonial={testimonial} />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="testimonial-pagination mt-10 flex justify-center gap-2" />
        </div>
      </Container>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const initials = testimonial.name
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('');

  return (
    <div className="flex h-full flex-col border border-line bg-surface p-8 lg:p-10">
      <IconQuoteMark className="h-7 w-7 text-accent/40" />

      <div className="mt-4 flex gap-1" role="img" aria-label={`Rated ${testimonial.rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <FiStar
            key={i}
            aria-hidden
            className={cn('h-3.5 w-3.5', i < testimonial.rating ? 'fill-clay text-clay' : 'text-ink-soft/25')}
          />
        ))}
      </div>

      <p className="mt-5 flex-1 text-[0.95rem] leading-relaxed text-ink-soft">&ldquo;{testimonial.quote}&rdquo;</p>

      <div className="mt-6 flex items-center gap-3 border-t border-line pt-6">
        {testimonial.image ? (
          <ResponsiveImage
            src={testimonial.image}
            alt={testimonial.name}
            className="h-11 w-11 shrink-0 rounded-full"
            imgClassName="h-11 w-11 rounded-full"
          />
        ) : (
          <div
            aria-hidden
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/15 font-numeric text-sm text-accent-dark"
          >
            {initials}
          </div>
        )}
        <div>
          <p className="font-display text-base text-ink">{testimonial.name}</p>
          {testimonial.role && <p className="text-xs text-ink-soft">{testimonial.role}</p>}
        </div>
      </div>
    </div>
  );
}
