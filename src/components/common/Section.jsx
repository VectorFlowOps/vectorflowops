import { cn } from "@/lib/utils";

/**
 * Standard page section: consistent vertical rhythm and the shared max-width
 * gutter. `wide` swaps in the full-bleed shell the header and hero use.
 * `container={false}` gives a section full-bleed control of its own inner
 * layout (used by the dark sections that paint their own background).
 */
export function Section({
  id,
  className,
  containerClassName,
  container = true,
  wide = false,
  children,
  ...props
}) {
  return (
    <section id={id} className={cn("py-section md:py-section-lg", className)} {...props}>
      {container ? (
        <div className={cn(wide ? "shell-wide" : "shell", containerClassName)}>{children}</div>
      ) : (
        children
      )}
    </section>
  );
}
