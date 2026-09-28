import { useEffect } from "react";

import { site } from "@/data/site";

const DEFAULT_TITLE = `${site.name} — ${site.tagline}`;

/** Sets the document title for a page, restoring the default on unmount. */
export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · ${site.name}` : DEFAULT_TITLE;
    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [title]);
}
