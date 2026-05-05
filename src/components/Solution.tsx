"use client";

import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";
import { StickerCard } from "@/components/ui/sticker-card";
import { StickerIconBox } from "@/components/ui/sticker-icon-box";
import {
  StickerCog,
  StickerMicrophone,
  StickerSoundwave,
  StickerPhoneIncoming,
} from "@/components/icons/sticker";

const itemIcons = [
  StickerPhoneIncoming,
  StickerSoundwave,
  StickerMicrophone,
  StickerCog,
];

export default function Solution() {
  const { lang } = useLang();
  const items = t.solution.items;

  return (
    <section id="solution" className="relative py-20 md:py-28 bg-primary overflow-hidden">
      {/* Subtle white dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full bg-card border-[2px] border-stroke text-stroke text-xs font-bold uppercase tracking-wide mb-4 [box-shadow:3px_3px_0_var(--color-stroke)]">
            La solution
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-[-0.03em] text-stroke mb-4 leading-tight">
            {t.solution.title[lang]}
            <span className="underline decoration-wavy decoration-stroke/40 underline-offset-4">
              {t.solution.titleHighlight[lang]}
            </span>
          </h2>
          <p className="text-lg text-stroke/85 leading-relaxed">
            {t.solution.subtitle[lang]}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, i) => {
            const Icon = itemIcons[i % itemIcons.length];
            const isPaper = i === items.length - 1;
            const cardVariant = isPaper ? "paper" : "canvas";
            const iconVariant = isPaper ? "stroke" : "violet";
            const iconClassName = isPaper ? "text-bg-deep" : "text-stroke";

            return (
              <StickerCard key={i} variant={cardVariant}>
                <StickerIconBox variant={iconVariant} size="md" className="mb-4">
                  <Icon size={28} className={iconClassName} />
                </StickerIconBox>
                <p className="text-base lg:text-lg leading-relaxed font-medium">
                  {item[lang]}
                </p>
              </StickerCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
