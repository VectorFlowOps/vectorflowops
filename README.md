# PropFlow

Marketing site for PropFlow, a property-management platform — built with Vite,
React, Tailwind CSS and shadcn/ui.

<!-- Replace with a real screenshot once the brand assets land. -->

## Quick start

```bash
npm install
npm run images:fetch   # downloads photography into public/images
npm run dev            # http://localhost:5173
```

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the Vite dev server with hot reload. |
| `npm run build` | Production build into `dist/`. |
| `npm run preview` | Serve the production build locally. |
| `npm run lint` | ESLint over the whole project. |
| `npm run format` | Prettier write over `src/`. |
| `npm run images:fetch` | Download marketing imagery (`-- --force` to re-download). |

## Project structure

```
src/
├── App.jsx                  Routes — one header and footer around the pages
├── main.jsx                 React entry point (BrowserRouter)
├── index.css                Design tokens, gradients, reveal + marquee motion
├── pages/                   HomePage, SolutionPage (property managers, landlords,
│                            tenants), WaitlistPage, SignInPage,
│                            GetStartedPage, NotFoundPage
├── components/
│   ├── ui/                  shadcn/ui primitives (button, card, badge, accordion, input)
│   ├── common/              Reveal, Section, SectionHeading, Logo (mark + wordmark), SmartLink,
│   │                        DeviceShowcase, AppScreens
│   ├── assistant/           AssistantProvider, AssistantWidget, AssistantTrigger
│   ├── layout/              Navbar, NavMenus, ScrollManager, Footer, CookieConsent
│   └── sections/            One file per landing-page section
├── data/
│   ├── site.js              Identity, header nav, account links, footer links
│   ├── content.js           Landing-page copy
│   ├── solutions.js         The three audiences: features, groups, integrations
│   ├── pages.js             Sign-in, get-started and 404 copy
│   └── images.js            Image paths + alt text, keyed by role
├── hooks/                   One hook per behaviour (see Motion below)
└── lib/
    ├── reveal.js            Shared IntersectionObserver
    └── utils.js             `cn()` class merging
```

Three rules keep this tidy:

1. **Components own layout, never copy.** Every string lives in `src/data`.
2. **Colours come from tokens, never hex.** `bg-brand`, `text-ink`, `bg-navy` and
   friends are defined once in `tailwind.config.js`.
3. **One concern per hook.** No page-wide `useEffect` reaching into the DOM.

## Design tokens

Defined in `tailwind.config.js` and consumed as ordinary Tailwind utilities:

| Token | Value | Used for |
| --- | --- | --- |
| `navy` | `#081A33` | Dark sections, footer, hero |
| `brand` | `#2F6BFF` | Primary actions and accents |
| `brand-sky` | `#8FB3FF` | Accents on dark backgrounds |
| `aqua` | `#38C6D9` | Gradient partner to `brand` |
| `ink` / `body` / `muted` | `#0F1E33` / `#4C5B70` / `#7F8CA0` | Text hierarchy |
| `line` / `mist` | `#E4EAF3` / `#F5F8FC` | Borders and tinted panels |

Fluid type scales (`text-display`, `text-h2`, `text-h3`) are also tokens.

> **Note:** `src/lib/utils.js` extends `tailwind-merge` so it recognises these
> custom font sizes. Without that, `cn()` mistakes `text-h2` for a colour class
> and silently drops it when a colour is applied to the same element.

## Routing and pages

| Path | Page |
| --- | --- |
| `/` | Landing page, composed from sections |
| `/property-managers`, `/landlords`, `/tenants` | One page per audience, rendered from `data/solutions.js` |
| `/waitlist`, `/sign-in`, `/get-started` | Waitlist and account pages (client-side only, no backend yet) |
| anything else | Not found |

The header has two dropdowns, both defined in `data/site.js`: **Platform**
(the five capability pillars with their proof points, the portals and a promo
card, deep-linking into the landing page's "One software. All the features."
section) and **Solutions** (one column per audience with highlights). Adding a
feature to `data/solutions.js` puts it on that audience's page. `SmartLink` renders a router link for `/…` hrefs and a plain anchor
for `#…`, so content files can point anywhere with a string.
`ScrollManager` scrolls to the hash after navigation and to the top otherwise.

Client-side routes need the host to serve `index.html` for unknown paths;
`vercel.json` handles this on Vercel (leaving `/api/*` alone), `vite preview`
does it locally, and `public/_redirects` covers Netlify-style hosts.

## Waitlist emails (Resend)

The waitlist form posts to `api/waitlist.js`, a Vercel serverless function
that emails each sign-up to you through [Resend](https://resend.com). The API
key never reaches the browser. Copy `.env.example` to `.env` for local work,
and set the same variables in Vercel → Settings → Environment Variables:

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | From resend.com/api-keys |
| `WAITLIST_TO_EMAIL` | Your inbox |
| `WAITLIST_FROM_EMAIL` | Optional; needs a verified domain. Unset, Resend's test sender delivers to your account email only |

Each email has the submitter as `reply-to`, so replying goes straight to them.
`npm run dev` serves the function too (see `vercelApiDev` in `vite.config.js`).

## Motion

Cheap, continuous motion is CSS; timeline-driven motion is anime.js, and the hero's card loop uses GSAP because its seamless-loop helper and inertia-snapping Draggable have no anime.js equivalent.

| Effect | Driven by |
| --- | --- |
| Scroll reveals | CSS transition + one shared observer (`lib/reveal.js`) |
| Logo marquee | CSS keyframes |
| Hero entrance | anime.js timeline (`useHeroIntro`) |
| Hero property cards (seamless loop, drag with momentum, snap to centre) | GSAP `horizontalLoop` helper + Draggable/Inertia (`useCardLoop`) |
| Device showcase (Mac → iPad → iPhone crossfade) | anime.js (`useDeviceCarousel`) |
| Drift across deck imagery | CSS keyframes (`.deck-media`) |
| Stat counters | anime.js (`useCountUp`) |

Everything respects `prefers-reduced-motion`: CSS effects via a media query, and
JS effects via the `usePrefersReducedMotion` hook, which the others check first.

## Images

Photography is downloaded to `public/images/` by `npm run images:fetch`. The
manifest in `scripts/fetch-images.mjs` is the single source of truth for each
file's source and alt text, and it regenerates `public/images/CREDITS.md`.

These are Unsplash placeholders — replace them with licensed brand photography
before launch. Because components reference images through `src/data/images.js`,
swapping them is a data change, not a component change.

## Content is placeholder

Copy, pricing, statistics, testimonials and the customer names in the trust
strip are all illustrative. Review them before this goes anywhere public.
