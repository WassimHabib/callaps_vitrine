import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Démo — Testez notre agent IA en direct",
  description:
    "Découvrez comment notre agent IA conversationnel gère un appel et réservez un créneau de démonstration gratuit en 30 secondes.",
  openGraph: {
    title: "Démo Callaps — Testez notre agent IA en direct",
    description:
      "Découvrez comment notre agent IA conversationnel gère un appel et réservez un créneau de démonstration gratuit.",
    url: "https://callaps.fr/demo",
  },
};

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
