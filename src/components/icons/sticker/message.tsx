import type { StickerIconProps } from "./_types";

export function StickerMessage({ size = 64, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      <path d="M 14 20 L 86 20 L 86 64 L 50 64 L 38 78 L 38 64 L 14 64 Z"
        fill="#16161D" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <line x1="26" y1="34" x2="74" y2="34" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="26" y1="44" x2="64" y2="44" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="74" cy="44" r="3" fill="#4DAFFF" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
