import type { StickerIconProps } from "./_types";

export function StickerChartBar({ size = 64, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      <line x1="14" y1="86" x2="86" y2="86" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="14" y1="86" x2="14" y2="14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <rect x="22" y="60" width="14" height="22" fill="#7B61FF" stroke="currentColor" strokeWidth="2.5" />
      <rect x="42" y="40" width="14" height="42" fill="#4DAFFF" stroke="currentColor" strokeWidth="2.5" />
      <rect x="62" y="22" width="14" height="60" fill="#7B61FF" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  );
}
