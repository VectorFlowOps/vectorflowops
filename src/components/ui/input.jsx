import * as React from "react";

import { cn } from "@/lib/utils";

const fieldClasses =
  "flex h-11 w-full rounded-md border border-line bg-white px-3.5 text-[15px] text-ink shadow-sm transition-colors placeholder:text-muted focus-visible:border-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50";

const Input = React.forwardRef(function Input({ className, type = "text", ...props }, ref) {
  return <input ref={ref} type={type} className={cn(fieldClasses, className)} {...props} />;
});

/** Native select styled to match `Input`. */
const Select = React.forwardRef(function Select({ className, children, ...props }, ref) {
  return (
    <select ref={ref} className={cn(fieldClasses, "appearance-none pr-9", className)} {...props}>
      {children}
    </select>
  );
});

const Label = React.forwardRef(function Label({ className, ...props }, ref) {
  return (
    <label
      ref={ref}
      className={cn("mb-1.5 block text-[13.5px] font-medium text-ink", className)}
      {...props}
    />
  );
});

export { Input, Select, Label };
