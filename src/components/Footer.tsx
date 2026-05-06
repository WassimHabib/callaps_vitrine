"use client";

import Image from "next/image";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";
import { StickerMail, StickerPhone, StickerPin } from "@/components/icons/sticker";

export default function Footer() {
  const { lang } = useLang();

  const productLinks = [
    { label: t.nav.features[lang], href: "#solution" },
    { label: t.nav.pricing[lang], href: "#pricing" },
    { label: t.nav.faq[lang], href: "#faq" },
  ];

  const companyLinks = [
    { label: t.footer.about[lang], href: "#about" },
    { label: t.footer.blog[lang], href: "/blog" },
    { label: t.footer.careers[lang], href: "#careers" },
  ];

  return (
    <footer className="relative bg-bg-deep text-stroke border-t-[2px] border-stroke/20 overflow-hidden">
      {/* Dots overlay — subtle white dots pattern at 15% opacity */}
      <div
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            "radial-gradient(circle, #FFFFFF 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-16">
        {/* 4-column grid */}
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {/* Column 1 — Brand */}
          <div className="col-span-2 lg:col-span-1">
            <a href="#" className="inline-block">
              <Image
                src="/logo.png"
                alt="Callaps"
                width={360}
                height={100}
                className="h-14 md:h-24 w-auto brightness-0 invert"
              />
            </a>
            <p className="mt-4 max-w-xs text-stroke/60 text-sm leading-relaxed">
              {t.footer.description[lang]}
            </p>

            {/* Contact info with sticker icons */}
            <ul className="mt-6 space-y-3">
              <li>
                <a
                  href="mailto:contact@wevlap.fr"
                  className="flex items-center gap-2 text-sm text-stroke/70 transition-colors duration-200 hover:text-stroke"
                >
                  <StickerMail size={18} className="shrink-0" />
                  contact@wevlap.fr
                </a>
              </li>
              <li>
                <a
                  href="tel:+33651370395"
                  className="flex items-center gap-2 text-sm text-stroke/70 transition-colors duration-200 hover:text-stroke"
                >
                  <StickerPhone size={18} className="shrink-0" />
                  06 51 37 03 95
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-stroke/70">
                <StickerPin size={18} className="shrink-0" />
                Île-de-France
              </li>
            </ul>
          </div>

          {/* Column 2 — Produit */}
          <div>
            <h3 className="mb-4 font-semibold text-stroke">{t.footer.product[lang]}</h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-stroke/60 transition-colors duration-200 hover:text-stroke"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Entreprise */}
          <div>
            <h3 className="mb-4 font-semibold text-stroke">{t.footer.company[lang]}</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-stroke/60 transition-colors duration-200 hover:text-stroke"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Légal */}
          <div>
            <h3 className="mb-4 font-semibold text-stroke">{t.footer.legal[lang]}</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/mentions-legales"
                  className="text-sm text-stroke/60 transition-colors duration-200 hover:text-stroke"
                >
                  {t.footer.legal[lang]}
                </a>
              </li>
              <li>
                <a
                  href="/confidentialite"
                  className="text-sm text-stroke/60 transition-colors duration-200 hover:text-stroke"
                >
                  {t.footer.privacy[lang]}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Signature */}
        <div className="mt-10 mb-6 text-center">
          <p className="text-lg font-semibold text-stroke">
            {lang === "fr" ? "Chaque appel compte." : "Every call counts."}
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-stroke/20" />

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-stroke/40">
            {t.footer.copyright[lang]}
          </p>
          <div className="flex gap-6">
            <a
              href="/mentions-legales"
              className="text-sm text-stroke/40 transition-colors duration-200 hover:text-stroke/70"
            >
              {t.footer.legal[lang]}
            </a>
            <a
              href="/confidentialite"
              className="text-sm text-stroke/40 transition-colors duration-200 hover:text-stroke/70"
            >
              {t.footer.privacy[lang]}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
