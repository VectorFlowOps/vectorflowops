import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input, Label, Select } from "@/components/ui/input";
import { SmartLink } from "@/components/common/SmartLink";
import { usePageTitle } from "@/hooks/usePageTitle";
import { waitlist } from "@/data/pages";
import { hero } from "@/data/content";
import { submitWaitlist } from "@/lib/waitlist";

/**
 * Waitlist sign-up. Submits to `/api/waitlist`, which emails the entry via
 * Resend (see `api/waitlist.js`), then shows a success state.
 */
export function WaitlistPage() {
  usePageTitle("Join the waitlist");
  const { form } = waitlist;
  const [role, setRole] = useState(form.role.options[0].value);
  const [name, setName] = useState("");
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    if (sending) return;
    setError("");
    setSending(true);
    const data = Object.fromEntries(new FormData(event.currentTarget));
    try {
      await submitWaitlist(data);
      setDone(true);
    } catch (failure) {
      setError(failure.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <main id="main" className="relative overflow-hidden bg-navy pt-[74px] text-white">
      <div className="bg-hero-mesh pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="shell-wide relative grid gap-12 py-14 md:py-20 lg:grid-cols-[1fr_minmax(0,600px)] lg:items-start lg:gap-16 xl:grid-cols-[1fr_minmax(0,640px)]">
        <div className="lg:pt-6">
          <p className="mb-5 text-[13px] font-semibold uppercase tracking-[0.06em] text-brand-sky">
            {waitlist.eyebrow}
          </p>
          <h1 className="max-w-[620px] text-display font-light">{waitlist.title}</h1>
          <p className="mt-6 max-w-[540px] text-lg font-light leading-relaxed text-white/70">
            {waitlist.body}
          </p>
          <ul className="mt-9 space-y-3 text-[15px] text-white/80">
            {waitlist.points.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-aqua/20 text-aqua">
                  <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                </span>
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-10 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 py-2 pl-2 pr-4">
            <div className="flex -space-x-1.5">
              {hero.community.avatars.concat(["JL", "AS"]).map((initials) => (
                <span
                  key={initials}
                  className="grid h-7 w-7 place-items-center rounded-full border-2 border-navy bg-gradient-to-br from-brand to-aqua text-[10px] font-bold tracking-tight text-white"
                >
                  {initials}
                </span>
              ))}
            </div>
            <span className="text-[13px] text-white/75">{waitlist.proof}</span>
          </div>
        </div>

        <div className="rounded-panel border border-white/10 bg-white p-7 text-ink shadow-lift sm:p-10 lg:p-11">
          {done ? (
            <div role="status" className="py-6 text-center">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-success/10 text-success">
                <Check className="h-7 w-7" strokeWidth={2.4} aria-hidden="true" />
              </span>
              <h2 className="mt-5 text-2xl font-medium">
                {waitlist.success.title}
                {name && ` See you soon, ${name.split(" ")[0]}.`}
              </h2>
              <p className="mx-auto mt-2 max-w-[400px] text-[15px] text-body">
                {waitlist.success.body}
              </p>
              <Button variant="outline" asChild className="mt-7">
                <SmartLink href={waitlist.success.cta.href}>{waitlist.success.cta.label}</SmartLink>
              </Button>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={onSubmit}>
              <h2 className="text-2xl font-medium">{form.title}</h2>

              {/* Honeypot: hidden from people, tempting to bots. */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />

              <fieldset>
                <legend className="mb-1.5 block text-[13.5px] font-medium text-ink">
                  {form.role.label}
                </legend>
                <div className="grid gap-2">
                  {form.role.options.map((option) => (
                    <label
                      key={option.value}
                      className={cn(
                        "flex cursor-pointer items-center justify-center rounded-md border px-3 py-2.5 text-sm font-medium transition-colors",
                        role === option.value
                          ? "border-brand bg-brand/[0.06] text-brand"
                          : "border-line text-body hover:border-brand/40",
                      )}
                    >
                      <input
                        type="radio"
                        name="role"
                        value={option.value}
                        checked={role === option.value}
                        onChange={() => setRole(option.value)}
                        className="sr-only"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="wl-name">{form.name.label}</Label>
                  <Input
                    id="wl-name"
                    name="name"
                    autoComplete="name"
                    placeholder={form.name.placeholder}
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="wl-email">{form.email.label}</Label>
                  <Input
                    id="wl-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder={form.email.placeholder}
                    required
                  />
                </div>
              </div>

              {role !== "tenant" && (
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="wl-company">{form.company.label}</Label>
                    <Input
                      id="wl-company"
                      name="company"
                      autoComplete="organization"
                      placeholder={form.company.placeholder}
                    />
                  </div>
                  <div>
                    <Label htmlFor="wl-units">{form.units.label}</Label>
                    <div className="relative">
                      <Select id="wl-units" name="units" defaultValue={form.units.options[1]}>
                        {form.units.options.map((option) => (
                          <option key={option}>{option}</option>
                        ))}
                      </Select>
                      <ChevronDown
                        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="wl-wish">{form.wish.label}</Label>
                <textarea
                  id="wl-wish"
                  name="wish"
                  rows={3}
                  placeholder={form.wish.placeholder}
                  className="w-full resize-none rounded-md border border-line bg-white px-3.5 py-2.5 text-[15px] text-ink shadow-sm placeholder:text-muted focus-visible:border-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:ring-offset-0"
                />
              </div>

              {error && (
                <p
                  role="alert"
                  className="rounded-md border border-red-200 bg-red-50 px-3.5 py-2.5 text-[13.5px] text-red-700"
                >
                  {error}
                </p>
              )}

              <Button type="submit" variant="brand" className="h-11 w-full" disabled={sending}>
                {sending ? form.submitting : form.submit}
              </Button>
              <p className="text-center text-xs text-muted">{form.legal}</p>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
