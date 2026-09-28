/**
 * The three audiences VFO serves, and everything each one gets.
 *
 * This single file drives the header's Solutions menu, the three solution
 * pages (/property-managers, /landlords, /tenants) and the footer's Solutions
 * column, so a feature added here appears everywhere at once.
 *
 * Who is who:
 *   - Property management companies run portfolios on behalf of owners. They
 *     need trust accounting, owner statements, a team workspace and branded
 *     portals for the owners and tenants under their company.
 *   - Landlords manage their own units and tenants directly.
 *   - Tenants rent from either.
 *   Vendors are not an audience here; they are a network both managers and
 *   landlords dispatch work to, with a portal of their own.
 *
 * Shape per audience:
 *   - `hero`          the page opener
 *   - `groups[]`      feature groups; each becomes a page section with an anchor
 *   - `features[]`    inside a group; `short` is a one-line summary and
 *                     `platforms` lists the third parties a feature connects to
 *   - `integrations`  the platforms this audience's tools plug into
 */

import {
  Banknote,
  BarChart3,
  Bot,
  Briefcase,
  Building2,
  Calculator,
  CalendarCheck,
  CalendarClock,
  ClipboardCheck,
  Code2,
  CreditCard,
  Database,
  FileSignature,
  FileText,
  FolderLock,
  Globe,
  Handshake,
  Home,
  Inbox,
  KeyRound,
  Landmark,
  Layers,
  Megaphone,
  MessageSquare,
  Palette,
  Percent,
  PhoneCall,
  Plug,
  Receipt,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Wallet,
  Wrench,
  Zap,
} from "lucide-react";

import { images } from "./images";

const LISTING_SITES = [
  "Zillow",
  "Trulia",
  "HotPads",
  "Apartments.com",
  "Realtor.com",
  "Zumper",
  "Facebook Marketplace",
  "Craigslist",
];

const LISTING_INTEGRATIONS = [
  { name: "Zillow Rental Manager", kind: "Listings and leads" },
  { name: "Apartments.com", kind: "Listings and leads" },
  { name: "Realtor.com", kind: "Listings and leads" },
  { name: "Zumper", kind: "Listings and leads" },
  { name: "HotPads", kind: "Listings" },
  { name: "Trulia", kind: "Listings" },
  { name: "Facebook Marketplace", kind: "Listings and leads" },
  { name: "Craigslist", kind: "Listings" },
];

/* ------------------------------------------------- property managers (PMC) */

const propertyManagers = {
  slug: "property-managers",
  label: "Property managers",
  audience: "Property management companies",
  Icon: Briefcase,
  menuBlurb: "Every owner, door and tenant under your company.",
  menuHighlights: [
    "Trust accounting and owner statements",
    "Leasing across the whole portfolio",
    "Branded owner and tenant portals",
  ],
  hero: {
    eyebrow: "For property management companies",
    title: "Run every owner, door and tenant under one roof.",
    body: "Trust accounting, owner statements and fees, leasing across the whole portfolio, and a team workspace with branded portals for your owners and their tenants. Built for companies that manage on behalf of others.",
    image: images.statsStrip,
    caption: { title: "Harbor Row Management", meta: "1,240 doors · 86 owners · 98.1% collected" },
    proof: [
      "Trust accounting with three-way reconciliation",
      "Branded owner and tenant portals",
      "Migrate from AppFolio, Buildium or Yardi",
    ],
  },
  groups: [
    {
      id: "owners",
      label: "Owners",
      eyebrow: "Owners and clients",
      title: "Win owners, onboard them in a day and keep them informed.",
      subtitle:
        "A pipeline for new doors, e-signed management agreements, automated fees and statements, and a portal that answers owner questions before they email you.",
      features: [
        {
          id: "owner-pipeline",
          Icon: Handshake,
          title: "Owner lead pipeline",
          short: "Win new doors from referrals, your site and Zillow",
          body: "Enquiries from your website, referrals, Google Business and Zillow's property-manager directory land in a pipeline with follow-ups, proposals and win/loss reporting, so growing your door count is a process, not luck.",
          platforms: ["Zillow", "Google Business Profile", "Your website"],
        },
        {
          id: "management-agreements",
          Icon: FileSignature,
          title: "Management agreements and onboarding",
          short: "E-sign agreements, fee schedules and property setup",
          body: "E-signed management agreements with your fee schedule built in. Properties, units, leases and balances import in one step, and the owner gets portal access the same day.",
        },
        {
          id: "management-fees",
          Icon: Percent,
          title: "Management fee automation",
          short: "Percentage, flat, leasing and markup fees, calculated",
          body: "Percentage or flat management fees, leasing and renewal fees, maintenance markups and late-fee splits are calculated and posted automatically, per owner and per agreement.",
        },
        {
          id: "owner-statements",
          Icon: Receipt,
          title: "Owner statements and distributions",
          short: "Drafted by AI, reviewed by you, paid the same day",
          body: "Statements are drafted each month with plain-language notes, reviewed by you and sent to owners. Distributions go out the same day by ACH, with reserves held per property.",
        },
        {
          id: "owner-portal",
          Icon: Briefcase,
          title: "Owner portal",
          short: "Statements, documents, approvals and performance",
          body: "Owners log in to see statements, documents, leases and performance for their properties, and approve expenses above their threshold. Fewer emails, more trust.",
        },
        {
          id: "owner-communications",
          Icon: MessageSquare,
          title: "Owner communications and approvals",
          short: "Approval thresholds, updates and a full history",
          body: "Approval requests, monthly updates and one-off notices go out from templates, with approval thresholds per owner and a full history against each property.",
        },
      ],
    },
    {
      id: "leasing",
      label: "Leasing",
      eyebrow: "Leasing across the portfolio",
      title: "Fill every vacancy from one pipeline.",
      subtitle:
        "Leads from every listing site, AI leasing agents answering for every property, screening and e-sign leases, all at portfolio scale.",
      features: [
        {
          id: "lead-inbox",
          Icon: Inbox,
          title: "Lead inbox and CRM",
          short: "Every enquiry from every site, across every property",
          body: "Enquiries from Zillow, Apartments.com, Realtor.com, Facebook Marketplace and your website land in one pipeline across the whole portfolio, with source tracking, assignment to leasing agents and conversion reporting per property.",
          platforms: [
            "Zillow",
            "Apartments.com",
            "Realtor.com",
            "Facebook Marketplace",
            "Your website",
          ],
        },
        {
          id: "syndication",
          Icon: Megaphone,
          title: "Listing syndication",
          short: "Publish once to Zillow, Apartments.com and more",
          body: "Write a listing once and push it to the major rental sites under your company brand. Edits and price changes sync everywhere, and listings come down the moment a lease is signed.",
          platforms: LISTING_SITES,
        },
        {
          id: "ai-leasing-agent",
          Icon: Bot,
          title: "AI leasing agents",
          short: "Answer, pre-qualify and book tours for every property",
          body: "An agent per property answers prospects in minutes at any hour from the listing and your policies, pre-qualifies on income and move-in date, and books tours into the right leasing agent's calendar.",
        },
        {
          id: "rental-website",
          Icon: Globe,
          title: "Custom rental website",
          short: "Your listings, applications and branding on your own domain",
          body: "A rental website built from your listings, on your own domain and in your brand. Prospects browse vacancies, book tours and apply from your site, and every enquiry lands in the lead inbox.",
        },
        {
          id: "tours",
          Icon: CalendarCheck,
          title: "Tour scheduling and self-showings",
          short: "Calendar booking with smart-lock self-tours",
          body: "Prospects pick a slot. Smart-lock integrations allow verified self-guided tours, and follow-up goes out automatically afterwards.",
          platforms: ["SmartRent", "Latch", "Google Calendar"],
        },
        {
          id: "screening",
          Icon: ShieldCheck,
          title: "Tenant screening",
          short: "Credit, background, eviction and income in one report",
          body: "Credit, criminal, eviction history, employment and income verification in a single report, with consistent criteria per property so decisions are defensible and fair-housing compliant.",
          platforms: ["TransUnion", "Experian", "Plaid"],
        },
        {
          id: "applications-leases",
          Icon: FileText,
          title: "Applications and e-sign leases",
          short: "State-specific templates, company-wide clause library",
          body: "Apply-once applications, state-specific lease templates with your company's clause library, addenda and renewals, all e-signed and filed against the unit.",
        },
        {
          id: "renewals",
          Icon: TrendingUp,
          title: "Renewals and rent optimisation",
          short: "Comparable-rent data and renewals on schedule",
          body: "Comparable-rent data suggests pricing for each unit. Renewal offers go out on schedule with owner-approved increases, and expiring leases are visible 120 days out.",
        },
      ],
    },
    {
      id: "accounting",
      label: "Accounting",
      eyebrow: "Trust accounting and payments",
      title: "Trust accounting your auditor will like.",
      subtitle:
        "Rent in, bills out, deposits held correctly, books reconciled three ways, and 1099s filed, all synced with the accounting tools your firm already uses.",
      features: [
        {
          id: "trust-accounting",
          Icon: Landmark,
          title: "Trust accounting",
          short: "Property-level books with three-way reconciliation",
          body: "Separate operating and trust books per owner and property, bank feeds, three-way reconciliation and a complete audit trail, so month-end closes cleanly and audits are uneventful.",
        },
        {
          id: "rent-collection",
          Icon: CreditCard,
          title: "Rent collection and autopay",
          short: "ACH, card, Apple Pay and cash at retail",
          body: "Tenants pay by credit card, debit card, ACH, Apple Pay, cash at retail locations or check. Automated reminders go out before and after the due date, late fees post by your rules, and paid versus overdue rent is tracked in a live rent roll that lands in the right trust account.",
        },
        {
          id: "accounts-payable",
          Icon: Wallet,
          title: "Accounts payable and vendor bill pay",
          short: "Invoices captured, approved and paid from the right account",
          body: "Vendor invoices arrive from the vendor portal or email, route for approval against owner thresholds and are paid from the correct property account, with markups applied and expenses posted.",
        },
        {
          id: "deposits",
          Icon: ShieldCheck,
          title: "Security deposit ledgers",
          short: "Held, itemised and returned to each state's rules",
          body: "Deposits held in the right account, interest where required, itemised deductions with photos, and returns within each state's deadline, tracked per lease.",
        },
        {
          id: "chart-of-accounts",
          Icon: BarChart3,
          title: "Chart of accounts and real-time reports",
          short: "A customizable chart of accounts, reports that update live",
          body: "A customizable chart of accounts that matches how you already keep books, and real-time reporting on cash flow, income and expenses by property, owner or portfolio. Custom reports save and schedule themselves.",
        },
        {
          id: "accounting-integrations",
          Icon: Calculator,
          title: "Accounting sync and 1099s",
          short: "Connect any bank, sync QuickBooks and Xero, file 1099s",
          body: "Connect any bank for live feeds and reconciliation, with two-way sync to QuickBooks Online and Xero. 1099-MISC for owners and 1099-NEC for vendors are generated from the ledger and e-filed at year end.",
          platforms: ["QuickBooks", "Xero", "Stripe", "Plaid"],
        },
      ],
    },
    {
      id: "operations",
      label: "Operations",
      eyebrow: "Maintenance and operations",
      title: "Maintenance, vendors and inspections at scale.",
      subtitle:
        "Requests answered around the clock, vendors managed and compliant, inspections on mobile, and automations and AI agents handling the routine across every door.",
      features: [
        {
          id: "maintenance",
          Icon: Wrench,
          title: "Maintenance coordination",
          short: "Triaged by AI, dispatched to the right vendor",
          body: "Requests arrive with photos and urgency, are triaged, checked against owner approval limits and dispatched to the right vendor with access details. Everyone sees the same work order until it closes.",
        },
        {
          id: "after-hours",
          Icon: PhoneCall,
          title: "24/7 AI call and text answering",
          short: "Emergencies escalated, the rest logged for the morning",
          body: "An AI agent answers tenant calls and texts after hours, logs requests, escalates genuine emergencies to your on-call person and vendor, and leaves the rest queued for the morning.",
        },
        {
          id: "vendor-management",
          Icon: Users,
          title: "Vendor network and portal",
          short: "Preferred vendors, COI and W-9 compliance, a portal for them",
          body: "A preferred-vendor list per trade and area, insurance and W-9 tracking with expiry alerts, and a vendor portal where contractors accept jobs, upload photos and invoice, without a single phone call.",
        },
        {
          id: "vendor-payments",
          Icon: Banknote,
          title: "Vendor payments by check or wire",
          short: "We mail the checks or wire the money, and file the 1099s",
          body: "Approve an invoice and VFO pays the vendor: a mailed check or a wire from the right property account, with the expense posted and the 1099 tracked for year end. No more cheque runs.",
        },
        {
          id: "inspections",
          Icon: ClipboardCheck,
          title: "Inspections at scale",
          short: "Move-in, move-out and routine, scheduled and reported",
          body: "Move-in, move-out and routine inspections scheduled across the portfolio, completed on mobile with photos, and delivered as e-signed reports to the lease and the owner.",
        },
        {
          id: "documents",
          Icon: FolderLock,
          title: "Document vault",
          short: "Agreements, leases, insurance and permits with expiry alerts",
          body: "Management agreements, leases, insurance certificates, permits and HOA documents against each owner and unit, searchable in seconds and with alerts before anything expires.",
        },
        {
          id: "communications",
          Icon: MessageSquare,
          title: "Communications hub",
          short: "SMS, email and in-app for tenants, owners and vendors",
          body: "SMS, email and in-app messaging from one inbox, with templates, building-wide announcements and a full history against each tenant, owner and vendor.",
          platforms: ["Twilio", "Gmail", "Outlook"],
        },
        {
          id: "ai-assistant",
          Icon: Bot,
          title: "AI assistant",
          short: "Resolves tenant issues, automates daily tasks, answers in seconds",
          body: "Answers tenant questions and resolves routine issues before they reach you, completes daily tasks like chasing late rent or listing overdue payments on request, and turns a plain-language question into an instant report.",
        },
        {
          id: "automations",
          Icon: Zap,
          title: "Automations and AI agents",
          short: "Rules for the routine, agents for the judgement calls",
          body: "Rules handle reminders, late fees, distributions and renewals. AI agents chase rent, draft owner statements, triage maintenance and answer lease questions, reporting back to your team.",
        },
        {
          id: "compliance",
          Icon: ShieldAlert,
          title: "Compliance",
          short: "Fair housing, licences, insurance and local ordinances",
          body: "Fair-housing-consistent workflows, renters-insurance verification, vendor and broker licence expiries, lead-paint and local ordinance reminders, so nothing lapses quietly.",
        },
      ],
    },
    {
      id: "team",
      label: "Team",
      eyebrow: "Team, brand and insight",
      title: "A workspace for the whole company, under your brand.",
      subtitle:
        "Dashboards by owner, office and portfolio, precise permissions, branded portals and an open API, with your data migrated in.",
      features: [
        {
          id: "dashboard",
          Icon: BarChart3,
          title: "Portfolio dashboard and KPIs",
          short: "Doors, delinquency, NOI and vacancy by owner or office",
          body: "Doors under management, delinquency, vacancy, NOI and work-order ageing by owner, property, office or region, with scheduled reports and exports for owners and leadership.",
        },
        {
          id: "permissions",
          Icon: KeyRound,
          title: "Team roles, tasks and permissions",
          short: "Granular access, task queues and activity logs",
          body: "Roles for property managers, leasing agents, maintenance coordinators, accountants and owners, task queues per role, two-factor authentication and an activity log for every change.",
        },
        {
          id: "branding",
          Icon: Palette,
          title: "Branded portals and white label",
          short: "Your logo, colours and domain on every portal",
          body: "Owner and tenant portals, applications and emails carry your logo, colours and domain, so clients experience your company, not ours.",
        },
        {
          id: "multi-entity",
          Icon: Layers,
          title: "Multi-entity and multi-office",
          short: "Separate books per entity, one login for the company",
          body: "Separate legal entities, trust accounts and offices under one company login, with consolidated reporting and per-entity books.",
        },
        {
          id: "api",
          Icon: Code2,
          title: "Open API, webhooks and Zapier",
          short: "Connect the rest of your stack",
          body: "A documented REST API, webhooks for every event and a Zapier app, so VFO fits the tools your company already runs on.",
          platforms: ["Zapier", "REST API", "Webhooks"],
        },
        {
          id: "migration",
          Icon: Database,
          title: "Data migration",
          short: "From AppFolio, Buildium, Yardi or Rent Manager",
          body: "Our team migrates owners, properties, leases, ledgers and documents from AppFolio, Buildium, Yardi or Rent Manager, reconciled to the penny before you switch over.",
          platforms: ["AppFolio", "Buildium", "Yardi", "Rent Manager"],
        },
      ],
    },
  ],
  integrations: {
    title: "Connected to the platforms your company already runs on.",
    subtitle:
      "Listings syndicate to the major rental sites, leads flow back in, money and documents sync with your accounting and e-signature tools, and your data migrates in from the incumbents.",
    items: [
      ...LISTING_INTEGRATIONS,
      { name: "QuickBooks Online", kind: "Accounting" },
      { name: "Xero", kind: "Accounting" },
      { name: "Stripe", kind: "Payments" },
      { name: "Plaid", kind: "Bank feeds" },
      { name: "TransUnion", kind: "Screening" },
      { name: "Experian", kind: "Screening" },
      { name: "DocuSign", kind: "E-signature" },
      { name: "Twilio", kind: "SMS and voice" },
      { name: "Google Calendar", kind: "Scheduling" },
      { name: "SmartRent", kind: "Smart locks" },
      { name: "Latch", kind: "Smart locks" },
      { name: "Lemonade", kind: "Renters insurance" },
      { name: "Zapier", kind: "Automation" },
      { name: "AppFolio", kind: "Migration" },
      { name: "Buildium", kind: "Migration" },
      { name: "Yardi", kind: "Migration" },
      { name: "Rent Manager", kind: "Migration" },
    ],
  },
};

/* --------------------------------------------------------------- landlords */

const landlords = {
  slug: "landlords",
  label: "Landlords",
  audience: "Owners managing their own units",
  Icon: Building2,
  menuBlurb: "Fill vacancies, collect rent and handle repairs yourself.",
  menuHighlights: [
    "Listings on Zillow and 7 more sites",
    "Rent on autopay, tax-ready books",
    "A vendor network for repairs",
  ],
  hero: {
    eyebrow: "For landlords",
    title: "Manage your own units like a professional, without hiring one.",
    body: "Leads from Zillow and every other listing site, screening, e-sign leases, rent on autopay, a vendor network for repairs and tax-ready books, with automations and AI agents doing the routine work.",
    image: images.portalLandlord,
    caption: {
      title: "Seaview Residences",
      meta: "12 units · 100% occupied · Rent day is automatic",
    },
    proof: [
      "Syndication to Zillow and 7 more sites",
      "Tax-ready books, no spreadsheet",
      "AI leasing agent, 24/7",
    ],
  },
  groups: [
    {
      id: "leasing",
      label: "Leasing",
      eyebrow: "Leasing and leads",
      title: "From first enquiry to signed lease, without the chase.",
      subtitle:
        "Every lead lands in one inbox, gets answered in minutes and is screened, toured and signed without leaving VFO.",
      features: [
        {
          id: "lead-inbox",
          Icon: Inbox,
          title: "Lead inbox",
          short: "Every enquiry from every site, in one place",
          body: "Enquiries from Zillow, Apartments.com, Realtor.com, Facebook Marketplace and Craigslist land in one inbox with source tracking and follow-up reminders, so no prospect goes unanswered.",
          platforms: [
            "Zillow",
            "Apartments.com",
            "Realtor.com",
            "Facebook Marketplace",
            "Craigslist",
          ],
        },
        {
          id: "syndication",
          Icon: Megaphone,
          title: "Listing syndication",
          short: "Publish once to Zillow, Apartments.com and more",
          body: "Write a listing once and push it to the major rental sites. Edits, photo changes and price drops sync everywhere, and the listing comes down the moment a lease is signed.",
          platforms: LISTING_SITES,
        },
        {
          id: "ai-leasing-agent",
          Icon: Bot,
          title: "AI leasing agent",
          short: "Answers, pre-qualifies and books tours around the clock",
          body: "Replies to prospects in minutes at any hour, answers questions from your listing and house rules, pre-qualifies on income and move-in date, and books tours into your calendar.",
        },
        {
          id: "rental-website",
          Icon: Globe,
          title: "Custom rental website",
          short: "Your listings and applications on your own site",
          body: "A simple website for your rentals, built from your listings and hosted on your own domain. Prospects browse vacancies and apply from your site, and every enquiry lands in your lead inbox.",
        },
        {
          id: "tours",
          Icon: CalendarCheck,
          title: "Tour scheduling and self-showings",
          short: "Calendar booking with smart-lock self-tours",
          body: "Prospects pick a slot that suits you both. Smart-lock integrations allow verified self-guided tours when you cannot be there, with automatic follow-up afterwards.",
          platforms: ["SmartRent", "Latch", "Google Calendar"],
        },
        {
          id: "screening",
          Icon: ShieldCheck,
          title: "Tenant screening",
          short: "Credit, background, eviction and income in one report",
          body: "Credit, criminal, eviction history, employment and income verification in a single report, ordered from the application and delivered in minutes. The applicant pays the fee. Fair-housing compliant by design.",
          platforms: ["TransUnion", "Experian", "Plaid"],
        },
        {
          id: "applications-leases",
          Icon: FileSignature,
          title: "Online applications and e-sign leases",
          short: "State-specific templates, signed from any device",
          body: "Online applications, state-specific lease templates reviewed by attorneys, addenda and renewals, all signed electronically and filed against the unit.",
        },
        {
          id: "market-rent",
          Icon: TrendingUp,
          title: "Market rent and renewals",
          short: "Know what to charge, renew on time",
          body: "Comparable-rent data shows what similar units nearby are getting. Renewal offers go out on schedule with the increase you choose, and expiring leases never surprise you.",
        },
      ],
    },
    {
      id: "payments",
      label: "Money",
      eyebrow: "Rent and books",
      title: "Rent on autopay, books ready for tax time.",
      subtitle:
        "Collection that runs itself, income and expenses tracked per property, and a Schedule E your accountant will thank you for.",
      features: [
        {
          id: "rent-collection",
          Icon: CreditCard,
          title: "Rent collection and autopay",
          short: "ACH, card, Apple Pay and cash at retail",
          body: "Tenants pay by credit card, debit card, ACH, Apple Pay, cash at retail locations or check, automatically on the 1st. Reminders go out before and after the due date, late fees apply themselves, and you see paid versus overdue rent at a glance.",
        },
        {
          id: "bookkeeping",
          Icon: Landmark,
          title: "Bookkeeping and bank sync",
          short: "Income and expenses per property, categorised for you",
          body: "Connect any bank and every rent payment, repair and mortgage payment is categorised per property automatically, against a chart of accounts you can adjust. Receipts attach from your phone, and real-time reports show cash flow as it happens.",
          platforms: ["Plaid"],
        },
        {
          id: "tax-reports",
          Icon: Calculator,
          title: "Tax-ready reports",
          short: "Schedule E and contractor 1099s, done",
          body: "A Schedule E per property, cash-flow and profit-and-loss statements, and 1099-NEC forms for the contractors you paid, exportable to your accountant or tax software.",
          platforms: ["QuickBooks", "TurboTax export"],
        },
        {
          id: "deposits",
          Icon: ShieldCheck,
          title: "Security deposits",
          short: "Held, itemised and returned to your state's rules",
          body: "Deposits tracked per lease with your state's deadline and interest rules, itemised deductions with photos, and a return letter generated for you.",
        },
        {
          id: "rent-reporting",
          Icon: Sparkles,
          title: "Rent reporting for tenants",
          short: "Reward on-time payers with credit-bureau reporting",
          body: "Offer tenants credit-bureau reporting of on-time rent. Tenants who opt in pay on time more often, and it costs you nothing.",
          platforms: ["Experian", "Equifax", "TransUnion"],
        },
      ],
    },
    {
      id: "operations",
      label: "Operations",
      eyebrow: "Repairs and paperwork",
      title: "Repairs handled, paperwork filed, tenants informed.",
      subtitle:
        "A vendor network you can dispatch to, inspections on your phone, documents in one place and automations that do the chasing.",
      features: [
        {
          id: "maintenance",
          Icon: Wrench,
          title: "Maintenance and vendor network",
          short: "Requests triaged by AI, dispatched to vetted local vendors",
          body: "Tenants report issues with photos. AI grades urgency and suggests a fix or a vetted local vendor from the VFO network, who accepts, schedules and invoices in their own portal. You approve, VFO mails the check or sends the transfer, and the 1099 is ready at year end.",
        },
        {
          id: "inspections",
          Icon: ClipboardCheck,
          title: "Inspections",
          short: "Move-in, move-out and routine, with photos",
          body: "Guided move-in, move-out and routine inspections on your phone, with photos and e-signed reports that attach to the lease and protect the deposit.",
        },
        {
          id: "documents",
          Icon: FolderLock,
          title: "Document vault",
          short: "Leases, insurance and permits with expiry alerts",
          body: "Leases, insurance policies, permits and HOA documents against each unit, searchable in seconds and with alerts before anything expires.",
        },
        {
          id: "communications",
          Icon: MessageSquare,
          title: "Tenant messaging",
          short: "SMS, email and in-app from one thread",
          body: "One thread per tenant across SMS, email and the tenant app, with templates for the messages you send every month and a full history if you ever need it.",
          platforms: ["Twilio"],
        },
        {
          id: "ai-assistant",
          Icon: Bot,
          title: "AI assistant",
          short: "Answers tenants, does the busywork, reports on request",
          body: 'Answers tenant questions and resolves routine issues before they reach you, chases late rent politely, and answers questions like "who hasn\'t paid this month?" with an instant report.',
        },
        {
          id: "automations",
          Icon: Zap,
          title: "Automations and AI agents",
          short: "Rules for the routine, agents for the judgement calls",
          body: "Rules handle reminders, late fees and renewals. AI agents chase late rent politely, triage maintenance and answer tenants' lease questions, and tell you what they did.",
        },
        {
          id: "compliance",
          Icon: ShieldAlert,
          title: "Compliance and insurance",
          short: "Renters insurance, notices and local rules",
          body: "Renters-insurance verification, state-specific notice templates, lead-paint disclosures and local ordinance reminders, so you stay on the right side of the rules without a lawyer on retainer.",
        },
      ],
    },
    {
      id: "insights",
      label: "Insight",
      eyebrow: "Insight",
      title: "Know how each property is doing, at a glance.",
      subtitle: "A dashboard for your portfolio and a mobile app for everything else.",
      features: [
        {
          id: "reports",
          Icon: BarChart3,
          title: "Portfolio dashboard",
          short: "Occupancy, cash flow and upcoming events per property",
          body: "Occupancy, cash flow, upcoming renewals and open repairs per property, in plain language with the numbers behind them.",
        },
        {
          id: "mobile",
          Icon: Home,
          title: "Landlord mobile app",
          short: "Approve, message and inspect from anywhere",
          body: "Approve a repair, answer a tenant, run an inspection or check who has paid, from your phone.",
        },
        {
          id: "handoff",
          Icon: Handshake,
          title: "Hand off to a manager, any time",
          short: "Bring in a VFO property manager without moving data",
          body: "If you decide to hire a property management company, one that uses VFO takes over your properties in place. Nothing is re-entered and your history stays intact.",
        },
      ],
    },
  ],
  integrations: {
    title: "Connected to the sites and tools you already use.",
    subtitle:
      "Listings syndicate to the major rental sites, leads flow back in, and money and documents sync with your bank, accountant and e-signature tools.",
    items: [
      ...LISTING_INTEGRATIONS,
      { name: "Plaid", kind: "Bank sync" },
      { name: "Stripe", kind: "Payments" },
      { name: "QuickBooks", kind: "Accounting" },
      { name: "TransUnion", kind: "Screening" },
      { name: "Experian", kind: "Screening" },
      { name: "DocuSign", kind: "E-signature" },
      { name: "Google Calendar", kind: "Scheduling" },
      { name: "SmartRent", kind: "Smart locks" },
      { name: "Latch", kind: "Smart locks" },
      { name: "Lemonade", kind: "Renters insurance" },
    ],
  },
};

/* ----------------------------------------------------------------- tenants */

const tenants = {
  slug: "tenants",
  label: "Tenants",
  audience: "Renters and residents",
  Icon: Home,
  menuBlurb: "Pay rent, fix things and find answers, from your phone.",
  menuHighlights: [
    "Pay rent your way, build credit",
    "Track repairs live",
    "Ask the AI assistant about your lease",
  ],
  hero: {
    eyebrow: "For tenants",
    title: "Renting, minus the phone calls and paper.",
    body: "Pay rent your way, report a problem in a tap, sign your lease and get answers about your home from an assistant that has actually read it. The same app whether your landlord manages the place or a company does.",
    image: images.portalTenant,
    caption: { title: "Dana K.", meta: "Unit 4B · Autopay on · Rent reported to bureaus" },
    proof: [
      "Build credit with on-time rent",
      "Track repairs live",
      "Ask anything about your lease",
    ],
  },
  groups: [
    {
      id: "payments",
      label: "Pay",
      eyebrow: "Paying rent",
      title: "Pay however suits you, and get credit for it.",
      subtitle:
        "Bank, card, wallet or cash. Split with roommates, spread across the month and report it to the bureaus.",
      features: [
        {
          id: "pay-rent",
          Icon: CreditCard,
          title: "Pay rent your way",
          short: "Bank, card, Apple Pay, check or cash at retail",
          body: "Bank transfer, debit or credit card, Apple Pay, Google Pay, check or cash at thousands of retail locations. Turn autopay on once and stop thinking about it.",
          platforms: ["Apple Pay", "Google Pay", "Plaid"],
        },
        {
          id: "split-rent",
          Icon: Users,
          title: "Split rent with roommates",
          short: "Everyone pays their share and sees the balance",
          body: "Each roommate pays their own share from their own account. Everyone sees what is paid and what is outstanding, and nobody fronts the rent.",
        },
        {
          id: "rent-reporting",
          Icon: TrendingUp,
          title: "Rent reporting to credit bureaus",
          short: "On-time rent builds your credit score",
          body: "Opt in and every on-time payment is reported to Experian, Equifax and TransUnion, so paying rent builds your credit history.",
          platforms: ["Experian", "Equifax", "TransUnion"],
        },
        {
          id: "flexible-rent",
          Icon: CalendarClock,
          title: "Flexible rent",
          short: "Split the month's rent into two payments",
          body: "Where your landlord or manager offers it, split the month's rent into two payments that match your paydays, at no interest.",
        },
        {
          id: "receipts",
          Icon: Receipt,
          title: "Receipts and history",
          short: "Every payment and ledger entry, downloadable",
          body: "Every payment, receipt and ledger entry in one place, downloadable whenever you need proof of rent for a loan or a new lease.",
        },
      ],
    },
    {
      id: "home",
      label: "Live",
      eyebrow: "Living there",
      title: "Report it, track it, and get answers in the moment.",
      subtitle:
        "Maintenance with live status, an assistant that knows your lease, and the building's news in one place.",
      features: [
        {
          id: "maintenance-requests",
          Icon: Wrench,
          title: "Maintenance requests",
          short: "Photos, urgency and live status",
          body: "Describe the problem, add photos or video and pick an urgency. Watch it move from received to scheduled to fixed, with the vendor's arrival window.",
        },
        {
          id: "ai-assistant",
          Icon: Sparkles,
          title: "AI assistant",
          short: "Ask about your lease, parking, pets or utilities",
          body: "Ask about parking, pets, guests, utilities or notice periods and get an answer drawn from your own lease and building rules, any time of day.",
        },
        {
          id: "messages",
          Icon: MessageSquare,
          title: "Messages and announcements",
          short: "One thread with your manager, notices you won't miss",
          body: "One thread with your landlord or property manager, plus building announcements delivered in-app, by text or by email, whichever you prefer.",
        },
        {
          id: "renters-insurance",
          Icon: ShieldCheck,
          title: "Renters insurance",
          short: "Buy or upload a policy in minutes",
          body: "Buy a policy in minutes or upload the one you have. It stays on file for the length of your lease with a reminder before it renews.",
          platforms: ["Lemonade"],
        },
        {
          id: "amenities",
          Icon: CalendarCheck,
          title: "Amenity booking and packages",
          short: "Reserve the gym or guest suite, know when parcels arrive",
          body: "Reserve shared spaces like the gym, roof or guest suite, and get a notification the moment a package is logged at the front desk.",
        },
        {
          id: "move-in-concierge",
          Icon: Plug,
          title: "Utilities and move-in concierge",
          short: "Power, internet and water set up before you get the keys",
          body: "Set up electricity, internet, gas and water before move-in day from one checklist, with the providers that serve your address.",
        },
      ],
    },
    {
      id: "lease",
      label: "Lease",
      eyebrow: "Your lease",
      title: "Apply, sign, renew and move out, all from your phone.",
      subtitle:
        "One application, e-signed documents, condition photos and a deposit you can track.",
      features: [
        {
          id: "apply-once",
          Icon: FileText,
          title: "Apply once",
          short: "One application reused across listings for 30 days",
          body: "Complete one application and screening report and reuse it on any VFO listing for 30 days, without paying the fee again.",
        },
        {
          id: "esign",
          Icon: FileSignature,
          title: "E-sign lease and renewals",
          short: "Sign, renew or give notice from your phone",
          body: "Sign your lease, accept a renewal or give notice from your phone. Every document you have ever signed stays available in one place.",
        },
        {
          id: "checklists",
          Icon: ClipboardCheck,
          title: "Move-in and move-out checklists",
          short: "Document condition with photos",
          body: "Walk through the unit with a guided checklist and photos at move-in and move-out, so the condition is agreed and deposits are settled fairly.",
        },
        {
          id: "deposit",
          Icon: Landmark,
          title: "Deposit tracking",
          short: "See where your deposit is held and how it was returned",
          body: "See where your security deposit is held, any deductions with their photos and receipts, and when the balance was returned.",
        },
      ],
    },
  ],
  integrations: {
    title: "Works with the apps already on your phone.",
    subtitle:
      "Pay with the wallet you use, build credit with the bureaus, and insure the place in minutes.",
    items: [
      { name: "Apple Pay", kind: "Payments" },
      { name: "Google Pay", kind: "Payments" },
      { name: "Plaid", kind: "Bank linking" },
      { name: "Experian", kind: "Rent reporting" },
      { name: "Equifax", kind: "Rent reporting" },
      { name: "TransUnion", kind: "Rent reporting" },
      { name: "Lemonade", kind: "Renters insurance" },
      { name: "SmartRent", kind: "Smart home" },
      { name: "Latch", kind: "Smart locks" },
      { name: "Google Calendar", kind: "Reminders" },
    ],
  },
};

export const solutions = [propertyManagers, landlords, tenants];

export const solutionBySlug = (slug) => solutions.find((solution) => solution.slug === slug);

/** Path to a solution page, optionally deep-linked to a group or feature. */
export const solutionPath = (slug, anchor) => `/${slug}${anchor ? `#${anchor}` : ""}`;
