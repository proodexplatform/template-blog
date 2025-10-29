"use client"; // required if used in interactive client components

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.ComponentProps<"input"> {
  "data-marker"?: string;
}

/**
 * Styled input component that supports data-marker tracking.
 * Matches the structure and behavior of the Vite version.
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, "data-marker": marker, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        data-marker={marker}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };