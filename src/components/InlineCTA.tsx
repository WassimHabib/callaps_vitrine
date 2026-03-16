"use client";

import Link from "next/link";
import { useLang } from "@/lib/LanguageContext";

export default function InlineCTA() {
  const { lang } = useLang();

  return (
    <section className="py-12 px-4 text-center">
      <div className="mx-auto max-w-xs h-px bg-gradient-to-r from-primary to-accent mb-8" />

      <h3 className="text-xl md:text-2xl font-semibold text-white mb-6">
        {lang === "fr"
          ? "Prêt à automatiser vos appels ?"
          : "Ready to automate your calls?"}
      </h3>

      <Link
        href="/demo"
        className="inline-block rounded-full bg-gradient-to-r from-primary to-accent px-8 py-3 text-white font-medium hover:scale-105 transition"
      >
        {lang === "fr" ? "Réserver un créneau" : "Book a slot"}
      </Link>

      <div className="mx-auto max-w-xs h-px bg-gradient-to-r from-primary to-accent mt-8" />
    </section>
  );
}
