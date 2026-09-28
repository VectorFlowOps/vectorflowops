import { useCallback, useMemo, useState } from "react";

import { AssistantContext } from "./assistantContext";

/**
 * Holds whether the assistant panel is open, so any part of the page (the
 * launcher, a scroll trigger, a "Book a demo" button) can open it.
 */
export function AssistantProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close]);
  return <AssistantContext.Provider value={value}>{children}</AssistantContext.Provider>;
}
