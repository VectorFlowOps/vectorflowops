import { useEffect, useRef, useState } from "react";
import { ArrowUp, Sparkles, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SmartLink } from "@/components/common/SmartLink";
import { readCookieConsent, CONSENT_EVENT } from "@/hooks/useCookieConsent";
import { assistant } from "@/data/assistant";
import { useAssistant } from "./assistantContext";

/**
 * The assistant: a floating launcher and a chat panel, bottom-right.
 *
 * UI only for now. Suggested questions return their scripted replies after a
 * short "typing" pause; anything typed returns the fallback with a demo
 * link. Swapping in a real backend means replacing `answer()` and nothing
 * else. The panel is a non-modal dialog: Escape closes it, the page behind
 * stays usable, and focus lands in the input when it opens.
 *
 * On phones the launcher hides while the cookie banner is still unanswered,
 * because both want the bottom of the screen.
 */

const TYPING_MS = 700;

function answer(text) {
  const match = assistant.suggestions.find(
    (suggestion) => suggestion.label.toLowerCase() === text.trim().toLowerCase(),
  );
  return match
    ? { text: match.reply }
    : { text: assistant.fallback.reply, cta: assistant.fallback.cta };
}

function Bubble({ role, children }) {
  const fromUser = role === "user";
  return (
    <div className={cn("flex", fromUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[14px] leading-relaxed",
          fromUser
            ? "rounded-br-md bg-brand text-white"
            : "rounded-bl-md border border-line bg-white text-ink shadow-sm",
        )}
      >
        {children}
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <Bubble role="assistant">
      <span className="flex items-center gap-1 py-1" aria-label="Assistant is typing">
        {[0, 150, 300].map((delay) => (
          <span
            key={delay}
            className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted"
            style={{ animationDelay: `${delay}ms` }}
          />
        ))}
      </span>
    </Bubble>
  );
}

export function AssistantWidget() {
  const { isOpen, open, close } = useAssistant();
  const [messages, setMessages] = useState([{ role: "assistant", text: assistant.greeting }]);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const [consentPending, setConsentPending] = useState(() => readCookieConsent() === null);
  const inputRef = useRef(null);
  const endRef = useRef(null);
  const timer = useRef(0);

  // Hide the launcher on phones until the cookie banner is answered.
  useEffect(() => {
    const onConsent = () => setConsentPending(false);
    window.addEventListener(CONSENT_EVENT, onConsent);
    return () => window.removeEventListener(CONSENT_EVENT, onConsent);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    inputRef.current?.focus({ preventScroll: true });
    const onKey = (event) => event.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages, typing, isOpen]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const send = (text) => {
    const trimmed = text.trim();
    if (!trimmed || typing) return;
    setMessages((list) => [...list, { role: "user", text: trimmed }]);
    setDraft("");
    setTyping(true);
    timer.current = window.setTimeout(() => {
      setMessages((list) => [...list, { role: "assistant", ...answer(trimmed) }]);
      setTyping(false);
    }, TYPING_MS);
  };

  const showSuggestions = messages.length === 1;

  return (
    <>
      {!isOpen && (
        <button
          type="button"
          onClick={open}
          className={cn(
            "fixed bottom-4 right-4 z-[45] items-center gap-2 rounded-full bg-navy py-3 pl-3.5 pr-4 text-sm font-medium text-white shadow-lift ring-1 ring-white/10 transition-transform hover:-translate-y-0.5 sm:bottom-6 sm:right-6",
            consentPending ? "hidden sm:flex" : "flex",
          )}
        >
          <span className="grid h-6 w-6 place-items-center rounded-full bg-brand-gradient">
            <Sparkles className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
          </span>
          {assistant.launcherLabel}
        </button>
      )}

      {isOpen && (
        <section
          role="dialog"
          aria-label={assistant.name}
          className="fixed inset-x-4 bottom-4 z-[45] flex h-[min(640px,calc(100svh-32px))] flex-col overflow-hidden rounded-2xl border border-line bg-mist shadow-lift duration-300 animate-in fade-in-0 slide-in-from-bottom-4 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[390px]"
        >
          {/* Header */}
          <header className="bg-pricing-feature flex items-center gap-3 px-4 py-3.5 text-white">
            <span className="grid h-9 w-9 flex-none place-items-center rounded-[10px] bg-brand-gradient shadow-glow">
              <Sparkles className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[15px] font-medium leading-tight">{assistant.name}</p>
              <p className="flex items-center gap-1.5 text-[12px] text-white/65">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                {assistant.status}
              </p>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close assistant"
              className="grid h-8 w-8 place-items-center rounded-md text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </header>

          {/* Conversation */}
          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
            {messages.map((message, index) => (
              <Bubble key={index} role={message.role}>
                {message.text}
                {message.cta && (
                  <SmartLink
                    href={message.cta.href}
                    className="mt-2 block text-[13.5px] font-semibold text-brand hover:underline"
                  >
                    {message.cta.label} →
                  </SmartLink>
                )}
              </Bubble>
            ))}
            {typing && <TypingDots />}

            {showSuggestions && !typing && (
              <div className="flex flex-wrap gap-2 pt-1">
                {assistant.suggestions.map((suggestion) => (
                  <button
                    key={suggestion.label}
                    type="button"
                    onClick={() => send(suggestion.label)}
                    className="rounded-full border border-brand/25 bg-white px-3 py-1.5 text-[13px] font-medium text-brand transition-colors hover:bg-brand hover:text-white"
                  >
                    {suggestion.label}
                  </button>
                ))}
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Composer */}
          <form
            className="border-t border-line bg-white p-3"
            onSubmit={(event) => {
              event.preventDefault();
              send(draft);
            }}
          >
            <div className="flex items-center gap-2 rounded-xl border border-line bg-mist/60 py-1.5 pl-3.5 pr-1.5 focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20">
              <input
                ref={inputRef}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder={assistant.inputPlaceholder}
                aria-label={assistant.inputPlaceholder}
                className="h-8 min-w-0 flex-1 bg-transparent text-[14px] text-ink outline-none placeholder:text-muted focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button
                type="submit"
                variant="brand"
                size="icon"
                className="h-8 w-8 rounded-lg"
                disabled={!draft.trim() || typing}
                aria-label={assistant.send}
              >
                <ArrowUp className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
            <p className="mt-2 text-center text-[11px] text-muted">{assistant.disclaimer}</p>
          </form>
        </section>
      )}
    </>
  );
}
