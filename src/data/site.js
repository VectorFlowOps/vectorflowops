/** Site-wide identity, navigation and footer content. */

import { CreditCard, Landmark, Megaphone, Sparkles, Wrench } from "lucide-react";

import { solutionPath, solutions } from "./solutions";

export const site = {
  name: "VFO",
  tagline: "One platform for properties, payments and people.",
  description:
    "Manage your portfolio, collect rent, coordinate vendors and keep every tenant informed, from a single calm, well-organized place.",
  url: "https://VFO.example.com",
};

/**
 * Header navigation. Items with `menu` open a dropdown (see `platformMenu`
 * and `solutionsMenu`) instead of navigating. Section links are absolute
 * (`/#…`) so they work from every page.
 */
export const navigation = [
  { label: "Platform", menu: "platform" },
  { label: "Solutions", menu: "solutions" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
];

/**
 * What the product does. Each capability deep-links to its block in the
 * "One platform. Every feature." section and lists that block's proof
 * points; the portals column and the promo card round out the panel.
 */
export const platformMenu = {
  capabilities: {
    title: "Capabilities",
    items: [
      {
        label: "Billing and revenue recovery",
        Icon: CreditCard,
        href: "/#rent-collection",
        points: [
          "Card, ACH, cash and check via Stripe",
          "AI follow-up on unpaid balances",
          "Aging reports and late fees",
        ],
      },
      {
        label: "Accounting for non-accountants",
        Icon: Landmark,
        href: "/#accounting",
        points: [
          "Live executive BI dashboard",
          "Revenue, payment and aging reports",
          "Any bank, synced with QuickBooks",
        ],
      },
      {
        label: "Maintenance and projects",
        Icon: Wrench,
        href: "/#maintenance",
        points: [
          "Requests online, with photos",
          "Task boards built on lease signing",
          "Vendors paid automatically",
        ],
      },
      {
        label: "CRM, leasing and e-sign",
        Icon: Megaphone,
        href: "/#marketing",
        points: [
          "Every lead tracked to move-in",
          "AI-drafted leases, DocuSign sync",
          "Zillow, Trulia, HotPads and screening",
        ],
      },
      {
        label: "AI operations",
        Icon: Sparkles,
        href: "/#ai-assistant",
        points: [
          "Voice and text agent, 24/7",
          "Automation across every module",
          "Every action audit-logged",
        ],
      },
    ],
  },
  portals: {
    title: "Portals",
    items: [
      {
        label: "Management workspace",
        blurb: "Your team's command centre",
        href: solutionPath("property-managers"),
      },
      {
        label: "Landlord portal",
        blurb: "Owners' view of their properties",
        href: solutionPath("landlords"),
      },
      { label: "Tenant app", blurb: "Rent, requests and the lease", href: solutionPath("tenants") },
      {
        label: "Vendor portal",
        blurb: "Jobs, photos and invoices",
        href: solutionPath("property-managers", "vendor-management"),
      },
    ],
  },
  promo: {
    eyebrow: "New",
    title: "Meet your 24/7 AI voice agent",
    body: "Answers every call and text, captures the lead and logs it in your CRM, even at 2 a.m.",
    cta: { label: "See it in action", href: "/#ai-assistant" },
  },
  footer: [
    { label: "All features", href: "/#all-features" },
    { label: "Integrations", href: solutionPath("property-managers", "integrations") },
    { label: "Compare plans", href: "/#pricing" },
  ],
};

/** Who it is for: one row per audience, from `data/solutions.js`. */
export const solutionsMenu = {
  title: "By audience",
  items: solutions.map((solution) => ({
    label: solution.label,
    blurb: solution.menuBlurb,
    Icon: solution.Icon,
    href: solutionPath(solution.slug),
    points: solution.menuHighlights,
    linkLabel: "Learn more",
  })),
  footer: [
    { label: "Compare plans", href: "/#pricing" },
    { label: "Book a demo", href: "/get-started" },
  ],
};

/** The header's single call to action. */
export const waitlist = { label: "Join waitlist", href: "/waitlist" };

export const account = {
  signIn: { label: "Sign in", href: "/sign-in" },
  getStarted: { label: "Get started", href: "/get-started" },
};

export const footerColumns = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Portals", href: "/#portals" },
      { label: "Pricing", href: "/#pricing" },
      { label: "Integrations", href: solutionPath("property-managers", "integrations") },
      { label: "Security", href: solutionPath("property-managers", "permissions") },
    ],
  },
  {
    heading: "Solutions",
    links: [
      ...solutions.map((solution) => ({
        label: solution.label,
        href: solutionPath(solution.slug),
      })),
      { label: "Vendor portal", href: solutionPath("property-managers", "vendor-management") },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Contact", href: "/get-started" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Help center", href: "/#faq" },
      { label: "Guides", href: "/#how-it-works" },
      { label: "Status", href: "#" },
      { label: "Changelog", href: "#" },
    ],
  },
];

export const legalLinks = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
];
