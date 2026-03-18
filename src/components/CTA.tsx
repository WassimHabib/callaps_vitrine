"use client";

import Link from "next/link";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";

export default function CTA() {
  const { lang } = useLang();

  return (
    <section className="bg-blue-600 py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          {t.cta.title[lang]}
        </h2>
        <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
          {t.cta.subtitle[lang]}
        </p>

        <Link
          href="/demo"
          className="inline-block bg-white text-blue-600 font-semibold rounded-lg px-8 py-4 hover:bg-blue-50 transition"
        >
          {t.cta.ctaPrimary[lang]}
        </Link>

        <p className="text-blue-200 text-sm mt-8">
          {t.cta.trust[lang]}
        </p>
      </div>
    </section>
  );
}
