import { PropsWithChildren } from "react";

export default function MapWrapper({ children }: PropsWithChildren) {
  return <div className="w-full h-96">{children}</div>;
}
