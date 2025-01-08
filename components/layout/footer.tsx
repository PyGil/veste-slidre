import Image from "next/image";
import { Facebook, Instagram } from "@/components/icons";
import { Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-10 bg-primary/20">
    <div className="container mx-auto px-2 flex justify-between gap-4 flex-wrap">
      <Image
        src="/images/header-logo.svg"
        width={300}
        height={60}
        className="w-[235px] h-[44px] object-contain"
        alt="Logo"
      />
      <div className="flex gap-16">
        <div>
          <p className="text-md mb-2 uppercase">Følg oss</p>
          <ul className="flex gap-4 items-center justify-center">
            <li>
              <a
                className="hover:opacity-70"
                href="https://www.facebook.com/Vestre-Slidre-kommune-1479908342278203"
                target="_blank"
              >
                <Facebook />
              </a>
            </li>
            <li>
              <a
                className="hover:opacity-70"
                href="https://www.instagram.com/explore/tags/vestreslidre"
                target="_blank"
              >
                <Instagram />
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-md mb-2 uppercase">Kontakt oss</p>
          <ul className="text-sm">
            <li className="mb-2">
              <a
                className="hover:opacity-70 flex items-center gap-2"
                href="mailto:post@vestre-slidre.kommune.no"
              >
                <Mail width="1rem" height="1rem" />
                <span className="hover:underline">
                  post@vestre-slidre.kommune.no
                </span>
              </a>
            </li>
            <li className="flex items-center gap-2">
              <a
                className="hover:opacity-70 flex items-center gap-2"
                href="tel:+4761345000"
                target="_blank"
              >
                <Phone width="1rem" height="1rem" />
                <span className="hover:underline">61 34 50 00</span>
              </a>
              <span>(kl. 09.00-15.00)</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <p className="container mx-auto border-t-2 border-t-foreground/20 text-sm mt-8 pt-8">
      {new Date().getFullYear()} © Vestre Slidre
    </p>
  </footer>
  );
}
