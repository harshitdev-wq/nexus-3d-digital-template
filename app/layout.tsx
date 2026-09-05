import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "NEXUS — Digital Systems",
    template: "%s | NEXUS",
  },

  description:
    "NEXUS designs and engineers immersive digital experiences combining technology, motion and visual systems.",

  keywords: [
    "NEXUS",
    "digital experiences",
    "web design",
    "web development",
    "3D websites",
    "Three.js",
    "WebGL",
    "creative technology",
    "digital systems",
  ],

  authors: [
    {
      name: "NEXUS Digital Systems",
    },
  ],

  creator: "NEXUS Digital Systems",

  metadataBase: new URL("https://nexus.studio"),

  openGraph: {
    title: "NEXUS — Digital Systems",
    description:
      "Technology, motion and visual design combined into immersive digital experiences.",
    type: "website",
    siteName: "NEXUS",
  },

  twitter: {
    card: "summary_large_image",
    title: "NEXUS — Digital Systems",
    description:
      "Immersive digital experiences built with technology, motion and visual systems.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}