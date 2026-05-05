import type { StickerIconProps } from "./_types";

export function StickerStethoscope({ size = 64, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      <path d="M 24 14 Q 24 50 40 56 Q 56 50 56 14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <circle cx="24" cy="14" r="4" fill="#4DAFFF" stroke="currentColor" strokeWidth="2" />
      <circle cx="56" cy="14" r="4" fill="#4DAFFF" stroke="currentColor" strokeWidth="2" />
      <line x1="40" y1="56" x2="40" y2="68" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <circle cx="40" cy="78" r="10" fill="#7B61FF" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="40" cy="78" r="4" fill="#FFFFFF" />
    </svg>
  );
}
