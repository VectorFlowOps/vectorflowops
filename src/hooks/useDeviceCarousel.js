import { useEffect, useLayoutEffect, useRef } from "react";
import anime from "animejs";

import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Moves the device showcase from one device to the next.
 *
 * Devices opt in with `data-device`; the one whose id matches `active` is on
 * stage. When `active` changes, the outgoing device lifts and fades while the
 * incoming one rises into its place — a crossfade with a little depth, not a
 * slide. The first device enters the same way when the showcase scrolls into
 * view; until then everything is held hidden.
 *
 * The finished state is the stylesheet default, so under reduced motion (or
 * if the timeline never runs) the active device simply renders and the others
 * are hidden. Interrupting a transition mid-flight is safe: anime picks up
 * from wherever the element currently is.
 *
 * Takes the container ref (shared with the in-view observer) rather than
 * creating its own, so both can watch the same node.
 */

const ENTER_EASE = "cubicBezier(0.22, 1, 0.36, 1)";
const EXIT_EASE = "cubicBezier(0.4, 0, 0.2, 1)";

export function useDeviceCarousel(containerRef, active, inView) {
  const prefersReduced = usePrefersReducedMotion();
  const shown = useRef(null);
  const nodes = useRef([]);

  useLayoutEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const devices = [...root.querySelectorAll("[data-device]")];
    nodes.current = devices;
    const current = devices.find((node) => node.dataset.device === active);

    if (prefersReduced) {
      devices.forEach((node) => {
        anime.remove(node);
        node.style.opacity = node === current ? "" : "0";
        node.style.transform = "";
      });
      shown.current = active;
      return;
    }

    if (!inView) {
      // Waiting offstage: hold everything hidden until the section is on screen.
      devices.forEach((node) => {
        anime.remove(node);
        node.style.opacity = "0";
      });
      shown.current = null;
      return;
    }

    const previous = devices.find((node) => node.dataset.device === shown.current);
    shown.current = active;
    if (!current || previous === current) return;

    if (previous) {
      anime.remove(previous);
      anime({
        targets: previous,
        opacity: 0,
        translateY: -28,
        scale: 0.96,
        duration: 550,
        easing: EXIT_EASE,
      });
    }

    anime.remove(current);
    // A fully hidden device starts from below; one caught mid-exit continues
    // from where it is.
    if (parseFloat(current.style.opacity || "1") < 0.05) {
      current.style.transform = "translateY(40px) scale(0.95)";
    }
    anime({
      targets: current,
      opacity: 1,
      translateY: 0,
      scale: 1,
      duration: 950,
      delay: previous ? 120 : 0,
      easing: ENTER_EASE,
    });
  }, [containerRef, active, inView, prefersReduced]);

  // Stop any in-flight animation when the showcase unmounts.
  useEffect(() => () => anime.remove(nodes.current), []);
}
