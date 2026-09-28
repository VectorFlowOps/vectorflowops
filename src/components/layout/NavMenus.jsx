import { Link } from "react-router-dom";
import { ArrowRight, Check, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { platformMenu, solutionsMenu } from "@/data/site";

/**
 * The header's dropdowns: a trigger plus a white panel anchored beneath it.
 * Panels are sized to their content rather than the viewport, and every row
 * is a real link.
 *
 * `NavMenu` handles the trigger and positioning; `PlatformPanel` and
 * `SolutionsPanel` are the two bodies.
 */

export function NavMenu({ id, label, open, onOpen, onCloseSoon, triggerRef, children }) {
  return (
    <div className="relative" onMouseEnter={onOpen} onMouseLeave={onCloseSoon}>
      <button
        ref={triggerRef}
        type="button"
        onClick={open ? onCloseSoon : onOpen}
        aria-expanded={open}
        aria-controls={id}
        className={cn(
          "inline-flex items-center gap-1 rounded-md transition-colors hover:text-white",
          open && "text-white",
        )}
      >
        {label}
        <ChevronDown
          className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>

      {open && (
        // The padding bridges the gap to the trigger so the pointer never
        // leaves the menu on its way down. Below xl the panel is centred in
        // the viewport, where there is no room to hang it under the trigger.
        <div
          id={id}
          className="fixed left-1/2 top-[74px] z-50 -translate-x-1/2 pt-3 xl:absolute xl:top-full"
        >
          <div className="origin-top overflow-hidden rounded-2xl border border-line bg-white text-ink shadow-[0_24px_60px_-20px_rgba(8,26,51,0.45)] duration-150 animate-in fade-in-0 zoom-in-95">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

function IconTile({ Icon }) {
  return (
    <span className="mt-0.5 grid h-8 w-8 flex-none place-items-center rounded-[9px] bg-brand/[0.08] text-brand transition-colors group-hover:bg-brand group-hover:text-white">
      <Icon className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
    </span>
  );
}

function Points({ items, className }) {
  return (
    <ul className={cn("mt-1.5 space-y-1", className)}>
      {items.map((point) => (
        <li key={point} className="flex items-start gap-1.5 text-[12.5px] leading-snug text-body">
          <Check
            className="mt-[3px] h-3 w-3 flex-none text-brand"
            strokeWidth={2.6}
            aria-hidden="true"
          />
          {point}
        </li>
      ))}
    </ul>
  );
}

/** A linked row: optional icon, label, optional blurb, optional proof points. */
function MenuRow({ href, Icon, label, blurb, points }) {
  return (
    <Link
      to={href}
      className="group flex items-start gap-3 rounded-lg px-2.5 py-2 transition-colors hover:bg-mist"
    >
      {Icon && <IconTile Icon={Icon} />}
      <span className="min-w-0">
        <span className="block text-sm font-medium text-ink">{label}</span>
        {blurb && <span className="block text-[12.5px] leading-snug text-muted">{blurb}</span>}
        {points && <Points items={points} />}
      </span>
    </Link>
  );
}

function MenuFooter({ links }) {
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-1 border-t border-line bg-mist/70 px-4 py-2.5">
      {links.map((link) => (
        <Link
          key={link.label}
          to={link.href}
          className="inline-flex items-center gap-1 text-[13px] font-medium text-brand hover:underline"
        >
          {link.label}
          <ArrowRight className="h-3 w-3" aria-hidden="true" />
        </Link>
      ))}
    </div>
  );
}

function ColumnTitle({ children }) {
  return (
    <p className="mb-1 px-2.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
      {children}
    </p>
  );
}

export function PlatformPanel() {
  const { capabilities, portals, promo, footer } = platformMenu;
  return (
    <div className="w-[min(880px,calc(100vw-32px))]">
      <div className="grid grid-cols-[1.35fr_1fr_1fr]">
        <div className="p-2">
          <ColumnTitle>{capabilities.title}</ColumnTitle>
          {capabilities.items.map((item) => (
            <MenuRow key={item.label} {...item} />
          ))}
        </div>

        <div className="border-l border-line p-2">
          <ColumnTitle>{portals.title}</ColumnTitle>
          {portals.items.map((item) => (
            <MenuRow key={item.label} {...item} />
          ))}
        </div>

        <div className="p-2">
          <Link
            to={promo.cta.href}
            className="group flex h-full flex-col rounded-xl bg-navy bg-section-mesh p-5 text-white transition-transform duration-300 hover:-translate-y-0.5"
          >
            <span className="inline-flex w-fit items-center rounded-full bg-brand-gradient px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.08em]">
              {promo.eyebrow}
            </span>
            <span className="mt-4 block text-[17px] font-medium leading-snug tracking-[-0.01em]">
              {promo.title}
            </span>
            <span className="mt-2 block text-[13px] leading-relaxed text-white/70">
              {promo.body}
            </span>
            <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[13px] font-semibold text-brand-sky group-hover:text-white">
              {promo.cta.label}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </Link>
        </div>
      </div>
      <MenuFooter links={footer} />
    </div>
  );
}

export function SolutionsPanel() {
  const { title, items, footer } = solutionsMenu;
  return (
    <div className="w-[min(760px,calc(100vw-32px))]">
      <div className="p-2">
        <ColumnTitle>{title}</ColumnTitle>
        <div className="grid grid-cols-3 gap-1">
          {items.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="group flex flex-col rounded-xl px-3 py-3 transition-colors hover:bg-mist"
            >
              <span className="flex items-start gap-3">
                <IconTile Icon={item.Icon} />
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-ink">{item.label}</span>
                  <span className="block text-[12.5px] leading-snug text-muted">{item.blurb}</span>
                </span>
              </span>
              <Points items={item.points} className="mt-3 pl-11" />
              <span className="mt-4 inline-flex items-center gap-1 pl-11 text-[13px] font-semibold text-brand">
                {item.linkLabel}
                <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
      <MenuFooter links={footer} />
    </div>
  );
}
