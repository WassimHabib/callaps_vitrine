"use client";

import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";
import { StickerCard } from "@/components/ui/sticker-card";
import { StickerIconBox } from "@/components/ui/sticker-icon-box";
import { StickerCodeBrackets } from "@/components/icons/sticker";

const categoryIcons = [
  // CRM — contacts / people
  <svg key="crm" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128H9m6 0a5.972 5.972 0 0 0-.786-3.07M9 19.128A9.38 9.38 0 0 1 6.375 19.5a9.337 9.337 0 0 1-4.121-.952 4.125 4.125 0 0 1 7.533-2.493M9 19.128v-.003c0-1.113.285-2.16.786-3.07m4.428 0a6.003 6.003 0 0 0-5.214 0" />
  </svg>,
  // Internal tools — wrench
  <svg key="tools" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.049.58.025 1.193-.14 1.743" />
  </svg>,
  // Business software — building
  <svg key="business" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
  </svg>,
];

type CategoryItem = {
  label: { fr: string; en: string };
};

const categories: CategoryItem[] = [
  { label: { fr: "CRM", en: "CRM" } },
  { label: { fr: "Outils internes", en: "Internal tools" } },
  { label: { fr: "Logiciels métiers", en: "Business software" } },
];

export default function Integration() {
  const { lang } = useLang();

  return (
    <section className="bg-card py-20 md:py-28 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Sticker badge header */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-bg-deep border-[2px] border-stroke text-stroke text-xs font-bold uppercase tracking-wide [box-shadow:3px_3px_0_var(--color-stroke)]">
            <StickerCodeBrackets size={18} />
            {lang === "fr" ? "Intégrations" : "Integrations"}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-black tracking-[-0.03em] text-stroke text-center leading-tight mb-4">
          {t.integration.title[lang]}
          <span className="underline decoration-wavy decoration-stroke/40 underline-offset-4">
            {t.integration.titleHighlight[lang]}
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-stroke/70 text-lg text-center mb-12 max-w-2xl mx-auto leading-relaxed">
          {t.integration.subtitle[lang]}
        </p>

        {/* Integration category cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <StickerCard key={i} variant="canvas" rotation={0} hoverable>
              <StickerIconBox variant="violet" size="md" className="mb-4">
                <span className="text-stroke">{categoryIcons[i]}</span>
              </StickerIconBox>
              <p className="text-stroke font-bold text-lg leading-snug">
                {cat.label[lang]}
              </p>
            </StickerCard>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-stroke/50 text-sm mt-10 text-center">
          {t.integration.footer[lang]}
        </p>

      </div>
    </section>
  );
}
