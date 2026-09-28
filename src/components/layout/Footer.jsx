import { Instagram, Linkedin, Twitter } from "lucide-react";

import { Logo } from "@/components/common/Logo";
import { SmartLink } from "@/components/common/SmartLink";
import { site, footerColumns, legalLinks } from "@/data/site";

const SOCIALS = [
  { Icon: Twitter, label: "VFO on Twitter" },
  { Icon: Linkedin, label: "VFO on LinkedIn" },
  { Icon: Instagram, label: "VFO on Instagram" },
];

export function Footer() {
  return (
    <footer className="bg-navy pb-9 pt-section text-white/70">
      <div className="shell">
        <div className="grid grid-cols-2 gap-10 border-b border-white/10 pb-12 md:grid-cols-[1.6fr_repeat(4,1fr)]">
          <div className="col-span-2 md:col-span-1">
            <Logo className="mb-4" />
            <p className="max-w-[280px] text-sm leading-relaxed">
              {site.tagline} Manage your whole portfolio from a single calm place.
            </p>
          </div>

          {footerColumns.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h2 className="mb-4 text-sm font-semibold text-white">{column.heading}</h2>
              {column.links.map((link) => (
                <SmartLink
                  key={link.label}
                  href={link.href}
                  className="block py-1.5 text-sm text-white/70 transition-colors hover:text-white"
                >
                  {link.label}
                </SmartLink>
              ))}
            </nav>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3.5 pt-7 text-[13.5px] text-white/55">
          <p>
            © {new Date().getFullYear()} {site.name}, Inc.
            {legalLinks.map((link) => (
              <span key={link.label}>
                {" · "}
                <a href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </a>
              </span>
            ))}
          </p>

          <div className="flex gap-3.5">
            {SOCIALS.map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="grid h-[34px] w-[34px] place-items-center rounded-[9px] bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
