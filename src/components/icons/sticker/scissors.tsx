import type { StickerIconProps } from "./_types";

export function StickerScissors({ size = 64, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      <circle cx="28" cy="72" r="12" fill="#7B61FF" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="28" cy="72" r="3" fill="#FFFFFF" />
      <circle cx="72" cy="72" r="12" fill="#4DAFFF" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="72" cy="72" r="3" fill="#FFFFFF" />
      <line x1="38" y1="64" x2="62" y2="14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="62" y1="64" x2="38" y2="14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
