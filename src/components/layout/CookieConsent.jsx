import { Cookie } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SmartLink } from "@/components/common/SmartLink";
import { useCookieConsent } from "@/hooks/useCookieConsent";
import { cookieConsent } from "@/data/pages";

/**
 * Cookie banner. Shows once, bottom-left on desktop and full-width on
 * mobile, until the visitor picks "Accept all" or "Essential only"; the
 * choice is remembered by `useCookieConsent`.
 *
 * It is a labelled region rather than a modal: nothing is blocked, focus is
 * not trapped, and the page stays usable behind it.
 */
export function CookieConsent() {
  const [consent, choose] = useCookieConsent();
  if (consent !== null) return null;

  return (
    <section
      role="region"
      aria-label={cookieConsent.title}
      className="fixed inset-x-4 bottom-4 z-[45] sm:inset-x-auto sm:left-6 sm:bottom-6 sm:w-[400px] duration-500 animate-in fade-in-0 slide-in-from-bottom-4"
    >
      <div className="rounded-2xl border border-white/10 bg-navy/95 p-5 text-white shadow-lift backdrop-blur-xl">
        <div className="flex items-start gap-3">
          <span className="grid h-9 w-9 flex-none place-items-center rounded-[10px] bg-white/10 text-brand-sky">
            <Cookie className="h-[18px] w-[18px]" strokeWidth={1.8} aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="text-[15px] font-medium">{cookieConsent.title}</p>
            <p className="mt-1 text-[13.5px] leading-relaxed text-white/70">
              {cookieConsent.body}{" "}
              <SmartLink
                href={cookieConsent.policy.href}
                className="font-medium text-brand-sky underline-offset-2 hover:underline"
              >
                {cookieConsent.policy.label}
              </SmartLink>
            </p>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <Button variant="brand" className="h-10 flex-1" onClick={() => choose("all")}>
            {cookieConsent.acceptAll}
          </Button>
          <Button variant="onDark" className="h-10 flex-1" onClick={() => choose("essential")}>
            {cookieConsent.essentialOnly}
          </Button>
        </div>
      </div>
    </section>
  );
}
