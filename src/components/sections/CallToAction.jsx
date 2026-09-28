import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/common/Reveal";
import { SmartLink } from "@/components/common/SmartLink";
import { callToAction } from "@/data/content";

export function CallToAction() {
  return (
    <section className="bg-mist py-20 md:py-24">
      <div className="shell">
        <Reveal className="bg-cta-mesh relative flex flex-wrap items-center justify-between gap-10 overflow-hidden rounded-panel p-10 text-white md:p-[70px]">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-[0.14]"
            style={{ backgroundImage: `url(${callToAction.image.src})` }}
            aria-hidden="true"
          />

          <div className="relative max-w-[620px]">
            <h2 className="text-h3 font-medium">{callToAction.title}</h2>
            <p className="mt-2.5 text-white/80">{callToAction.body}</p>
          </div>

          <Button size="lg" variant="onBrand" asChild className="relative">
            <SmartLink href={callToAction.cta.href}>
              {callToAction.cta.label}
              <ArrowRight className="h-4 w-4" />
            </SmartLink>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
