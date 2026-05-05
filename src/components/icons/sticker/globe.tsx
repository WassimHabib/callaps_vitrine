import type { StickerIconProps } from "./_types";

export function StickerGlobe({ size = 64, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      <circle cx="50" cy="50" r="36" fill="#4DAFFF" stroke="currentColor" strokeWidth="2.5" />
      <ellipse cx="50" cy="50" rx="36" ry="14" fill="none" stroke="currentColor" strokeWidth="2" />
      <ellipse cx="50" cy="50" rx="14" ry="36" fill="none" stroke="currentColor" strokeWidth="2" />
      <line x1="14" y1="50" x2="86" y2="50" stroke="currentColor" strokeWidth="2" />
      <line x1="50" y1="14" x2="50" y2="86" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
