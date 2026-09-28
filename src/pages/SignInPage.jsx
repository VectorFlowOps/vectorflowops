import { useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { usePageTitle } from "@/hooks/usePageTitle";
import { signIn } from "@/data/pages";

/**
 * Sign-in. Client-side only: submitting shows a notice rather than calling an
 * API, which is honest for a marketing site with no backend yet.
 */
export function SignInPage() {
  usePageTitle("Sign in");
  const [submitted, setSubmitted] = useState(false);

  return (
    <main id="main" className="relative flex min-h-svh flex-col overflow-hidden bg-navy pt-[74px]">
      <div className="bg-hero-mesh pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="shell relative flex flex-1 items-center justify-center py-16">
        <div className="w-full max-w-[440px] rounded-panel border border-white/10 bg-white p-8 text-ink shadow-lift sm:p-10">
          <h1 className="text-2xl font-medium tracking-[-0.01em]">{signIn.title}</h1>
          <p className="mt-1.5 text-sm text-body">{signIn.subtitle}</p>

          <Button
            type="button"
            variant="outline"
            className="mt-7 h-11 w-full"
            onClick={() => setSubmitted(true)}
          >
            <span
              className="grid h-5 w-5 place-items-center rounded-full bg-brand-gradient text-[11px] font-bold text-white"
              aria-hidden="true"
            >
              G
            </span>
            {signIn.google}
          </Button>

          <div className="my-6 flex items-center gap-3 text-xs text-muted">
            <span className="h-px flex-1 bg-line" />
            {signIn.divider}
            <span className="h-px flex-1 bg-line" />
          </div>

          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitted(true);
            }}
          >
            <div>
              <Label htmlFor="signin-email">{signIn.email.label}</Label>
              <Input
                id="signin-email"
                type="email"
                autoComplete="email"
                placeholder={signIn.email.placeholder}
                required
              />
            </div>
            <div>
              <div className="flex items-baseline justify-between">
                <Label htmlFor="signin-password">{signIn.password.label}</Label>
                <button
                  type="button"
                  className="mb-1.5 text-[13px] font-medium text-brand hover:underline"
                  onClick={() => setSubmitted(true)}
                >
                  {signIn.password.forgot}
                </button>
              </div>
              <Input
                id="signin-password"
                type="password"
                autoComplete="current-password"
                placeholder={signIn.password.placeholder}
                required
              />
            </div>
            <Button type="submit" variant="brand" className="h-11 w-full">
              {signIn.submit}
            </Button>
          </form>

          {submitted && (
            <p
              role="status"
              className="mt-4 rounded-md border border-brand/20 bg-brand/[0.06] px-3.5 py-2.5 text-[13.5px] text-body"
            >
              {signIn.demoNotice}
            </p>
          )}

          <p className="mt-7 text-center text-sm text-body">
            {signIn.switch.prompt}{" "}
            <Link to={signIn.switch.href} className="font-semibold text-brand hover:underline">
              {signIn.switch.label}
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
