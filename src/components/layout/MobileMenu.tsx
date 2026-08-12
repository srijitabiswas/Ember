import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { FiX } from 'react-icons/fi';
import { Button } from '@/components/ui/Button';
import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { NAV_LINKS, BOOK_A_TABLE_HREF, CONTACT, SOCIAL_LINKS } from '@/constants/site';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const PANEL_EASE = [0.16, 1, 0.3, 1] as const;

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useLockBodyScroll(isOpen);
  const { scrollTo } = useSmoothScroll();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (isOpen) closeButtonRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleLinkClick = (href: string) => {
    onClose();
    window.setTimeout(() => scrollTo(href, { offset: -96 }), prefersReducedMotion ? 0 : 250);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.15 : 0.4, ease: PANEL_EASE }}
          className="fixed inset-0 z-[80] bg-hero"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <div className="flex h-full flex-col overflow-y-auto px-6 pb-10 pt-6 sm:px-10">
            <div className="flex items-center justify-end">
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="p-2 text-hero-ink transition-colors hover:text-clay"
              >
                <FiX className="h-7 w-7" />
              </button>
            </div>

            <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center gap-1">
              {NAV_LINKS.map((link, index) => (
                <motion.a
                  key={link.id}
                  href={link.href}
                  onClick={(event) => {
                    event.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 + index * 0.06, ease: PANEL_EASE }}
                  className="border-b border-hero-ink/10 py-4 font-display text-4xl text-hero-ink transition-colors hover:text-clay sm:text-5xl"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5, ease: PANEL_EASE }}
              className="flex flex-col gap-6"
            >
              <Button
                href={BOOK_A_TABLE_HREF}
                tone="dark"
                size="lg"
                onClick={(event) => {
                  event.preventDefault();
                  handleLinkClick(BOOK_A_TABLE_HREF);
                }}
                className="w-full"
              >
                Book a Table
              </Button>
              <div className="flex items-center justify-between text-sm text-hero-ink/60">
                <a href={CONTACT.phoneHref} className="transition-colors hover:text-hero-ink">
                  {CONTACT.phoneDisplay}
                </a>
                <div className="flex gap-4">
                  {SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.id}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="transition-colors hover:text-hero-ink"
                    >
                      <social.icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
