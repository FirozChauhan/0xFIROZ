import type { Metadata, Viewport } from "next";
import {
  Geist,
  Space_Grotesk,
  JetBrains_Mono,
  Aref_Ruqaa_Ink,
  Reem_Kufi,
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const arefRuqaa = Aref_Ruqaa_Ink({
  variable: "--font-aref",
  weight: "700",
  subsets: ["arabic"],
});

const reemKufi = Reem_Kufi({
  variable: "--font-reem",
  subsets: ["arabic"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  title: "Firoz Khan Chauhan — Full Stack Developer",
  description:
    "Portfolio of Firoz Khan Chauhan — full-stack developer building scalable web apps with the MERN stack and Docker.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${arefRuqaa.variable} ${reemKufi.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
