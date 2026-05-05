import type { StickerIconProps } from "./_types";

export function StickerStar({ size = 24, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      <path d="M 12 2 L 14.5 9 L 22 9.5 L 16.5 14.5 L 18.5 22 L 12 17.5 L 5.5 22 L 7.5 14.5 L 2 9.5 L 9.5 9 Z"
        fill="#4DAFFF" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}
