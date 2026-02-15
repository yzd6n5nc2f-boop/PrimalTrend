import "../globals.css";
import { ReactNode } from "react";
import { Bebas_Neue, Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { MobileDrawer } from "@/components/layout/MobileDrawer";
import { Footer } from "@/components/layout/Footer";
import { siteMetadata } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas-neue"
});

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
    <html lang="en" className={`${inter.variable} ${bebasNeue.variable}`}>
      <body className="bg-primal-bg text-white antialiased">
        <Header />
        <MobileDrawer />
        <main className="pt-[64px] md:pt-[72px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
