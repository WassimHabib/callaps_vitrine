import type { StickerIconProps } from "./_types";

export function StickerMicrophone({ size = 64, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      <rect x="36" y="14" width="28" height="50" rx="14" fill="#7B61FF" stroke="currentColor" strokeWidth="2.5" />
      <line x1="42" y1="26" x2="58" y2="26" stroke="currentColor" strokeWidth="2" />
      <line x1="42" y1="34" x2="58" y2="34" stroke="currentColor" strokeWidth="2" />
      <line x1="42" y1="42" x2="58" y2="42" stroke="currentColor" strokeWidth="2" />
      <path d="M 24 50 Q 24 70 50 70 Q 76 70 76 50" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
      <line x1="50" y1="70" x2="50" y2="84" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="38" y1="84" x2="62" y2="84" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
