import { PropsWithChildren } from "react";

export default function IconWrapper({ children }: PropsWithChildren) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="fill-foreground w-6 h-6"
    >
      {children}
    </svg>
  );
}
