"use client";

import Link from "next/link";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";

export default function Hero() {
  const { lang } = useLang();

  return (
    <section className="bg-[#fafafa] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column - Text */}
          <div>
            {/* Badge */}
            <span className="inline-block bg-blue-50 text-blue-600 rounded-full px-3 py-1 text-sm font-medium mb-6">
              Agent vocal IA
            </span>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              {t.hero.title1[lang]}
              <span className="gradient-text">{t.hero.titleHighlight[lang]}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-gray-500 mb-8 max-w-lg">
              {t.hero.subtitle[lang]}
            </p>

            {/* CTA Button */}
            <div className="mb-4">
              <Link
                href="/demo"
                className="inline-block bg-[#2563eb] text-white font-semibold rounded-lg px-8 py-4 shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-blue-500/40 hover:scale-105"
              >
                D&eacute;marrer gratuitement
              </Link>
            </div>

            {/* Trust line */}
            <p className="text-sm text-gray-400">
              Gratuit &middot; Sans engagement &middot; R&eacute;sultat en 24h
            </p>
          </div>

          {/* Right column - Mockup */}
          <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 aspect-square flex items-center justify-center">
            {/* Stylized phone/chat mockup */}
            <svg
              viewBox="0 0 320 480"
              className="w-56 md:w-64 drop-shadow-xl"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Phone body */}
              <rect
                x="16"
                y="0"
                width="288"
                height="480"
                rx="36"
                fill="white"
                stroke="#e5e7eb"
                strokeWidth="2"
              />
              {/* Notch */}
              <rect
                x="112"
                y="12"
                width="96"
                height="24"
                rx="12"
                fill="#f3f4f6"
              />
              {/* Header bar */}
              <rect x="32" y="56" width="256" height="48" rx="8" fill="#2563eb" />
              <circle cx="56" cy="80" r="12" fill="white" fillOpacity="0.3" />
              <rect
                x="76"
                y="72"
                width="80"
                height="8"
                rx="4"
                fill="white"
                fillOpacity="0.9"
              />
              <rect
                x="76"
                y="84"
                width="52"
                height="6"
                rx="3"
                fill="white"
                fillOpacity="0.5"
              />
              {/* Chat bubbles - incoming */}
              <rect
                x="40"
                y="124"
                width="160"
                height="40"
                rx="16"
                fill="#f3f4f6"
              />
              <rect x="52" y="136" width="100" height="6" rx="3" fill="#d1d5db" />
              <rect x="52" y="148" width="64" height="6" rx="3" fill="#d1d5db" />
              {/* Chat bubbles - outgoing */}
              <rect
                x="120"
                y="180"
                width="168"
                height="40"
                rx="16"
                fill="#2563eb"
              />
              <rect
                x="136"
                y="192"
                width="120"
                height="6"
                rx="3"
                fill="white"
                fillOpacity="0.8"
              />
              <rect
                x="136"
                y="204"
                width="80"
                height="6"
                rx="3"
                fill="white"
                fillOpacity="0.5"
              />
              {/* Chat bubbles - incoming */}
              <rect
                x="40"
                y="236"
                width="180"
                height="56"
                rx="16"
                fill="#f3f4f6"
              />
              <rect x="52" y="248" width="140" height="6" rx="3" fill="#d1d5db" />
              <rect x="52" y="260" width="100" height="6" rx="3" fill="#d1d5db" />
              <rect x="52" y="272" width="60" height="6" rx="3" fill="#d1d5db" />
              {/* Chat bubbles - outgoing */}
              <rect
                x="140"
                y="308"
                width="148"
                height="40"
                rx="16"
                fill="#2563eb"
              />
              <rect
                x="156"
                y="320"
                width="100"
                height="6"
                rx="3"
                fill="white"
                fillOpacity="0.8"
              />
              <rect
                x="156"
                y="332"
                width="64"
                height="6"
                rx="3"
                fill="white"
                fillOpacity="0.5"
              />
              {/* Typing indicator */}
              <rect
                x="40"
                y="364"
                width="80"
                height="36"
                rx="16"
                fill="#f3f4f6"
              />
              <circle cx="60" cy="382" r="4" fill="#d1d5db" />
              <circle cx="76" cy="382" r="4" fill="#d1d5db" />
              <circle cx="92" cy="382" r="4" fill="#d1d5db" />
              {/* Input bar */}
              <rect
                x="32"
                y="420"
                width="256"
                height="40"
                rx="20"
                fill="#f9fafb"
                stroke="#e5e7eb"
                strokeWidth="1"
              />
              <rect x="52" y="436" width="80" height="6" rx="3" fill="#d1d5db" />
              <circle cx="264" cy="440" r="12" fill="#2563eb" />
              <path
                d="M260 440L264 436L268 440M264 436V444"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="rotate(90 264 440)"
              />
            </svg>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 max-w-3xl mx-auto">
          <div className="text-center px-8 py-4 sm:border-r sm:border-gray-200">
            <p className="text-4xl font-bold text-gray-900 mb-1">
              {t.hero.stat1Value[lang]}
            </p>
            <p className="text-sm text-gray-500">{t.hero.stat1Label[lang]}</p>
          </div>
          <div className="text-center px-8 py-4 sm:border-r sm:border-gray-200">
            <p className="text-4xl font-bold text-gray-900 mb-1">
              {t.hero.stat2Value[lang]}
            </p>
            <p className="text-sm text-gray-500">{t.hero.stat2Label[lang]}</p>
          </div>
          <div className="text-center px-8 py-4">
            <p className="text-4xl font-bold text-gray-900 mb-1">
              {t.hero.stat3Value[lang]}
            </p>
            <p className="text-sm text-gray-500">{t.hero.stat3Label[lang]}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
