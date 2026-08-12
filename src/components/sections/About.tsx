import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { RevealImage } from '@/components/ui/RevealImage';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { Counter } from '@/components/ui/Counter';
import { IconFlame } from '@/components/ui/icons';
import { STATS } from '@/data/stats';
import { SITE, SECTION_IDS } from '@/constants/site';
import { unsplashUrl } from '@/lib/utils';

const STORY_PARAGRAPHS = [
  `${SITE.name} began as a single wood-fired oven and a stubborn belief: that the oldest cooking method in the world still has the most to say. What started as a fourteen-table room in a converted warehouse has grown into the city's home for live-fire Mediterranean and European cooking — without losing the intimacy that got us here.`,
  'Every dish that leaves our kitchen passes over charcoal or through the wood oven at least once. It is slower and considerably harder to control than a gas range — and it is exactly why the octopus tastes of smoke and sea at once, and why regulars keep asking for the tables nearest the hearth.',
  "We buy whole animals, work with three regional farms we've known for a decade, and let the seasons set the menu rather than the calendar. None of that has scaled particularly well. We've made peace with that.",
];

export function About() {
  return (
    <section id={SECTION_IDS.about} className="relative scroll-mt-24 bg-bg py-24 lg:py-32">
      <Container>
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          {/* position: sticky rather than a GSAP ScrollTrigger pin — it needs
              no manually-computed end point, so it can't drift out of sync
              with the (auto-sizing) text column the way a JS pin can. */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <RevealImage curtainColor="sage" className="aspect-[4/5] w-full">
              <ResponsiveImage
                src={unsplashUrl('1763685805275-1845419c01a1', 900)}
                tone="olive"
                icon={IconFlame}
                alt={`Chef tending the wood-fired oven at ${SITE.name}`}
                className="h-full w-full"
                imgClassName="h-full w-full"
              />
            </RevealImage>
          </div>

          <div className="flex flex-col justify-center gap-10">
            <SectionHeading eyebrow="Our Story" title="A Kitchen Built Around the Flame" />

            <div className="max-w-lg space-y-5 text-[0.95rem] leading-relaxed text-ink-soft">
              {STORY_PARAGRAPHS.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <dl className="grid grid-cols-2 gap-x-6 gap-y-10 border-t border-line pt-10 sm:grid-cols-4">
              {STATS.map((stat) => (
                <div key={stat.id}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <Counter value={stat.value} suffix={stat.suffix} className="text-4xl text-ink lg:text-5xl" />
                    <p className="mt-2 text-xs uppercase leading-snug tracking-[0.12em] text-ink-soft">{stat.label}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}
