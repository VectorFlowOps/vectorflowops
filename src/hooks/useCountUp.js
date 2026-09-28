import { useEffect } from "react";
import anime from "animejs";

import { useInView } from "./useInView";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/** `98.6` → one decimal, `11` → none. Keeps "11 hrs" from reading "11.0 hrs". */
export const formatStat = (value, target, suffix = "") =>
  `${value.toFixed(Number.isInteger(target) ? 0 : 1)}${suffix}`;

/**
 * Counts from zero up to `target` the first time the element is scrolled into
 * view. Returns the ref to attach to the element whose text should animate.
 */
export function useCountUp(target, { suffix = "", duration = 1600 } = {}) {
  const [ref, inView] = useInView({ threshold: 0.5 });
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView) return;

    if (prefersReduced) {
      node.textContent = formatStat(target, target, suffix);
      return;
    }

    const state = { value: 0 };
    const animation = anime({
      targets: state,
      value: target,
      duration,
      easing: "easeOutExpo",
      update: () => {
        node.textContent = formatStat(state.value, target, suffix);
      },
    });

    return () => animation.pause();
  }, [ref, inView, target, suffix, duration, prefersReduced]);

  return ref;
}
