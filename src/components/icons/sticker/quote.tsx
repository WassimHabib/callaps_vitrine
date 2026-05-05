import type { StickerIconProps } from "./_types";

export function StickerQuote({ size = 32, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      <path d="M 5 22 Q 5 12 13 8 L 13 14 Q 9 16 9 22 L 13 22 L 13 28 L 5 28 Z"
        fill="#7B61FF" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M 19 22 Q 19 12 27 8 L 27 14 Q 23 16 23 22 L 27 22 L 27 28 L 19 28 Z"
        fill="#4DAFFF" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}
