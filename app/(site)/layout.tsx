import "../globals.css";
import { ReactNode } from "react";
import { Inter, Oswald } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { MobileDrawer } from "@/components/layout/MobileDrawer";
import { Footer } from "@/components/layout/Footer";
import { siteMetadata } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });

export const metadata = {
  title: {
    default: "PRIMAL TREND",
    template: "PRIMAL TREND — %s"
  },
  description: siteMetadata.description,
  openGraph: {
    title: "PRIMAL TREND",
    description: siteMetadata.description,
    url: siteMetadata.url,
    siteName: "PRIMAL TREND",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable}`}>
      <body className="bg-[#050608] text-white">
        <Header />
        <MobileDrawer />
        <main className="pt-[64px] md:pt-[72px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
