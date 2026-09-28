/**
 * One IntersectionObserver shared by every reveal-on-scroll element.
 *
 * The original implementation created an observer per page and queried the DOM
 * for `.reveal` nodes; this keeps a single observer for the whole app and lets
 * components register themselves through the `useReveal` hook.
 *
 * Revealing only flips a data attribute — the actual transition is CSS, so
 * nothing animates on the main thread in JavaScript.
 */

const REVEAL_OPTIONS = {
  threshold: 0.14,
  rootMargin: "0px 0px -8% 0px",
};

/** @type {IntersectionObserver | null} */
let observer = null;

function getObserver() {
  if (observer) return observer;

  observer = new IntersectionObserver((entries, self) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.dataset.revealed = "true";
      // Reveal once, then stop paying for the observation.
      self.unobserve(entry.target);
    }
  }, REVEAL_OPTIONS);

  return observer;
}

/**
 * Start observing a node. Returns a cleanup function.
 * @param {HTMLElement} node
 * @returns {() => void}
 */
export function observeReveal(node) {
  // Without IntersectionObserver support, show the content immediately rather
  // than leaving it stuck at opacity 0.
  if (typeof IntersectionObserver === "undefined") {
    node.dataset.revealed = "true";
    return () => {};
  }

  const io = getObserver();
  io.observe(node);
  return () => io.unobserve(node);
}
