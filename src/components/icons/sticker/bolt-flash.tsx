import type { StickerIconProps } from "./_types";

export function StickerBoltFlash({ size = 64, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      <path d="M 56 8 L 24 56 L 48 56 L 40 92 L 76 40 L 52 40 Z"
        fill="#7B61FF" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
    </svg>
  );
}
