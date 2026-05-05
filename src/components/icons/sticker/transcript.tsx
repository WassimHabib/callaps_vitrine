import type { StickerIconProps } from "./_types";

export function StickerTranscript({ size = 64, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      <path d="M 18 14 L 64 14 L 80 30 L 80 88 L 18 88 Z" fill="#16161D" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M 64 14 L 64 30 L 80 30" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <line x1="28" y1="44" x2="70" y2="44" stroke="#FFFFFF" strokeWidth="2" />
      <line x1="28" y1="54" x2="60" y2="54" stroke="#FFFFFF" strokeWidth="2" />
      <line x1="28" y1="64" x2="68" y2="64" stroke="#FFFFFF" strokeWidth="2" />
      <line x1="28" y1="74" x2="56" y2="74" stroke="#FFFFFF" strokeWidth="2" />
      <circle cx="74" cy="78" r="6" fill="#4DAFFF" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
