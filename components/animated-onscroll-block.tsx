"use client";

import { PropsWithChildren, useRef } from "react";

import clsx from "clsx";

import { ClassName } from "@/lib/types/class-name";
import useIntersectionObserver from "@/lib/hooks/use-intersection-observer";

export default function AnimatedOnScrollBlock({
  children,
  className,
}: PropsWithChildren<ClassName>) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isIntersecting = useIntersectionObserver(containerRef);

  console.log("isIntersecting", isIntersecting);

  return (
    <div
      ref={containerRef}
      className={clsx(className, "transition-all duration-700", { "opacity-0 transform translate-y-4": !isIntersecting })}
    >
      {children}
    </div>
  );
}
