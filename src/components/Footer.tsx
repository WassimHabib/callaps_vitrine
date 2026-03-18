"use client";

import Image from "next/image";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";

export default function Footer() {
  const { lang } = useLang();

  const productLinks = [
    { label: t.nav.features[lang], href: "#features" },
    { label: t.nav.solutions[lang], href: "#solutions" },
    { label: t.nav.pricing[lang], href: "#pricing" },
    { label: t.nav.faq[lang], href: "#faq" },
  ];

  const companyLinks = [
    { label: t.footer.about[lang], href: "#about" },
    { label: t.footer.blog[lang], href: "/blog" },
    { label: t.footer.careers[lang], href: "#careers" },
  ];

  const contactItems = [
    { label: "contact@wevlap.fr", href: "mailto:contact@wevlap.fr" },
    { label: "06 51 37 03 95", href: "tel:+33651370395" },
  ];

  return (
    <footer className="bg-gray-900 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand — takes 2 cols on lg */}
          <div className="lg:col-span-2">
            <a href="#" className="inline-block">
              <Image
                src="/logo.png"
                alt="Callaps"
                width={360}
                height={100}
                className="h-14 md:h-20 w-auto"
              />
            </a>
            <p className="mt-4 max-w-xs text-gray-400">
              {t.footer.description[lang]}
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t.footer.product[lang]}</h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t.footer.company[lang]}</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t.footer.contact[lang]}</h3>
            <ul className="space-y-3">
              {contactItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-gray-400 hover:text-white transition"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="text-gray-400">Ile-de-France</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-gray-800" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-gray-500">
            {t.footer.copyright[lang]}
          </p>
          <div className="flex gap-6">
            <a
              href="#legal"
              className="text-sm text-gray-500 hover:text-gray-300 transition"
            >
              {t.footer.legal[lang]}
            </a>
            <a
              href="#privacy"
              className="text-sm text-gray-500 hover:text-gray-300 transition"
            >
              {t.footer.privacy[lang]}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
