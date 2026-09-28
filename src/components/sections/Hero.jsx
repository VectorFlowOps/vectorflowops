import { Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SmartLink } from "@/components/common/SmartLink";
import { BrandMarquee } from "./BrandMarquee";
import { HeroShowcase } from "./HeroShowcase";
import { useHeroIntro } from "@/hooks/useHeroIntro";
import { hero } from "@/data/content";

export function Hero() {
  const stageRef = useHeroIntro();

  return (
    <section
      id="top"
      ref={stageRef}
      className="hero-stage relative flex min-h-svh flex-col overflow-hidden bg-navy pt-[74px] text-white"
    >
      {/* Layered background: photograph, brand mesh, then a settle to solid navy. */}
      <div
        className="absolute inset-0 bg-cover bg-[center_42%] opacity-[0.28]"
        style={{ backgroundImage: `url(${hero.backdrop.src})` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-hero-mesh" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent to-navy"
        aria-hidden="true"
      />

      <div className="shell-wide relative z-[3] grid grid-cols-1 items-center gap-12 pb-12 pt-10 flex-1 sm:pt-14 md:pb-14 md:pt-16 lg:grid-cols-[1.3fr_1fr] lg:gap-16 xl:grid-cols-[minmax(0,1fr)_minmax(0,560px)] xl:gap-20">
        <div>
          <p
            data-hero-item
            className="mb-6 inline-flex items-center rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-sm text-white/75"
          >
            {hero.announcement}
          </p>

          <h1 data-hero-item className="mb-6 text-display font-light">
            {hero.headline}
          </h1>

          <p
            data-hero-item
            className="mb-9 max-w-[540px] text-lg font-light leading-relaxed text-white/70"
          >
            {hero.body}
          </p>

          <div data-hero-item className="flex flex-wrap gap-3">
            <Button size="lg" variant="brand" asChild>
              <SmartLink href={hero.primaryCta.href}>{hero.primaryCta.label}</SmartLink>
            </Button>
            <Button size="lg" variant="onDark" asChild>
              <SmartLink href={hero.secondaryCta.href}>
                <Play className="h-4 w-4" />
                {hero.secondaryCta.label}
              </SmartLink>
            </Button>
          </div>

          {/* Below lg the frame is hidden, so the community badge lives here instead. */}
          <div
            data-hero-item
            className="mt-7 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 backdrop-blur-sm sm:mt-8 lg:hidden"
          >
            <div className="flex -space-x-1">
              {hero.community.avatars.map((initials) => (
                <span
                  key={initials}
                  className="grid h-6 w-6 place-items-center rounded-full border border-navy bg-gradient-to-br from-brand to-aqua text-[10px] font-bold tracking-tight text-white"
                >
                  {initials}
                </span>
              ))}
            </div>
            <span className="text-[13px] font-medium text-white/90">{hero.community.title}</span>
          </div>
        </div>

        <HeroShowcase />
      </div>

      <div className="relative z-[3]">
        <BrandMarquee />
      </div>
    </section>
  );
}
