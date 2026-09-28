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
  Smartphone,
  Sparkles,
  Tablet,
  Truck,
  Wrench,
  BarChart3,
  Building2,
  CreditCard,
  Droplets,
  FolderLock,
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
  announcement: "AI now drafts your owner statements automatically",
  headline: "One platform for properties, payments and people.",
  body: "Automate rent collection, route maintenance to the right vendor and keep every tenant informed — from one calm, organized place.",
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
  caption: "Trusted by property teams managing coastal portfolios nationwide",
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
  title: "Built for modern property management.",
  subtitle:
    "Streamline operations, cut manual work and give owners, tenants and vendors a better experience.",
  items: [
    {
      Icon: CreditCard,
      title: "Secure rent payments",
      body: "Flexible, recurring payments by card or bank transfer, with reminders before anything is late.",
    },
    {
      Icon: FolderLock,
      title: "Organized operations",
      body: "Leases, documents and communications filed against each unit and searchable in seconds.",
    },
    {
      Icon: UsersRound,
      title: "Better collaboration",
      body: "Landlords, tenants and vendors see the same work order until it's closed. Nothing lost in between.",
    },
    {
      Icon: BarChart3,
      title: "Real insights",
      body: "Occupancy, cash flow and owner statements, in plain language with the numbers behind them.",
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
        name: "Late fee",
        trigger: "a balance is five days overdue",
        action: "apply the fee in the lease",
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
        trigger: "a lease is inside sixty days",
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
        { rule: "Late fee", detail: "Applied to 2 balances", when: "Mon" },
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
        name: "Rent chaser",
        role: "Follows up on late balances, in your tone",
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
        name: "Lease reader",
        role: "Answers questions straight from the lease text",
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
        { agent: "Rent chaser", detail: "Followed up on three late balances", when: "1h" },
        { agent: "Lease reader", detail: "Answered a pet-policy question for 12A", when: "3h" },
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
  title: "From spreadsheet to running in an afternoon.",
  subtitle:
    "Three steps to move your whole portfolio onto VFO, no data-migration project required.",
  steps: [
    {
      Icon: Upload,
      tag: "Import",
      title: "Bring your properties",
      body: "Upload a spreadsheet of units, leases and balances. VFO maps the columns and builds your portfolio for you.",
    },
    {
      Icon: UserPlus,
      tag: "Invite",
      title: "Add tenants and vendors",
      body: "Send a link and everyone gets the right portal automatically. No training, no logins to manage by hand.",
    },
    {
      Icon: Zap,
      tag: "Run",
      title: "Collect, coordinate, report",
      body: "Rent flows in on autopay, requests route to the right vendor, and owner statements go out on the first.",
    },
  ],
};

/* ------------------------------------------------------------ portals ---- */

export const portals = {
  eyebrow: "Three portals",
  title: "Tailored experiences for every user.",
  subtitle:
    "Property management companies, landlords and tenants each get a portal built around what they need to do, so everyone gets things done faster.",
  items: [
    {
      label: "Property managers",
      href: "/property-managers",
      image: images.statsStrip,
      title: "Management Workspace",
      body: "Every owner, door and tenant under your company, with branded portals for each.",
      points: [
        "Trust accounting and owner statements",
        "Team roles, tasks and approvals",
        "Branded owner and tenant portals",
      ],
    },
    {
      label: "Landlords",
      href: "/landlords",
      image: images.portalLandlord,
      title: "Landlord Portal",
      body: "Manage your own units end to end, or see exactly what your manager is doing with them.",
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
      body: "A simple home for rent, requests and the lease, on any device.",
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
  title: "One software. All the features.",
  subtitle: "We believe property management software should make your life easier, not harder.",
  cta: { label: "See it in action", href: "/get-started" },
  items: [
    {
      id: "rent-collection",
      eyebrow: "Rent collection",
      title: "Automate rent collection.",
      body: "Tired of chasing rent and late fees? Tenants pay you automatically on the 1st of each month. Make more money and spend less time collecting.",
      image: images.payments,
      flip: false,
      points: [
        { lead: "Collect rent", rest: "by credit card, debit card, ACH, cash and check." },
        { lead: "Send automated reminders", rest: "before the due date and after it." },
        { lead: "Track paid and overdue rent", rest: "with late fees applied by your rules." },
      ],
    },
    {
      id: "accounting",
      eyebrow: "Accounting",
      title: "Accounting for non-accountants.",
      body: "Run custom reports, track all of your cash flow and make data-driven decisions with accounting that is as robust as it is easy to use.",
      image: images.cta,
      flip: true,
      points: [
        { lead: "Real-time reporting", rest: "by property, owner or portfolio." },
        {
          lead: "Customizable chart of accounts",
          rest: "that matches how you already keep books.",
        },
        { lead: "Connect any bank", rest: "and sync with QuickBooks." },
      ],
    },
    {
      id: "maintenance",
      eyebrow: "Maintenance",
      title: "Handle maintenance requests and vendors.",
      body: "Keep residents and vendors happy and make sure nothing falls through the cracks, with an online portal for everyone involved.",
      image: images.maintenance,
      flip: false,
      points: [
        { lead: "Get maintenance requests online", rest: "with photos and urgency." },
        { lead: "Assign and track work orders", rest: "and issue 1099 forms at year end." },
        { lead: "Pay vendors automatically", rest: "by mailed check or wire." },
      ],
    },
    {
      id: "marketing",
      eyebrow: "Marketing and leasing",
      title: "Market your listings online and get a custom website.",
      body: "Find new tenants or owners faster, fill vacancies in record time, screen applicants, collect applications from your own website and e-sign leases online.",
      image: images.portalLandlord,
      flip: true,
      points: [
        { lead: "Market your properties", rest: "on Zillow, Trulia, HotPads and more." },
        { lead: "Run background checks", rest: "for criminal, eviction, employment and credit." },
        { lead: "Build a custom website", rest: "for your rentals, on your domain." },
      ],
    },
    {
      id: "ai-assistant",
      eyebrow: "AI assistant",
      title: "Work smarter with the VFO AI assistant.",
      body: "Cut through the busywork, complete tasks automatically and get answers in seconds, so you work faster and focus on what actually grows your business.",
      image: images.heroInterior,
      flip: false,
      points: [
        { lead: "Resolve tenant issues instantly", rest: "before they ever reach you." },
        { lead: "Automate daily tasks", rest: "to get more done with the same team." },
        { lead: "See instant insights and reports", rest: "for smarter decisions." },
      ],
    },
  ],
};

/* -------------------------------------------------------------- stats ---- */

export const stats = {
  title: "Numbers our customers see.",
  subtitle: "Averages across portfolios that have run on VFO for at least six months.",
  image: images.statsStrip,
  items: [
    { value: 98.6, suffix: "%", label: "rent collected on time" },
    { value: 2.1, suffix: " days", label: "average work order close" },
    { value: 11, suffix: " hrs", label: "saved per week, per manager" },
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
        "We manage 340 beachfront units with a team of four. VFO is the reason that number isn't eight. Rent just shows up now.",
    },
    {
      initials: "RP",
      name: "Ravi Patel",
      role: "Principal, Tideline Group",
      quote:
        "Owners used to call for statements. Now they open the portal and see everything. My inbox is a third of what it was.",
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
    "All three portals, unlimited users, every integration and the AI assistant, on every plan. Just pick the size that fits your portfolio.",
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
        "Listings on Zillow and 7 more sites, with screening",
        "Maintenance requests and vendor payments",
        "Bookkeeping, bank sync and tax-ready reports",
        "Tenant app and landlord portal",
        "AI assistant and automations",
        "Email support",
      ],
    },
    {
      id: "professional",
      name: "Professional",
      tagline: "For property management companies that are growing.",
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
        "Team roles, tasks and permissions",
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
        "Multi-entity and multi-office",
        "White-label branded portals",
        "Open API, webhooks and Zapier",
        "Assisted migration from AppFolio, Buildium or Yardi",
        "SSO and audit logs",
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
    "Cancel any time",
  ],
  included: {
    title: "Included in every plan",
    items: [
      "Management, landlord and tenant portals",
      "Rent by card, ACH, cash and check",
      "Listing syndication and screening",
      "Maintenance and vendor portal",
      "AI assistant and automations",
      "Bank sync and QuickBooks",
      "E-sign leases and documents",
      "Real-time reporting",
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
        "Most teams import their portfolio and send their first tenant invites the same afternoon. Upload a spreadsheet of units and VFO builds everything for you, no migration project required.",
    },
    {
      question: "Do tenants and vendors pay to use it?",
      answer:
        "No. Your subscription covers everyone. Tenants and vendors get their portals for free, and there are no per-user charges on any plan.",
    },
    {
      question: "How are payments processed and how fast are payouts?",
      answer:
        "Payments run through bank-grade, PCI-compliant processing. Card payments settle in one to two business days and ACH in two to three, with owner payouts scheduled automatically once rent clears.",
    },
    {
      question: "What counts as a unit?",
      answer:
        "A unit is one rentable door: an apartment, a house, a condo or a room in a shared house. Parking spaces, storage lockers and commercial suites you don't lease separately are free.",
    },
    {
      question: "Can I switch plans or cancel later?",
      answer:
        "Anytime. Upgrade, downgrade or cancel from your settings. If you cancel, you keep access through the end of your billing period and can export all your data.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Yes. Data is encrypted in transit and at rest, backed up daily, and hosted on SOC 2 Type II certified infrastructure. You control who on your team sees what.",
    },
  ],
};

/* ---------------------------------------------------------------- cta ---- */

export const callToAction = {
  title: "Everything you need to manage properties, in one place.",
  body: "Simple. Secure. Built for you. Start free for 30 days, no card required.",
  cta: { label: "Start free trial", href: "/get-started" },
  image: images.cta,
};
