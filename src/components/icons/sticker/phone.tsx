import type { StickerIconProps } from "./_types";

export function StickerPhone({ size = 24, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      <path d="M 6 3 L 9 3 L 11 8 L 8 10 Q 9.5 14 14 15.5 L 16 12.5 L 21 14.5 L 21 18 Q 21 21 18 21 Q 6 21 3 9 Q 3 6 6 3 Z"
        fill="#7B61FF" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  );
}
