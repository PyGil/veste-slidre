import { LucideProps, Mail, Phone } from "lucide-react";
import { cn } from "@/shadcn-ui/lib/utils";
import SectionWrapper from "./section-wrapper";

interface ContactInfo {
  icon: React.ComponentType<LucideProps>;
  href: string;
  label: string;
  extra?: string;
}

const CONTACT_INFO: ContactInfo[] = [
  {
    icon: Mail,
    href: "mailto:post@vestre-slidre.kommune.no",
    label: "post@vestre-slidre.kommune.no",
  },
  {
    icon: Phone,
    href: "tel:+4761345000",
    label: "61 34 50 00",
    extra: "(kl. 09.00-15.00)",
  },
];

export default function ContactUs() {
  return (
    <SectionWrapper title="Kontakt oss">
      <ul className="text-sm" aria-label="Kontaktinformasjon">
        {CONTACT_INFO.map(({ icon: Icon, href, label, extra }) => (
          <li
            key={href}
            className={cn("text-sm mb-2 last:mb-0", {
              "flex items-center gap-2": extra,
            })}
          >
            <a className="hover:opacity-70 flex items-center gap-2" href={href}>
              <Icon width="1rem" height="1rem" />
              <span className="hover:underline">{label}</span>
            </a>
            {extra && <span>{extra}</span>}
          </li>
        ))}
      </ul>
    </SectionWrapper>
  );
}
