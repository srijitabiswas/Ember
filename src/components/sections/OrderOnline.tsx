import { useRef } from 'react';
import { gsap, useGSAP, EASE, SCROLL_REVEAL } from '@/animations/gsapConfig';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { BrandMark } from '@/components/ui/BrandMark';
import { ORDER_LINKS, SITE, SECTION_IDS } from '@/constants/site';

export function OrderOnline() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;
      gsap.from('.order-cta', {
        opacity: 0,
        y: 32,
        duration: 0.9,
        ease: EASE.premium,
        stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, ...SCROLL_REVEAL },
      });
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] },
  );

  return (
    <section
      id={SECTION_IDS.orderOnline}
      ref={sectionRef}
      className="relative scroll-mt-24 overflow-hidden bg-hero py-24 text-hero-ink lg:py-32"
    >
      <div className="bg-grain absolute inset-0 opacity-70" aria-hidden />
      <Container className="relative flex flex-col items-center text-center">
        <BrandMark className="order-cta h-11 w-11 text-clay" />
        <SectionHeading
          eyebrow="Can't Join Us Tonight?"
          title={`Order ${SITE.name} at Home`}
          description="The same wood-fired cooking, packed to travel — delivered hot through our delivery partners."
          align="center"
          tone="dark"
          className="mx-auto mt-8"
        />
        <div className="order-cta mt-12 flex flex-wrap items-center justify-center gap-4">
          <Button href={ORDER_LINKS.swiggy} tone="dark" variant="primary" size="lg">
            Order via Swiggy
          </Button>
          <Button href={ORDER_LINKS.zomato} tone="dark" variant="outline" size="lg">
            Order via Zomato
          </Button>
        </div>
      </Container>
    </section>
  );
}
