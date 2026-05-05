import type { StickerIconProps } from "./_types";

export function StickerPhoneIncoming({ size = 64, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      <path d="M 26 14 L 38 14 L 46 34 L 34 42 Q 40 58 56 64 L 64 52 L 84 60 L 84 76 Q 84 86 74 86 Q 26 86 14 38 Q 14 28 26 14 Z"
        fill="#4DAFFF" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <line x1="60" y1="20" x2="80" y2="20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <polyline points="74,12 80,20 74,28" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
