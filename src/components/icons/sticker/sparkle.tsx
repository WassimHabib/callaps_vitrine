import type { StickerIconProps } from "./_types";

export function StickerSparkle({ size = 24, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      <path d="M12 2 L13.5 9 L20 12 L13.5 15 L12 22 L10.5 15 L4 12 L10.5 9 Z"
        fill="#4DAFFF" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}
