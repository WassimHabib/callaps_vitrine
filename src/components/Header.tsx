"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";
import { StickerCalendar, StickerArrowRight } from "@/components/icons/sticker";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, setLang } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: t.nav.features[lang], href: "#solution" },
    { label: t.nav.pricing[lang], href: "#pricing" },
    { label: t.nav.faq[lang], href: "#faq" },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 bg-bg-deep ${
        scrolled ? "border-b-[2px] border-stroke/30" : "border-b-[2px] border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 lg:h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="callaps" width={140} height={36} className="h-9 w-auto brightness-0 invert" priority />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-stroke/80 font-bold hover:text-stroke transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setLang(lang === "fr" ? "en" : "fr")}
            className="hidden sm:inline-flex items-center justify-center w-10 h-10 rounded-full bg-card border-[2px] border-stroke text-stroke text-sm font-black [box-shadow:2px_2px_0_var(--color-stroke)]"
            aria-label="Change language"
          >
            {lang === "fr" ? "EN" : "FR"}
          </button>
          <Link
            href="/demo"
            className="hidden sm:inline-flex items-center gap-2 bg-primary text-stroke px-5 py-2.5 rounded-full font-bold text-sm border-[2.5px] border-stroke [box-shadow:3px_3px_0_var(--color-stroke)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:[box-shadow:5px_5px_0_var(--color-stroke)] transition-transform duration-200"
          >
            <StickerCalendar size={16} />
            <span className="hidden md:inline">{t.nav.cta[lang]}</span>
            <StickerArrowRight size={14} />
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-10 h-10 rounded-full bg-card border-[2.5px] border-stroke [box-shadow:2px_2px_0_var(--color-stroke)] flex items-center justify-center"
            aria-label="Menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-stroke">
              {mobileOpen ? (
                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" />
                  <line x1="3" y1="12" x2="21" y2="12" strokeLinecap="round" />
                  <line x1="3" y1="18" x2="21" y2="18" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-bg-deep border-t-[2px] border-stroke px-4 py-6 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block bg-card border-[3px] border-stroke [box-shadow:4px_4px_0_var(--color-stroke)] rounded-2xl px-5 py-4 text-stroke font-black text-lg"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/demo"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center gap-2 w-full bg-primary text-stroke px-6 py-4 rounded-full font-black text-lg border-[3px] border-stroke [box-shadow:4px_4px_0_var(--color-stroke)] min-h-[56px]"
          >
            <StickerCalendar size={20} />
            {t.nav.cta[lang]}
            <StickerArrowRight size={18} />
          </Link>
        </div>
      )}
    </header>
  );
}
