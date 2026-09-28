import { useEffect, useRef, useState } from "react";

/**
 * Reports whether the referenced element is in the viewport.
 * Defaults to firing once, which is what the stat counters want.
 */
export function useInView({ threshold = 0.5, once = true } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold },
    );

    io.observe(node);
    return () => io.disconnect();
  }, [threshold, once]);

  return [ref, inView];
}
