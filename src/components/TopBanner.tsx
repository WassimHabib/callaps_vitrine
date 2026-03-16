"use client";

import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/lib/LanguageContext";

const text = {
  message: {
    fr: "\u{1F680} Offre de lancement : audit t\u00e9l\u00e9phonique gratuit \u2014 Places limit\u00e9es",
    en: "\u{1F680} Launch offer: free phone audit \u2014 Limited spots",
  },
  cta: {
    fr: "En profiter",
    en: "Claim now",
  },
};

export default function TopBanner() {
  const { lang } = useLang();
  const [visible, setVisible] = useState(true);

  return (
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out ${
        visible ? "max-h-20" : "max-h-0"
      }`}
    >
      <div className="relative z-50 w-full bg-gradient-to-r from-primary to-accent py-2 px-4 text-sm text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-3">
          <span className="text-center">{text.message[lang]}</span>

          <Link
            href="/demo"
            className="inline-flex shrink-0 items-center rounded-full bg-white/20 px-3 py-0.5 text-xs font-medium text-white transition-colors hover:bg-white/30"
          >
            {text.cta[lang]}
          </Link>

          <button
            type="button"
            onClick={() => setVisible(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 transition-colors hover:text-white"
            aria-label="Close banner"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
