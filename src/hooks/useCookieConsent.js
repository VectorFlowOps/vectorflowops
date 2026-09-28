import { useCallback, useEffect, useState } from "react";

/**
 * Remembers the visitor's cookie choice in localStorage.
 *
 * `consent` is `null` until a choice is made (show the banner), then
 * `"all"` or `"essential"`. Storage can be unavailable or blocked (private
 * windows, strict settings), so every access is guarded and the banner
 * simply shows again next visit in that case.
 */

const STORAGE_KEY = "propflow-cookie-consent";
const CHOICES = new Set(["all", "essential"]);

/** Fired on `window` when a choice is made, so other widgets can react. */
export const CONSENT_EVENT = "propflow:cookie-consent";

/** The stored choice, or `null` if none has been made (or storage is blocked). */
export function readCookieConsent() {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return CHOICES.has(value) ? value : null;
  } catch {
    return null;
  }
}

export function useCookieConsent() {
  // Start as "decided" so the banner never flashes for returning visitors
  // before the effect has read storage.
  const [consent, setConsent] = useState("pending");

  useEffect(() => {
    setConsent(readCookieConsent());
  }, []);

  const choose = useCallback((choice) => {
    setConsent(choice);
    try {
      window.localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // Storage unavailable: the choice holds for this session only.
    }
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: choice }));
  }, []);

  return [consent, choose];
}
