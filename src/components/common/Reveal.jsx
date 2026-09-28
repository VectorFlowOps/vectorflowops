import { cn } from "@/lib/utils";
import { useReveal } from "@/hooks/useReveal";

/**
 * Fades and lifts its children into place the first time they scroll into view.
 *
 * @param {object} props
 * @param {React.ElementType} [props.as]   Element to render (default: div).
 * @param {number} [props.delay]           Stagger, in milliseconds.
 */
export function Reveal({ as: Tag = "div", delay = 0, className, style, children, ...props }) {
  const ref = useReveal();

  return (
    <Tag
      ref={ref}
      className={cn("reveal", className)}
      style={delay ? { ...style, transitionDelay: `${delay}ms` } : style}
      {...props}
    >
      {children}
    </Tag>
  );
}
