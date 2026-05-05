import type { StickerIconProps } from "./_types";

export function StickerClock247({ size = 64, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      <circle cx="50" cy="50" r="36" fill="#16161D" stroke="currentColor" strokeWidth="3" />
      <text x="50" y="46" fontSize="14" fontWeight="900" fill="#FFFFFF" textAnchor="middle">24</text>
      <line x1="36" y1="50" x2="64" y2="50" stroke="currentColor" strokeWidth="2" />
      <text x="50" y="68" fontSize="14" fontWeight="900" fill="#4DAFFF" textAnchor="middle">7</text>
      <circle cx="20" cy="20" r="4" fill="#4DAFFF" stroke="currentColor" strokeWidth="2" />
      <circle cx="80" cy="20" r="4" fill="#7B61FF" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
