// src/components/Hero.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";
import { StickerCalendar, StickerArrowRight } from "@/components/icons/sticker";
import { HeroAppelEntrant } from "@/components/scenes/hero-appel-entrant";

export default function Hero() {
  const { lang } = useLang();

  const stats = [
    { value: t.hero.stat1Value[lang], label: t.hero.stat1Label[lang] },
    { value: t.hero.stat2Value[lang], label: t.hero.stat2Label[lang] },
    { value: t.hero.stat3Value[lang], label: t.hero.stat3Label[lang] },
  ];

  return (
    <section className="relative min-h-screen flex items-center bg-bg-deep overflow-hidden pt-20 lg:pt-24">
      {/* Pattern dots discret */}
      <div
        className="absolute inset-0 -z-10 opacity-30"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Texte */}
          <div className="lg:col-span-7">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-black tracking-[-0.04em] text-stroke mb-6 leading-[0.95]"
            >
              {t.hero.title1[lang]}
              <span className="text-secondary">{t.hero.titleHighlight[lang]}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-lg md:text-xl text-stroke/85 mb-10 max-w-2xl leading-relaxed"
            >
              {t.hero.subtitle[lang]}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <Link
                href="/demo"
                className="group inline-flex items-center justify-center gap-3 bg-primary text-stroke px-8 py-4 rounded-full font-bold text-lg border-[3px] border-stroke [box-shadow:4px_4px_0_var(--color-stroke)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:[box-shadow:6px_6px_0_var(--color-stroke)] transition-transform duration-200 min-h-[56px]"
              >
                <StickerCalendar size={22} />
                {t.hero.ctaPrimary[lang]}
                <StickerArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                href="#solution"
                className="inline-flex items-center justify-center gap-2 bg-card text-stroke px-8 py-4 rounded-full font-bold text-lg border-[3px] border-stroke [box-shadow:4px_4px_0_var(--color-secondary)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:[box-shadow:6px_6px_0_var(--color-secondary)] transition-transform duration-200 min-h-[56px]"
              >
                {t.hero.ctaSecondary[lang]}
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-sm text-stroke/60 mb-10 max-w-xl"
            >
              {t.hero.subtitleSmall[lang]}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-8 md:gap-12"
            >
              {stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl md:text-4xl font-black text-stroke">{stat.value}</div>
                  <div className="text-sm font-semibold text-stroke/60 uppercase tracking-wide">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Mini-scène */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="lg:col-span-5"
          >
            <HeroAppelEntrant className="w-full h-auto max-w-[480px] mx-auto" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
