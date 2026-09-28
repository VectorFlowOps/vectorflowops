import { useEffect, useState } from "react";

/**
 * True once the page has scrolled past `offset` pixels.
 * Drives the sticky header's transparent → frosted transition.
 */
export function useScrolled(offset = 20) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;

    const onScroll = () => {
      // Coalesce scroll events into one state update per frame.
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        setScrolled(window.scrollY > offset);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [offset]);

  return scrolled;
}
