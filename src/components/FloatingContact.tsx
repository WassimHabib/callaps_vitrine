"use client";

import { StickerPhoneIncoming } from "@/components/icons/sticker";

export default function FloatingContact() {
  return (
    <a
      href="tel:+33651370395"
      className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 bg-primary text-stroke px-5 py-3 rounded-full font-bold text-sm border-[2.5px] border-stroke [box-shadow:4px_4px_0_var(--color-stroke)] hover:scale-105 hover:[box-shadow:6px_6px_0_var(--color-stroke)] transition-all duration-200 sm:rotate-[-2deg]"
      aria-label="Contact"
    >
      <StickerPhoneIncoming size={20} />
      <span className="hidden sm:inline">Appelez-nous</span>
    </a>
  );
}
