"use client"; // required since this uses refs and React.cloneElement

import * as React from "react";
import NextLink from "next/link";
import { cn } from "@/lib/utils";

export interface LinkWrapperProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  "data-marker"?: string;
}

/**
 * A Next.js-compatible Link wrapper that:
 * - Uses next/link for internal routes
 * - Falls back to <a> for external links
 * - Merges data-marker attributes between wrapper and child
 * - Supports forwarding refs and class merging
 */
export const LinkWrapper = React.forwardRef<HTMLAnchorElement, LinkWrapperProps>(
  ({ href, children, className, "data-marker": wrapperMarker, ...props }, ref) => {
    const isInternalLink = href && href.startsWith("/");

    const mergeMarker = (childMarker?: string) => {
      const set = new Set<string>();
      if (wrapperMarker)
        wrapperMarker.split(";").map(s => s.trim()).filter(Boolean).forEach(s => set.add(s));
      if (childMarker)
        childMarker.split(";").map(s => s.trim()).filter(Boolean).forEach(s => set.add(s));
      return Array.from(set).join(";");
    };

    // If child is a valid React element (e.g. <Button />, <Icon />)
    if (React.isValidElement(children)) {
      const childMarker = (children.props as any)?.["data-marker"];
      const mergedMarker = mergeMarker(childMarker) || undefined;

      const cloned = React.cloneElement(children, {
        ...children.props,
        ...props,
        ref,
        "data-marker": mergedMarker,
      });

      if (isInternalLink) {
        return (
          <NextLink href={href} className={cn("contents", className)} {...props}>
            {cloned}
          </NextLink>
        );
      } else {
        return (
          <a href={href} className={cn("contents", className)} ref={ref} {...props}>
            {cloned}
          </a>
        );
      }
    }

    // Handle text or fragments
    const wrapperAttr: any = { className: cn("contents", className), ...props };
    if (wrapperMarker) wrapperAttr["data-marker"] = wrapperMarker;

    return isInternalLink ? (
      <NextLink href={href} {...wrapperAttr}>
        {children}
      </NextLink>
    ) : (
      <a href={href} ref={ref} {...wrapperAttr}>
        {children}
      </a>
    );
  }
);

LinkWrapper.displayName = "LinkWrapper";