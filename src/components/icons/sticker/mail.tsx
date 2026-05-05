import type { StickerIconProps } from "./_types";

export function StickerMail({ size = 24, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      <rect x="2" y="5" width="20" height="14" rx="2" fill="#16161D" stroke="currentColor" strokeWidth="2.5" />
      <polyline points="2,7 12,14 22,7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
