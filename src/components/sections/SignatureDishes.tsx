import { useRef } from 'react';
import { gsap, useGSAP, EASE, SCROLL_REVEAL } from '@/animations/gsapConfig';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { RevealImage } from '@/components/ui/RevealImage';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { Badge } from '@/components/ui/Badge';
import { IconUtensils } from '@/components/ui/icons';
import { SIGNATURE_DISHES } from '@/data/dishes';
import { SECTION_IDS } from '@/constants/site';
import { formatPrice, cn } from '@/lib/utils';

const TONES = ['clay', 'olive'] as const;
const CURTAINS = ['sage', 'surface'] as const;

export function SignatureDishes() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;
      const cards = gsap.utils.toArray<HTMLElement>('.dish-card');

      gsap.from(cards, {
        opacity: 0,
        y: 56,
        duration: 1,
        ease: EASE.premium,
        stagger: 0.12,
        scrollTrigger: { trigger: sectionRef.current, ...SCROLL_REVEAL },
      });
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] },
  );

  return (
    <section id={SECTION_IDS.signatureDishes} ref={sectionRef} className="scroll-mt-24 bg-bg py-24 lg:py-32">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow="Chef's Table" title="Signature Dishes" />
          <p className="max-w-xs text-sm leading-relaxed text-ink-soft sm:text-right">
            A handful of the plates our regulars order on every visit.
          </p>
        </div>

        <div className="mt-16 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {SIGNATURE_DISHES.map((dish, index) => (
            <article key={dish.id} className="dish-card group">
              <RevealImage
                curtainColor={CURTAINS[index % CURTAINS.length]}
                delay={(index % 3) * 0.06}
                className="aspect-[4/5] w-full"
              >
                <ResponsiveImage
                  src={dish.image}
                  tone={TONES[index % TONES.length]}
                  icon={IconUtensils}
                  alt={dish.imageAlt}
                  className="h-full w-full"
                  imgClassName="h-full w-full transition-transform duration-700 ease-premium group-hover:scale-[1.05]"
                />
              </RevealImage>

              {dish.isChefRecommendation && (
                <Badge variant="accent" className="mt-5">
                  Chef&apos;s Recommendation
                </Badge>
              )}

              <div className={cn('flex items-start justify-between gap-4', dish.isChefRecommendation ? 'mt-3' : 'mt-5')}>
                <h3 className="font-display text-2xl text-ink">{dish.name}</h3>
                <span className="shrink-0 font-numeric text-lg text-clay-dark">{formatPrice(dish.price)}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{dish.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
