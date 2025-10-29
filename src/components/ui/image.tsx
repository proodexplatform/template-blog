"use client"; // required if used inside client components

import * as React from "react";
import NextImage, { ImageProps as NextImageProps } from "next/image";
import { cn } from "@/lib/utils";

export interface ImageProps extends Omit<NextImageProps, "ref"> {
  "data-marker"?: string;
}

/**
 * A wrapper around Next.js's Image component that adds:
 * - Rounded corners and object-cover styling
 * - Optional `data-marker` tracking for your system
 * - Consistent className merging
 */
export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, "data-marker": marker, ...props }, ref) => {
    return (
      <NextImage
        ref={ref as any}
        className={cn("rounded-md object-cover", className)}
        data-marker={marker}
        {...props}
      />
    );
  }
);

Image.displayName = "Image";