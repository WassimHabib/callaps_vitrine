import type { StickerIconProps } from "./_types";

export function StickerCog({ size = 64, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      <path
        d="M 50 12 L 56 18 L 64 14 L 68 22 L 78 22 L 78 32 L 86 36 L 82 44 L 88 50 L 82 56 L 86 64 L 78 68 L 78 78 L 68 78 L 64 86 L 56 82 L 50 88 L 44 82 L 36 86 L 32 78 L 22 78 L 22 68 L 14 64 L 18 56 L 12 50 L 18 44 L 14 36 L 22 32 L 22 22 L 32 22 L 36 14 L 44 18 Z"
        fill="#7B61FF"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <circle cx="50" cy="50" r="14" fill="#FFFFFF" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  );
}
