"use client";

import { PropsWithChildren, useRef } from "react";

import clsx from "clsx";

import { ClassName } from "@/lib/types/class-name";
import useIntersectionObserver from "@/lib/hooks/use-intersection-observer";

export default function AnimatedOnScrollBlock({
  children,
  className,
}: PropsWithChildren<ClassName>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(containerRef);

  console.log("isIntersecting", isIntersecting);

  return (
    <div className={clsx(className, { animate__fadeIn: isIntersecting })}>
      {children}
    </div>
  );
}
