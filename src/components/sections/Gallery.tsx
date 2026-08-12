import { useEffect, useMemo, useState, type ComponentType } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { IconUtensils, IconLamp, IconChefHat, IconFlame, IconFrame } from '@/components/ui/icons';
import { GALLERY_IMAGES } from '@/data/gallery';
import { GALLERY_CATEGORIES } from '@/types';
import type { GalleryCategoryId, GalleryImage } from '@/types';
import { SECTION_IDS } from '@/constants/site';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/utils';

const CATEGORY_LABEL: Record<GalleryCategoryId, string> = {
  all: 'All',
  food: 'Food',
  ambience: 'Ambience',
  chef: 'Chef',
  kitchen: 'Kitchen',
  interior: 'Interior',
};

const CATEGORY_ICON: Record<Exclude<GalleryCategoryId, 'all'>, ComponentType<{ className?: string }>> = {
  food: IconUtensils,
  ambience: IconLamp,
  chef: IconChefHat,
  kitchen: IconFlame,
  interior: IconFrame,
};

const IMAGE_TONES = ['olive', 'clay'] as const;

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategoryId>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () => (activeCategory === 'all' ? GALLERY_IMAGES : GALLERY_IMAGES.filter((image) => image.category === activeCategory)),
    [activeCategory],
  );

  return (
    <section id={SECTION_IDS.gallery} className="scroll-mt-24 bg-bg py-24 lg:py-32">
      <Container>
        <SectionHeading eyebrow="Inside Ember" title="A Look Around" align="center" className="mx-auto" />

        <div role="group" aria-label="Filter gallery by category" className="mt-14 flex flex-wrap justify-center gap-2">
          {GALLERY_CATEGORIES.map((category) => {
            const isActive = category === activeCategory;
            return (
              <button
                key={category}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  'rounded-full border px-5 py-2.5 font-numeric text-xs uppercase tracking-[0.12em] transition-colors duration-300',
                  isActive
                    ? 'border-accent bg-accent text-hero-ink'
                    : 'border-ink/15 text-ink-soft hover:border-accent/50 hover:text-ink',
                )}
              >
                {CATEGORY_LABEL[category]}
              </button>
            );
          })}
        </div>

        <div className="mt-14 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {filtered.map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setLightboxIndex(index)}
              className="group relative mb-4 block w-full overflow-hidden break-inside-avoid"
              style={{ aspectRatio: `${image.width} / ${image.height}` }}
              aria-label={`View larger photo: ${image.alt}`}
            >
              <ResponsiveImage
                src={image.src}
                tone={IMAGE_TONES[index % IMAGE_TONES.length]}
                icon={CATEGORY_ICON[image.category]}
                alt={image.alt}
                className="h-full w-full"
                imgClassName="h-full w-full transition-transform duration-700 ease-premium group-hover:scale-110"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-hero/0 transition-colors duration-500 group-hover:bg-hero/10"
              />
            </button>
          ))}
        </div>
      </Container>

      <Lightbox images={filtered} index={lightboxIndex} onClose={() => setLightboxIndex(null)} onNavigate={setLightboxIndex} />
    </section>
  );
}

// ---------------------------------------------------------------------------

interface LightboxProps {
  images: GalleryImage[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

function Lightbox({ images, index, onClose, onNavigate }: LightboxProps) {
  const isOpen = index !== null;
  useLockBodyScroll(isOpen);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!isOpen || index === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') onNavigate((index + 1) % images.length);
      if (event.key === 'ArrowLeft') onNavigate((index - 1 + images.length) % images.length);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, index, images.length, onClose, onNavigate]);

  return (
    <AnimatePresence>
      {isOpen && index !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.1 : 0.35 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-hero/95 p-4 sm:p-10"
          role="dialog"
          aria-modal="true"
          aria-label={images[index].alt}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-5 top-5 p-2 text-hero-ink transition-colors hover:text-clay sm:right-8 sm:top-8"
          >
            <FiX className="h-7 w-7" />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => onNavigate((index - 1 + images.length) % images.length)}
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 text-hero-ink transition-colors hover:text-clay sm:left-6"
              >
                <FiChevronLeft className="h-8 w-8" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate((index + 1) % images.length)}
                aria-label="Next photo"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-hero-ink transition-colors hover:text-clay sm:right-6"
              >
                <FiChevronRight className="h-8 w-8" />
              </button>
            </>
          )}

          <motion.div
            key={images[index].id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-h-[85vh] w-full max-w-4xl"
            style={{ aspectRatio: `${images[index].width} / ${images[index].height}` }}
          >
            <ResponsiveImage
              src={images[index].src}
              tone="olive"
              alt={images[index].alt}
              className="h-full w-full"
              imgClassName="h-full w-full object-contain"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
