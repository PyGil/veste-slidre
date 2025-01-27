import { Facebook, Instagram } from "@/components/icons";
import SectionWrapper from "./section-wrapper";

type SocialLink = {
  icon: React.ComponentType;
  href: string;
  label: string;
};

const SOCIAL_LINKS: SocialLink[] = [
  {
    icon: Facebook,
    href: "https://www.facebook.com/Vestre-Slidre-kommune-1479908342278203",
    label: "Besøk oss på Facebook",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/explore/tags/vestreslidre",
    label: "Følg oss på Instagram",
  },
];

export default function SocialLinks() {
  return (
    <SectionWrapper title="Følg oss">
      <ul
        className="flex gap-4 items-center justify-center"
        aria-label="Sosiale medier"
      >
        {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
          <li key={href}>
            <a
              className="hover:opacity-70"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
            >
              <Icon />
            </a>
          </li>
        ))}
      </ul>
    </SectionWrapper>
  );
}
