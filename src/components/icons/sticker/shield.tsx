import type { StickerIconProps } from "./_types";

export function StickerShield({ size = 64, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      <path d="M 50 12 L 82 24 L 82 50 Q 82 78 50 90 Q 18 78 18 50 L 18 24 Z"
        fill="#4DAFFF" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <polyline points="36,52 46,62 64,42" stroke="#FFFFFF" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
