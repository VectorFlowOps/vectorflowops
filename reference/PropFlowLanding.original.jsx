/*
  VFOLanding.jsx
  ---------------------------------------------------------------------------
  A single-file landing page component using React + shadcn/ui + anime.js.

  SETUP (in your own Vite / Next.js project with Tailwind already configured):

  1) Install deps:
       npm i animejs@3 lucide-react

  2) Add the shadcn components this file imports:
       npx shadcn@latest add button card badge accordion

  3) Drop this file in (e.g. src/VFOLanding.jsx) and render <VFOLanding />.

  Notes:
   - Images are hotlinked from Unsplash (free license). Swap the URLs in IMAGES
     for your own assets when you go live.
   - All copy/numbers/prices are placeholders.
   - Animations respect prefers-reduced-motion automatically.
   - anime.js v3 API is used (default import). If you're on anime.js v4,
     change `import anime from "animejs"` to `import { animate as anime } from "animejs"`
     and adjust the calls (v4 renamed a few options).
*/

import { useEffect, useRef } from "react";
import anime from "animejs";
import {
  Waves, ArrowRight, Play, ShieldCheck, Lock, Globe, KeyRound,
  Building2, Anchor, Sailboat, Droplets, Palmtree, Landmark,
  CreditCard, FolderLock, UsersRound, BarChart3,
  Upload, UserPlus, Zap, Check, Star, Twitter, Linkedin, Instagram,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "@/components/ui/accordion";

/* ------------------------------------------------------------------ data */

const IMAGES = {
  heroTall: "https://images.unsplash.com/photo-1591701729564-3b5325d5a4bd?auto=format&fit=crop&w=800&q=80",
  heroWide: "https://images.unsplash.com/photo-1585546250005-83b887856883?auto=format&fit=crop&w=700&q=80",
  heroSmall: "https://images.unsplash.com/photo-1638062414454-974924dbb5cf?auto=format&fit=crop&w=600&q=80",
  feature: "https://images.unsplash.com/photo-1674296067534-0f9769040781?auto=format&fit=crop&w=1600&q=80",
  landlord: "https://images.unsplash.com/photo-1724992609113-bb30249a2573?auto=format&fit=crop&w=1200&q=80",
  tenant: "https://images.unsplash.com/photo-1585546250005-83b887856883?auto=format&fit=crop&w=1200&q=80",
  vendor: "https://images.unsplash.com/photo-1625208077223-595816df2e8a?auto=format&fit=crop&w=1200&q=80",
  payments: "https://images.unsplash.com/photo-1724992609085-04e76ba15f6a?auto=format&fit=crop&w=1400&q=80",
  maintenance: "https://images.unsplash.com/photo-1528913775512-624d24b27b96?auto=format&fit=crop&w=1400&q=80",
  strip: "https://images.unsplash.com/photo-1718884566618-5bdb57971ee9?auto=format&fit=crop&w=2400&q=80",
  cta: "https://images.unsplash.com/photo-1645370360378-3beab8a791e0?auto=format&fit=crop&w=2000&q=80",
};

const BRANDS = [
  { name: "Harbor Row", Icon: Building2 },
  { name: "Seaview", Icon: Anchor },
  { name: "Tideline", Icon: Waves },
  { name: "Marina Bay", Icon: Sailboat },
  { name: "Bluewater", Icon: Droplets },
  { name: "Coastline Co.", Icon: Palmtree },
  { name: "Cape Harbor", Icon: Landmark },
];

const FEATURES = [
  { Icon: CreditCard, title: "Secure rent payments", body: "Flexible, recurring payments by card or bank transfer, with reminders before anything is late." },
  { Icon: FolderLock, title: "Organized operations", body: "Leases, documents and communications filed against each unit and searchable in seconds." },
  { Icon: UsersRound, title: "Better collaboration", body: "Landlords, tenants and vendors see the same work order until it's closed. Nothing lost in between." },
  { Icon: BarChart3, title: "Real insights", body: "Occupancy, cash flow and owner statements, in plain language with the numbers behind them." },
];

const STEPS = [
  { Icon: Upload, tag: "Import", title: "Bring your properties", body: "Upload a spreadsheet of units, leases and balances. VFO maps the columns and builds your portfolio for you." },
  { Icon: UserPlus, tag: "Invite", title: "Add tenants and vendors", body: "Send a link and everyone gets the right portal automatically. No training, no logins to manage by hand." },
  { Icon: Zap, tag: "Run", title: "Collect, coordinate, report", body: "Rent flows in on autopay, requests route to the right vendor, and owner statements go out on the first." },
];

const PORTALS = [
  { label: "Landlords", img: IMAGES.landlord, title: "Landlord Portal", body: "See the whole portfolio at a glance and act on what needs attention.", points: ["Income and expenses by property", "Lease renewals and vacancies", "Approve vendor invoices"] },
  { label: "Tenants", img: IMAGES.tenant, title: "Tenant Portal", body: "A simple home for rent, requests and the lease, on any device.", points: ["Pay rent and set up autopay", "Submit and track maintenance requests", "Messages and lease documents"] },
  { label: "Vendors", img: IMAGES.vendor, title: "Vendor Portal", body: "Clear work orders, clear schedules, and payment when the job is done.", points: ["Accept and schedule work orders", "Upload photos and completion notes", "Invoice and get paid directly"] },
];

const STATS = [
  { count: 98.6, suffix: "%", label: "rent collected on time" },
  { count: 2.1, suffix: " days", label: "average work order close" },
  { count: 11, suffix: " hrs", label: "saved per week, per manager" },
  { count: 4.9, suffix: "/5", label: "tenant satisfaction" },
];

const TESTIMONIALS = [
  { av: "DM", name: "Dana Mercer", role: "Ops Director, Harbor Row", quote: "We manage 340 beachfront units with a team of four. VFO is the reason that number isn't eight. Rent just shows up now." },
  { av: "RP", name: "Ravi Patel", role: "Principal, Tideline Group", quote: "Owners used to call for statements. Now they open the portal and see everything. My inbox is a third of what it was." },
  { av: "SL", name: "Sofia Lang", role: "Owner, Marina Bay Rentals", quote: "The vendor side sold me. My contractors get the job, the access notes and payment in one place. No more phone tag." },
];

const PLANS = [
  { name: "Starter", desc: "For owners with a handful of units.", price: "$29", unit: "/mo", per: "Up to 10 units · billed monthly", cta: "Start free trial", variant: "outline", popular: false, features: ["Rent collection & autopay", "Tenant & vendor portals", "Maintenance requests", "Email support"] },
  { name: "Professional", desc: "For growing management teams.", price: "$89", unit: "/mo", per: "Up to 100 units · billed monthly", cta: "Start free trial", variant: "default", popular: true, features: ["Everything in Starter", "Owner statements & reporting", "Automated late fees & payouts", "Priority support"] },
  { name: "Enterprise", desc: "For large or multi-region portfolios.", price: "Custom", unit: "", per: "Unlimited units · annual contract", cta: "Talk to sales", variant: "outline", popular: false, features: ["Everything in Professional", "Custom roles & permissions", "API & accounting integrations", "Dedicated account manager"] },
];

const FAQS = [
  { q: "How long does it take to get started?", a: "Most teams import their portfolio and send their first tenant invites the same afternoon. Upload a spreadsheet of units and VFO builds everything for you, no migration project required." },
  { q: "Do tenants and vendors pay to use it?", a: "No. Your subscription covers everyone. Tenants and vendors get their portals for free, and there are no per-user charges on any plan." },
  { q: "How are payments processed and how fast are payouts?", a: "Payments run through bank-grade, PCI-compliant processing. Card payments settle in one to two business days and ACH in two to three, with owner payouts scheduled automatically once rent clears." },
  { q: "Can I switch plans or cancel later?", a: "Anytime. Upgrade, downgrade or cancel from your settings. If you cancel, you keep access through the end of your billing period and can export all your data." },
  { q: "Is my data secure?", a: "Yes. Data is encrypted in transit and at rest, backed up daily, and hosted on SOC 2 Type II certified infrastructure. You control who on your team sees what." },
];

/* ------------------------------------------------------------------ tokens */

const NAVY = "#081A33";
const heroMesh = {
  background: `
    radial-gradient(60% 55% at 12% 18%, rgba(47,107,255,.42), transparent 60%),
    radial-gradient(50% 50% at 88% 30%, rgba(56,198,217,.26), transparent 62%),
    radial-gradient(70% 60% at 70% 100%, rgba(21,55,97,.7), transparent 70%),
    linear-gradient(160deg, #081A33 0%, #0C2547 55%, #0E2A52 100%)`,
};
const ctaGradient = {
  background: `
    radial-gradient(60% 90% at 15% 10%, rgba(47,107,255,.55), transparent 60%),
    radial-gradient(60% 90% at 90% 90%, rgba(56,198,217,.4), transparent 60%),
    linear-gradient(150deg, #0E2647, #081A33)`,
};

/* ------------------------------------------------------------------ view */

export default function PropFlowLanding() {
  const root = useRef(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    // sticky-nav background toggle
    const nav = el.querySelector("[data-nav]");
    const onScroll = () => nav?.classList.toggle("nav-solid", window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (reduce) {
      el.querySelectorAll(".reveal").forEach((n) => (n.style.opacity = 1));
      window.removeEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }

    // hero entrance
    anime.timeline({ easing: "easeOutExpo" })
      .add({ targets: el.querySelectorAll("[data-hero]"), translateY: [28, 0], opacity: [0, 1], duration: 900, delay: anime.stagger(110, { start: 150 }) })
      .add({ targets: el.querySelectorAll(".pcard"), translateY: [40, 0], scale: [0.92, 1], opacity: [0, 1], duration: 900, delay: anime.stagger(120) }, "-=700")
      .add({ targets: el.querySelectorAll(".chip"), translateY: [20, 0], opacity: [0, 1], duration: 700, delay: anime.stagger(120) }, "-=600");

    // floating hero imagery
    el.querySelectorAll(".float").forEach((n, i) => {
      const d = Number(n.dataset.depth) || 20;
      anime({ targets: n, translateY: [-d / 2, d / 2], duration: 3200 + i * 400, direction: "alternate", loop: true, easing: "easeInOutSine", delay: i * 180 });
    });

    // infinite marquee
    const track = el.querySelector("[data-track]");
    if (track) anime({ targets: track, translateX: ["0%", "-50%"], duration: 26000, easing: "linear", loop: true });

    // scroll reveals
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        anime({ targets: e.target, translateY: [36, 0], opacity: [0, 1], duration: 800, easing: "easeOutCubic" });
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
    el.querySelectorAll(".reveal").forEach((n) => io.observe(n));

    // animated counters
    const so = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        so.unobserve(e.target);
        const target = Number(e.target.dataset.count);
        const suffix = e.target.dataset.suffix || "";
        const dec = target % 1 !== 0 ? 1 : 0;
        const obj = { v: 0 };
        anime({ targets: obj, v: target, duration: 1600, easing: "easeOutExpo", update: () => { e.target.textContent = obj.v.toFixed(dec) + suffix; } });
      });
    }, { threshold: 0.5 });
    el.querySelectorAll("[data-count]").forEach((n) => so.observe(n));

    return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); so.disconnect(); };
  }, []);

  return (
    <div ref={root} className="font-sans text-[#0F1E33] antialiased [--sky:#8FB3FF]">
      <style>{`
        [data-nav]{transition:background .25s,border-color .25s;border-bottom:1px solid transparent}
        [data-nav].nav-solid{background:rgba(8,26,51,.9);backdrop-filter:blur(14px);border-bottom-color:rgba(255,255,255,.08)}
        .reveal{opacity:0}
        .marquee-mask{-webkit-mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent);mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)}
        @media (prefers-reduced-motion:reduce){.reveal{opacity:1!important}}
      `}</style>

      {/* NAV */}
      <nav data-nav className="sticky top-0 z-50">
        <div className="mx-auto flex h-[74px] max-w-[1200px] items-center gap-9 px-8 text-white">
          <a href="#" className="flex items-center gap-2.5 text-lg font-semibold">
            <span className="grid h-8 w-8 place-items-center rounded-[9px] bg-gradient-to-br from-[#2F6BFF] to-[#38C6D9] shadow-[0_6px_16px_rgba(47,107,255,.4)]">
              <Waves className="h-4 w-4" />
            </span>
            VFO
          </a>
          <div className="ml-auto hidden gap-7 text-sm text-white/80 md:flex">
            {["Features", "Portals", "How it works", "Pricing", "FAQ"].map((t) => (
              <a key={t} href={`#${t.toLowerCase().replace(/\s/g, "")}`} className="hover:text-white">{t}</a>
            ))}
          </div>
          <a href="#" className="hidden text-sm text-white/85 md:inline">Sign in</a>
          <Button className="bg-[#2F6BFF] hover:bg-[#4F83FF]" asChild><a href="#pricing">Get started</a></Button>
        </div>
      </nav>

      {/* HERO */}
      <header className="relative overflow-hidden text-white" style={{ background: NAVY }}>
        <div className="absolute inset-0 opacity-[.28]" style={{ background: `url(${IMAGES.heroTall}) center 42%/cover no-repeat` }} />
        <div className="absolute inset-0" style={heroMesh} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#081A33]/60" />
        <div className="relative z-[3] mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 px-8 pb-28 pt-24 md:grid-cols-[1.02fr_1fr]">
          <div>
            <span data-hero className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[.08] py-1.5 pl-2 pr-3.5 text-[13px] text-white/90">
              <b className="rounded-full bg-gradient-to-br from-[#2F6BFF] to-[#38C6D9] px-2.5 py-0.5 text-[11px] font-bold">NEW</b>
              Owner statements now generate automatically
            </span>
            <h1 data-hero className="mb-6 text-[clamp(42px,5.4vw,70px)] font-semibold leading-[1.02] tracking-[-.02em]">
              One platform for{" "}
              <span className="bg-gradient-to-r from-white via-[#8FB3FF] to-[#38C6D9] bg-clip-text text-transparent">properties, payments</span>{" "}
              and people.
            </h1>
            <p data-hero className="mb-8 max-w-[520px] text-[19px] leading-relaxed text-white/80">
              Manage your portfolio, collect rent, coordinate vendors and keep every tenant informed, from a single calm, well-organized place.
            </p>
            <div data-hero className="mb-7 flex flex-wrap gap-3">
              <Button size="lg" className="bg-[#2F6BFF] hover:bg-[#4F83FF]" asChild>
                <a href="#pricing">Start free trial <ArrowRight className="ml-2 h-4 w-4" /></a>
              </Button>
              <Button size="lg" variant="outline" className="border-white/25 bg-white/10 text-white hover:bg-white/20" asChild>
                <a href="#"><Play className="mr-2 h-4 w-4" /> Watch demo</a>
              </Button>
            </div>
            <div data-hero className="flex flex-wrap gap-2.5">
              {[[ShieldCheck, "SOC 2 Type II"], [Lock, "PCI DSS compliant"], [Globe, "GDPR ready"], [KeyRound, "256-bit encryption"]].map(([Ic, t]) => (
                <span key={t} className="inline-flex items-center gap-2 rounded-[10px] border border-white/15 bg-white/[.06] px-3 py-2 text-[12.5px] text-white/85">
                  <Ic className="h-4 w-4 text-[color:var(--sky)]" /> {t}
                </span>
              ))}
            </div>
          </div>

          {/* image composition */}
          <div className="relative h-[400px] md:h-[520px]" aria-hidden>
            <div className="absolute right-2.5 top-[-30px] h-[280px] w-[280px] rounded-full opacity-55 blur-[20px]" style={{ background: "radial-gradient(circle,#2F6BFF,transparent 70%)" }} />
            <div className="absolute bottom-0 left-[-20px] h-[220px] w-[220px] rounded-full opacity-55 blur-[20px]" style={{ background: "radial-gradient(circle,#38C6D9,transparent 70%)" }} />
            <img src={IMAGES.heroTall} alt="" data-depth="18" className="pcard float absolute right-10 top-5 h-[340px] w-[270px] rounded-[20px] border border-white/20 object-cover shadow-2xl" />
            <img src={IMAGES.heroWide} alt="" data-depth="26" className="pcard float absolute bottom-10 left-0 h-[180px] w-[230px] rounded-[20px] border border-white/20 object-cover shadow-2xl" />
            <img src={IMAGES.heroSmall} alt="" data-depth="34" className="pcard float absolute left-[60px] top-0 h-[150px] w-[180px] rounded-[20px] border border-white/20 object-cover shadow-2xl" />
            <div data-depth="40" className="chip float absolute bottom-[120px] right-0 rounded-[14px] border border-white/30 bg-white/[.14] px-4 py-3 text-white shadow-xl backdrop-blur-md">
              <b className="block text-[17px] font-semibold">$248,300</b>
              <span className="text-white/70"><span className="mr-1.5 inline-block h-[7px] w-[7px] rounded-full bg-[#12A150]" />Rent collected · 97% on time</span>
            </div>
            <div data-depth="30" className="chip float absolute left-0 top-[150px] rounded-[14px] border border-white/30 bg-white/[.14] px-4 py-3 text-white shadow-xl backdrop-blur-md">
              <b className="block text-[17px] font-semibold">96.4%</b>
              <span className="text-white/70">Occupancy across 12 properties</span>
            </div>
          </div>
        </div>
      </header>

      {/* MARQUEE */}
      <div className="overflow-hidden border-b border-[#E4EAF3] bg-[#F5F8FC] py-9">
        <p className="mb-5 text-center text-[13px] tracking-wide text-[#7F8CA0]">Trusted by property teams managing coastal portfolios nationwide</p>
        <div className="marquee-mask overflow-hidden">
          <div data-track className="flex w-max items-center gap-16">
            {[...BRANDS, ...BRANDS].map(({ name, Icon }, i) => (
              <span key={i} className="inline-flex items-center gap-2.5 whitespace-nowrap text-[20px] font-semibold tracking-[-.02em] text-[#4C5B70] opacity-60">
                <Icon className="h-[22px] w-[22px] text-[#2F6BFF] opacity-85" /> {name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <Section id="features">
        <Center eyebrow="Why VFO" title="Built for modern property management."
          sub="Streamline operations, cut manual work and give owners, tenants and vendors a better experience." />
        <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-[1.1fr_1fr]">
          <div className="reveal relative aspect-[4/3.4] overflow-hidden rounded-[22px] shadow-2xl">
            <img src={IMAGES.feature} alt="Aerial coastal city" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#081A33]/55" />
            <div className="absolute bottom-5 left-5 rounded-[13px] border border-white/15 bg-[#081A33]/70 px-4 py-3 text-[13px] text-white backdrop-blur">
              <b className="block text-[15px] font-semibold">Seaview Residences</b>48 units · 96% occupied · 2 open work orders
            </div>
          </div>
          <div className="grid gap-1.5">
            {FEATURES.map(({ Icon, title, body }) => (
              <div key={title} className="reveal grid grid-cols-[52px_1fr] gap-[18px] rounded-2xl p-[22px] transition-colors hover:bg-[#F5F8FC]">
                <span className="grid h-[52px] w-[52px] place-items-center rounded-[14px] border border-[#E4EAF3] bg-gradient-to-br from-[#EAF1FF] to-[#F5F8FC] text-[#2F6BFF]">
                  <Icon className="h-6 w-6" strokeWidth={1.8} />
                </span>
                <div>
                  <h3 className="mb-1.5 text-lg font-medium">{title}</h3>
                  <p className="text-[15px] text-[#4C5B70]">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* HOW */}
      <section id="howitworks" className="relative overflow-hidden py-[76px] text-white md:py-[108px]" style={{ background: NAVY }}>
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(50% 50% at 80% 0%,rgba(47,107,255,.28),transparent 60%),radial-gradient(45% 45% at 10% 100%,rgba(56,198,217,.18),transparent 60%)" }} />
        <div className="relative z-[1] mx-auto max-w-[1200px] px-8">
          <Center dark eyebrow="Getting set up" title="From spreadsheet to running in an afternoon."
            sub="Three steps to move your whole portfolio onto VFO, no data-migration project required." />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {STEPS.map(({ Icon, tag, title, body }) => (
              <div key={tag} className="reveal rounded-[18px] border border-white/12 bg-white/[.05] p-[34px] transition-transform hover:-translate-y-1.5">
                <div className="mb-[22px] flex items-center gap-3 text-sm font-semibold text-[color:var(--sky)]">
                  <b className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-[#2F6BFF] to-[#38C6D9] text-white"><Icon className="h-5 w-5" /></b>
                  {tag}
                  <span className="h-px flex-1 bg-white/15" />
                </div>
                <h3 className="mb-2.5 text-xl font-medium">{title}</h3>
                <p className="text-[15px] text-white/70">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTALS */}
      <Section id="portals" className="bg-gradient-to-b from-[#F5F8FC] to-white">
        <Center eyebrow="Three portals" title="Tailored experiences for every user."
          sub="Each portal is designed around the tools that role needs, so everyone gets things done faster." />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {PORTALS.map((p) => (
            <Card key={p.label} className="reveal group flex flex-col overflow-hidden rounded-[20px] border-[#E4EAF3] p-0 shadow-[0_12px_34px_rgba(15,30,51,.07)] transition-all hover:-translate-y-2 hover:shadow-2xl">
              <div className="relative h-[196px] overflow-hidden">
                <img src={p.img} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#081A33]/35" />
                <Badge className="absolute left-3.5 top-3.5 bg-white/95 text-[#081A33] hover:bg-white">{p.label}</Badge>
              </div>
              <CardContent className="flex flex-1 flex-col p-[26px]">
                <h3 className="mb-2.5 text-[22px] font-medium">{p.title}</h3>
                <p className="mb-4 text-[15px] text-[#4C5B70]">{p.body}</p>
                <ul className="mb-6 flex-1 space-y-2.5 text-sm text-[#4C5B70]">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5"><Check className="mt-0.5 h-4 w-4 flex-none text-[#2F6BFF]" strokeWidth={2.4} />{pt}</li>
                  ))}
                </ul>
                <a href="#" className="inline-flex items-center gap-1.5 text-[14.5px] font-semibold text-[#2F6BFF]">Learn more <ArrowRight className="h-3.5 w-3.5" /></a>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* DEEP DIVES */}
      <Section>
        <DeepDive eyebrow="Payments" title="Rent that arrives on its own." img={IMAGES.payments}
          body="Set the schedule once. VFO charges cards and bank accounts on time, chases what's late, and reconciles every dollar against your books."
          points={[["Autopay by card or ACH", "with receipts kept in one place."], ["Automatic late fees", "applied by the rules you set."], ["Owner payouts", "split and deposited the day rent clears."]]} />
        <div className="mt-24">
          <DeepDive flip eyebrow="Maintenance" title="Every request, tracked to done." img={IMAGES.maintenance}
            body="A tenant reports an issue with a photo. The right vendor is assigned, scheduled and paid, and everyone watches the same status until the work order closes."
            points={[["Smart routing", "sends each job to the vendor who handles it."], ["Shared timeline", "so no one has to chase an update."], ["Invoice in the thread", "and approve payment in a tap."]]} />
        </div>
      </Section>

      {/* STATS */}
      <section className="relative overflow-hidden py-[76px] text-white md:py-[116px]" style={{ background: NAVY }}>
        <div className="absolute inset-0 opacity-[.22]" style={{ background: `url(${IMAGES.strip}) center/cover no-repeat` }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(60% 60% at 50% 0%,rgba(47,107,255,.25),transparent 60%),linear-gradient(180deg,rgba(8,26,51,.75),rgba(8,26,51,.92))" }} />
        <div className="relative z-[1] mx-auto max-w-[1200px] px-8">
          <Center dark title="Numbers our customers see." sub="Averages across portfolios that have run on VFO for at least six months." />
          <div className="grid grid-cols-1 gap-9 text-center md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="reveal">
                <div data-count={s.count} data-suffix={s.suffix} className="bg-gradient-to-r from-white to-[#8FB3FF] bg-clip-text text-[52px] font-bold leading-none tracking-[-.03em] text-transparent">0</div>
                <span className="mt-2.5 block text-sm text-white/70">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <Section>
        <Center eyebrow="Customer stories" title="Property teams that stopped drowning in email." />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <Card key={t.name} className="reveal flex flex-col rounded-[18px] border-[#E4EAF3] p-[30px] shadow-[0_12px_34px_rgba(15,30,51,.07)]">
              <div className="mb-3.5 flex gap-0.5 text-[#F5A623]">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-[#F5A623]" />)}
              </div>
              <blockquote className="flex-1 text-[15.5px] leading-relaxed">{t.quote}</blockquote>
              <div className="mt-[22px] flex items-center gap-3">
                <div className="grid h-11 w-11 flex-none place-items-center rounded-full bg-gradient-to-br from-[#081A33] to-[#2F6BFF] text-sm font-semibold text-white">{t.av}</div>
                <div><b className="block text-[14.5px] font-semibold">{t.name}</b><span className="text-[13px] text-[#7F8CA0]">{t.role}</span></div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* PRICING */}
      <Section id="pricing" className="bg-gradient-to-b from-white to-[#F5F8FC]">
        <Center eyebrow="Pricing" title="Simple pricing that scales with your doors."
          sub="Every plan includes all three portals, unlimited users and no setup fees." />
        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-3">
          {PLANS.map((p) => (
            <Card key={p.name} className={`reveal relative rounded-[20px] p-[34px] transition-transform hover:-translate-y-1.5 ${p.popular ? "border-0 text-white shadow-[0_26px_60px_rgba(8,26,51,.3)]" : "border-[#E4EAF3] shadow-[0_12px_34px_rgba(15,30,51,.07)]"}`}
              style={p.popular ? { background: "linear-gradient(160deg,#0E2647,#081A33)" } : undefined}>
              {p.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-br from-[#2F6BFF] to-[#38C6D9] px-[15px] py-1.5 text-xs font-semibold text-white">Most popular</span>}
              <h3 className="mb-1.5 text-lg font-medium">{p.name}</h3>
              <p className={`mb-5 text-sm ${p.popular ? "text-white/70" : "text-[#7F8CA0]"}`}>{p.desc}</p>
              <div className="text-[46px] font-bold tracking-[-.03em]">{p.price}<small className={`text-[15px] font-normal ${p.popular ? "text-white/60" : "text-[#7F8CA0]"}`}>{p.unit}</small></div>
              <p className={`mb-5 mt-1.5 text-[13px] ${p.popular ? "text-white/60" : "text-[#7F8CA0]"}`}>{p.per}</p>
              <Button asChild variant={p.variant === "default" ? "default" : "outline"} className={`mb-6 w-full ${p.variant === "default" ? "bg-[#2F6BFF] hover:bg-[#4F83FF]" : ""}`}><a href="#">{p.cta}</a></Button>
              <ul className={`space-y-3 text-[14.5px] ${p.popular ? "text-white/85" : "text-[#4C5B70]"}`}>
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5"><Check className={`mt-0.5 h-[18px] w-[18px] flex-none ${p.popular ? "text-[color:var(--sky)]" : "text-[#2F6BFF]"}`} strokeWidth={2.4} />{f}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq">
        <Center eyebrow="Questions" title="Everything you might be wondering." />
        <div className="reveal mx-auto max-w-[820px]">
          <Accordion type="single" collapsible defaultValue="item-0">
            {FAQS.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-[#E4EAF3]">
                <AccordionTrigger className="py-[22px] text-left text-[17px] font-semibold hover:no-underline">{f.q}</AccordionTrigger>
                <AccordionContent className="text-[15.5px] text-[#4C5B70]">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* CTA */}
      <section className="bg-[#F5F8FC] py-24">
        <div className="mx-auto max-w-[1200px] px-8">
          <div className="reveal relative flex flex-wrap items-center justify-between gap-10 overflow-hidden rounded-[26px] p-11 text-white md:p-[70px]" style={ctaGradient}>
            <div className="absolute inset-0 opacity-[.14]" style={{ background: `url(${IMAGES.cta}) center/cover no-repeat` }} />
            <div className="relative">
              <h2 className="text-[clamp(28px,3.4vw,42px)] font-medium leading-tight">Everything you need to manage properties, in one place.</h2>
              <p className="mt-2.5 text-white/80">Simple. Secure. Built for you. Start free for 30 days, no card required.</p>
            </div>
            <Button size="lg" asChild className="relative bg-white text-[#081A33] hover:bg-[#EDF2FA]"><a href="#pricing">Start free trial <ArrowRight className="ml-2 h-4 w-4" /></a></Button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-[76px] pb-9 text-white/70" style={{ background: NAVY }}>
        <div className="mx-auto max-w-[1200px] px-8">
          <div className="grid grid-cols-2 gap-10 border-b border-white/10 pb-12 md:grid-cols-[1.6fr_repeat(4,1fr)]">
            <div>
              <a href="#" className="mb-4 flex items-center gap-2.5 text-lg font-semibold text-white">
                <span className="grid h-8 w-8 place-items-center rounded-[9px] bg-gradient-to-br from-[#2F6BFF] to-[#38C6D9]"><Waves className="h-4 w-4" /></span>VFO
              </a>
              <p className="max-w-[280px] text-sm leading-relaxed">One platform for properties, payments and people. Manage your whole portfolio from a single calm place.</p>
            </div>
            {[["Product", ["Features", "Portals", "Pricing", "Integrations", "Security"]],
              ["Solutions", ["Landlords", "Tenants", "Vendors", "Property managers"]],
              ["Company", ["About", "Careers", "Blog", "Contact"]],
              ["Resources", ["Help center", "Guides", "Status", "Changelog"]]].map(([h, links]) => (
              <div key={h}>
                <h4 className="mb-4 text-sm font-semibold text-white">{h}</h4>
                {links.map((l) => <a key={l} href="#" className="block py-1.5 text-sm text-white/70 hover:text-white">{l}</a>)}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3.5 pt-7 text-[13.5px] text-white/55">
            <span>© 2026 VFO, Inc. · Privacy · Terms</span>
            <div className="flex gap-3.5">
              {[Twitter, Linkedin, Instagram].map((Ic, i) => (
                <a key={i} href="#" className="grid h-[34px] w-[34px] place-items-center rounded-[9px] bg-white/10 text-white hover:bg-white/20"><Ic className="h-4 w-4" /></a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ------------------------------------------------------------------ helpers */

function Section({ id, className = "", children }) {
  return (
    <section id={id} className={`py-[76px] md:py-[108px] ${className}`}>
      <div className="mx-auto max-w-[1200px] px-8">{children}</div>
    </section>
  );
}

function Center({ eyebrow, title, sub, dark }) {
  return (
    <div className="reveal mx-auto mb-[60px] max-w-[700px] text-center">
      {eyebrow && <span className={`mb-3.5 block text-[13px] font-semibold uppercase tracking-[.06em] ${dark ? "text-[color:var(--sky)]" : "text-[#2F6BFF]"}`}>{eyebrow}</span>}
      <h2 className={`mb-4 text-[clamp(32px,3.8vw,48px)] font-medium leading-[1.08] tracking-[-.02em] ${dark ? "text-white" : ""}`}>{title}</h2>
      {sub && <p className={`text-lg ${dark ? "text-white/70" : "text-[#4C5B70]"}`}>{sub}</p>}
    </div>
  );
}

function DeepDive({ eyebrow, title, body, img, points, flip }) {
  const text = (
    <div className="reveal">
      <span className="mb-3.5 block text-[13px] font-semibold uppercase tracking-[.06em] text-[#2F6BFF]">{eyebrow}</span>
      <h2 className="mb-4 text-[clamp(28px,3.4vw,42px)] font-medium leading-tight tracking-[-.02em]">{title}</h2>
      <p className="mb-6 text-[16.5px] text-[#4C5B70]">{body}</p>
      <ul className="space-y-4">
        {points.map(([b, rest]) => (
          <li key={b} className="flex gap-3 text-[15.5px]"><Check className="mt-0.5 h-5 w-5 flex-none text-[#2F6BFF]" strokeWidth={2.4} /><span><b className="font-semibold">{b}</b> {rest}</span></li>
        ))}
      </ul>
    </div>
  );
  const shot = (
    <div className="reveal relative overflow-hidden rounded-[20px] shadow-2xl">
      <img src={img} alt="" className="aspect-[4/3] w-full object-cover" />
    </div>
  );
  return (
    <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-[1fr_1.05fr]">
      {flip ? <>{/* image left on desktop */}<div className="md:order-2">{text}</div><div className="md:order-1">{shot}</div></> : <>{text}{shot}</>}
    </div>
  );
}
