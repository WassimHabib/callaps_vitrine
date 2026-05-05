// src/components/ui/sticker-card.tsx
"use client";

import Link from "next/link";
import { ReactNode } from "react";

type Variant = "card" | "canvas" | "elevated" | "violet" | "blue" | "paper";
type Rotation = -3 | -2 | 0 | 2 | 3 | 5;

const variantClasses: Record<Variant, string> = {
  card: "bg-card text-stroke",
  canvas: "bg-bg-deep text-stroke",
  elevated: "bg-card-elevated text-stroke",
  violet: "bg-primary text-stroke",
  blue: "bg-secondary text-stroke",
  paper: "bg-[#FAF7F0] text-[#0B0B0F]",
};

const rotationClasses: Record<Rotation, string> = {
  [-3]: "sm:-rotate-[3deg]",
  [-2]: "sm:-rotate-[2deg]",
  [0]: "",
  [2]: "sm:rotate-[2deg]",
  [3]: "sm:rotate-[3deg]",
  [5]: "sm:rotate-[5deg]",
};

type StickerCardProps = {
  variant: Variant;
  rotation?: Rotation;
  hoverable?: boolean;
  href?: string;
  className?: string;
  children: ReactNode;
};

export function StickerCard({
  variant,
  rotation = 0,
  hoverable = true,
  href,
  className = "",
  children,
}: StickerCardProps) {
  const isPaperVariant = variant === "paper";
  const hoverShadow = isPaperVariant
    ? "hover:[box-shadow:10px_10px_0_#0B0B0F]"
    : "hover:[box-shadow:10px_10px_0_var(--color-stroke)]";

  const classes = [
    "relative rounded-2xl",
    isPaperVariant
      ? "border-[3px] border-[#0B0B0F] [box-shadow:8px_8px_0_#0B0B0F]"
      : "sticker-border sticker-shadow",
    "p-7 lg:p-9",
    "transition-transform duration-200",
    variantClasses[variant],
    rotationClasses[rotation],
    hoverable
      ? `hover:-translate-x-0.5 hover:-translate-y-0.5 ${hoverShadow}`
      : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <Link href={href} className={`block ${classes}`}>
        {children}
      </Link>
    );
  }
  return <div className={classes}>{children}</div>;
}

StickerCard.Title = function Title({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={`text-2xl lg:text-3xl font-black tracking-tight leading-tight mb-3 ${className}`}
    >
      {children}
    </h3>
  );
};

StickerCard.Description = function Description({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`text-base leading-relaxed opacity-85 mb-5 ${className}`}>
      {children}
    </p>
  );
};

StickerCard.Pills = function Pills({
  items,
  className = "",
}: {
  items: string[];
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap gap-2 mb-6 ${className}`}>
      {items.map((item) => (
        <span
          key={item}
          className="inline-block px-3 py-1 rounded-full border-[1.5px] border-current text-[11px] font-bold uppercase tracking-wide opacity-90"
        >
          {item}
        </span>
      ))}
    </div>
  );
};

StickerCard.Cta = function Cta({
  children,
  variant = "stroke",
}: {
  children: ReactNode;
  variant?: "stroke" | "ink";
}) {
  const styles =
    variant === "stroke"
      ? "bg-stroke text-bg-deep border-stroke"
      : "bg-bg-deep text-stroke border-stroke";
  return (
    <span
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border-[2px] ${styles}`}
    >
      {children}
      <span aria-hidden>→</span>
    </span>
  );
};
