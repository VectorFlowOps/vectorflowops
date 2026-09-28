import { useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import { productPreview } from "@/data/content";
import { useInView } from "@/hooks/useInView";
import { useDeviceCarousel } from "@/hooks/useDeviceCarousel";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useFitScale } from "@/hooks/useFitScale";
import { MacScreen, TabletScreen, PhoneScreen } from "./AppScreens";

/**
 * The product on one device at a time: the Mac first, walking through each of
 * the CRM's tabs, then the iPad, then the iPhone, then round again.
 *
 * Every step is a "scene". The showcase advances on its own while it is on
 * screen; the device buttons underneath are real controls, and picking one
 * pins the stage to that device — the Mac still cycles its own tabs, but the
 * showcase never wanders off to another device once someone has chosen.
 *
 * Frames are drawn in CSS rather than shipped as images, and each screen is
 * laid out at a fixed design width then scaled to fit its frame (see
 * `useFitScale`). The stage is decorative (`aria-hidden`); the feature list
 * alongside carries the meaning.
 */

const DWELL_MS = 4200;

/** Design widths each screen is laid out at before scaling. */
const DESIGN_WIDTH = { mac: 720, ipad: 400, iphone: 260 };

export function DeviceShowcase() {
  const [containerRef, inView] = useInView({ threshold: 0.35 });
  const prefersReduced = usePrefersReducedMotion();
  const { devices, tabs } = productPreview;

  const scenes = useMemo(
    () =>
      devices.flatMap((device) =>
        device.showsTabs
          ? tabs.map((tab) => ({ device: device.id, tab: tab.id }))
          : [{ device: device.id }],
      ),
    [devices, tabs],
  );

  const [sceneIndex, setSceneIndex] = useState(0);
  const [pinned, setPinned] = useState(false);
  const scene = scenes[sceneIndex];

  useDeviceCarousel(containerRef, scene.device, inView);
  const [macRef, macFit] = useFitScale(DESIGN_WIDTH.mac);
  const [ipadRef, ipadFit] = useFitScale(DESIGN_WIDTH.ipad);
  const [iphoneRef, iphoneFit] = useFitScale(DESIGN_WIDTH.iphone);

  // Advance after each dwell. Pinned to a device, only its own scenes cycle.
  useEffect(() => {
    if (!inView || prefersReduced) return;
    const timer = setTimeout(() => {
      setSceneIndex((index) => {
        const next = (index + 1) % scenes.length;
        if (!pinned || scenes[next].device === scenes[index].device) return next;
        return scenes.findIndex((s) => s.device === scenes[index].device);
      });
    }, DWELL_MS);
    return () => clearTimeout(timer);
  }, [inView, prefersReduced, pinned, sceneIndex, scenes]);

  const activeDevice = devices.find((device) => device.id === scene.device);
  const activeTab = tabs.find((tab) => tab.id === scene.tab);
  const caption = activeTab ? `${activeDevice.caption} · ${activeTab.label}` : activeDevice.caption;

  const fitStyle = (width, fit) => ({
    width,
    height: fit.height,
    transform: `scale(${fit.scale})`,
  });

  return (
    <div ref={containerRef}>
      {/* Stage. All three devices are mounted and stacked; one is visible. */}
      <div className="pointer-events-none relative aspect-[4/3.3]" aria-hidden="true">
        {/* MacBook */}
        <div data-device="mac" className="absolute inset-0 grid place-items-center">
          <div className="w-full">
            <div className="rounded-t-[16px] border border-white/15 bg-[#0e1c31] p-2.5 shadow-[0_40px_80px_-24px_rgba(8,26,51,0.55)]">
              <div
                ref={macRef}
                className="relative aspect-[16/10] overflow-hidden rounded-[8px] bg-white"
              >
                <div
                  className="absolute left-0 top-0 origin-top-left"
                  style={fitStyle(DESIGN_WIDTH.mac, macFit)}
                >
                  <MacScreen activeTab={scene.tab ?? tabs[0].id} />
                </div>
              </div>
            </div>
            {/* Lid hinge and base. */}
            <div className="relative left-1/2 h-2.5 w-[106%] -translate-x-1/2 rounded-b-[10px] border-x border-b border-white/10 bg-gradient-to-b from-[#16273f] to-[#0b1729]" />
            <div className="relative left-1/2 h-1 w-[14%] -translate-x-1/2 rounded-b-full bg-white/10" />
          </div>
        </div>

        {/* iPad */}
        <div data-device="ipad" className="absolute inset-0 grid place-items-center">
          <div className="aspect-[3/4] h-[92%] rounded-[24px] border border-white/15 bg-[#0e1c31] p-2.5 shadow-[0_40px_80px_-24px_rgba(8,26,51,0.55)]">
            <div ref={ipadRef} className="relative h-full overflow-hidden rounded-[14px] bg-white">
              <div
                className="absolute left-0 top-0 origin-top-left"
                style={fitStyle(DESIGN_WIDTH.ipad, ipadFit)}
              >
                <TabletScreen />
              </div>
            </div>
          </div>
        </div>

        {/* iPhone */}
        <div data-device="iphone" className="absolute inset-0 grid place-items-center">
          <div className="aspect-[9/19] h-[92%] rounded-[38px] border border-white/15 bg-[#0e1c31] p-[7px] shadow-[0_40px_80px_-24px_rgba(8,26,51,0.55)]">
            <div
              ref={iphoneRef}
              className="relative h-full overflow-hidden rounded-[31px] bg-white"
            >
              {/* Island */}
              <span className="absolute left-1/2 top-2.5 z-10 h-[5%] w-[34%] -translate-x-1/2 rounded-full bg-navy" />
              <div
                className="absolute left-0 top-0 origin-top-left"
                style={fitStyle(DESIGN_WIDTH.iphone, iphoneFit)}
              >
                <PhoneScreen />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls. Real buttons — picking a device pins the stage to it. */}
      <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
        <div role="group" className="inline-flex rounded-full border border-line bg-white p-1">
          {devices.map((device) => {
            const isActive = device.id === scene.device;
            return (
              <button
                key={device.id}
                type="button"
                onClick={() => {
                  setSceneIndex(scenes.findIndex((s) => s.device === device.id));
                  setPinned(true);
                }}
                aria-pressed={isActive}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40",
                  isActive ? "bg-brand text-white" : "text-body hover:text-ink",
                )}
              >
                <device.Icon className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
                {device.label}
              </button>
            );
          })}
        </div>
        <p key={sceneIndex} className="fade-swap text-sm text-muted">
          {caption}
        </p>
      </div>
    </div>
  );
}
