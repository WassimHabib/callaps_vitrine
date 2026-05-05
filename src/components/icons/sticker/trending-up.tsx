import type { StickerIconProps } from "./_types";

export function StickerTrendingUp({ size = 64, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      <polyline points="14,72 36,52 56,62 86,28" stroke="currentColor" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="68,28 86,28 86,46" stroke="currentColor" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="36" cy="52" r="5" fill="#4DAFFF" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="56" cy="62" r="5" fill="#7B61FF" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="86" cy="28" r="5" fill="#4DAFFF" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  );
}
