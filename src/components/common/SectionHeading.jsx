import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

/**
 * Section opener: eyebrow + heading + subtitle.
 *
 * `align="left"` lays the heading against the left edge with the subtitle
 * carried out to the right, instead of stacking everything down the centre.
 * `tone="dark"` switches to the palette used on navy backgrounds.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  tone = "light",
  align = "center",
  className,
}) {
  const dark = tone === "dark";
  const left = align === "left";

  const eyebrowEl = eyebrow && (
    <span
      className={cn(
        "mb-3.5 block text-[13px] font-semibold uppercase tracking-[0.06em]",
        dark ? "text-brand-sky" : "text-brand",
      )}
    >
      {eyebrow}
    </span>
  );

  const titleEl = (
    <h2 className={cn("text-h2 font-medium", dark ? "text-white" : "text-ink")}>{title}</h2>
  );

  const subtitleEl = subtitle && (
    <p className={cn("text-lg", dark ? "text-white/70" : "text-body")}>{subtitle}</p>
  );

  if (left) {
    return (
      <Reveal
        className={cn(
          "mb-12 grid gap-6 md:mb-16 md:grid-cols-[minmax(0,1fr)_minmax(0,420px)] md:items-end md:gap-12",
          className,
        )}
      >
        <div>
          {eyebrowEl}
          {titleEl}
        </div>
        {subtitleEl}
      </Reveal>
    );
  }

  return (
    <Reveal className={cn("mx-auto mb-14 max-w-prose text-center md:mb-[60px]", className)}>
      {eyebrowEl}
      <div className="mb-4">{titleEl}</div>
      {subtitleEl}
    </Reveal>
  );
}
