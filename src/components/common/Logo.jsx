import { useId } from "react";
import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";
import { site } from "@/data/site";

/**
 * The VFO mark: a roofline over two lines of water, on the brand
 * gradient. Property, and flow. Drawn inline so it stays crisp at any size
 * and the gradient id is unique per instance.
 *
 * `public/favicon.svg` is the same drawing; change both together.
 */
export function LogoMark({ className, size = 32 }) {
  const id = useId();
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={cn("flex-none", className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2F6BFF" />
          <stop offset="1" stopColor="#38C6D9" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill={`url(#${id})`} />
      <path
        d="M7.5 15.5 16 8l8.5 7.5"
        fill="none"
        stroke="#fff"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 20.5c2.5-2.6 5-2.6 7.5 0s5 2.6 7.5 0"
        fill="none"
        stroke="#fff"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M8.5 25.5c2.5-2.6 5-2.6 7.5 0s5 2.6 7.5 0"
        fill="none"
        stroke="#fff"
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

/** The wordmark: a heavier "Prop" and a lighter "Flow". Inherits colour. */
export function Wordmark({ className }) {
  return (
    <span className={cn("tracking-[-0.02em]", className)}>
      <span className="font-semibold">VectorFlowOps</span>
      <span className="font-light"></span>
    </span>
  );
}

/** Mark plus wordmark, linking home. Used by the header and footer. */
export function Logo({ className }) {
  return (
    <Link
      to="/"
      aria-label={`${site.name} home`}
      className={cn("flex items-center gap-2.5 text-[19px] text-white", className)}
    >
      <LogoMark size={32} className="shadow-glow rounded-[9px]" />
      <Wordmark />
    </Link>
  );
}
