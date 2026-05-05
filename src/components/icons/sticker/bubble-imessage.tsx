import type { StickerIconProps } from "./_types";

export function StickerBubbleImessage({ size = 64, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      <path d="M 14 30 Q 14 18 26 18 L 78 18 Q 90 18 90 30 L 90 56 Q 90 68 78 68 L 38 68 L 22 80 Q 16 84 16 78 L 18 68 Q 14 64 14 56 Z"
        fill="#4DAFFF" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <line x1="28" y1="36" x2="72" y2="36" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="28" y1="46" x2="60" y2="46" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
