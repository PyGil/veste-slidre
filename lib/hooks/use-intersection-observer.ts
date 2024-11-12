import { useState, useEffect, RefObject } from "react";

const DEFAULT_OPTIONS = {
  root: null,
  rootMargin: "0px",
  threshold: 0.5,
};

export default function useIntersectionObserver(
  element: RefObject<HTMLDivElement>,
  options: IntersectionObserverInit = DEFAULT_OPTIONS
) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const currentElement = element.current;

    if (!currentElement) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIntersecting(true);
        observer.unobserve(entry.target);
      }
    }, options);

    observer.observe(currentElement);

    return () => {
      observer.unobserve(currentElement);
    };
  }, [element, options]);

  return isIntersecting;
}
