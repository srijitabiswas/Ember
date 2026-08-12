import { useRef } from 'react';
import { gsap, useGSAP, EASE, SCROLL_REVEAL } from '@/animations/gsapConfig';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FEATURES } from '@/data/features';
import { SECTION_IDS } from '@/constants/site';

export function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;
      const cards = gsap.utils.toArray<HTMLElement>('.feature-card');

      gsap.from(cards, {
        opacity: 0,
        y: 40,
        duration: 0.7,
        ease: EASE.premium,
        stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, ...SCROLL_REVEAL },
      });
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] },
  );

  return (
    <section id={SECTION_IDS.whyChooseUs} ref={sectionRef} className="scroll-mt-24 bg-bg-alt py-24 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="Why Ember"
          title="Three Things We Won't Compromise On"
          align="center"
          className="mx-auto"
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-8">
          {FEATURES.map((feature) => (
            <div
              key={feature.id}
              className="feature-card group border border-line bg-surface p-8 transition-colors duration-500 hover:border-accent/40 lg:p-10"
            >
              <feature.icon className="h-9 w-9 text-accent transition-transform duration-500 ease-premium group-hover:-translate-y-1" />
              <h3 className="mt-8 font-display text-2xl text-ink">{feature.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{feature.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
