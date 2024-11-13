import { PropsWithChildren } from "react";

export default function IconWrapper({ children }: PropsWithChildren) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="fill-foreground w-8 h-8"
    >
      {children}
    </svg>
  );
}
