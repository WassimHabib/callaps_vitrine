"use client";

import Image from "next/image";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";

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
    { label: t.footer.contact[lang], href: "#contact" },
  ];

  return (
    <footer className="bg-surface-dark border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 py-16">
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
                className="h-14 md:h-24 w-auto"
              />
            </a>
            <p className="mt-4 max-w-xs text-slate-400">
              {t.footer.description[lang]}
            </p>
          </div>

          {/* Column 2 — Produit */}
          <div>
            <h3 className="mb-4 font-semibold text-white">{t.footer.product[lang]}</h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-slate-400 transition-colors duration-200 hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Entreprise */}
          <div>
            <h3 className="mb-4 font-semibold text-white">{t.footer.company[lang]}</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-slate-400 transition-colors duration-200 hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div>
            <h3 className="mb-4 font-semibold text-white">{t.footer.contact[lang]}</h3>
            <ul className="space-y-3 text-slate-400">
              <li>
                <a
                  href="mailto:contact@wevlap.fr"
                  className="transition-colors duration-200 hover:text-primary"
                >
                  contact@wevlap.fr
                </a>
              </li>
              <li>
                <a
                  href="tel:+33651370395"
                  className="transition-colors duration-200 hover:text-primary"
                >
                  06 51 37 03 95
                </a>
              </li>
              <li>Île-de-France</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-white/5" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-slate-500">
            {t.footer.copyright[lang]}
          </p>
          <div className="flex gap-6">
            <a
              href="#legal"
              className="text-sm text-slate-500 transition-colors duration-200 hover:text-slate-300"
            >
              {t.footer.legal[lang]}
            </a>
            <a
              href="#privacy"
              className="text-sm text-slate-500 transition-colors duration-200 hover:text-slate-300"
            >
              {t.footer.privacy[lang]}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
