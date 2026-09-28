import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Keeps scrolling sensible across client-side navigation.
 *
 * A link with a hash (`/landlords#leasing`, `/#pricing`) scrolls to that
 * element once the destination page has rendered, honouring the header offset
 * via the stylesheet's `scroll-padding-top`. Any other navigation starts the
 * new page at the top, the way a full page load would.
 */
export function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) {
        target.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash, key, prefersReduced]);

  return null;
}
