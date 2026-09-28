import { useState } from "react";
import { Check } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { SmartLink } from "@/components/common/SmartLink";
import { pricing } from "@/data/content";
import { cn } from "@/lib/utils";

/**
 * Three plans with a monthly/annual switch. Prices live in `data/content.js`
 * as monthly amounts; annual billing applies the discount there and shows
 * the per-month equivalent plus the yearly total, so nothing is hidden.
 */

const money = (value, fractionDigits = 2) =>
  value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });

function BillingToggle({ billing, value, onChange }) {
  const options = [billing.monthly, billing.annual];
  return (
    <div
      role="radiogroup"
      aria-label="Billing period"
      className="mx-auto mb-12 flex w-fit items-center rounded-full border border-line bg-white p-1 shadow-sm"
    >
      {options.map((option) => {
        const active = option.id === value;
        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(option.id)}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40",
              active ? "bg-navy text-white" : "text-body hover:text-ink",
            )}
          >
            {option.label}
            {option.badge && (
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[11px] font-semibold",
                  active ? "bg-aqua/25 text-aqua" : "bg-success/10 text-success",
                )}
              >
                {option.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function PlanCard({ plan, annual, discount, note }) {
  const { featured } = plan;
  const perMonth = annual ? plan.monthly * (1 - discount) : plan.monthly;
  const perYear = perMonth * 12;
  const perUnit = plan.unitsCap ? perMonth / plan.unitsCap : null;
  const dim = featured ? "text-white/65" : "text-muted";

  return (
    <Card
      className={cn(
        "relative flex h-full flex-col rounded-card p-8 transition-transform duration-300 hover:-translate-y-1.5 md:p-9",
        featured &&
          "bg-pricing-feature border-0 text-white shadow-lift md:-translate-y-3 md:hover:-translate-y-4",
      )}
    >
      {plan.badge && (
        <Badge
          variant="brand"
          className="absolute -top-3 left-1/2 -translate-x-1/2 px-[15px] py-1.5"
        >
          {plan.badge}
        </Badge>
      )}

      <h3 className="text-lg font-medium">{plan.name}</h3>
      <p className={cn("mt-1.5 min-h-[40px] text-sm", featured ? "text-white/70" : "text-body")}>
        {plan.tagline}
      </p>

      <div className="mt-6 flex items-baseline gap-2">
        {plan.pricePrefix && (
          <span className={cn("text-sm font-medium", dim)}>{plan.pricePrefix}</span>
        )}
        <span className="text-[44px] font-bold leading-none tracking-[-0.03em]">
          {money(perMonth)}
        </span>
        <span className={cn("text-[15px]", dim)}>/mo</span>
      </div>
      <p className={cn("mt-2 text-[13px]", dim)}>
        {note}
        {annual && <> · {money(perYear)} a year</>}
      </p>

      <div
        className={cn(
          "mt-5 flex items-center justify-between rounded-lg border px-3.5 py-2.5 text-[13.5px]",
          featured ? "border-white/15 bg-white/[0.06]" : "border-line bg-mist/70",
        )}
      >
        <span className="font-medium">{plan.unitsLabel}</span>
        {perUnit && (
          <span className={dim}>
            {money(perUnit)} <span className="text-[12px]">per unit</span>
          </span>
        )}
      </div>

      <Button asChild variant={featured ? "brand" : "outline"} className="mt-6 h-11 w-full">
        <SmartLink href={plan.cta.href}>
          {plan.cta.label}
          <span className="sr-only"> on the {plan.name} plan</span>
        </SmartLink>
      </Button>

      <p className={cn("mb-3 mt-7 text-[12px] font-semibold uppercase tracking-[0.06em]", dim)}>
        {plan.includesLabel ?? "What's included"}
      </p>
      <ul className={cn("space-y-2.5 text-[14.5px]", featured ? "text-white/85" : "text-body")}>
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <Check
              className={cn(
                "mt-0.5 h-[18px] w-[18px] flex-none",
                featured ? "text-aqua" : "text-brand",
              )}
              strokeWidth={2.4}
              aria-hidden="true"
            />
            {feature}
          </li>
        ))}
      </ul>
    </Card>
  );
}

export function Pricing() {
  const { billing, plans, between, guarantees, included } = pricing;
  const [period, setPeriod] = useState(billing.monthly.id);
  const annual = period === billing.annual.id;

  return (
    <Section id="pricing" className="bg-gradient-to-b from-white to-mist">
      <SectionHeading eyebrow={pricing.eyebrow} title={pricing.title} subtitle={pricing.subtitle} />

      <Reveal>
        <BillingToggle billing={billing} value={period} onChange={setPeriod} />
      </Reveal>

      <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3 md:pt-3">
        {plans.map((plan, index) => (
          <Reveal key={plan.id} delay={index * 110} className="h-full">
            <PlanCard
              plan={plan}
              annual={annual}
              discount={billing.annualDiscount}
              note={annual ? billing.annual.note : billing.monthly.note}
            />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-8 text-center text-[15px] text-body">
        {between.text}{" "}
        <SmartLink href={between.link.href} className="font-semibold text-brand hover:underline">
          {between.link.label}
        </SmartLink>
      </Reveal>

      <Reveal className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-sm text-body">
        {guarantees.map((item) => (
          <span key={item} className="inline-flex items-center gap-1.5">
            <Check className="h-4 w-4 text-success" strokeWidth={2.6} aria-hidden="true" />
            {item}
          </span>
        ))}
      </Reveal>

      <Reveal className="mt-12 rounded-panel border border-line bg-white p-7 shadow-card md:p-9">
        <p className="mb-5 text-center text-[13px] font-semibold uppercase tracking-[0.06em] text-brand">
          {included.title}
        </p>
        <ul className="grid gap-x-8 gap-y-3 text-[14.5px] text-body sm:grid-cols-2 lg:grid-cols-4">
          {included.items.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <span className="mt-[3px] grid h-4 w-4 flex-none place-items-center rounded-full bg-brand/10 text-brand">
                <Check className="h-2.5 w-2.5" strokeWidth={3} aria-hidden="true" />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
