import { forwardRef } from "react";
import { Link } from "react-router-dom";

/**
 * Renders a router `<Link>` for internal paths (`/…`) and a plain anchor for
 * everything else (`#section`, `https://…`, `mailto:`).
 *
 * Content files store plain `href` strings, so this is what lets a call to
 * action point at another page without the component knowing or caring.
 * Forwards its ref so it can sit inside `<Button asChild>`.
 */
export const SmartLink = forwardRef(function SmartLink({ href = "#", children, ...props }, ref) {
  const internal = href.startsWith("/") && !href.startsWith("//");

  if (internal) {
    return (
      <Link ref={ref} to={href} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a ref={ref} href={href} {...props}>
      {children}
    </a>
  );
});
