import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { useCountUp, formatStat } from "@/hooks/useCountUp";
import { stats } from "@/data/content";

/** A single headline number that counts up when it scrolls into view. */
function StatCounter({ value, suffix, label }) {
  const ref = useCountUp(value, { suffix });

  return (
    <div>
      <div
        ref={ref}
        className="text-gradient bg-gradient-to-r from-white to-brand-sky text-[52px] font-bold leading-none tracking-[-0.03em]"
      >
        {formatStat(0, value, suffix)}
      </div>
      <span className="mt-2.5 block text-sm text-white/70">{label}</span>
    </div>
  );
}

export function Stats() {
  return (
    <Section className="relative overflow-hidden bg-navy text-white">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.22]"
        style={{ backgroundImage: `url(${stats.image.src})` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-stats-scrim" aria-hidden="true" />

      <div className="relative z-[1]">
        <SectionHeading tone="dark" title={stats.title} subtitle={stats.subtitle} />

        <div className="grid grid-cols-2 gap-9 text-center md:grid-cols-4">
          {stats.items.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 90}>
              <StatCounter {...stat} />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
