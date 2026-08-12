import { useCallback, useMemo, useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { BrandMark } from '@/components/ui/BrandMark';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useNavbarScrollState } from '@/hooks/useNavbarScrollState';
import { NAV_LINKS, BOOK_A_TABLE_HREF, SITE } from '@/constants/site';
import { cn } from '@/lib/utils';

/** Offsets the smooth-scroll landing spot so sections clear the fixed bar. */
const NAV_SCROLL_OFFSET = -96;

// Module-level (not per-render) so useActiveSection's effect doesn't re-subscribe on every render.
const NAV_SECTION_IDS = NAV_LINKS.map((link) => link.href.replace('#', ''));

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isScrolled, isHidden } = useNavbarScrollState();
  const activeId = useActiveSection(NAV_SECTION_IDS);
  const { scrollTo } = useSmoothScroll();

  const handleNavClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      event.preventDefault();
      scrollTo(href, { offset: NAV_SCROLL_OFFSET });
    },
    [scrollTo],
  );

  const wordmarkTone = isScrolled ? 'text-ink' : 'text-hero-ink';
  const markTone = isScrolled ? 'text-accent' : 'text-clay';

  const linkClasses = useMemo(
    () =>
      cn(
        'relative py-1 text-[0.8rem] uppercase tracking-[0.14em] transition-colors duration-300',
        isScrolled ? 'text-ink-soft hover:text-ink' : 'text-hero-ink/75 hover:text-hero-ink',
      ),
    [isScrolled],
  );

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[transform,background-color,backdrop-filter,box-shadow] duration-500 ease-premium',
          isHidden ? '-translate-y-full' : 'translate-y-0',
          isScrolled ? 'bg-bg-alt/85 shadow-[0_1px_0_0_rgba(32,32,32,0.06)] backdrop-blur-md' : 'bg-transparent',
        )}
      >
        <Container className="flex items-center justify-between py-5 lg:py-6">
          <a
            href="#home"
            onClick={(event) => handleNavClick(event, '#home')}
            className="flex items-center gap-2.5"
            aria-label={`${SITE.name} — back to top`}
          >
            <BrandMark className={cn('h-8 w-8 transition-colors duration-500', markTone)} />
            <span className={cn('font-display text-xl tracking-[0.18em] transition-colors duration-500', wordmarkTone)}>
              {SITE.name}
            </span>
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive = activeId === link.href.replace('#', '');
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(event) => handleNavClick(event, link.href)}
                  aria-current={isActive ? 'page' : undefined}
                  className={linkClasses}
                >
                  {link.label}
                  <span
                    aria-hidden
                    className={cn(
                      'absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300',
                      isScrolled ? 'bg-accent' : 'bg-hero-ink',
                      isActive && 'scale-x-100',
                    )}
                  />
                </a>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <Button
              href={BOOK_A_TABLE_HREF}
              onClick={(event) => handleNavClick(event as React.MouseEvent<HTMLAnchorElement>, BOOK_A_TABLE_HREF)}
              variant={isScrolled ? 'primary' : 'outline'}
              tone={isScrolled ? 'light' : 'dark'}
            >
              Book a Table
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={isMobileMenuOpen}
            className={cn(
              'inline-flex items-center justify-center p-2 transition-colors duration-500 lg:hidden',
              isScrolled ? 'text-ink' : 'text-hero-ink',
            )}
          >
            <FiMenu className="h-6 w-6" />
          </button>
        </Container>
      </header>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}
