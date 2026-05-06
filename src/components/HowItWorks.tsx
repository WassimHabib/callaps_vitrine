"use client";

import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";
import { StickerIconBox } from "@/components/ui/sticker-icon-box";
import {
  StickerPhoneIncoming,
  StickerSoundwave,
  StickerCheck,
  StickerCalendar,
} from "@/components/icons/sticker";
import { ConversationFlow } from "@/components/scenes/conversation-flow";

const stepIcons = [StickerPhoneIncoming, StickerSoundwave, StickerCheck, StickerCalendar];

export default function HowItWorks() {
  const { lang } = useLang();
  const steps = t.howItWorks.steps;

  return (
    <section id="how-it-works" className="relative py-20 md:py-28 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full sticker-border sticker-shadow bg-primary text-stroke font-bold text-sm mb-6">
            <span>⚡</span>
            <span>{t.howItWorks.subtitle[lang]}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-stroke">
            {t.howItWorks.title[lang]}
          </h2>
        </div>

        {/* 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: step cards */}
          <div className="space-y-5">
            {steps.map((step, i) => {
              const Icon = stepIcons[i % stepIcons.length];
              return (
                <div
                  key={i}
                  className="relative bg-canvas sticker-border sticker-shadow rounded-2xl p-6 lg:p-7 transition-transform duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:[box-shadow:10px_10px_0_var(--color-stroke)]"
                >
                  {/* Number badge */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-primary text-stroke font-black text-sm flex items-center justify-center sticker-border-thin [box-shadow:3px_3px_0_var(--color-stroke)]">
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  <StickerIconBox variant="violet" size="md" className="mb-4">
                    <Icon size={28} className="text-stroke" />
                  </StickerIconBox>

                  <h3 className="text-lg font-black tracking-tight text-stroke mb-1">
                    {step.title[lang]}
                  </h3>
                  <p className="text-base opacity-75 text-stroke leading-relaxed">
                    {step.description[lang]}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right: conversation mini-scene */}
          <ConversationFlow className="w-full h-auto max-w-[480px] mx-auto" />
        </div>
      </div>
    </section>
  );
}
