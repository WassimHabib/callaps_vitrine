"use client";

import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";
import { StickerCard } from "@/components/ui/sticker-card";
import { StickerIconBox } from "@/components/ui/sticker-icon-box";
import {
  StickerHeadset,
  StickerBoltFlash,
  StickerShield,
  StickerClock247,
  StickerGlobe,
  StickerSparkle,
} from "@/components/icons/sticker";

import type { ComponentType } from "react";
import type { StickerIconProps } from "@/components/icons/sticker";

const itemIcons: ComponentType<StickerIconProps>[] = [
  StickerHeadset,   // Never miss a call
  StickerBoltFlash, // Increase lead volume
  StickerShield,    // Reduce operational costs
  StickerClock247,  // Free up time for teams
  StickerGlobe,     // Accelerate growth
  StickerSparkle,   // fallback for any extra items
];

const cardVariants = ["card", "elevated", "canvas", "card", "elevated", "canvas"] as const;

export default function Benefits() {
  const { lang } = useLang();
  const items = t.benefits.items;

  return (
    <section id="benefits" className="relative py-20 md:py-28 bg-bg-deep overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full bg-card border-[2px] border-stroke text-stroke text-xs font-bold uppercase tracking-wide mb-4 [box-shadow:3px_3px_0_var(--color-stroke)]">
            Bénéfices
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-[-0.03em] text-stroke mb-4 leading-tight">
            {t.benefits.title[lang]}
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => {
            const Icon = itemIcons[i % itemIcons.length];
            const variant = cardVariants[i % cardVariants.length];

            return (
              <StickerCard key={i} variant={variant}>
                <StickerIconBox variant="violet" size="md" className="mb-4">
                  <Icon size={28} className="text-stroke" />
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
