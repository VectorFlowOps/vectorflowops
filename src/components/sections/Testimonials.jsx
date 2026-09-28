import { Star } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { testimonials } from "@/data/content";

export function Testimonials() {
  return (
    <Section>
      <SectionHeading eyebrow={testimonials.eyebrow} title={testimonials.title} />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {testimonials.items.map((item, index) => (
          <Reveal key={item.name} delay={index * 110} className="h-full">
            <Card className="flex h-full flex-col rounded-[18px] p-[30px]">
              <div className="mb-3.5 flex gap-0.5 text-star" aria-label="Rated 5 out of 5">
                {Array.from({ length: 5 }).map((_, star) => (
                  <Star key={star} className="h-4 w-4 fill-current" aria-hidden="true" />
                ))}
              </div>

              <blockquote className="flex-1 text-[15.5px] leading-relaxed">{item.quote}</blockquote>

              <div className="mt-[22px] flex items-center gap-3">
                <div
                  className="grid h-11 w-11 flex-none place-items-center rounded-full bg-gradient-to-br from-navy to-brand text-sm font-semibold text-white"
                  aria-hidden="true"
                >
                  {item.initials}
                </div>
                <div>
                  <b className="block text-[14.5px] font-semibold">{item.name}</b>
                  <span className="text-[13px] text-muted">{item.role}</span>
                </div>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
