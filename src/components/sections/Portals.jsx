import { ArrowRight, Check } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { SmartLink } from "@/components/common/SmartLink";
import { portals } from "@/data/content";

export function Portals() {
  return (
    <Section id="portals" className="bg-gradient-to-b from-mist to-white">
      <SectionHeading eyebrow={portals.eyebrow} title={portals.title} subtitle={portals.subtitle} />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {portals.items.map((portal, index) => (
          <Reveal key={portal.label} delay={index * 110} className="h-full">
            <Card className="group flex h-full flex-col overflow-hidden p-0 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <div className="relative h-[196px] overflow-hidden">
                <img
                  src={portal.image.src}
                  alt={portal.image.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-navy/35" />
                <Badge variant="overlay" className="absolute left-3.5 top-3.5">
                  {portal.label}
                </Badge>
              </div>

              <CardContent className="flex flex-1 flex-col p-[26px]">
                <h3 className="mb-2.5 text-[22px] font-medium">{portal.title}</h3>
                <p className="mb-4 text-[15px] text-body">{portal.body}</p>

                <ul className="mb-6 flex-1 space-y-2.5 text-sm text-body">
                  {portal.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <Check
                        className="mt-0.5 h-4 w-4 flex-none text-brand"
                        strokeWidth={2.4}
                        aria-hidden="true"
                      />
                      {point}
                    </li>
                  ))}
                </ul>

                <SmartLink
                  href={portal.href}
                  className="inline-flex items-center gap-1.5 text-[14.5px] font-semibold text-brand hover:underline"
                >
                  Learn more
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="sr-only">about the {portal.title}</span>
                </SmartLink>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
