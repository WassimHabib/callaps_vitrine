import type { StickerIconProps } from "./_types";

export function StickerBriefcase({ size = 64, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      <rect x="34" y="20" width="32" height="14" rx="3" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <rect x="14" y="32" width="72" height="50" rx="6" fill="#7B61FF" stroke="currentColor" strokeWidth="2.5" />
      <line x1="14" y1="52" x2="86" y2="52" stroke="currentColor" strokeWidth="2.5" />
      <rect x="42" y="46" width="16" height="12" rx="2" fill="#FFFFFF" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
