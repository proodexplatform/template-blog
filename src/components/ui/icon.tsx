"use client"; // Important if this component is used in a Client Component context

import * as React from "react";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name?: keyof typeof LucideIcons;
  as?: React.FC | React.ReactElement;
  "data-marker"?: string;
}

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ name, as: Custom, className, "data-marker": wrapperMarker, ...props }, ref) => {
    // Merges "data-marker" values from wrapper + child
    const mergeMarker = (childMarker?: string) => {
      const set = new Set<string>();
      if (wrapperMarker)
        wrapperMarker.split(";").map(s => s.trim()).filter(Boolean).forEach(s => set.add(s));
      if (childMarker)
        childMarker.split(";").map(s => s.trim()).filter(Boolean).forEach(s => set.add(s));
      return Array.from(set).join(";");
    };

    // Handle custom component or element
    if (Custom) {
      const el = typeof Custom === "function"
        ? (Custom as any)()
        : (Custom as React.ReactElement);

      const childMarker = (el.props as any)?.["data-marker"];
      const merged = mergeMarker(childMarker) || undefined;

      return React.cloneElement(el, {
        ...el.props,
        ...props,
        ref,
        className: cn("w-5 h-5", el.props?.className, className),
        "data-marker": merged,
      });
    }

    // Handle Lucide icon by name
    if (name) {
      const LucideIcon = (LucideIcons as any)[name] as React.FC<any> | undefined;

      if (!LucideIcon) {
        console.warn(`Icon '${name}' not found`);
        return null;
      }

      return (
        <LucideIcon
          ref={ref}
          className={cn("w-5 h-5", className)}
          data-marker={wrapperMarker}
          {...props}
        />
      );
    }

    console.warn("Icon requires either 'name' or 'as' prop");
    return null;
  }
);

Icon.displayName = "Icon";