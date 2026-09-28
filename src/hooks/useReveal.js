import { useCallback, useRef } from "react";

import { observeReveal } from "@/lib/reveal";

/**
 * Returns a ref callback that reveals its element once it scrolls into view.
 *
 * Usage is normally indirect — prefer the `<Reveal>` component, which also
 * applies the required class and stagger delay.
 */
export function useReveal() {
  const cleanupRef = useRef(null);

  return useCallback((node) => {
    // Detach from whatever we were watching before (including on unmount,
    // when React calls the ref callback with null).
    cleanupRef.current?.();
    cleanupRef.current = null;

    if (node) cleanupRef.current = observeReveal(node);
  }, []);
}
