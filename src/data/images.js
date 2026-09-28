/**
 * Every image the site uses, keyed by role rather than by file name.
 *
 * Files are served from `public/images/` and are downloaded by
 * `npm run images:fetch` (see scripts/fetch-images.mjs, which is the single
 * source of truth for where each one came from). Swapping in brand photography
 * later means replacing the file — no component changes.
 */

const asset = (name) => `/images/${name}.jpg`;

export const images = {
  heroTower: {
    src: asset("hero-tower"),
    alt: "Modern apartment building against a clear evening sky",
  },
  heroInterior: {
    src: asset("hero-interior"),
    alt: "Bright, plant-filled apartment living room",
  },
  heroHome: {
    src: asset("hero-home"),
    alt: "Contemporary rental home lit up at dusk",
  },
  portalLandlord: {
    src: asset("portal-landlord"),
    alt: "Modern waterfront rental property with a pool",
  },
  portalTenant: {
    src: asset("portal-tenant"),
    alt: "Comfortable, furnished tenant living space",
  },
  payments: {
    src: asset("payments"),
    alt: "Paying by card on a laptop",
  },
  maintenance: {
    src: asset("maintenance"),
    alt: "Electrician completing a repair work order",
  },
  statsStrip: {
    src: asset("stats-strip"),
    alt: "Aerial view of a residential neighbourhood",
  },
  cta: {
    src: asset("cta"),
    alt: "Architectural facade in soft daylight",
  },
};
