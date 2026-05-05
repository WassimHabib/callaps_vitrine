// src/components/ui/sticker-icon-box.tsx
import { ReactNode } from "react";

type Variant = "card" | "canvas" | "elevated" | "violet" | "blue" | "paper" | "stroke";
type Size = "sm" | "md" | "lg";
type Rotation = -3 | -2 | 0 | 2 | 3;

const variantClasses: Record<Variant, string> = {
  card: "bg-card text-stroke",
  canvas: "bg-bg-deep text-stroke",
  elevated: "bg-card-elevated text-stroke",
  violet: "bg-primary text-stroke",
  blue: "bg-secondary text-stroke",
  paper: "bg-[#FAF7F0] text-[#0B0B0F]",
  stroke: "bg-stroke text-bg-deep",
};

const sizeClasses: Record<Size, string> = {
  sm: "w-10 h-10",
  md: "w-14 h-14",
  lg: "w-16 h-16",
};

const rotationClasses: Record<Rotation, string> = {
  [-3]: "sm:-rotate-[3deg]",
  [-2]: "sm:-rotate-[2deg]",
  [0]: "",
  [2]: "sm:rotate-[2deg]",
  [3]: "sm:rotate-[3deg]",
};

type Props = {
  variant: Variant;
  size?: Size;
  rotation?: Rotation;
  children: ReactNode;
  className?: string;
};

export function StickerIconBox({
  variant,
  size = "md",
  rotation = 0,
  children,
  className = "",
}: Props) {
  const isPaperOrStroke = variant === "paper" || variant === "stroke";
  const borderClass = isPaperOrStroke
    ? "border-[2px] border-[#0B0B0F] [box-shadow:3px_3px_0_#0B0B0F]"
    : "sticker-border-thin sticker-shadow-sm";

  const classes = [
    sizeClasses[size],
    variantClasses[variant],
    "rounded-xl",
    borderClass,
    "flex items-center justify-center flex-shrink-0",
    rotationClasses[rotation],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={classes}>{children}</div>;
}
