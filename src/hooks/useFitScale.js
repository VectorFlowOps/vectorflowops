import { useLayoutEffect, useRef, useState } from "react";

/**
 * Scales fixed-size content to fill its container.
 *
 * The app screens are laid out at one design width with fixed type sizes, the
 * way a real interface is. Without this they would clip on a narrow device
 * frame — the dashboard needs roughly 480px of height whatever the width. This
 * measures the frame and works out the factor to scale the design down by,
 * plus the height (in design pixels) that fills the frame exactly, so the
 * screen stays whole and proportionally identical at every size.
 *
 * Returns the ref for the frame and `{ scale, height }` to apply to the
 * content. `height` is undefined until the first measurement.
 */
export function useFitScale(designWidth) {
  const ref = useRef(null);
  const [fit, setFit] = useState({ scale: 1, height: undefined });

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;

    const measure = ({ width, height }) => {
      if (width <= 0) return;
      const scale = width / designWidth;
      setFit({ scale, height: height / scale });
    };

    measure(node.getBoundingClientRect());

    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(([entry]) => measure(entry.contentRect));
    observer.observe(node);
    return () => observer.disconnect();
  }, [designWidth]);

  return [ref, fit];
}
