import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input, Label, Select } from "@/components/ui/input";
import { SmartLink } from "@/components/common/SmartLink";
import { usePageTitle } from "@/hooks/usePageTitle";
import { getStarted } from "@/data/pages";

/**
 * Free-trial sign-up. The form is fully client-side and ends in a success
 * state; wiring it to a backend means replacing `onSubmit` and nothing else.
 */
export function GetStartedPage() {
  usePageTitle("Start your free trial");
  const { form } = getStarted;
  const [role, setRole] = useState(form.role.options[0].value);
  const [name, setName] = useState("");
  const [done, setDone] = useState(false);

  return (
    <main id="main" className="relative overflow-hidden bg-navy pt-[74px] text-white">
      <div className="bg-hero-mesh pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="shell-wide relative grid gap-12 py-14 md:py-20 lg:grid-cols-[1fr_minmax(0,520px)] lg:items-start lg:gap-20">
        <div className="lg:pt-6">
          <p className="mb-5 text-[13px] font-semibold uppercase tracking-[0.06em] text-brand-sky">
            {getStarted.eyebrow}
          </p>
          <h1 className="max-w-[620px] text-display font-light">{getStarted.title}</h1>
          <p className="mt-6 max-w-[540px] text-lg font-light leading-relaxed text-white/70">
            {getStarted.body}
          </p>
          <ul className="mt-9 space-y-3 text-[15px] text-white/80">
            {getStarted.points.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-aqua/20 text-aqua">
                  <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-panel border border-white/10 bg-white p-7 text-ink shadow-lift sm:p-9">
          {done ? (
            <div role="status" className="py-6 text-center">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-success/10 text-success">
                <Check className="h-7 w-7" strokeWidth={2.4} aria-hidden="true" />
              </span>
              <h2 className="mt-5 text-2xl font-medium">
                {getStarted.success.title}
                {name && ` Welcome, ${name.split(" ")[0]}.`}
              </h2>
              <p className="mx-auto mt-2 max-w-[380px] text-[15px] text-body">
                {getStarted.success.body}
              </p>
              <Button variant="outline" asChild className="mt-7">
                <SmartLink href={getStarted.success.cta.href}>
                  {getStarted.success.cta.label}
                </SmartLink>
              </Button>
            </div>
          ) : (
            <form
              className="space-y-5"
              onSubmit={(event) => {
                event.preventDefault();
                setDone(true);
              }}
            >
              <h2 className="text-xl font-medium">{form.title}</h2>

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

              <div>
                <Label htmlFor="gs-name">{form.name.label}</Label>
                <Input
                  id="gs-name"
                  autoComplete="name"
                  placeholder={form.name.placeholder}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="gs-email">{form.email.label}</Label>
                <Input
                  id="gs-email"
                  type="email"
                  autoComplete="email"
                  placeholder={form.email.placeholder}
                  required
                />
              </div>
              {role !== "tenant" && (
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="gs-company">{form.company.label}</Label>
                    <Input
                      id="gs-company"
                      autoComplete="organization"
                      placeholder={form.company.placeholder}
                    />
                  </div>
                  <div>
                    <Label htmlFor="gs-units">{form.units.label}</Label>
                    <div className="relative">
                      <Select id="gs-units" defaultValue={form.units.options[1]}>
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

              <Button type="submit" variant="brand" className="h-11 w-full">
                {form.submit}
              </Button>
              <p className="text-center text-xs text-muted">{form.legal}</p>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
