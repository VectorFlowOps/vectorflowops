import { useEffect, useRef } from "react";

import { useAssistant } from "./assistantContext";

/**
 * An invisible sentinel. When it scrolls into view the assistant opens —
 * once per browser session, so it introduces itself and then leaves the
 * visitor alone. Place it where the introduction should happen.
 */

const SESSION_KEY = "propflow-assistant-introduced";

function alreadyIntroduced() {
  try {
    return window.sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

function markIntroduced() {
  try {
    window.sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    // Storage unavailable: it may introduce itself again next page load.
  }
}

export function AssistantTrigger() {
  const ref = useRef(null);
  const { open } = useAssistant();

  useEffect(() => {
    const node = ref.current;
    if (!node || alreadyIntroduced() || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        markIntroduced();
        open();
      },
      { threshold: 0 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [open]);

  return <span ref={ref} aria-hidden="true" className="block h-px w-px" />;
}
