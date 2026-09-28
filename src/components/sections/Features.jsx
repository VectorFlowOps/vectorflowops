import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { DeviceShowcase } from "@/components/common/DeviceShowcase";
import { AssistantTrigger } from "@/components/assistant/AssistantTrigger";
import { features } from "@/data/content";

export function Features() {
  return (
    <Section id="features" wide>
      <SectionHeading
        align="left"
        eyebrow={features.eyebrow}
        title={features.title}
        subtitle={features.subtitle}
      />

      <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-16 xl:grid-cols-[minmax(0,1fr)_minmax(0,560px)] xl:gap-24">
        <Reveal className="mx-auto w-full max-w-[880px] lg:mx-0">
          <DeviceShowcase />
        </Reveal>

        <ul className="grid gap-1.5">
          {features.items.map(({ Icon, title, body }, index) => (
            <Reveal
              as="li"
              key={title}
              delay={index * 80}
              className="grid grid-cols-[52px_1fr] gap-[18px] rounded-2xl p-[22px] transition-colors hover:bg-mist"
            >
              <span className="grid h-[52px] w-[52px] place-items-center rounded-[14px] border border-line bg-gradient-to-br from-[#EAF1FF] to-mist text-brand">
                <Icon className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />
              </span>
              <div>
                <h3 className="mb-1.5 text-lg font-medium">{title}</h3>
                <p className="text-[15px] text-body">{body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>

      {/* Reaching the end of this section introduces the assistant, once. */}
      <AssistantTrigger />
    </Section>
  );
}
