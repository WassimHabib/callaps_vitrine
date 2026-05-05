"use client";

import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";
import { StickerCard } from "@/components/ui/sticker-card";
import { StickerIconBox } from "@/components/ui/sticker-icon-box";
import {
  StickerChartBar,
  StickerTranscript,
  StickerClock,
} from "@/components/icons/sticker";

import type { ComponentType } from "react";
import type { StickerIconProps } from "@/components/icons/sticker";

const itemIcons: ComponentType<StickerIconProps>[] = [
  StickerChartBar,  // Every call is automatically analyzed
  StickerTranscript, // Performance is measured
  StickerClock,     // Concrete improvement suggestions
];

const cardVariants = ["canvas", "canvas", "canvas"] as const;
const rotations = [-2, 0, 2] as const;

export default function Analysis() {
  const { lang } = useLang();
  const items = t.analysis.items;

  return (
    <section
      id="analysis"
      className="relative py-20 md:py-28 bg-secondary overflow-hidden"
    >
      {/* Dots overlay — white, subtle */}
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full bg-card border-[2px] border-stroke text-stroke text-xs font-bold uppercase tracking-wide mb-4 [box-shadow:3px_3px_0_var(--color-stroke)]">
            Analyse
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-[-0.03em] text-bg-deep mb-4 leading-tight">
            {t.analysis.title[lang]}
            <span className="text-stroke">{t.analysis.titleHighlight[lang]}</span>
          </h2>
          <p className="text-lg text-bg-deep/80 leading-relaxed font-medium">
            {t.analysis.subtitle[lang]}
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {items.map((item, i) => {
            const Icon = itemIcons[i % itemIcons.length];
            const variant = cardVariants[i % cardVariants.length];
            const rotation = rotations[i % rotations.length];

            return (
              <StickerCard key={i} variant={variant} rotation={rotation}>
                <StickerIconBox variant="blue" size="md" className="mb-4">
                  <Icon size={28} className="text-stroke" />
                </StickerIconBox>
                <p className="text-base lg:text-lg leading-relaxed font-medium text-stroke">
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
