import type { StickerIconProps } from "./_types";

export function StickerCheck({ size = 24, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      <circle cx="12" cy="12" r="10" fill="#4DAFFF" stroke="currentColor" strokeWidth="2.5" />
      <polyline points="7,12 11,16 17,9" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
