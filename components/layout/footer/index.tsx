import Image from "next/image";
import SocialLinks from "./social-links";
import ContactUs from "./contact-us";

const LOGO_SIZES = {
  width: 300,
  height: 60,
};

export default function Footer() {
  return (
    <footer className="py-10 bg-primary/20">
      <div className="container mx-auto px-2 flex justify-between gap-4 flex-wrap">
        <Image
          {...LOGO_SIZES}
          src="/images/header-logo.svg"
          alt="Vestre Slidre Kommune Logo"
        />
        <div className="flex gap-16">
          <SocialLinks />
          <ContactUs />
        </div>
      </div>
      <p className="container mx-auto border-t-2 border-t-foreground/20 text-sm mt-8 pt-8">
        {new Date().getFullYear()} © Vestre Slidre
      </p>
    </footer>
  );
}
