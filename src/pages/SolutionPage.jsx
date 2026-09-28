import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { SmartLink } from "@/components/common/SmartLink";
import { CallToAction } from "@/components/sections";
import { usePageTitle } from "@/hooks/usePageTitle";
import { account } from "@/data/site";

/**
 * One page per audience, rendered from `data/solutions.js`.
 *
 * A dark opener, an "on this page" strip, one section per feature group with
 * a card per feature (each anchored, so the header menu can deep-link to it),
 * the integrations grid and the shared call to action.
 */
export function SolutionPage({ solution }) {
  usePageTitle(`VFO for ${solution.label.toLowerCase()}`);

  const { hero, groups, integrations } = solution;
  const featureCount = groups.reduce((n, group) => n + group.features.length, 0);

  return (
    <main id="main">
      {/* Opener */}
      <section className="relative overflow-hidden bg-navy pt-[74px] text-white">
        <div className="bg-hero-mesh pointer-events-none absolute inset-0" aria-hidden="true" />

        <div className="shell-wide relative grid gap-12 py-14 md:py-20 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-16">
          <div>
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[13px] text-white/80">
              <solution.Icon className="h-3.5 w-3.5 text-brand-sky" aria-hidden="true" />
              {hero.eyebrow}
            </p>
            <h1 className="max-w-[720px] text-display font-light">{hero.title}</h1>
            <p className="mt-6 max-w-[560px] text-lg font-light leading-relaxed text-white/70">
              {hero.body}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button size="lg" variant="brand" asChild>
                <SmartLink href={account.getStarted.href}>Start free trial</SmartLink>
              </Button>
              <Button size="lg" variant="onDark" asChild>
                <SmartLink href="/#how-it-works">See how it works</SmartLink>
              </Button>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/65">
              {hero.proof.map((point) => (
                <li key={point} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-aqua" strokeWidth={2.4} aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[26px] border border-white/10 shadow-lift">
              <img
                src={hero.image.src}
                alt={hero.image.alt}
                className="h-full w-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent" />
              <div className="absolute bottom-5 left-5 rounded-[13px] border border-white/15 bg-navy/70 px-4 py-3 text-[13px] text-white backdrop-blur">
                <b className="block text-[15px] font-semibold">{hero.caption.title}</b>
                {hero.caption.meta}
              </div>
            </div>
          </div>
        </div>

        {/* On this page */}
        <nav className="relative border-t border-white/10" aria-label="On this page">
          <div className="shell-wide flex flex-wrap items-center gap-2 py-4">
            <span className="mr-2 text-xs font-semibold uppercase tracking-[0.06em] text-white/45">
              {featureCount} features
            </span>
            {groups.map((group) => (
              <a
                key={group.id}
                href={`#${group.id}`}
                className="rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 text-[13px] text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                {group.label}
              </a>
            ))}
            <a
              href="#integrations"
              className="rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 text-[13px] text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              Integrations
            </a>
          </div>
        </nav>
      </section>

      {/* Feature groups */}
      {groups.map((group, index) => (
        <Section key={group.id} id={group.id} className={cn(index % 2 === 1 && "bg-mist")}>
          <SectionHeading
            align="left"
            eyebrow={group.eyebrow}
            title={group.title}
            subtitle={group.subtitle}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {group.features.map((feature, featureIndex) => (
              <Reveal
                as="article"
                key={feature.id}
                id={feature.id}
                delay={featureIndex * 60}
                className="flex flex-col rounded-card border border-line bg-white p-6 shadow-card transition-transform duration-300 hover:-translate-y-1"
              >
                <span className="grid h-11 w-11 place-items-center rounded-[13px] border border-line bg-gradient-to-br from-[#EAF1FF] to-mist text-brand">
                  <feature.Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-medium">{feature.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-body">{feature.body}</p>
                {feature.platforms && (
                  <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Connects to">
                    {feature.platforms.map((platform) => (
                      <li
                        key={platform}
                        className="rounded-full bg-mist px-2.5 py-1 text-xs font-medium text-body"
                      >
                        {platform}
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
            ))}
          </div>
        </Section>
      ))}

      {/* Integrations */}
      <Section id="integrations" className="bg-section-mesh bg-navy text-white">
        <SectionHeading
          align="left"
          tone="dark"
          eyebrow="Integrations"
          title={integrations.title}
          subtitle={integrations.subtitle}
        />
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {integrations.items.map((item, index) => (
            <Reveal
              as="li"
              key={item.name}
              delay={(index % 6) * 50}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3.5"
            >
              <span className="block text-[15px] font-medium">{item.name}</span>
              <span className="block text-xs text-white/50">{item.kind}</span>
            </Reveal>
          ))}
        </ul>
      </Section>

      <CallToAction />
    </main>
  );
}
