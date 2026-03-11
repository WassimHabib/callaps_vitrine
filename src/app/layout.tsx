import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Callaps — Agents IA personnalisés pour votre entreprise | par Wevlap",
  description:
    "Callaps crée des agents IA conversationnels sur mesure pour automatiser vos appels, votre service client et votre prospection. Solution développée par Wevlap.",
  keywords: [
    "agent IA",
    "callbot",
    "IA conversationnelle",
    "automatisation appels",
    "service client IA",
    "Wevlap",
  ],
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="antialiased">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
