/**
 * Marketing copy for every section of the landing page.
 *
 * Components in `components/sections` read from here and own no strings of
 * their own, so wording, pricing and proof points can be edited without
 * touching layout or markup.
 *
 * Icons are stored as component references (not strings) so tree-shaking keeps
 * only the lucide icons actually used.
 */

import {
  Anchor,
  FileText,
  Home,
  Laptop,
  LayoutDashboard,
  MessageCircle,
  PhoneCall,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Tablet,
  Truck,
  Wrench,
  BarChart3,
  Building2,
  CreditCard,
  Droplets,
  Landmark,
  Palmtree,
  Sailboat,
  Upload,
  UserPlus,
  UsersRound,
  Waves,
  Zap,
} from "lucide-react";

import { images } from "./images";

/* --------------------------------------------------------------- hero ---- */

export const hero = {
  announcement: "New: an AI agent that answers your calls and texts 24/7",
  headline: "One platform for properties, payments and people.",
  body: "CRM, leases, rent, maintenance and reporting in one place, with AI that answers calls, chases late payments and handles the busywork around the clock.",
  primaryCta: { label: "Start free trial", href: "/get-started" },
  secondaryCta: { label: "Watch demo", href: "#" },
  /** Static counterweight to the moving deck. Stays put once it has faded in. */
  community: {
    title: "Trusted by our community",
    avatars: ["DM", "RP"],
  },
  /** Photograph sitting behind the hero's gradient. */
  backdrop: images.heroTower,
  /**
   * The property cards in the hero's looping row. Order is the order they
   * travel in; motion lives in hooks/useCardLoop.js.
   */
  gallery: [
    { image: images.heroTower, name: "Harbor Row", kind: "Apartments" },
    { image: images.heroHome, name: "Seaview Residences", kind: "Single family" },
    { image: images.portalLandlord, name: "Marina Bay", kind: "Waterfront" },
    { image: images.heroInterior, name: "Tideline Court", kind: "Furnished lets" },
    { image: images.portalTenant, name: "Cape Harbor Lofts", kind: "Lofts" },
    { image: images.statsStrip, name: "Bluewater Estates", kind: "Neighbourhood" },
    { image: images.cta, name: "Coastline Plaza", kind: "Mixed use" },
  ],
  galleryControls: { previous: "Previous property", next: "Next property" },
};

/* ------------------------------------------------------------- brands ---- */

export const marquee = {
  caption: "Trusted by property teams running coastal portfolios nationwide",
  brands: [
    { name: "Harbor Row", Icon: Building2 },
    { name: "Seaview", Icon: Anchor },
    { name: "Tideline", Icon: Waves },
    { name: "Marina Bay", Icon: Sailboat },
    { name: "Bluewater", Icon: Droplets },
    { name: "Coastline Co.", Icon: Palmtree },
    { name: "Cape Harbor", Icon: Landmark },
  ],
};

/* ----------------------------------------------------------- features ---- */

export const features = {
  eyebrow: "Why VFO",
  title: "The operating system for modern property management.",
  subtitle:
    "Every lead, lease, payment and work order in one connected platform, with AI running the busywork in the background.",
  items: [
    {
      Icon: UsersRound,
      title: "One CRM for everything",
      body: "Leads, tenants, owners and vendors in one place, linked to every property, lease and document.",
    },
    {
      Icon: PhoneCall,
      title: "An AI agent that never misses a call",
      body: "Answers calls and texts 24/7, captures every inquiry and logs it straight into your CRM.",
    },
    {
      Icon: CreditCard,
      title: "Payments that chase themselves",
      body: "Card and bank payments through Stripe, with automatic reminders on every unpaid balance.",
    },
    {
      Icon: ShieldCheck,
      title: "Live numbers, full audit trail",
      body: "Revenue, cash flow and response times update in real time, and every action is logged.",
    },
  ],
};

/* ------------------------------------------------------ product preview --- */

/**
 * Everything rendered inside the device showcase in the features section.
 *
 * One device is on stage at a time. The Mac shows the CRM with three panels
 * behind its tabs; the iPad and iPhone show the companion views. All of it is
 * live DOM rather than screenshots, so it stays crisp and restyles from the
 * design tokens.
 *
 * Chart note: one series, so the bars use the *emphasis* form — a single hue
 * with the current month picked out. Month labels stay visible and every
 * status pill carries text, so nothing reads by colour alone.
 */
export const productPreview = {
  workspace: {
    user: "Dana Kim",
    initials: "DK",
    company: "Harbor Row Management",
    date: "Tuesday, 30 September",
    sectionLabel: "Workspace",
  },
  topbar: {
    title: "Dashboard",
    searchPlaceholder: "Search units, tenants, invoices",
    newLabel: "New",
  },
  nav: [
    { label: "Dashboard", Icon: LayoutDashboard, active: true },
    { label: "Properties", Icon: Building2 },
    { label: "Tenants", Icon: UsersRound },
    { label: "Leases", Icon: FileText },
    { label: "Payments", Icon: CreditCard },
    { label: "Maintenance", Icon: Wrench, badge: "12" },
    { label: "Vendors", Icon: Truck },
    { label: "Reports", Icon: BarChart3 },
  ],

  tabs: [
    { id: "overview", label: "Overview" },
    { id: "automations", label: "Automations" },
    { id: "agents", label: "AI agents" },
  ],

  overview: {
    greeting: "Good morning, Dana",
    range: "Last 7 months",
    stats: [
      {
        label: "Rent collected",
        value: "$248,300",
        delta: "+4.2%",
        tone: "good",
        hint: "vs August",
      },
      { label: "Occupancy", value: "96.4%", delta: "+1.1%", tone: "good", hint: "1,240 doors" },
      { label: "Open work orders", value: "12", delta: "\u22123", tone: "good", hint: "2 urgent" },
    ],
    chart: {
      title: "Rent collected",
      caption: "Collected vs billed",
      emphasisLabel: "$248k",
      /** `value` is a percentage of the tallest bar. */
      series: [
        { month: "Mar", value: 58 },
        { month: "Apr", value: 66 },
        { month: "May", value: 61 },
        { month: "Jun", value: 74 },
        { month: "Jul", value: 82 },
        { month: "Aug", value: 79 },
        { month: "Sep", value: 100, emphasis: true },
      ],
    },
    workOrders: {
      title: "Work orders",
      action: "View all",
      items: [
        {
          unit: "4B",
          property: "Seaview",
          summary: "Kitchen leak",
          status: "Scheduled",
          tone: "info",
        },
        {
          unit: "12A",
          property: "Harbor Row",
          summary: "HVAC service",
          status: "In progress",
          tone: "warning",
        },
        {
          unit: "7C",
          property: "Marina Bay",
          summary: "Window repair",
          status: "Closed",
          tone: "good",
        },
        { unit: "2D", property: "Tideline", summary: "Smoke alarm", status: "New", tone: "info" },
      ],
    },
  },

  automations: {
    heading: "Automations",
    caption: "212 runs this week · 0 failures",
    action: "New rule",
    items: [
      {
        name: "Rent reminder",
        trigger: "rent is due in three days",
        action: "email and text the tenant",
        runs: "38 runs",
        on: true,
      },
      {
        name: "Move-in board",
        trigger: "a lease is e-signed",
        action: "build the move-in task board",
        runs: "6 runs",
        on: true,
      },
      {
        name: "Owner payout",
        trigger: "rent clears the account",
        action: "split and deposit to owners",
        runs: "86 runs",
        on: true,
      },
      {
        name: "Vendor routing",
        trigger: "a maintenance request is logged",
        action: "assign the on-call vendor",
        runs: "21 runs",
        on: true,
      },
      {
        name: "Lease renewal",
        trigger: "a lease has sixty days left",
        action: "draft renewal, notify owner",
        runs: "Paused",
        on: false,
      },
    ],
    recent: {
      title: "Recent runs",
      items: [
        { rule: "Rent reminder", detail: "Texted 14 tenants ahead of the 1st", when: "8:00" },
        { rule: "Vendor routing", detail: "Sent Unit 4B to Coastal Plumbing", when: "Yesterday" },
        { rule: "Owner payout", detail: "Split $31,200 across 6 owners", when: "Mon" },
        { rule: "Move-in board", detail: "Built 2 boards from signed leases", when: "Mon" },
      ],
    },
  },

  agents: {
    heading: "AI agents",
    caption: "4 agents · 41 tasks completed today",
    items: [
      {
        name: "Statement writer",
        role: "Drafts owner statements from the month's ledger",
        status: "Active",
        tone: "good",
        tasks: "12 tasks today",
        progress: 80,
      },
      {
        name: "Revenue recovery",
        role: "Follows up on unpaid balances, in your tone",
        status: "Active",
        tone: "good",
        tasks: "9 tasks today",
        progress: 60,
      },
      {
        name: "Maintenance triage",
        role: "Reads photos, grades urgency, picks a vendor",
        status: "Active",
        tone: "good",
        tasks: "17 tasks today",
        progress: 92,
      },
      {
        name: "Voice agent",
        role: "Answers calls and texts, logs every lead",
        status: "Learning",
        tone: "info",
        tasks: "3 tasks today",
        progress: 25,
      },
    ],
    activity: {
      title: "Recent activity",
      items: [
        { agent: "Statement writer", detail: "Drafted September owner statements", when: "2m" },
        { agent: "Maintenance triage", detail: "Routed Unit 4B to Coastal Plumbing", when: "18m" },
        { agent: "Revenue recovery", detail: "Followed up on three late balances", when: "1h" },
        { agent: "Voice agent", detail: "Booked a viewing from a missed call", when: "3h" },
        { agent: "Statement writer", detail: "Flagged a duplicate invoice for review", when: "5h" },
      ],
    },
  },

  /**
   * Stage order. The Mac cycles through each of its tabs before the showcase
   * moves on; `showsTabs` marks it. `caption` sits beside the controls.
   */
  devices: [
    {
      id: "mac",
      label: "MacBook",
      Icon: Laptop,
      caption: "The full CRM on desktop",
      showsTabs: true,
    },
    { id: "ipad", label: "iPad", Icon: Tablet, caption: "Inspections in the field" },
    { id: "iphone", label: "iPhone", Icon: Smartphone, caption: "The tenant app" },
  ],

  tablet: {
    back: "Inspections",
    heading: "Move-in inspection",
    property: "Seaview Residences",
    unit: "Unit 4B",
    date: "Today, 10:00",
    image: images.heroInterior,
    progress: { label: "3 of 5 complete", value: 60 },
    photoLabel: "Add photo",
    items: [
      { label: "Entry and locks", note: "2 photos", done: true },
      { label: "Smoke alarms", note: "1 photo", done: true },
      { label: "Plumbing", note: "3 photos", done: true },
      { label: "HVAC filter", note: "Needs vendor", done: false },
      { label: "Balcony rail", note: "Needs vendor", done: false },
    ],
    summary: {
      Icon: Sparkles,
      title: "AI summary",
      body: "Two items still need a vendor. Draft the work orders now?",
      primary: "Draft work orders",
      secondary: "Later",
    },
    cta: "Submit report",
  },

  phone: {
    time: "9:41",
    greeting: "Good morning",
    user: "Dana",
    initials: "DK",
    rent: {
      label: "Rent due Oct 1",
      amount: "$1,840",
      cta: "Pay now",
      note: "Autopay on",
      unit: "Seaview Residences · 4B",
    },
    quickActions: [
      { label: "Pay", Icon: CreditCard },
      { label: "Request", Icon: Wrench },
      { label: "Lease", Icon: FileText },
      { label: "Message", Icon: MessageCircle },
    ],
    activityTitle: "Activity",
    request: {
      title: "Kitchen faucet",
      detail: "Coastal Plumbing · Thu 10–12",
      status: "In progress",
      tone: "info",
    },
    agent: { Icon: Sparkles, prompt: "Ask about your lease", hint: "Pets, parking, notice…" },
    upcoming: {
      title: "Upcoming",
      items: [
        { label: "Move-in inspection", when: "Thu, 10:00" },
        { label: "Lease renewal", when: "In 60 days" },
      ],
    },
    tabs: [
      { label: "Home", Icon: Home, active: true },
      { label: "Payments", Icon: CreditCard },
      { label: "Requests", Icon: Wrench },
      { label: "Messages", Icon: MessageCircle },
    ],
  },
};

/* -------------------------------------------------------- how it works --- */

export const howItWorks = {
  eyebrow: "Getting set up",
  title: "From spreadsheet to fully running in an afternoon.",
  subtitle:
    "Three steps to move your whole portfolio onto VFO. No migration project, no consultants.",
  steps: [
    {
      Icon: Upload,
      tag: "Import",
      title: "Bring your properties",
      body: "Upload a spreadsheet of units, leases and balances. VFO maps the columns and builds your portfolio and CRM for you.",
    },
    {
      Icon: UserPlus,
      tag: "Invite",
      title: "Add tenants and vendors",
      body: "Send one link and everyone lands in the right portal with the right permissions. No training required.",
    },
    {
      Icon: Zap,
      tag: "Run",
      title: "Collect, coordinate, report",
      body: "Rent arrives on autopay, requests reach the right vendor, and owner statements go out on the 1st.",
    },
  ],
};

/* ------------------------------------------------------------ portals ---- */

export const portals = {
  eyebrow: "Three portals",
  title: "Tailored experiences for every user.",
  subtitle:
    "Property managers, landlords and tenants each get a portal built around their day, all running on the same core platform.",
  items: [
    {
      label: "Property managers",
      href: "/property-managers",
      image: images.statsStrip,
      title: "Management Workspace",
      body: "Every owner, door, tenant and lead under your company, run from one command centre.",
      points: [
        "Trust accounting and owner statements",
        "Team directory, roles and approvals",
        "Branded owner and tenant portals",
      ],
    },
    {
      label: "Landlords",
      href: "/landlords",
      image: images.portalLandlord,
      title: "Landlord Portal",
      body: "Run your own units end to end, or see exactly what your manager is doing with them.",
      points: [
        "Income and expenses by property",
        "Lease renewals and vacancies",
        "Approve repairs and vendor invoices",
      ],
    },
    {
      label: "Tenants",
      href: "/tenants",
      image: images.portalTenant,
      title: "Tenant Portal",
      body: "One simple home for rent, requests and the lease, on any device.",
      points: [
        "Pay rent and set up autopay",
        "Submit and track maintenance requests",
        "Messages and lease documents",
      ],
    },
  ],
};

/* ---------------------------------------------------------- deep dives --- */

export const deepDives = {
  id: "all-features",
  eyebrow: "Everything included",
  title: "One platform. Every feature.",
  subtitle:
    "Fourteen core modules working as one system, so nothing gets re-typed, lost or forgotten.",
  cta: { label: "See it in action", href: "/get-started" },
  items: [
    {
      id: "rent-collection",
      eyebrow: "Billing and revenue recovery",
      title: "Get paid on time, every time.",
      body: "Stop chasing rent. Tenants pay by card or bank on autopay, and VFO follows up on every unpaid balance for you, politely and persistently.",
      image: images.payments,
      flip: false,
      points: [
        { lead: "Collect rent through Stripe", rest: "by card, ACH, cash or check." },
        { lead: "Recover unpaid balances", rest: "with AI reminders before and after the due date." },
        { lead: "Track every balance", rest: "with aging reports and late fees applied by your rules." },
      ],
    },
    {
      id: "accounting",
      eyebrow: "Accounting and reporting",
      title: "Accounting for non-accountants.",
      body: "See revenue, cash flow and team performance live, then pull any report in a click. Robust enough for your accountant, simple enough for you.",
      image: images.cta,
      flip: true,
      points: [
        {
          lead: "Executive BI dashboard",
          rest: "with live revenue, cash flow and team response times.",
        },
        {
          lead: "A full reports suite",
          rest: "for revenue, payments, call logs, aging and exports.",
        },
        { lead: "Connect any bank", rest: "and sync with QuickBooks." },
      ],
    },
    {
      id: "maintenance",
      eyebrow: "Maintenance and projects",
      title: "Maintenance that runs itself.",
      body: "Requests, vendors and move-ins in one flow. The moment a lease is signed, VFO builds the task board, so nothing falls through the cracks.",
      image: images.maintenance,
      flip: false,
      points: [
        { lead: "Take requests online", rest: "with photos and urgency." },
        {
          lead: "Build task boards automatically",
          rest: "the moment a lease or agreement is signed.",
        },
        { lead: "Pay vendors automatically", rest: "and issue 1099 forms at year end." },
      ],
    },
    {
      id: "marketing",
      eyebrow: "CRM, leasing and e-sign",
      title: "From first inquiry to signed lease.",
      body: "Every lead is captured, tracked and followed up. When the right applicant is ready, AI drafts the lease and it goes out for e-signature in minutes.",
      image: images.portalLandlord,
      flip: true,
      points: [
        {
          lead: "Track every lead in the CRM",
          rest: "from first inquiry to move-in day.",
        },
        {
          lead: "AI-drafted leases and agreements",
          rest: "signed online and synced with DocuSign.",
        },
        {
          lead: "List on Zillow, Trulia and HotPads",
          rest: "with full applicant screening.",
        },
      ],
    },
    {
      id: "ai-assistant",
      eyebrow: "AI operations",
      title: "AI that works while you sleep.",
      body: "VFO's AI answers the phone, handles the busywork and connects every module in the background, and every action it takes is logged.",
      image: images.heroInterior,
      flip: false,
      points: [
        {
          lead: "Voice and text agent",
          rest: "answers calls 24/7 and captures every inquiry.",
        },
        {
          lead: "A central automation engine",
          rest: "triggers the next step across every module.",
        },
        {
          lead: "An unchangeable audit log",
          rest: "of every action, human or AI.",
        },
      ],
    },
    {
      id: "communications",
      eyebrow: "Communications and team",
      title: "Keep everyone in the loop.",
      body: "Message your team, reach every tenant and keep calendars in sync, with the right people seeing the right things.",
      image: images.portalTenant,
      flip: true,
      points: [
        {
          lead: "Team messaging and calendars",
          rest: "with two-way sync.",
        },
        {
          lead: "Broadcasts and scheduled notices",
          rest: "by email and SMS, with full logs.",
        },
        {
          lead: "A staff directory",
          rest: "with role-based access controls.",
        },
      ],
    },
  ],
};

/* -------------------------------------------------------------- stats ---- */

export const stats = {
  title: "Results our customers see.",
  subtitle: "Averages across portfolios that have run on VFO for at least six months.",
  image: images.statsStrip,
  items: [
    { value: 98.6, suffix: "%", label: "rent collected on time" },
    { value: 2.1, suffix: " days", label: "average time to close a work order" },
    { value: 11, suffix: " hrs", label: "saved per manager, every week" },
    { value: 4.9, suffix: "/5", label: "tenant satisfaction" },
  ],
};

/* ------------------------------------------------------- testimonials ---- */

export const testimonials = {
  eyebrow: "Customer stories",
  title: "Property teams that stopped drowning in email.",
  items: [
    {
      initials: "DM",
      name: "Dana Mercer",
      role: "Ops Director, Harbor Row",
      quote:
        "We run 340 beachfront units with a team of four. Without VFO, we'd need eight. Rent just shows up now.",
    },
    {
      initials: "RP",
      name: "Ravi Patel",
      role: "Principal, Tideline Group",
      quote:
        "Owners used to call for their statements. Now they open the portal and see everything. My inbox is a third of what it was.",
    },
    {
      initials: "SL",
      name: "Sofia Lang",
      role: "Owner, Marina Bay Rentals",
      quote:
        "The vendor side sold me. My contractors get the job, the access notes and payment in one place. No more phone tag.",
    },
  ],
};

/* ------------------------------------------------------------ pricing ---- */

export const pricing = {
  eyebrow: "Pricing",
  title: "One price per plan. Every feature included.",
  subtitle:
    "All three portals, all fourteen core modules, unlimited users and every integration, on every plan. Just pick the size that fits your portfolio.",
  /** Annual billing is 20% off the monthly price; the component does the maths. */
  billing: {
    monthly: { id: "monthly", label: "Monthly", note: "Billed monthly" },
    annual: { id: "annual", label: "Annual", badge: "Save 20%", note: "Billed annually" },
    annualDiscount: 0.2,
  },
  plans: [
    {
      id: "starter",
      name: "Starter",
      tagline: "For landlords managing their own units.",
      monthly: 49.99,
      unitsLabel: "Up to 10 units",
      unitsCap: 10,
      cta: { label: "Join waitlist", href: "/waitlist" },
      features: [
        "Rent collection, reminders and late fees",
        "CRM, listings and applicant screening",
        "AI-drafted leases with e-sign",
        "Maintenance requests and vendor payments",
        "Bookkeeping, bank sync and tax-ready reports",
        "Tenant app and landlord portal",
        "AI voice agent, 24/7",
      ],
    },
    {
      id: "professional",
      name: "Professional",
      tagline: "For growing property management companies.",
      monthly: 499.99,
      unitsLabel: "Up to 200 units",
      unitsCap: 200,
      featured: true,
      badge: "Most popular",
      includesLabel: "Everything in Starter, plus",
      cta: { label: "Join waitlist", href: "/waitlist" },
      features: [
        "Trust accounting and owner statements",
        "Owner portal and management-fee automation",
        "Team directory, roles and permissions",
        "AI leasing agents on every listing",
        "Custom rental website on your domain",
        "Priority chat and phone support",
      ],
    },
    {
      id: "enterprise",
      name: "Enterprise",
      tagline: "For portfolios of 500 units and beyond.",
      monthly: 1999.99,
      pricePrefix: "From",
      unitsLabel: "500+ units",
      includesLabel: "Everything in Professional, plus",
      cta: { label: "Join waitlist", href: "/waitlist" },
      features: [
        "Multiple entities and offices",
        "White-label branded portals",
        "Open API, webhooks and Zapier",
        "Assisted migration from AppFolio, Buildium or Yardi",
        "SSO and advanced audit logs",
        "Dedicated account manager and uptime SLA",
      ],
    },
  ],
  between: {
    text: "Somewhere between 200 and 500 units?",
    link: { label: "Join the waitlist and tell us your size", href: "/waitlist" },
  },
  guarantees: [
    "30-day free trial",
    "No card required",
    "Unlimited users",
    "Free migration",
    "Cancel anytime",
  ],
  /** The fourteen core modules, plus the portals they power. Four columns on desktop. */
  included: {
    title: "The core platform, included in every plan",
    items: [
      "Live company dashboard",
      "CRM and lead tracking",
      "Properties, units and leases",
      "AI lease drafting and e-sign",
      "AI voice and text agent",
      "Stripe billing and revenue recovery",
      "Automatic task boards",
      "Team chat and calendar sync",
      "Executive BI dashboard",
      "AI automation engine",
      "Staff directory and access control",
      "Security and audit log",
      "Full reports suite",
      "Broadcasts, SMS and notices",
      "Manager, landlord and tenant portals",
      "Bank sync and QuickBooks",
    ],
  },
};

/* ---------------------------------------------------------------- faq ---- */

export const faq = {
  eyebrow: "Questions",
  title: "Everything you might be wondering.",
  items: [
    {
      question: "How long does it take to get started?",
      answer:
        "Most teams import their portfolio and send their first tenant invites the same afternoon. Upload a spreadsheet of units and VFO builds everything for you. No migration project required.",
    },
    {
      question: "What does the AI actually do?",
      answer:
        "It answers calls and texts 24/7 and logs every inquiry in your CRM. It also drafts leases and agreements, follows up on unpaid balances, sends requests to the right vendor and builds task boards when a lease is signed. You set the rules, and every action it takes is logged.",
    },
    {
      question: "Do tenants and vendors pay to use it?",
      answer:
        "No. Your subscription covers everyone. Tenants and vendors use their portals for free, and no plan charges per user.",
    },
    {
      question: "How are payments processed and how fast are payouts?",
      answer:
        "Payments run through Stripe's bank-grade, PCI-compliant processing. Card payments settle in one to two business days and ACH in two to three, and owner payouts are scheduled automatically once rent clears.",
    },
    {
      question: "What counts as a unit?",
      answer:
        "A unit is one rentable door: an apartment, a house, a condo or a room in a shared house. Parking spaces, storage lockers and commercial suites you don't lease separately are free.",
    },
    {
      question: "Can I switch plans or cancel later?",
      answer:
        "Anytime. Upgrade, downgrade or cancel from your settings. If you cancel, you keep access until the end of your billing period and can export all your data.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Yes. Data is encrypted in transit and at rest, backed up daily and hosted on SOC 2 Type II certified infrastructure. Role-based permissions control who sees what, and an unchangeable audit log records every action, human or AI.",
    },
  ],
};

/* ---------------------------------------------------------------- cta ---- */

export const callToAction = {
  title: "Your whole operation, in one place.",
  body: "CRM, rent, maintenance, AI and reporting, all connected. Start free for 30 days, no card required.",
  cta: { label: "Start free trial", href: "/get-started" },
  image: images.cta,
};
