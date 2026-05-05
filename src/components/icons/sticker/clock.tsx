import type { StickerIconProps } from "./_types";

export function StickerClock({ size = 64, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      <circle cx="50" cy="50" r="36" fill="#16161D" stroke="currentColor" strokeWidth="3" />
      <line x1="50" y1="50" x2="50" y2="28" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="50" y1="50" x2="66" y2="58" stroke="#4DAFFF" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="50" cy="50" r="3" fill="currentColor" />
    </svg>
  );
}
