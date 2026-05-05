import type { StickerIconProps } from "./_types";

export function StickerCodeBrackets({ size = 64, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      <rect x="14" y="22" width="72" height="56" rx="6" fill="#16161D" stroke="currentColor" strokeWidth="2.5" />
      <line x1="14" y1="34" x2="86" y2="34" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="22" cy="28" r="1.5" fill="currentColor" />
      <circle cx="28" cy="28" r="1.5" fill="currentColor" />
      <circle cx="34" cy="28" r="1.5" fill="currentColor" />
      <path d="M 32 50 L 22 58 L 32 66" stroke="#4DAFFF" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 68 50 L 78 58 L 68 66" stroke="#4DAFFF" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="55" y1="46" x2="44" y2="68" stroke="#7B61FF" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
