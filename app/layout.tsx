import type { Metadata } from "next";
import { Geist, Geist_Mono, Aref_Ruqaa_Ink, Reem_Kufi } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
      className={`${geistSans.variable} ${geistMono.variable} ${arefRuqaa.variable} ${reemKufi.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
