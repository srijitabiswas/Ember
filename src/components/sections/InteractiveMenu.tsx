import { useMemo, useState, type ComponentType } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { IconLeaf, IconUtensils, IconFlame, IconBowl, IconCake, IconGlass } from '@/components/ui/icons';
import { MENU_CATEGORY_META, MENU_ITEMS } from '@/data/menu';
import { SECTION_IDS } from '@/constants/site';
import { formatPrice, cn } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import type { MenuCategoryId } from '@/types';

const CATEGORY_ICON: Record<MenuCategoryId, ComponentType<{ className?: string }>> = {
  starters: IconLeaf,
  'main-course': IconUtensils,
  pizza: IconFlame,
  pasta: IconBowl,
  desserts: IconCake,
  drinks: IconGlass,
};

const FILTER_EASE = [0.65, 0, 0.35, 1] as const;

export function InteractiveMenu() {
  const [activeCategory, setActiveCategory] = useState<MenuCategoryId>('starters');
  const prefersReducedMotion = usePrefersReducedMotion();

  const filteredItems = useMemo(
    () => MENU_ITEMS.filter((item) => item.category === activeCategory),
    [activeCategory],
  );

  return (
    <section id={SECTION_IDS.menu} className="scroll-mt-24 bg-bg-alt py-24 lg:py-32">
      <Container>
        <SectionHeading eyebrow="The Full Menu" title="Explore Our Menu" align="center" className="mx-auto" />

        <div
          role="group"
          aria-label="Filter menu by category"
          className="mt-14 flex flex-wrap justify-center gap-2 lg:gap-3"
        >
          {MENU_CATEGORY_META.map((category) => {
            const isActive = category.id === activeCategory;
            return (
              <button
                key={category.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  'rounded-full border px-5 py-2.5 font-numeric text-xs uppercase tracking-[0.12em] transition-colors duration-300',
                  isActive
                    ? 'border-accent bg-accent text-hero-ink'
                    : 'border-ink/15 text-ink-soft hover:border-accent/50 hover:text-ink',
                )}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        <div className="relative mt-14 min-h-[240px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -14 }}
              transition={{ duration: prefersReducedMotion ? 0.15 : 0.4, ease: FILTER_EASE }}
              className="grid gap-x-10 gap-y-8 sm:grid-cols-2"
            >
              {filteredItems.map((item) => (
                <div key={item.id} className="flex gap-4 border-b border-line pb-6">
                  <ResponsiveImage
                    src={item.image}
                    tone="sage"
                    icon={CATEGORY_ICON[item.category]}
                    alt={item.imageAlt}
                    className="h-20 w-20 shrink-0 rounded-full"
                    imgClassName="h-20 w-20 rounded-full"
                  />
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-lg text-ink">{item.name}</h3>
                      <span className="shrink-0 font-numeric text-sm text-clay-dark">{formatPrice(item.price)}</span>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">{item.description}</p>
                    <div className="mt-2.5 flex items-center gap-2">
                      <Badge variant={item.dietary === 'veg' ? 'veg' : 'non-veg'}>
                        {item.dietary === 'veg' ? 'Veg' : 'Non-Veg'}
                      </Badge>
                      {item.isSignature && <Badge variant="outline">Chef&apos;s Pick</Badge>}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
