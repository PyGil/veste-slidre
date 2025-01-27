import { ClassName } from "@/lib/types/class-name";
import { PropsWithChildren } from "react";

interface OwnProps {
  title: string;
}

export default function SectionWrapper({
  title,
  children,
  className,
}: PropsWithChildren<OwnProps> & ClassName) {
  return (
    <div className={className}>
      <p className="text-md mb-2 uppercase">{title}</p>
      {children}
    </div>
  );
}
