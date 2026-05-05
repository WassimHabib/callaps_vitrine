"use client";

import { StickerCard } from "@/components/ui/sticker-card";
import { StickerIconBox } from "@/components/ui/sticker-icon-box";
import {
  StickerPhoneIncoming,
  StickerMicrophone,
  StickerSoundwave,
  StickerSparkle,
  StickerArrowRight,
  StickerCheck,
  StickerCalendar,
} from "@/components/icons/sticker";

export function StickerPreviewClient() {
  return (
    <main className="min-h-screen bg-bg-deep p-8 md:p-16">
      <h1 className="text-4xl font-black mb-2 text-stroke">Sticker Preview (Dark)</h1>
      <p className="text-stroke/70 mb-12">Page interne — vérification du système de design.</p>

      <h2 className="text-2xl font-black mb-6 text-stroke">Icônes (7/38)</h2>
      <div className="flex flex-wrap gap-4 mb-16">
        {[
          { Icon: StickerPhoneIncoming, name: "phone-incoming" },
          { Icon: StickerMicrophone, name: "microphone" },
          { Icon: StickerSoundwave, name: "soundwave" },
          { Icon: StickerSparkle, name: "sparkle" },
          { Icon: StickerArrowRight, name: "arrow-right" },
          { Icon: StickerCheck, name: "check" },
          { Icon: StickerCalendar, name: "calendar" },
        ].map(({ Icon, name }) => (
          <div key={name} className="flex flex-col items-center gap-2">
            <StickerIconBox variant="card" size="lg">
              <Icon size={36} className="text-stroke" />
            </StickerIconBox>
            <span className="text-xs font-mono text-stroke/70">{name}</span>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-black mb-6 text-stroke">Cartes — toutes les variantes</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {(["card", "canvas", "elevated", "violet", "blue", "paper"] as const).map((variant) => (
          <StickerCard key={variant} variant={variant}>
            <StickerIconBox variant={variant === "card" ? "violet" : "card"} size="md" className="mb-4">
              <StickerPhoneIncoming size={28} />
            </StickerIconBox>
            <StickerCard.Title>Variant {variant}</StickerCard.Title>
            <StickerCard.Description>Test de rendu pour la variante {variant}.</StickerCard.Description>
            <StickerCard.Pills items={["Pill A", "Pill B", "Pill C"]} />
            <StickerCard.Cta>Découvrir</StickerCard.Cta>
          </StickerCard>
        ))}
      </div>

      <h2 className="text-2xl font-black mb-6 text-stroke">Box icônes — toutes les variantes</h2>
      <div className="flex flex-wrap gap-4 mb-16">
        {(["card", "canvas", "elevated", "violet", "blue", "paper", "stroke"] as const).map((variant) => (
          <StickerIconBox key={variant} variant={variant} size="lg">
            <StickerSparkle size={32} />
          </StickerIconBox>
        ))}
      </div>

      <h2 className="text-2xl font-black mb-6 text-stroke">Rotations (visible ≥ 640px)</h2>
      <div className="flex flex-wrap gap-6 mb-16">
        {([-3, -2, 0, 2, 3] as const).map((rot) => (
          <StickerIconBox key={rot} variant="card" size="lg" rotation={rot}>
            <StickerCheck size={32} />
          </StickerIconBox>
        ))}
      </div>
    </main>
  );
}
