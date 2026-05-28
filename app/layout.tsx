import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Rudranex — Enterprise Software Development Company",
    template: "%s | Rudranex",
  },
  description:
    "Rudranex designs and builds enterprise-grade software, digital products, cloud systems, and scalable platforms for ambitious businesses.",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-ink text-foam font-body">
        {children}
      </body>
    </html>
  );
}
