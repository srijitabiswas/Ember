import { useRef, useState } from 'react';
import { FiClock } from 'react-icons/fi';
import { gsap, SplitText, useGSAP, EASE } from '@/animations/gsapConfig';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { IconFlame } from '@/components/ui/icons';
import { SITE, HOURS_SHORT, BOOK_A_TABLE_HREF, SECTION_IDS } from '@/constants/site';
import { unsplashUrl } from '@/lib/utils';

interface HeroProps {
  /** True once the PageLoader has finished — gates the entrance timeline so it never plays underneath the loader. */
  startAnimation: boolean;
}

export function Hero({ startAnimation }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { scrollTo } = useSmoothScroll();

  useGSAP(
    () => {
      if (!startAnimation || !headlineRef.current) return undefined;

      const revealTargets = [eyebrowRef.current, subRef.current, ctaRef.current, bottomBarRef.current];

      if (prefersReducedMotion) {
        gsap.set(revealTargets, { opacity: 1, y: 0 });
        gsap.set(mediaRef.current, { scale: 1 });
        return undefined;
      }

      const split = SplitText.create(headlineRef.current, {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        onSplit: (self) => {
          const tl = gsap.timeline({ defaults: { ease: EASE.premium } });
          tl.fromTo(mediaRef.current, { scale: 1.16 }, { scale: 1, duration: 2.4, ease: EASE.soft }, 0)
            .fromTo(eyebrowRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 }, 0.15)
            .fromTo(self.lines, { yPercent: 115, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.09 }, 0.32)
            .fromTo(subRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 }, 0.75)
            .fromTo(ctaRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 }, 0.88)
            .fromTo(bottomBarRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8 }, 1.05);
          return tl;
        },
      });

      return () => split.revert();
    },
    { scope: sectionRef, dependencies: [startAnimation, prefersReducedMotion] },
  );

  return (
    <section
      id={SECTION_IDS.home}
      ref={sectionRef}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-hero text-hero-ink"
    >
      {/* Background media */}
      <div ref={mediaRef} className="absolute inset-0 will-change-transform">
        <ResponsiveImage
          src={unsplashUrl('1703793578040-07e1778b6b2c', 1920)}
          tone="hero"
          icon={IconFlame}
          alt={`${SITE.name} dining room glowing under warm, low light`}
          priority
          className="absolute inset-0 h-full w-full"
          imgClassName="h-full w-full"
        />
        {!videoFailed && (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            onError={() => setVideoFailed(true)}
          >
            {/* Add your own file at public/videos/hero.mp4 — see README § Media. */}
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
        )}
        <div className="bg-grain absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-hero via-hero/20 to-hero/55" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex h-full flex-col justify-center pb-24 pt-28">
        <Container>
          <div className="max-w-3xl">
            <div ref={eyebrowRef} className="mb-6 flex items-center gap-3 opacity-0">
              <span className="h-px w-8 bg-clay" aria-hidden />
              <p className="font-accent text-lg italic tracking-wide text-clay sm:text-xl">
                Modern Mediterranean &middot; European Fusion
              </p>
            </div>

            <h1 ref={headlineRef} className="font-display text-[3.1rem] leading-[1.05] sm:text-7xl lg:text-[6rem]">
              Where Flame Meets Flavor
            </h1>

            <p ref={subRef} className="mt-8 max-w-md text-base leading-relaxed text-hero-ink/70 opacity-0 sm:text-lg">
              {SITE.shortDescription} An evening built around the open hearth.
            </p>

            <div ref={ctaRef} className="mt-10 flex flex-wrap items-center gap-4 opacity-0">
              <Button
                href={BOOK_A_TABLE_HREF}
                size="lg"
                tone="dark"
                onClick={(event) => {
                  event.preventDefault();
                  scrollTo(BOOK_A_TABLE_HREF, { offset: -96 });
                }}
              >
                Book a Table
              </Button>
              <Button
                href={`#${SECTION_IDS.menu}`}
                variant="outline"
                tone="dark"
                size="lg"
                onClick={(event) => {
                  event.preventDefault();
                  scrollTo(`#${SECTION_IDS.menu}`, { offset: -96 });
                }}
              >
                Explore Menu
              </Button>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom bar: hours + scroll cue */}
      <div ref={bottomBarRef} className="absolute inset-x-0 bottom-0 z-10 border-t border-hero-ink/10 opacity-0">
        <Container className="flex items-center justify-between py-5">
          <div className="flex items-center gap-2.5 text-xs text-hero-ink/60 sm:text-sm">
            <FiClock className="h-4 w-4 text-clay" aria-hidden />
            <span>{HOURS_SHORT}</span>
          </div>

          <a
            href={`#${SECTION_IDS.about}`}
            onClick={(event) => {
              event.preventDefault();
              scrollTo(`#${SECTION_IDS.about}`, { offset: -80 });
            }}
            className="group flex items-center gap-3 text-hero-ink/60 transition-colors duration-300 hover:text-hero-ink"
            aria-label="Scroll to the About section"
          >
            <span className="hidden font-numeric text-[0.65rem] uppercase tracking-[0.2em] sm:inline">Scroll</span>
            <span className="relative h-9 w-px overflow-hidden bg-hero-ink/25">
              <span className="scroll-cue-dot absolute left-0 top-0 h-2.5 w-px bg-clay" aria-hidden />
            </span>
          </a>
        </Container>
      </div>
    </section>
  );
}
