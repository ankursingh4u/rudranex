import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Cursor } from "@/components/global/Cursor";
import { ScrollProgress } from "@/components/global/ScrollProgress";
import { SectionStacking } from "@/components/global/SectionStacking";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rudranex — Building Digital Solutions for the Next Era",
  description:
    "We build powerful, scalable and innovative digital solutions that drive business growth and create meaningful impact — globally.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <div className="grain" aria-hidden />
        <SmoothScroll>
          <Cursor />
          <ScrollProgress />
          <SectionStacking />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
