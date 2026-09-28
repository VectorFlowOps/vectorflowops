import { useLayoutEffect, useRef } from "react";
import anime from "animejs";

import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * The hero's load sequence: the copy staggers up, then the property cards
 * slide in from the right. Once they land, `useCardLoop` takes over and keeps
 * stepping.
 *
 * Elements opt in with `data-hero-item` (copy) and `data-hero-visual` (the
 * card row's container). The finished state is the stylesheet default; this hook
 * hides the targets itself in a layout effect — before first paint, so nothing
 * flashes — and only when it is about to animate them. Under reduced motion,
 * or if the timeline never runs, the hero renders complete.
 */
export function useHeroIntro() {
  const ref = useRef(null);
  const prefersReduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    const items = [...root.querySelectorAll("[data-hero-item]")];
    const visual = [...root.querySelectorAll("[data-hero-visual]")];
    const all = [...items, ...visual];

    const finish = () =>
      all.forEach((node) => {
        node.style.opacity = "";
        node.style.transform = "";
      });

    if (prefersReduced) {
      finish();
      return;
    }

    all.forEach((node) => (node.style.opacity = "0"));

    const timeline = anime.timeline({ easing: "cubicBezier(0.22, 1, 0.36, 1)" });

    timeline
      .add({
        targets: items,
        translateY: [24, 0],
        opacity: [0, 1],
        duration: 800,
        delay: anime.stagger(90, { start: 120 }),
      })
      .add(
        {
          targets: visual,
          translateX: [56, 0],
          scale: [0.96, 1],
          opacity: [0, 1],
          duration: 1200,
        },
        240,
      );

    return () => {
      timeline.pause();
      finish();
    };
  }, [prefersReduced]);

  return ref;
}
