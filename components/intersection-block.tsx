"use client";

import { PropsWithChildren, useRef } from "react";

import { ClassName } from "@/lib/types/class-name";
import useIntersectionObserver from "@/lib/hooks/use-intersection-observer";
import { cn } from "@/shadcn-ui/lib/utils";

const DEFAULT_BASE_CLASS_NAME = "opacity-0 transform translate-y-4";

interface OwnProps {
  baseClassName?: string;
}

export default function IntersectionBlock({
  children,
  className,
  baseClassName = DEFAULT_BASE_CLASS_NAME,
}: PropsWithChildren<OwnProps & ClassName>) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isIntersecting = useIntersectionObserver(containerRef);

  return (
    <div
      ref={containerRef}
      className={cn(
        className,
        "transition-all duration-700",
        !isIntersecting && baseClassName
      )}
    >
      {children}
    </div>
  );
}
