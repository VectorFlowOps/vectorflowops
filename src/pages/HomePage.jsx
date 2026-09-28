import {
  CallToAction,
  DeepDives,
  Faq,
  Features,
  Hero,
  HowItWorks,
  Portals,
  Pricing,
  Stats,
  Testimonials,
} from "@/components/sections";
import { usePageTitle } from "@/hooks/usePageTitle";

/** The landing page, composed from self-contained sections. */
export function HomePage() {
  usePageTitle();

  return (
    <main id="main">
      <Hero />
      <Features />
      <HowItWorks />
      <Portals />
      <DeepDives />
      <Stats />
      <Testimonials />
      <Pricing />
      <Faq />
      <CallToAction />
    </main>
  );
}
