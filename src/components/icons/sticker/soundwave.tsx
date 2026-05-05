import type { StickerIconProps } from "./_types";

export function StickerSoundwave({ size = 64, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      <rect x="10" y="42" width="10" height="16" rx="3" fill="#4DAFFF" stroke="currentColor" strokeWidth="2.5" />
      <rect x="26" y="32" width="10" height="36" rx="3" fill="#7B61FF" stroke="currentColor" strokeWidth="2.5" />
      <rect x="42" y="20" width="10" height="60" rx="3" fill="#4DAFFF" stroke="currentColor" strokeWidth="2.5" />
      <rect x="58" y="32" width="10" height="36" rx="3" fill="#7B61FF" stroke="currentColor" strokeWidth="2.5" />
      <rect x="74" y="42" width="10" height="16" rx="3" fill="#4DAFFF" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  );
}
