import {
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  Bot,
  Camera,
  Check,
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
  Settings,
  Zap,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { productPreview } from "@/data/content";
import { LogoMark, Wordmark } from "./Logo";

/**
 * The screens rendered inside the device showcase: the Mac app with its three
 * tab panels, plus the iPad and iPhone companion views.
 *
 * All of it is live DOM rather than screenshots, so it stays crisp at any
 * density and restyles from the design tokens: navy sidebar, mist canvas,
 * white cards, brand-blue accents — the same language as the site around it.
 *
 * Each screen is laid out at one fixed design width and scaled to fit its
 * frame (see `useFitScale`), so none of them may carry responsive breakpoints
 * of their own — those would follow the viewport, not the frame.
 *
 * Decorative: the stage is `aria-hidden` by its container, and the feature
 * list alongside carries the meaning.
 */

const TONE_PILL = {
  good: "bg-success/10 text-[#0B7A3B]",
  warning: "bg-star/15 text-[#8A5A05]",
  info: "bg-brand/10 text-brand",
  bad: "bg-red-50 text-red-700",
};
const TONE_DOT = { good: "bg-success", warning: "bg-star", info: "bg-brand", bad: "bg-red-500" };

function StatusPill({ tone, className, children }) {
  return (
    <span
      className={cn(
        "inline-flex flex-none items-center gap-1 rounded-full px-1.5 py-[2px] text-[8px] font-medium",
        TONE_PILL[tone],
        className,
      )}
    >
      <span className={cn("h-1 w-1 rounded-full", TONE_DOT[tone])} />
      {children}
    </span>
  );
}

function Toggle({ on }) {
  return (
    <span
      className={cn(
        "relative inline-block h-3.5 w-6 flex-none rounded-full transition-colors",
        on ? "bg-brand" : "bg-line",
      )}
    >
      <span
        className={cn(
          "absolute top-[2px] h-2.5 w-2.5 rounded-full bg-white shadow-sm transition-all",
          on ? "left-[12px]" : "left-[2px]",
        )}
      />
    </span>
  );
}

function Avatar({ initials, className }) {
  return (
    <span
      className={cn(
        "grid flex-none place-items-center rounded-full bg-gradient-to-br from-brand to-aqua font-bold text-white",
        className,
      )}
    >
      {initials}
    </span>
  );
}

const card = "rounded-xl border border-line bg-white shadow-[0_1px_2px_rgba(15,30,51,0.04)]";
const cardTitle = "text-[9.5px] font-semibold text-ink";
const muted = "text-muted";

/* ------------------------------------------------------------- panels ---- */

function OverviewPanel() {
  const { greeting, range, stats, chart, workOrders } = productPreview.overview;
  const { date } = productPreview.workspace;

  return (
    <div className="flex h-full flex-col gap-2.5">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[12px] font-semibold tracking-[-0.01em] text-ink">{greeting}</p>
          <p className={cn("text-[8.5px]", muted)}>{date}</p>
        </div>
        <span className="rounded-md border border-line bg-white px-2 py-1 text-[8px] font-medium text-body">
          {range}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        {stats.map((stat) => {
          const Arrow = stat.tone === "bad" ? ArrowDownRight : ArrowUpRight;
          return (
            <div key={stat.label} className={cn(card, "p-2.5")}>
              <p className={cn("text-[8.5px]", muted)}>{stat.label}</p>
              <div className="mt-1 flex items-baseline justify-between gap-1">
                <p className="text-[15px] font-semibold tracking-[-0.02em] text-ink">
                  {stat.value}
                </p>
                <span
                  className={cn(
                    "inline-flex items-center gap-0.5 rounded-full px-1.5 py-[2px] text-[8px] font-medium",
                    TONE_PILL[stat.tone],
                  )}
                >
                  <Arrow className="h-2 w-2" />
                  {stat.delta}
                </span>
              </div>
              <p className={cn("mt-0.5 text-[7.5px]", muted)}>{stat.hint}</p>
            </div>
          );
        })}
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[1.5fr_1fr] gap-2.5">
        <div className={cn(card, "flex min-h-0 flex-col p-3")}>
          <div className="mb-2 flex items-baseline justify-between">
            <div>
              <p className={cardTitle}>{chart.title}</p>
              <p className={cn("text-[8px]", muted)}>{chart.caption}</p>
            </div>
            <span className="flex items-center gap-1 text-[8px] text-body">
              <span className="h-1.5 w-1.5 rounded-sm bg-brand" /> This year
            </span>
          </div>
          <div className="relative flex min-h-0 flex-1 items-end gap-1.5">
            {/* Recessive gridlines */}
            {[0, 1, 2].map((line) => (
              <span
                key={line}
                className="pointer-events-none absolute inset-x-0 border-t border-dashed border-line"
                style={{ bottom: `${(line + 1) * 25}%` }}
              />
            ))}
            {chart.series.map((point) => (
              <div key={point.month} className="relative flex h-full flex-1 flex-col justify-end">
                {point.emphasis && (
                  <span className="mb-1 self-center rounded bg-navy px-1.5 py-0.5 text-[7.5px] font-semibold text-white">
                    {chart.emphasisLabel}
                  </span>
                )}
                <div
                  className={cn(
                    "w-full rounded-t-[4px]",
                    point.emphasis ? "bg-gradient-to-t from-brand to-aqua" : "bg-brand/15",
                  )}
                  style={{ height: `${point.value}%` }}
                />
              </div>
            ))}
          </div>
          <div className="mt-1.5 flex gap-1.5 border-t border-line pt-1">
            {chart.series.map((point) => (
              <span
                key={point.month}
                className={cn(
                  "flex-1 text-center text-[7.5px]",
                  point.emphasis ? "font-semibold text-ink" : muted,
                )}
              >
                {point.month}
              </span>
            ))}
          </div>
        </div>

        <div className={cn(card, "flex min-h-0 flex-col p-3")}>
          <div className="mb-2 flex items-center justify-between">
            <p className={cardTitle}>{workOrders.title}</p>
            <span className="inline-flex items-center gap-0.5 text-[8px] font-medium text-brand">
              {workOrders.action}
              <ChevronRight className="h-2.5 w-2.5" />
            </span>
          </div>
          <ul className="divide-y divide-line">
            {workOrders.items.map((item) => (
              <li key={item.unit} className="flex items-center gap-2 py-1.5">
                <span className="grid h-6 w-6 flex-none place-items-center rounded-md bg-mist text-[7.5px] font-semibold text-ink">
                  {item.unit}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[8.5px] font-medium text-ink">
                    {item.summary}
                  </span>
                  <span className={cn("block truncate text-[7.5px]", muted)}>{item.property}</span>
                </span>
                <StatusPill tone={item.tone}>{item.status}</StatusPill>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function AutomationsPanel() {
  const { heading, caption, action, items, recent } = productPreview.automations;

  return (
    <div className="flex h-full flex-col gap-2.5">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[12px] font-semibold tracking-[-0.01em] text-ink">{heading}</p>
          <p className={cn("text-[8.5px]", muted)}>{caption}</p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-md bg-brand px-2 py-1 text-[8.5px] font-medium text-white shadow-glow">
          <Plus className="h-2.5 w-2.5" />
          {action}
        </span>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[1.6fr_1fr] gap-2.5">
        <ul className={cn(card, "divide-y divide-line px-3")}>
          {items.map((rule) => (
            <li key={rule.name} className="flex items-center gap-2.5 py-2">
              <span
                className={cn(
                  "grid h-6 w-6 flex-none place-items-center rounded-md",
                  rule.on ? "bg-brand/10 text-brand" : "bg-mist text-muted",
                )}
              >
                <Zap className="h-3 w-3" strokeWidth={2} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[9px] font-medium text-ink">{rule.name}</span>
                <span className={cn("block truncate text-[8px]", muted)}>
                  When {rule.trigger}
                  <span className="mx-1 text-line">→</span>
                  {rule.action}
                </span>
              </span>
              <span className={cn("flex-none text-[7.5px]", muted)}>{rule.runs}</span>
              <Toggle on={rule.on} />
            </li>
          ))}
        </ul>

        <div className={cn(card, "flex min-h-0 flex-col p-3")}>
          <p className={cn(cardTitle, "mb-2")}>{recent.title}</p>
          <ul className="space-y-2">
            {recent.items.map((run) => (
              <li key={run.detail} className="flex items-start gap-2">
                <span className="mt-[3px] h-1.5 w-1.5 flex-none rounded-full bg-aqua" />
                <span className="min-w-0 flex-1">
                  <span className="block text-[8.5px] font-medium text-ink">{run.rule}</span>
                  <span className={cn("block text-[7.5px] leading-snug", muted)}>{run.detail}</span>
                </span>
                <span className={cn("flex-none text-[7.5px]", muted)}>{run.when}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function AgentsPanel() {
  const { heading, caption, items, activity } = productPreview.agents;

  return (
    <div className="flex h-full flex-col gap-2.5">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[12px] font-semibold tracking-[-0.01em] text-ink">{heading}</p>
          <p className={cn("text-[8.5px]", muted)}>{caption}</p>
        </div>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[1.5fr_1fr] gap-2.5">
        <div className="grid grid-cols-2 gap-2.5">
          {items.map((agent) => (
            <div key={agent.name} className={cn(card, "flex flex-col p-3")}>
              <div className="flex items-center gap-2">
                <span className="grid h-7 w-7 flex-none place-items-center rounded-lg bg-gradient-to-br from-brand to-aqua text-white">
                  <Bot className="h-3.5 w-3.5" strokeWidth={2} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[9px] font-medium text-ink">
                    {agent.name}
                  </span>
                  <StatusPill tone={agent.tone} className="mt-0.5 px-1 py-0 text-[7px]">
                    {agent.status}
                  </StatusPill>
                </span>
              </div>
              <p className={cn("mt-2 text-[8px] leading-snug", muted)}>{agent.role}</p>
              <div className="mt-auto pt-2">
                <div className="flex items-center justify-between text-[7.5px]">
                  <span className="font-medium text-ink">{agent.tasks}</span>
                  <span className={muted}>{agent.progress}%</span>
                </div>
                <div className="mt-1 h-[3px] overflow-hidden rounded-full bg-line">
                  <span
                    className="block h-full rounded-full bg-gradient-to-r from-brand to-aqua"
                    style={{ width: `${agent.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={cn(card, "flex min-h-0 flex-col p-3")}>
          <p className={cn(cardTitle, "mb-2")}>{activity.title}</p>
          <ul className="space-y-2">
            {activity.items.map((entry) => (
              <li key={entry.detail} className="flex items-start gap-2">
                <span className="mt-[3px] h-1.5 w-1.5 flex-none rounded-full bg-brand" />
                <span className="min-w-0 flex-1">
                  <span className="block text-[8.5px] font-medium text-ink">{entry.agent}</span>
                  <span className={cn("block text-[7.5px] leading-snug", muted)}>
                    {entry.detail}
                  </span>
                </span>
                <span className={cn("flex-none text-[7.5px]", muted)}>{entry.when}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const PANELS = { overview: OverviewPanel, automations: AutomationsPanel, agents: AgentsPanel };

/* ------------------------------------------------------------ screens ---- */

/** Laid out at 720px wide (16:10). */
export function MacScreen({ activeTab }) {
  const { workspace, topbar, nav, tabs } = productPreview;

  return (
    <div className="flex h-full w-full bg-mist/80">
      {/* Sidebar */}
      <nav className="flex w-[26%] shrink-0 flex-col bg-navy p-3 text-white">
        <div className="flex items-center gap-2 px-1">
          <LogoMark size={20} />
          <Wordmark className="text-[12px]" />
        </div>

        <p className="mb-1 mt-4 px-2 text-[7px] font-semibold uppercase tracking-[0.1em] text-white/35">
          {workspace.sectionLabel}
        </p>
        <ul className="space-y-[2px]">
          {nav.map(({ label, Icon, active, badge }) => (
            <li key={label}>
              <span
                className={cn(
                  "relative flex items-center gap-2 rounded-md px-2 py-[5px] text-[9px]",
                  active ? "bg-white/10 font-medium text-white" : "text-white/60",
                )}
              >
                {active && (
                  <span className="absolute -left-3 top-1/2 h-3.5 w-[3px] -translate-y-1/2 rounded-r-full bg-brand-sky" />
                )}
                <Icon className="h-3 w-3" strokeWidth={1.9} />
                {label}
                {badge && (
                  <span className="ml-auto rounded-full bg-brand px-1.5 text-[7px] font-semibold text-white">
                    {badge}
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-auto space-y-[2px]">
          <span className="flex items-center gap-2 rounded-md px-2 py-[5px] text-[9px] text-white/60">
            <Settings className="h-3 w-3" strokeWidth={1.9} />
            Settings
          </span>
          <div className="mt-1 flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 p-2">
            <Avatar initials={workspace.initials} className="h-6 w-6 text-[7.5px]" />
            <span className="min-w-0">
              <span className="block truncate text-[8.5px] font-medium">{workspace.user}</span>
              <span className="block truncate text-[7.5px] text-white/50">{workspace.company}</span>
            </span>
          </div>
        </div>
      </nav>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <div className="flex h-9 items-center gap-3 border-b border-line bg-white px-3.5">
          <p className="text-[10px] font-semibold text-ink">{topbar.title}</p>
          <div className="mx-auto flex w-[42%] items-center gap-1.5 rounded-md border border-line bg-mist/70 px-2 py-1">
            <Search className="h-2.5 w-2.5 text-muted" />
            <span className={cn("truncate text-[8px]", muted)}>{topbar.searchPlaceholder}</span>
          </div>
          <span className="relative">
            <Bell className="h-3 w-3 text-body" strokeWidth={1.9} />
            <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full border border-white bg-brand" />
          </span>
          <span className="inline-flex items-center gap-1 rounded-md bg-brand px-2 py-1 text-[8px] font-medium text-white">
            <Plus className="h-2.5 w-2.5" />
            {topbar.newLabel}
          </span>
          <Avatar initials={workspace.initials} className="h-5 w-5 text-[7px]" />
        </div>

        {/* Tab strip, mirroring the controls below the stage */}
        <div className="flex gap-4 border-b border-line bg-white px-3.5">
          {tabs.map((tab) => (
            <span
              key={tab.id}
              className={cn(
                "border-b-2 py-1.5 text-[8.5px]",
                tab.id === activeTab
                  ? "border-brand font-semibold text-ink"
                  : "border-transparent text-muted",
              )}
            >
              {tab.label}
            </span>
          ))}
        </div>

        {/* Panels. All three are mounted and crossfaded, so nothing reflows. */}
        <div className="relative min-h-0 flex-1 overflow-hidden">
          {tabs.map((tab) => {
            const Panel = PANELS[tab.id];
            return (
              <div
                key={tab.id}
                data-app-panel={tab.id}
                className={cn(
                  "absolute inset-0 p-3 transition-opacity duration-500",
                  tab.id === activeTab ? "opacity-100" : "pointer-events-none opacity-0",
                )}
              >
                <Panel />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/** Laid out at 400px wide (portrait 3:4). */
export function TabletScreen() {
  const { back, heading, property, unit, date, image, progress, photoLabel, items, summary, cta } =
    productPreview.tablet;
  const SummaryIcon = summary.Icon;

  return (
    <div className="flex h-full w-full flex-col bg-mist/80 p-4">
      <div className="mb-2.5 flex items-center justify-between">
        <span className="inline-flex items-center gap-1 text-[12px] font-medium text-brand">
          <ChevronLeft className="h-3.5 w-3.5" />
          {back}
        </span>
        <div className="flex items-center gap-2">
          <LogoMark size={18} />
          <span className="rounded-lg bg-navy px-3 py-1.5 text-[11px] font-medium text-white">
            {cta}
          </span>
          <Avatar initials={productPreview.workspace.initials} className="h-7 w-7 text-[9px]" />
        </div>
      </div>

      <div className="relative h-[84px] shrink-0 overflow-hidden rounded-xl">
        <img src={image.src} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/20 to-transparent" />
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-medium text-navy">
          {date}
        </span>
        <div className="absolute bottom-3 left-3 text-white">
          <p className="text-[15px] font-semibold tracking-[-0.01em]">{heading}</p>
          <p className="text-[11px] text-white/80">
            {property} · {unit}
          </p>
        </div>
      </div>

      <div className="my-2.5 flex items-center gap-3">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
          <span
            className="block h-full rounded-full bg-gradient-to-r from-brand to-aqua"
            style={{ width: `${progress.value}%` }}
          />
        </div>
        <span className="text-[11px] font-medium text-body">{progress.label}</span>
      </div>

      <ul className="flex shrink-0 flex-col gap-1.5">
        {items.map((item) => (
          <li key={item.label} className={cn(card, "flex items-center gap-3 px-3 py-1.5")}>
            <span
              className={cn(
                "grid h-5 w-5 flex-none place-items-center rounded-full border",
                item.done ? "border-success bg-success text-white" : "border-line bg-white",
              )}
            >
              {item.done && <Check className="h-3 w-3" strokeWidth={3} />}
            </span>
            <span className="min-w-0 flex-1">
              <span
                className={cn(
                  "block text-[12px] font-medium",
                  item.done ? "text-body" : "text-ink",
                )}
              >
                {item.label}
              </span>
              <span className={cn("block text-[10px]", item.done ? muted : "text-[#8A5A05]")}>
                {item.note}
              </span>
            </span>
            {item.done ? (
              <span className="flex -space-x-2">
                {["20% 30%", "70% 60%"].map((position) => (
                  <img
                    key={position}
                    src={image.src}
                    alt=""
                    className="h-6 w-6 rounded-md border-2 border-white object-cover"
                    style={{ objectPosition: position }}
                  />
                ))}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-md border border-line px-2 py-1 text-[10px] font-medium text-body">
                <Camera className="h-3 w-3" />
                {photoLabel}
              </span>
            )}
          </li>
        ))}
      </ul>

      <div className="mt-auto rounded-xl border border-brand/20 bg-brand/[0.06] p-3">
        <div className="flex items-start gap-2.5">
          <span className="grid h-6 w-6 flex-none place-items-center rounded-md bg-gradient-to-br from-brand to-aqua text-white">
            <SummaryIcon className="h-3.5 w-3.5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[12px] font-semibold text-ink">{summary.title}</p>
            <p className="text-[11px] leading-snug text-body">{summary.body}</p>
            <div className="mt-2 flex gap-2">
              <span className="rounded-md bg-brand px-2.5 py-1 text-[10.5px] font-medium text-white">
                {summary.primary}
              </span>
              <span className="rounded-md border border-line bg-white px-2.5 py-1 text-[10.5px] font-medium text-body">
                {summary.secondary}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Laid out at 260px wide (portrait 9:19). */
export function PhoneScreen() {
  const {
    time,
    greeting,
    user,
    initials,
    rent,
    quickActions,
    activityTitle,
    request,
    agent,
    upcoming,
    tabs,
  } = productPreview.phone;
  const AgentIcon = agent.Icon;

  return (
    <div className="flex h-full w-full flex-col bg-mist/80">
      {/* Status bar */}
      <div className="flex items-center justify-between px-6 pt-3.5 text-[11px] font-semibold text-ink">
        <span>{time}</span>
        <span className="flex items-center gap-1">
          <span className="h-2 w-3 rounded-[1px] border border-ink/70" />
          <span className="h-2 w-2 rounded-[1px] bg-ink/70" />
        </span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-hidden px-4 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LogoMark size={22} />
            <div>
              <p className={cn("text-[10px] leading-none", muted)}>{greeting}</p>
              <p className="text-[14px] font-semibold leading-tight tracking-[-0.01em] text-ink">
                {user}
              </p>
            </div>
          </div>
          <Avatar initials={initials} className="h-7 w-7 text-[10px]" />
        </div>

        <div className="bg-pricing-feature relative overflow-hidden rounded-2xl p-3.5 text-white">
          <div className="pointer-events-none absolute -right-6 -top-8 h-24 w-24 rounded-full bg-brand/40 blur-2xl" />
          <p className="text-[10.5px] text-white/65">{rent.label}</p>
          <p className="mt-0.5 text-[24px] font-semibold leading-none tracking-[-0.03em]">
            {rent.amount}
          </p>
          <p className="mt-1 text-[10px] text-white/55">{rent.unit}</p>
          <div className="mt-2.5 flex items-center gap-2">
            <span className="flex-1 rounded-lg bg-white py-1.5 text-center text-[11.5px] font-semibold text-navy">
              {rent.cta}
            </span>
            <span className="inline-flex items-center gap-1 rounded-lg border border-white/15 bg-white/10 px-2.5 py-2 text-[10px] font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-aqua" />
              {rent.note}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {quickActions.map(({ label, Icon }) => (
            <span key={label} className="flex flex-col items-center gap-1">
              <span className={cn(card, "grid h-9 w-full place-items-center text-brand")}>
                <Icon className="h-4 w-4" strokeWidth={1.9} />
              </span>
              <span className="text-[9.5px] font-medium text-body">{label}</span>
            </span>
          ))}
        </div>

        <div className={cn(card, "px-3.5 py-2.5")}>
          <p className={cn("mb-1.5 text-[10px] font-semibold uppercase tracking-[0.06em]", muted)}>
            {activityTitle}
          </p>
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate text-[12px] font-medium text-ink">{request.title}</p>
              <p className={cn("truncate text-[10px]", muted)}>{request.detail}</p>
            </div>
            <StatusPill tone={request.tone} className="px-2 py-1 text-[9.5px]">
              {request.status}
            </StatusPill>
          </div>
          <div className="my-2 border-t border-line" />
          <div className="flex items-center gap-2.5">
            <span className="grid h-7 w-7 flex-none place-items-center rounded-lg bg-gradient-to-br from-brand to-aqua text-white">
              <AgentIcon className="h-3.5 w-3.5" />
            </span>
            <div className="min-w-0">
              <p className="text-[11.5px] font-medium text-ink">{agent.prompt}</p>
              <p className={cn("truncate text-[10px]", muted)}>{agent.hint}</p>
            </div>
            <ChevronRight className="ml-auto h-3.5 w-3.5 text-muted" />
          </div>
        </div>

        <div className={cn(card, "px-3.5 py-2.5")}>
          <p className={cn("mb-1.5 text-[10px] font-semibold uppercase tracking-[0.06em]", muted)}>
            {upcoming.title}
          </p>
          <ul className="space-y-1.5">
            {upcoming.items.map((item) => (
              <li key={item.label} className="flex items-center justify-between gap-2 text-[11px]">
                <span className="truncate text-ink">{item.label}</span>
                <span className={cn("flex-none", muted)}>{item.when}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex shrink-0 justify-around border-t border-line bg-white px-2 pb-4 pt-2">
        {tabs.map(({ label, Icon, active }) => (
          <span
            key={label}
            className={cn(
              "flex flex-col items-center gap-1 text-[9px]",
              active ? "font-semibold text-brand" : "text-muted",
            )}
          >
            <Icon className="h-4 w-4" strokeWidth={active ? 2.2 : 1.7} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
