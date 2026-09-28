import { marquee } from "@/data/content";

/**
 * Continuously scrolling customer strip that closes out the hero.
 *
 * It renders inside the hero section and paints no background of its own, so
 * the brand gradient runs unbroken from the top of the page through to the
 * bottom of the first screen — hence the light-on-dark palette and the hairline
 * rule instead of a colour change.
 *
 * Deliberately shallow and full-bleed: supporting proof, read as a continuous
 * ribbon across the page rather than a section in its own right.
 *
 * The brand list is rendered twice so the CSS animation can translate exactly
 * -50% and loop seamlessly; the duplicate half is hidden from screen readers.
 *
 * Spacing is a trailing margin on every item rather than a flex `gap`. A gap
 * sits only *between* items, so fourteen items give thirteen gaps and each half
 * measures half a gap short of the true loop period — which makes the strip
 * visibly jump on every cycle. A trailing margin gives both halves identical
 * width, so -50% is exactly one set.
 */
export function BrandMarquee() {
  return (
    <section className="border-t border-white/10 py-6" aria-label="Customers">
      <p className="mb-6 px-6 text-center text-sm text-white/50">{marquee.caption}</p>

      <div className="marquee-mask overflow-hidden">
        <div className="marquee-track flex w-max items-center">
          {[...marquee.brands, ...marquee.brands].map(({ name, Icon }, index) => (
            <span
              key={`${name}-${index}`}
              aria-hidden={index >= marquee.brands.length}
              className="me-14 inline-flex items-center gap-2.5 whitespace-nowrap text-lg font-normal tracking-[-0.01em] text-white/65"
            >
              <Icon className="h-5 w-5 text-brand-sky" aria-hidden="true" />
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
