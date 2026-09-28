import { Button } from "@/components/ui/button";
import { SmartLink } from "@/components/common/SmartLink";
import { usePageTitle } from "@/hooks/usePageTitle";
import { notFound } from "@/data/pages";

export function NotFoundPage() {
  usePageTitle("Page not found");

  return (
    <main
      id="main"
      className="relative flex min-h-svh flex-col overflow-hidden bg-navy pt-[74px] text-white"
    >
      <div className="bg-hero-mesh pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="shell relative flex flex-1 flex-col items-center justify-center py-20 text-center">
        <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-brand-sky">
          {notFound.code}
        </p>
        <h1 className="mt-4 text-display font-light">{notFound.title}</h1>
        <p className="mt-5 max-w-[460px] text-lg font-light text-white/70">{notFound.body}</p>
        <Button size="lg" variant="brand" asChild className="mt-9">
          <SmartLink href={notFound.cta.href}>{notFound.cta.label}</SmartLink>
        </Button>
      </div>
    </main>
  );
}
