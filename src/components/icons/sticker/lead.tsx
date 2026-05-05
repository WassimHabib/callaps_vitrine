import type { StickerIconProps } from "./_types";

export function StickerLead({ size = 64, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      <circle cx="50" cy="36" r="14" fill="#4DAFFF" stroke="currentColor" strokeWidth="2.5" />
      <path d="M 22 84 Q 22 60 50 58 Q 78 60 78 84 Z" fill="#4DAFFF" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="74" cy="22" r="14" fill="#7B61FF" stroke="currentColor" strokeWidth="2.5" />
      <polyline points="68,22 73,28 82,16" stroke="#FFFFFF" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
