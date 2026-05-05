import type { StickerIconProps } from "./_types";

export function StickerCalendar({ size = 24, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      <rect x="3" y="5" width="18" height="16" rx="2" fill="#16161D" stroke="currentColor" strokeWidth="2.5" />
      <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2.5" />
      <line x1="8" y1="3" x2="8" y2="7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="16" y1="3" x2="16" y2="7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="12" cy="15" r="2.5" fill="#7B61FF" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
