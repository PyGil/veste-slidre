import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/shadcn-ui/components/ui/navigation-menu";
import Link from "next/link";
import Image from "next/image";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { Facebook, Instagram } from "@/components/icons";
import { Mail, Phone } from "lucide-react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="container mx-auto rounded-lg bg-blue-950/80 backdrop-blur py-4 px-2 fixed left-1/2 transform -translate-x-1/2 top-4 z-50">
            <NavigationMenu className="grid grid-cols-1 max-w-full">
              <NavigationMenuList className="justify-between w-full">
                <NavigationMenuItem>
                  <Link href="https://www.vestre-slidre.kommune.no/">
                    <Image
                      src="/images/header-logo.svg"
                      width={300}
                      height={60}
                      className="w-[235px] h-[44px] object-contain"
                      alt="Logo"
                    />
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <ModeToggle />
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </header>
          <main
            style={{
              backgroundImage:
                "radial-gradient(circle at 70% 50%, rgb(28 138 255 / 30%), transparent 50%), radial-gradient(circle at 100% 60%, rgb(152 73 248 / 40%), transparent 35%)",
            }}
          >
            {children}
          </main>
        </ThemeProvider>
        <footer className="bg-background pt-12 pb-4">
          <div className="container mx-auto px-2 flex justify-end gap-20">
            <div>
              <p className="text-xl mb-2 uppercase">Følg oss</p>
              <ul className="flex gap-4 items-center">
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
              <p className="text-xl mb-2 uppercase">Kontakt oss</p>
              <ul>
                <li className="mb-2 text-lg">
                  <a
                    className="hover:opacity-70 flex items-center gap-2"
                    href="mailto:post@vestre-slidre.kommune.no"
                  >
                    <Mail />
                    <span className="hover:underline">
                      post@vestre-slidre.kommune.no
                    </span>
                  </a>
                </li>
                <li className="flex items-center gap-2 text-lg">
                  <a
                    className="hover:opacity-70 flex items-center gap-2"
                    href="tel:+4761345000"
                    target="_blank"
                  >
                    <Phone />
                    <span className="hover:underline">61 34 50 00</span>
                  </a>
                  <span>(kl. 09.00-15.00)</span>
                </li>
              </ul>
            </div>
          </div>
          <p className="text-center text-lg mt-2">{new Date().getFullYear()} © Vestre Slidre</p>
        </footer>
      </body>
    </html>
  );
}
