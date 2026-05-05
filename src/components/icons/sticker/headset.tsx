import type { StickerIconProps } from "./_types";

export function StickerHeadset({ size = 64, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      <path d="M 18 56 Q 18 22 50 22 Q 82 22 82 56" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      <rect x="14" y="52" width="20" height="26" rx="4" fill="#7B61FF" stroke="currentColor" strokeWidth="2.5" />
      <rect x="66" y="52" width="20" height="26" rx="4" fill="#7B61FF" stroke="currentColor" strokeWidth="2.5" />
      <path d="M 76 78 Q 76 90 60 90 L 56 90" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <circle cx="56" cy="90" r="3" fill="#4DAFFF" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
