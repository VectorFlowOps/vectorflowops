/**
 * Copy and canned answers for the AI assistant widget.
 *
 * The widget is UI only for now: a suggested question returns its scripted
 * reply, anything else returns `fallback`. When the assistant is connected,
 * `suggestions[].reply` and `fallback` go away and a real answer comes back
 * from the visitor's own leases, ledgers and policies.
 */
export const assistant = {
  name: "VFO Assistant",
  status: "Online · preview",
  launcherLabel: "Ask VFO",
  greeting:
    "Hi, I'm the VFO assistant. Ask me anything about plans, features or moving your portfolio over, or pick a question to start.",
  inputPlaceholder: "Ask about pricing, features or migration…",
  send: "Send",
  disclaimer: "Preview. Answers are illustrative until the assistant is connected.",
  suggestions: [
    {
      label: "What's included in Professional?",
      reply:
        "Professional is $499.99 a month for up to 200 units, or $399.99 a month billed annually. It has everything in Starter plus trust accounting and owner statements, the owner portal with management-fee automation, team roles and permissions, AI leasing agents on every listing, a custom rental website and priority support.",
    },
    {
      label: "Do tenants pay to use VFO?",
      reply:
        "No. Your subscription covers everyone. Tenants and vendors get their portals free, and there are no per-user charges on any plan.",
    },
    {
      label: "How does Zillow syndication work?",
      reply:
        "Write a listing once and VFO publishes it to Zillow, Trulia, HotPads, Apartments.com, Realtor.com, Zumper, Facebook Marketplace and Craigslist. Edits sync everywhere, enquiries land in your lead inbox, and the listing comes down the moment a lease is signed.",
    },
    {
      label: "Can I migrate from AppFolio?",
      reply:
        "Yes. Our team migrates owners, properties, leases, ledgers and documents from AppFolio, Buildium, Yardi or Rent Manager, reconciled to the penny before you switch over. It's free on every plan.",
    },
  ],
  fallback: {
    reply:
      "Good question. I'm a preview right now, so I can't look that up yet. Once I'm connected, answers like this will come from your own leases, ledgers and policies. In the meantime the team can help.",
    cta: { label: "Book a demo", href: "/get-started" },
  },
};
