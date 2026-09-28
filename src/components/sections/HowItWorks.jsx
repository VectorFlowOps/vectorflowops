import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { howItWorks } from "@/data/content";

export function HowItWorks() {
  return (
    <Section id="how-it-works" className="relative overflow-hidden bg-navy text-white">
      <div className="pointer-events-none absolute inset-0 bg-section-mesh" aria-hidden="true" />

      <div className="relative z-[1]">
        <SectionHeading
          tone="dark"
          eyebrow={howItWorks.eyebrow}
          title={howItWorks.title}
          subtitle={howItWorks.subtitle}
        />

        <ol className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {howItWorks.steps.map(({ Icon, tag, title, body }, index) => (
            <Reveal
              as="li"
              key={tag}
              delay={index * 110}
              className="rounded-[18px] border border-white/10 bg-white/[0.05] p-[34px] transition-transform duration-300 hover:-translate-y-1.5"
            >
              <div className="mb-[22px] flex items-center gap-3 text-sm font-semibold text-brand-sky">
                <b className="grid h-11 w-11 place-items-center rounded-xl bg-brand-gradient text-white">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </b>
                {tag}
                <span className="h-px flex-1 bg-white/15" aria-hidden="true" />
              </div>
              <h3 className="mb-2.5 text-xl font-medium">{title}</h3>
              <p className="text-[15px] text-white/70">{body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
