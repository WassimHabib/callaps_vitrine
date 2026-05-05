import type { StickerIconProps } from "./_types";

export function StickerPin({ size = 24, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      <path d="M 12 2 Q 4 2 4 11 Q 4 17 12 22 Q 20 17 20 11 Q 20 2 12 2 Z"
        fill="#4DAFFF" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="12" cy="11" r="3" fill="#FFFFFF" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
