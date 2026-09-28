import { clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge needs to be told about the custom font sizes declared in
 * tailwind.config.js. Without this it cannot tell `text-h2` (a size) from
 * `text-ink` (a colour), groups them together, and silently drops the size
 * whenever both appear on the same element.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["display", "h2", "h3"] }],
    },
  },
});

/**
 * Merge conditional class names, with later Tailwind utilities winning over
 * earlier conflicting ones. Used by every component in `components/ui`.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
