import type { StickerIconProps } from "./_types";

export function StickerPlus({ size = 24, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      <line x1="12" y1="4" x2="12" y2="20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
