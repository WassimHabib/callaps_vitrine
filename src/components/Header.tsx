"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, setLang } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = () => setMobileOpen(false);

  const navLinks = [
    { label: t.nav.features[lang], href: "#solution" },
    { label: t.nav.pricing[lang], href: "#pricing" },
    { label: t.nav.faq[lang], href: "#faq" },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0B0B0F]/90 backdrop-blur-xl shadow-lg shadow-black/10"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <nav className={`mx-auto flex max-w-7xl items-center justify-between px-4 lg:px-6 transition-all duration-300 ${scrolled ? "py-1" : "py-1"}`}>
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Callaps"
            width={360}
            height={100}
            className={`w-auto transition-all duration-300 ${scrolled ? "h-10 md:h-12" : "h-20 md:h-24"} ${scrolled ? "" : "-my-4 md:-my-6"}`}
            priority
          />
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  scrolled ? "text-slate-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop language selector + CTA */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language selector */}
          <div className={`flex items-center gap-1 rounded-lg p-1 ${scrolled ? "bg-white/5" : "bg-gray-100"}`}>
            <button
              type="button"
              onClick={() => setLang("fr")}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-200 cursor-pointer ${
                lang === "fr"
                  ? scrolled ? "bg-white/10 text-white" : "bg-white text-gray-900 shadow-sm"
                  : scrolled ? "text-slate-400" : "text-gray-400"
              }`}
            >
              FR
            </button>
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-200 cursor-pointer ${
                lang === "en"
                  ? scrolled ? "bg-white/10 text-white" : "bg-white text-gray-900 shadow-sm"
                  : scrolled ? "text-slate-400" : "text-gray-400"
              }`}
            >
              EN
            </button>
          </div>

          <Link
            href="/demo"
            className="inline-flex items-center rounded-lg bg-gradient-to-r from-primary to-accent px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-200 hover:shadow-primary/40 hover:scale-105"
          >
            {t.nav.cta[lang]}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((prev) => !prev)}
          className={`relative flex md:hidden h-10 w-10 items-center justify-center rounded-lg transition-colors ${
            scrolled ? "text-slate-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <span className="sr-only">Menu</span>
          <div className="flex flex-col items-center justify-center gap-[5px]">
            <span
              className={`block h-[2px] w-5 rounded-full bg-current transition-all duration-300 ${
                mobileOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-5 rounded-full bg-current transition-all duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-5 rounded-full bg-current transition-all duration-300 ${
                mobileOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="glass mx-4 mb-4 rounded-xl px-6 py-5">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={handleNavClick}
                  className="block text-sm font-medium text-slate-300 transition-colors duration-200 hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile language selector */}
          <div className="mt-4 flex items-center gap-1 rounded-lg bg-white/5 p-1 w-fit">
            <button
              type="button"
              onClick={() => setLang("fr")}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-200 cursor-pointer ${
                lang === "fr"
                  ? "bg-white/10 text-white"
                  : "text-slate-400"
              }`}
            >
              FR
            </button>
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-200 cursor-pointer ${
                lang === "en"
                  ? "bg-white/10 text-white"
                  : "text-slate-400"
              }`}
            >
              EN
            </button>
          </div>

          <div className="mt-5">
            <Link
              href="/demo"
              onClick={handleNavClick}
              className="block w-full rounded-lg bg-gradient-to-r from-primary to-accent px-5 py-2.5 text-center text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-200 hover:shadow-primary/40"
            >
              {t.nav.cta[lang]}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
