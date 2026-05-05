import type { StickerIconProps } from "./_types";

export function StickerEuro({ size = 64, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      <circle cx="50" cy="50" r="36" fill="#7B61FF" stroke="currentColor" strokeWidth="3" />
      <path d="M 64 32 Q 56 26 48 26 Q 32 26 28 50 Q 32 74 48 74 Q 56 74 64 68"
        fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
      <line x1="22" y1="42" x2="48" y2="42" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="22" y1="56" x2="44" y2="56" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}
