import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";

import { horizontalLoop } from "@/lib/horizontalLoop";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Drives the hero's property cards with GreenSock's seamless-loop helper.
 *
 * The row loops without end, the card nearest the centre is "active", and it
 * can be dragged with momentum, snapping to the nearest card when released.
 * Left alone it steps to the next card every few seconds; any interaction
 * (hover, press, arrow, click) holds the auto-step off for a while so the
 * showcase never fights a visitor.
 *
 * Under reduced motion there is no auto-step and jumps are instant; dragging
 * still works because the visitor asked for it.
 *
 * Returns the active index plus the handlers the markup wires up.
 */

const AUTO_STEP_MS = 3800;
const HOLD_AFTER_INTERACTION_MS = 7000;
const STEP = { duration: 1.1, ease: "power2.inOut" };
const JUMP = { duration: 0.7, ease: "power2.inOut" };

export function useCardLoop(listRef, count) {
  const prefersReduced = usePrefersReducedMotion();
  const loopRef = useRef(null);
  const hovered = useRef(false);
  const holdUntil = useRef(0);
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list || count === 0) return;

    let ctx;
    const build = (startIndex) => {
      ctx = gsap.context(() => {
        const loop = horizontalLoop([...list.children], {
          paused: true,
          draggable: true,
          center: true,
          onChange: (_, index) => setActive(index),
        });
        // The helper starts at time zero with the first card against the left
        // edge; open with the chosen card centred instead.
        loop.toIndex(startIndex, { duration: 0 });
        setActive(loop.current());
        loopRef.current = loop;
      }, list);
    };
    build(0);

    // The helper's own resize refresh does not survive a loop that has been
    // repositioned (it re-measures from a contaminated state and strands a
    // card). Rebuilding from the natural layout does, so do that instead.
    let timer = 0;
    const onResize = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        const index = loopRef.current?.current() ?? 0;
        ctx.revert();
        build(index);
      }, 150);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("resize", onResize);
      loopRef.current = null;
      ctx.revert();
    };
  }, [listRef, count]);

  // Auto-step while nobody is interacting.
  useEffect(() => {
    if (prefersReduced) return;
    const timer = window.setInterval(() => {
      const loop = loopRef.current;
      if (!loop || hovered.current || Date.now() < holdUntil.current) return;
      if (loop.draggable?.isDragging || loop.draggable?.isThrowing) return;
      if (document.hidden) return;
      loop.next({ ...STEP });
    }, AUTO_STEP_MS);
    return () => window.clearInterval(timer);
  }, [prefersReduced]);

  const hold = useCallback(() => {
    holdUntil.current = Date.now() + HOLD_AFTER_INTERACTION_MS;
  }, []);

  // Fresh objects each call: the helper writes `overwrite`/`modifiers` onto them.
  const jump = useMemo(
    () => () => (prefersReduced ? { duration: 0 } : { ...JUMP }),
    [prefersReduced],
  );

  return {
    active,
    hold,
    onPointerEnter: useCallback(() => (hovered.current = true), []),
    onPointerLeave: useCallback(() => (hovered.current = false), []),
    next: useCallback(() => {
      hold();
      loopRef.current?.next(jump());
    }, [hold, jump]),
    previous: useCallback(() => {
      hold();
      loopRef.current?.previous(jump());
    }, [hold, jump]),
    toIndex: useCallback(
      (index) => {
        hold();
        loopRef.current?.toIndex(index, jump());
      },
      [hold, jump],
    ),
  };
}
