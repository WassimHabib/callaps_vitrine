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
    { label: t.nav.features[lang], href: "#features" },
    { label: t.nav.pricing[lang], href: "#pricing" },
    { label: t.nav.faq[lang], href: "#faq" },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo — left */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/logo.png"
            alt="Callaps"
            width={360}
            height={100}
            className={`w-auto transition-all duration-300 ${
              scrolled ? "h-8 md:h-10" : "h-10 md:h-12"
            }`}
            priority
          />
        </Link>

        {/* Desktop nav links — centered */}
        <ul className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <li key={link.href}>
              {link.href.startsWith("/") ? (
                <Link
                  href={link.href}
                  className="text-sm font-medium text-gray-600 transition-colors duration-200 hover:text-gray-900"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  href={link.href}
                  className="text-sm font-medium text-gray-600 transition-colors duration-200 hover:text-gray-900"
                >
                  {link.label}
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* Desktop right — language selector + CTA */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language selector */}
          <div className="flex items-center gap-1 rounded-lg border border-gray-200 p-1">
            <button
              type="button"
              onClick={() => setLang("fr")}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors duration-200 cursor-pointer ${
                lang === "fr"
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              FR
            </button>
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors duration-200 cursor-pointer ${
                lang === "en"
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              EN
            </button>
          </div>

          <Link
            href="/demo"
            className="inline-flex items-center rounded-lg bg-[#2563eb] px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#1d4ed8]"
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
          className="relative flex md:hidden h-10 w-10 items-center justify-center rounded-lg text-gray-600 transition-colors hover:text-gray-900"
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

      {/* Mobile slide-down menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white border-t border-gray-100 px-6 py-5">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                {link.href.startsWith("/") ? (
                  <Link
                    href={link.href}
                    onClick={handleNavClick}
                    className="block text-sm font-medium text-gray-600 transition-colors duration-200 hover:text-gray-900"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    onClick={handleNavClick}
                    className="block text-sm font-medium text-gray-600 transition-colors duration-200 hover:text-gray-900"
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>

          {/* Mobile language selector */}
          <div className="mt-4 flex items-center gap-1 rounded-lg border border-gray-200 p-1 w-fit">
            <button
              type="button"
              onClick={() => setLang("fr")}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors duration-200 cursor-pointer ${
                lang === "fr"
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              FR
            </button>
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors duration-200 cursor-pointer ${
                lang === "en"
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              EN
            </button>
          </div>

          <div className="mt-5">
            <Link
              href="/demo"
              onClick={handleNavClick}
              className="block w-full rounded-lg bg-[#2563eb] px-5 py-2.5 text-center text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#1d4ed8]"
            >
              {t.nav.cta[lang]}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
