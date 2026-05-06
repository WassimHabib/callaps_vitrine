"use client";

import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";
import { StickerCard } from "@/components/ui/sticker-card";
import { StickerIconBox } from "@/components/ui/sticker-icon-box";
import {
  StickerBriefcase,
  StickerTrendingUp,
  StickerHeadset,
  StickerPhoneIncoming,
} from "@/components/icons/sticker";

import type { ComponentType } from "react";
import type { StickerIconProps } from "@/components/icons/sticker";

/* Icon mapping for the 4 audience items:
 * 0 — PME en croissance / Growing SMBs         → StickerBriefcase
 * 1 — Équipes commerciales / Sales teams        → StickerTrendingUp
 * 2 — Services client / Customer service        → StickerHeadset
 * 3 — Volume d'appels élevé / High call volume  → StickerPhoneIncoming
 */
const itemIcons: ComponentType<StickerIconProps>[] = [
  StickerBriefcase,
  StickerTrendingUp,
  StickerHeadset,
  StickerPhoneIncoming,
];

const cardVariants = ["card", "elevated", "card", "paper"] as const;

export default function TargetAudience() {
  const { lang } = useLang();
  const items = t.targetAudience.items;

  return (
    <section id="target-audience" className="relative py-20 md:py-28 bg-card-elevated overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full bg-card border-[2px] border-stroke text-stroke text-xs font-bold uppercase tracking-wide mb-4 [box-shadow:3px_3px_0_var(--color-stroke)]">
            Pour qui ?
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-[-0.03em] text-stroke mb-4 leading-tight">
            {t.targetAudience.title[lang]}
          </h2>
        </div>

        {/* Grid — 2 cols mobile, 4 cols desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => {
            const Icon = itemIcons[i % itemIcons.length];
            const variant = cardVariants[i % cardVariants.length];

            return (
              <StickerCard key={i} variant={variant}>
                <StickerIconBox variant="violet" size="md" className="mb-4">
                  <Icon size={28} className="text-stroke" />
                </StickerIconBox>
                <h3 className="text-base lg:text-lg font-black leading-snug tracking-tight">
                  {item[lang]}
                </h3>
              </StickerCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
