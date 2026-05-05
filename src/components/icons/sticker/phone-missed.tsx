import type { StickerIconProps } from "./_types";

export function StickerPhoneMissed({ size = 64, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      <path d="M 26 14 L 38 14 L 46 34 L 34 42 Q 40 58 56 64 L 64 52 L 84 60 L 84 76 Q 84 86 74 86 Q 26 86 14 38 Q 14 28 26 14 Z"
        fill="#16161D" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="74" cy="22" r="14" fill="#FB7185" stroke="currentColor" strokeWidth="2.5" />
      <line x1="68" y1="16" x2="80" y2="28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="80" y1="16" x2="68" y2="28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
