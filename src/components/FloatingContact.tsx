"use client";

import { useState } from "react";
import Link from "next/link";

const contactButtons = [
  {
    label: "Calendly",
    href: "/demo",
    color: "bg-accent",
    shadow: "shadow-accent/30",
    isLink: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    label: "Téléphone",
    href: "tel:+33651370395",
    color: "bg-primary",
    shadow: "shadow-primary/30",
    isLink: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/33651370395?text=Bonjour%2C%20je%20suis%20int%C3%A9ress%C3%A9%20par%20Callaps%20!",
    color: "bg-[#25D366]",
    shadow: "shadow-[#25D366]/30",
    isLink: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
];

export default function FloatingContact() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
      {/* Fan-out contact buttons */}
      {contactButtons.map((btn, i) => {
        const delay = (contactButtons.length - 1 - i) * 75;
        const ButtonContent = (
          <div className="group relative flex items-center justify-center">
            {/* Tooltip */}
            <span
              className="absolute right-full mr-3 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg"
            >
              {btn.label}
            </span>
            {/* Button circle */}
            <span
              className={`flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg ${btn.color} ${btn.shadow} transition-all duration-200 hover:scale-110`}
            >
              {btn.icon}
            </span>
          </div>
        );

        const wrapperClasses = `transition-all duration-300 ease-out ${
          open
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-4 scale-75 pointer-events-none"
        }`;
        const wrapperStyle = {
          transitionDelay: open ? `${delay}ms` : "0ms",
        };

        return btn.isLink ? (
          <Link
            key={btn.label}
            href={btn.href}
            className={wrapperClasses}
            style={wrapperStyle}
          >
            {ButtonContent}
          </Link>
        ) : (
          <a
            key={btn.label}
            href={btn.href}
            target={btn.href.startsWith("http") ? "_blank" : undefined}
            rel={btn.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className={wrapperClasses}
            style={wrapperStyle}
          >
            {ButtonContent}
          </a>
        );
      })}

      {/* Main toggle button */}
      <button
        type="button"
        aria-label="Contact"
        onClick={() => setOpen((prev) => !prev)}
        className={`relative flex h-14 w-14 items-center justify-center rounded-full bg-[#2563eb] text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-blue-500/40 hover:scale-105 cursor-pointer ${
          open ? "rotate-45" : "animate-pulse-soft"
        }`}
      >
        {/* Pulse ring (only when closed) */}
        {!open && (
          <span className="absolute inset-0 rounded-full bg-[#2563eb] opacity-40 animate-ping-slow" />
        )}

        {/* Chat bubble icon */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="relative z-10 w-6 h-6"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
      </button>
    </div>
  );
}
