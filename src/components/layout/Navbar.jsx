import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/common/Logo";
import { SmartLink } from "@/components/common/SmartLink";
import { useScrolled } from "@/hooks/useScrolled";
import { navigation, platformMenu, solutionsMenu, waitlist } from "@/data/site";
import { NavMenu, PlatformPanel, SolutionsPanel } from "./NavMenus";

/**
 * Fixed header. Transparent over a page's dark opener, frosted navy once
 * scrolled or when a menu is open.
 *
 * "Platform" and "Solutions" open compact dropdowns on hover or click; only
 * one is open at a time, and it closes on mouse-out, Escape, focus leaving
 * the header, or navigation. Below `lg` everything collapses into a drawer.
 */

const CLOSE_DELAY_MS = 140;
const PANELS = { platform: PlatformPanel, solutions: SolutionsPanel };

export function Navbar() {
  const scrolled = useScrolled(20);
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const closeTimer = useRef(0);
  const headerRef = useRef(null);
  const triggerRefs = useRef({});

  const open = (id) => {
    window.clearTimeout(closeTimer.current);
    setOpenMenu(id);
  };
  const close = () => {
    window.clearTimeout(closeTimer.current);
    setOpenMenu(null);
  };
  const closeSoon = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), CLOSE_DELAY_MS);
  };

  // Any navigation closes everything.
  useEffect(() => {
    setDrawerOpen(false);
    setOpenMenu(null);
  }, [location.pathname, location.hash, location.key]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  useEffect(() => {
    if (!openMenu) return;
    const onKey = (event) => {
      if (event.key !== "Escape") return;
      triggerRefs.current[openMenu]?.focus();
      close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openMenu]);

  const onHeaderBlur = (event) => {
    if (!headerRef.current?.contains(event.relatedTarget)) close();
  };

  const drawerLink =
    "rounded-md px-2 py-2.5 text-[15px] text-white/85 hover:bg-white/10 hover:text-white";

  return (
    <>
      {/* Dims and blurs the page while a menu is open, so the panel has the room. */}
      {openMenu && (
        <div
          className="nav-backdrop fixed inset-0 z-[46] hidden lg:block"
          aria-hidden="true"
          onClick={close}
        />
      )}
      <header
        ref={headerRef}
        className="site-nav fixed inset-x-0 top-0 z-50"
        data-scrolled={scrolled || drawerOpen || Boolean(openMenu)}
        onBlur={onHeaderBlur}
      >
        <nav className="shell-wide flex h-[74px] items-center gap-9" aria-label="Main">
          <Logo />

          <div className="ml-auto hidden items-center gap-7 text-sm text-white/80 lg:flex">
            {navigation.map((item) => {
              if (item.menu) {
                const Panel = PANELS[item.menu];
                return (
                  <NavMenu
                    key={item.label}
                    id={`${item.menu}-menu`}
                    label={item.label}
                    open={openMenu === item.menu}
                    onOpen={() => open(item.menu)}
                    onCloseSoon={closeSoon}
                    triggerRef={(node) => (triggerRefs.current[item.menu] = node)}
                  >
                    <Panel />
                  </NavMenu>
                );
              }
              return (
                <SmartLink
                  key={item.label}
                  href={item.href}
                  onMouseEnter={closeSoon}
                  className="transition-colors hover:text-white"
                >
                  {item.label}
                </SmartLink>
              );
            })}
          </div>

          <Button variant="brand" asChild className="hidden lg:inline-flex">
            <SmartLink href={waitlist.href} onMouseEnter={closeSoon}>
              {waitlist.label}
            </SmartLink>
          </Button>

          <button
            type="button"
            onClick={() => setDrawerOpen((value) => !value)}
            className="ml-auto grid h-10 w-10 place-items-center rounded-md text-white lg:hidden"
            aria-expanded={drawerOpen}
            aria-controls="mobile-nav"
            aria-label={drawerOpen ? "Close menu" : "Open menu"}
          >
            {drawerOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {drawerOpen && (
          <div
            id="mobile-nav"
            className="max-h-[calc(100svh-74px)] overflow-y-auto border-t border-white/10 bg-navy/95 backdrop-blur-xl lg:hidden"
          >
            <div className="shell-wide flex flex-col gap-1 py-4">
              <p className="px-2 pb-1 pt-2 text-xs font-semibold uppercase tracking-[0.06em] text-white/45">
                Platform
              </p>
              {platformMenu.capabilities.items.map((item) => (
                <Link key={item.label} to={item.href} className={drawerLink}>
                  {item.label}
                </Link>
              ))}

              <p className="px-2 pb-1 pt-4 text-xs font-semibold uppercase tracking-[0.06em] text-white/45">
                Solutions
              </p>
              {solutionsMenu.items.map((item) => (
                <Link key={item.label} to={item.href} className={drawerLink}>
                  {item.label}
                </Link>
              ))}

              <div className="my-2 border-t border-white/10" />

              {navigation
                .filter((item) => !item.menu)
                .map((item) => (
                  <SmartLink key={item.label} href={item.href} className={drawerLink}>
                    {item.label}
                  </SmartLink>
                ))}
              <Button variant="brand" asChild className="mt-2 w-full">
                <SmartLink href={waitlist.href}>{waitlist.label}</SmartLink>
              </Button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
