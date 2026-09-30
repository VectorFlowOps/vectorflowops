import { ArrowRight, Check } from "lucide-react";

import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { SmartLink } from "@/components/common/SmartLink";
import { deepDives } from "@/data/content";
import { cn } from "@/lib/utils";

/**
 * "One platform. Every feature." — the six pillars, each an alternating
 * text/image block with three proof points and a call to action.
 *
 * Every block carries an id so the header's Platform menu can deep-link to
 * it. `flip` moves the image to the left on desktop while keeping a single,
 * sensible source order for screen readers and the stacked mobile layout.
 */
function DeepDive({ id, eyebrow, title, body, image, points, flip, cta }) {
  return (
    <div
      id={id}
      className="grid grid-cols-1 items-center gap-12 md:grid-cols-[1fr_1.05fr] md:gap-16"
    >
      <Reveal className={cn(flip && "md:order-2")}>
        <span className="mb-3.5 block text-[13px] font-semibold uppercase tracking-[0.06em] text-brand">
          {eyebrow}
        </span>
        <h3 className="mb-4 text-h3 font-medium">{title}</h3>
        <p className="mb-6 text-[16.5px] text-body">{body}</p>

        <ul className="space-y-4">
          {points.map((point) => (
            <li key={point.lead} className="flex gap-3 text-[15.5px]">
              <Check
                className="mt-0.5 h-5 w-5 flex-none text-brand"
                strokeWidth={2.4}
                aria-hidden="true"
              />
              <span>
                <b className="font-semibold">{point.lead}</b> {point.rest}
              </span>
            </li>
          ))}
        </ul>

        <SmartLink
          href={cta.href}
          className="mt-7 inline-flex items-center gap-1.5 text-[15px] font-semibold text-brand hover:underline"
        >
          {cta.label}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">: {title}</span>
        </SmartLink>
      </Reveal>

      <Reveal
        delay={120}
        className={cn("relative overflow-hidden rounded-card shadow-2xl", flip && "md:order-1")}
      >
        <img
          src={image.src}
          alt={image.alt}
          loading="lazy"
          className="aspect-[4/3] w-full object-cover"
        />
      </Reveal>
    </div>
  );
}

export function DeepDives() {
  const { id, eyebrow, title, subtitle, cta, items } = deepDives;

  return (
    <Section id={id}>
      <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
      <div className="space-y-20 md:space-y-28">
        {items.map((item) => (
          <DeepDive key={item.id} cta={cta} {...item} />
        ))}
      </div>
    </Section>
  );
}
