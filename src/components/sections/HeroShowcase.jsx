import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { hero } from "@/data/content";
import { useCardLoop } from "@/hooks/useCardLoop";

/**
 * The hero's right-hand visual: the property portfolio as a row of cards
 * that loops without end, after GreenSock's "infinite scrolling, dragging and
 * snapping cards" demo.
 *
 * The card nearest the centre is active (full size, full colour); the rest
 * fall back. The row steps on its own, can be dragged with momentum and snaps
 * to the nearest card, and a click or the arrows bring a card to the centre.
 * Motion lives in `useCardLoop`; GSAP owns the `<li>` transforms, so those
 * carry no Tailwind transform classes — the scale lives on the inner card.
 *
 * The row bleeds to the right edge of the viewport and is masked at both
 * ends. Hidden below `lg`, where the community badge is repeated in the copy
 * column instead.
 */

const DRAG_THRESHOLD_PX = 6;

export function HeroShowcase() {
  const listRef = useRef(null);
  const pressX = useRef(0);
  const { gallery, galleryControls, community } = hero;
  const loop = useCardLoop(listRef, gallery.length);

  return (
    <div data-hero-visual className="relative hidden h-[460px] lg:-mr-16 lg:block xl:h-[520px]">
      <div className="hero-cards absolute inset-0 overflow-hidden">
        <ul
          ref={listRef}
          className="flex h-full cursor-grab select-none items-center gap-4 active:cursor-grabbing"
          aria-hidden="true"
          onPointerEnter={loop.onPointerEnter}
          onPointerLeave={loop.onPointerLeave}
          onPointerDown={(event) => {
            pressX.current = event.clientX;
            loop.hold();
          }}
        >
          {gallery.map(({ image, name, kind }, index) => (
            <li
              key={image.src}
              className={cn(
                "w-[250px] shrink-0 xl:w-[280px]",
                index === loop.active && "is-active",
              )}
              onClick={(event) => {
                // A drag that ends over a card is not a click on it.
                if (Math.abs(event.clientX - pressX.current) > DRAG_THRESHOLD_PX) return;
                loop.toIndex(index);
              }}
            >
              <div className="hero-card relative aspect-[3/4] overflow-hidden rounded-[24px] border border-white/15 shadow-2xl">
                <img
                  src={image.src}
                  alt=""
                  draggable={false}
                  loading={index < 3 ? "eager" : "lazy"}
                  className="deck-media h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/10 to-transparent" />
                <div className="absolute inset-x-5 bottom-5 text-white">
                  <span className="block text-lg font-medium tracking-[-0.01em]">{name}</span>
                  <span className="block text-sm text-white/70">{kind}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Community badge, bottom-left. Static. */}
      <div className="absolute bottom-[3%] left-0 z-30 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-navy/80 px-3 py-2 shadow-lg backdrop-blur-md">
        <div className="flex -space-x-1">
          {community.avatars.map((initials) => (
            <span
              key={initials}
              className="grid h-6 w-6 place-items-center rounded-full border border-navy bg-gradient-to-br from-brand to-aqua text-[10px] font-bold tracking-tight text-white"
            >
              {initials}
            </span>
          ))}
        </div>
        <span className="text-[13px] font-medium text-white/90">{community.title}</span>
      </div>

      {/* Arrows, bottom-right, clear of the bleed. */}
      <div className="absolute bottom-[3%] right-16 z-30 flex gap-2">
        {[
          { label: galleryControls.previous, Icon: ChevronLeft, onClick: loop.previous },
          { label: galleryControls.next, Icon: ChevronRight, onClick: loop.next },
        ].map(({ label, Icon, onClick }) => (
          <button
            key={label}
            type="button"
            onClick={onClick}
            aria-label={label}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-navy/70 text-white backdrop-blur-md transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            <Icon className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          </button>
        ))}
      </div>
    </div>
  );
}
