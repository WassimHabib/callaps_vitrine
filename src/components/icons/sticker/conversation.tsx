import type { StickerIconProps } from "./_types";

export function StickerConversation({ size = 64, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      <path d="M 8 22 Q 8 14 16 14 L 50 14 Q 58 14 58 22 L 58 38 Q 58 46 50 46 L 24 46 L 14 54 Q 10 56 10 52 L 12 46 Q 8 44 8 38 Z"
        fill="#16161D" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M 42 56 Q 42 48 50 48 L 84 48 Q 92 48 92 56 L 92 74 Q 92 82 84 82 L 58 82 L 48 90 Q 44 92 44 88 L 46 82 Q 42 80 42 74 Z"
        fill="#7B61FF" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  );
}
