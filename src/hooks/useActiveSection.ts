import { useEffect, useState } from 'react';

/**
 * Tracks which of the given section ids is currently most visible in the
 * viewport. Built on IntersectionObserver rather than scroll-position math
 * so it stays correct regardless of what is driving the scroll (native or
 * Lenis) and stays cheap on the main thread.
 *
 * Callers should pass a referentially-stable array (module-level constant
 * or a `useMemo`) since a new array identity re-subscribes the observer.
 */
export function useActiveSection(sectionIds: readonly string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(sectionIds[0] ?? null);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (mostVisible) {
          setActiveId(mostVisible.target.id);
        }
      },
      {
        // Treat a horizontal band through the middle of the viewport as
        // "active", so the indicator changes roughly when a section's
        // heading crosses the vertical center rather than its first pixel.
        rootMargin: '-35% 0px -55% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}
