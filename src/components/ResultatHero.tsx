"use client";

import Image from "next/image";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";
import { StickerCard } from "@/components/ui/sticker-card";
import { StickerIconBox } from "@/components/ui/sticker-icon-box";
import {
  StickerCheck,
  StickerPhoneIncoming,
  StickerSparkle,
  StickerSoundwave,
} from "@/components/icons/sticker";

const statIcons = [StickerPhoneIncoming, StickerSparkle, StickerSoundwave];

export default function ResultatHero() {
  const { lang } = useLang();

  const benefits =
    lang === "fr"
      ? [
          "0 appel manqué — chaque client est pris en charge",
          "Nouveaux prospects qualifiés automatiquement",
          "Demandes clients traitées 24h/24",
          "Qualité de service mesurée et améliorée",
          "Temps de réponse divisé par 10",
        ]
      : [
          "0 missed calls — every client is taken care of",
          "New prospects automatically qualified",
          "Client requests handled 24/7",
          "Service quality measured and improved",
          "Response time divided by 10",
        ];

  const stats = [
    {
      value: t.hero.stat1Value[lang],
      label: t.hero.stat1Label[lang],
      rotation: -2 as const,
      Icon: statIcons[0],
    },
    {
      value: t.hero.stat2Value[lang],
      label: t.hero.stat2Label[lang],
      rotation: 0 as const,
      Icon: statIcons[1],
    },
    {
      value: t.hero.stat3Value[lang],
      label: t.hero.stat3Label[lang],
      rotation: 2 as const,
      Icon: statIcons[2],
    },
  ];

  return (
    <section className="relative z-30 bg-card-elevated pt-20 pb-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-20">
          {stats.map(({ value, label, rotation, Icon }) => (
            <StickerCard
              key={label}
              variant="canvas"
              rotation={rotation}
              className="min-w-[160px] flex-1 max-w-[220px] text-center"
            >
              <div className="flex flex-col items-center gap-3">
                <StickerIconBox variant="violet" size="md" rotation={0}>
                  <Icon size={22} />
                </StickerIconBox>
                <p className="text-4xl md:text-5xl font-black text-stroke leading-none">
                  {value}
                </p>
                <p className="text-xs font-bold uppercase tracking-widest text-stroke opacity-60">
                  {label}
                </p>
              </div>
            </StickerCard>
          ))}
        </div>

        {/* Two columns: image left, text right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — Image wrapped in sticker border */}
          <div className="flex justify-center lg:justify-start">
            <div className="bg-white sticker-border [box-shadow:8px_8px_0_var(--color-stroke)] rounded-2xl p-3 w-full max-w-[500px]">
              <Image
                src="/resultat-hero.png"
                alt={
                  lang === "fr"
                    ? "0 appel manqué, +26% de conversion"
                    : "0 missed calls, +26% conversion"
                }
                width={700}
                height={400}
                className="w-full h-auto rounded-xl"
                priority
              />
            </div>
          </div>

          {/* Right — Text + benefits */}
          <div>
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-4">
              {lang === "fr" ? "Résultats concrets" : "Real results"}
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-stroke mb-6 leading-tight">
              {lang === "fr" ? "Plus de clients." : "More clients."}
              <br />
              <span className="text-primary">
                {lang === "fr" ? "Un meilleur service." : "Better service."}
              </span>
            </h2>
            <p className="text-stroke opacity-60 text-lg mb-8 leading-relaxed">
              {lang === "fr"
                ? "Callaps ne génère pas seulement des leads. Il améliore l'ensemble de votre relation client : suivi des demandes, qualité de service, temps de réponse, satisfaction."
                : "Callaps doesn't just generate leads. It improves your entire customer relationship: request tracking, service quality, response time, satisfaction."}
            </p>

            {/* Benefits list */}
            <div className="space-y-3">
              {benefits.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <StickerIconBox variant="violet" size="sm" rotation={0} className="mt-0.5 flex-shrink-0">
                    <StickerCheck size={14} />
                  </StickerIconBox>
                  <p className="text-stroke opacity-80 leading-snug">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
