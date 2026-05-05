import type { StickerIconProps } from "./_types";

export function StickerRestaurant({ size = 64, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      <rect x="32" y="14" width="6" height="32" fill="#4DAFFF" stroke="currentColor" strokeWidth="2" />
      <line x1="28" y1="14" x2="28" y2="30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="35" y1="14" x2="35" y2="30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="42" y1="14" x2="42" y2="30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="32" y="46" width="6" height="40" rx="2" fill="#4DAFFF" stroke="currentColor" strokeWidth="2.5" />
      <path d="M 60 14 Q 64 14 66 18 L 72 50 L 64 56 L 56 50 L 60 18 Q 60 14 60 14 Z" fill="#7B61FF" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <rect x="60" y="56" width="6" height="30" rx="2" fill="#7B61FF" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  );
}
