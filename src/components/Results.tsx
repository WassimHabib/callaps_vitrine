"use client";

import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";
import { StickerCard } from "@/components/ui/sticker-card";
import { StickerIconBox } from "@/components/ui/sticker-icon-box";
import {
  StickerTrendingUp,
  StickerCheck,
  StickerSparkle,
  StickerChartBar,
} from "@/components/icons/sticker";
import { DashboardResultats } from "@/components/scenes/dashboard-resultats";

const itemIcons = [StickerCheck, StickerTrendingUp, StickerSparkle];
const descriptions: { fr: string; en: string }[] = [
  {
    fr: "Chaque appel est traité, aucun client ne passe à la concurrence.",
    en: "Every call is handled — no customer goes to the competition.",
  },
  {
    fr: "Des prospects qualifiés générés automatiquement, 24h/24.",
    en: "Qualified leads generated automatically, around the clock.",
  },
  {
    fr: "Vos équipes se concentrent sur ce qui génère vraiment de la valeur.",
    en: "Your teams focus on what truly generates value.",
  },
];

export default function Results() {
  const { lang } = useLang();

  return (
    <section
      id="resultats"
      className="relative py-20 md:py-28 bg-card overflow-hidden"
    >
      {/* Subtle white dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card border-[2px] border-stroke text-stroke text-xs font-bold uppercase tracking-wide [box-shadow:3px_3px_0_var(--color-stroke)]">
              <StickerChartBar size={18} />
              {lang === "fr" ? "Résultats" : "Results"}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-[-0.03em] text-stroke leading-tight">
            {t.results.title[lang]}
          </h2>
        </div>

        {/* 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          {/* Left — 3 stat cards */}
          <div className="flex flex-col gap-6">
            {t.results.items.map((item, i) => {
              const Icon = itemIcons[i % itemIcons.length];
              const desc = descriptions[i];
              return (
                <StickerCard key={i} variant="canvas" rotation={0} hoverable>
                  <div className="flex items-start gap-5">
                    <StickerIconBox variant="violet" size="md" rotation={0} className="flex-shrink-0">
                      <Icon size={26} className="text-stroke" />
                    </StickerIconBox>
                    <div>
                      <p className="text-5xl font-black text-stroke leading-none mb-1">
                        {item.value}
                      </p>
                      <p className="text-sm font-bold uppercase tracking-widest text-stroke opacity-60 mb-2">
                        {item.label[lang]}
                      </p>
                      <p className="text-base text-stroke opacity-75 leading-relaxed">
                        {desc[lang]}
                      </p>
                    </div>
                  </div>
                </StickerCard>
              );
            })}
          </div>

          {/* Right — Dashboard mini-scene */}
          <div className="flex justify-center lg:justify-end">
            <div className="bg-white sticker-border [box-shadow:8px_8px_0_var(--color-stroke)] rounded-2xl p-3 w-full max-w-[500px]">
              <DashboardResultats className="w-full h-auto rounded-xl" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
