import { useEffect, useRef, useState } from 'react';
import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider';

interface NavbarScrollState {
  /** Past the "glass" threshold — swap from transparent-on-hero to a frosted light panel. */
  isScrolled: boolean;
  /** Scrolling down past the reveal threshold — slide the bar off-screen until the user scrolls back up. */
  isHidden: boolean;
}

const GLASS_THRESHOLD = 60;
const HIDE_THRESHOLD = 220;

export function useNavbarScrollState(): NavbarScrollState {
  const { lenis } = useSmoothScroll();
  const [state, setState] = useState<NavbarScrollState>({ isScrolled: false, isHidden: false });
  const lastScrollRef = useRef(0);

  useEffect(() => {
    const evaluate = (currentScroll: number) => {
      const goingDown = currentScroll > lastScrollRef.current;
      lastScrollRef.current = currentScroll;

      setState({
        isScrolled: currentScroll > GLASS_THRESHOLD,
        isHidden: goingDown && currentScroll > HIDE_THRESHOLD,
      });
    };

    if (lenis) {
      // Read the position straight off the instance rather than trusting the
      // callback payload shape, since that's the one part of Lenis's public
      // API that's guaranteed stable across versions.
      const handleLenisScroll = () => evaluate(lenis.scroll);
      lenis.on('scroll', handleLenisScroll);
      return () => {
        lenis.off('scroll', handleLenisScroll);
      };
    }

    const handleNativeScroll = () => evaluate(window.scrollY);
    window.addEventListener('scroll', handleNativeScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleNativeScroll);
  }, [lenis]);

  return state;
}
