import { createContext, useContext } from "react";

/** Open/closed state for the assistant, shared by the provider, widget and triggers. */
export const AssistantContext = createContext(null);

export function useAssistant() {
  const context = useContext(AssistantContext);
  if (!context) throw new Error("useAssistant must be used inside <AssistantProvider>");
  return context;
}
