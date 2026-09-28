import { Route, Routes } from "react-router-dom";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollManager } from "@/components/layout/ScrollManager";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { AssistantProvider } from "@/components/assistant/AssistantProvider";
import { AssistantWidget } from "@/components/assistant/AssistantWidget";
import { HomePage } from "@/pages/HomePage";
import { SolutionPage } from "@/pages/SolutionPage";
import { SignInPage } from "@/pages/SignInPage";
import { GetStartedPage } from "@/pages/GetStartedPage";
import { WaitlistPage } from "@/pages/WaitlistPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { solutions } from "@/data/solutions";

/**
 * The site: one header and footer around a small set of routes.
 *
 * The landing page is composed from sections; each audience in
 * `data/solutions.js` gets its own page; the account pages are client-side
 * only. Content lives in `src/data`; motion lives in `src/hooks`.
 */
export default function App() {
  return (
    <AssistantProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-navy"
      >
        Skip to content
      </a>

      <ScrollManager />
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        {solutions.map((solution) => (
          <Route
            key={solution.slug}
            path={`/${solution.slug}`}
            element={<SolutionPage solution={solution} />}
          />
        ))}
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/get-started" element={<GetStartedPage />} />
        <Route path="/waitlist" element={<WaitlistPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer />
      <CookieConsent />
      <AssistantWidget />
    </AssistantProvider>
  );
}
