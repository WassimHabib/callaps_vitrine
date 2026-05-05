import type { StickerIconProps } from "./_types";

export function StickerTooth({ size = 64, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      <path d="M 26 14 Q 14 14 14 30 Q 14 50 24 70 Q 28 84 36 84 Q 42 84 44 74 L 48 60 L 52 74 Q 54 84 60 84 Q 68 84 74 70 Q 86 50 86 30 Q 86 14 74 14 Q 60 14 50 22 Q 40 14 26 14 Z"
        fill="#FFFFFF" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="34" cy="34" r="3" fill="#4DAFFF" />
    </svg>
  );
}
