# Redesign callaps "Sticker Pop on Dark" Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrer toutes les pages publiques de callaps (homepage 17 sections + demo + légales) depuis le visual language SaaS-IA-générique actuel (gradients lisses violet→magenta, glass morphism, gradient borders, gradient text, animations pulse-glow) vers le système distinctif "Sticker Pop on Dark" (bordures blanches 3px + ombres dures offset blanches, palette stricte 4 couleurs brand-book violet/bleu/noir/blanc, 38 icônes SVG custom, 3 mini-scènes alignées brand-book).

**Architecture:** Approche en couches — d'abord les fondations (tokens CSS strict 4 couleurs, install framer-motion, composants `<StickerCard>` / `<StickerIconBox>` adaptés dark, premières icônes), puis migration section-par-section de la homepage, puis demo page, puis pages légales, puis audit final + cleanup. Chaque commit est un checkpoint stable indépendant.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, framer-motion 12 (à installer), TypeScript 5, callaps-specific patterns (default exports, top-level `src/components/*.tsx`, `t.x.y[lang]` translation system via `LanguageContext.tsx`).

**Spec source :** `docs/superpowers/specs/2026-05-05-redesign-callaps-sticker-design.md`
**Brand-book** : `docs/BRAND-BOOK.md` (autorité supérieure au code actuel pour palette + style visuel)

**Notes importantes** :
- callaps utilise des **default exports** pour les composants (`export default function Header()`), à conserver dans toutes les migrations
- Composants section au niveau racine `src/components/` (pas dans `sections/`)
- Système de traduction : toutes les copies textuelles passent par `t.x.y[lang]` — **NE PAS toucher à `translations.ts`**
- Préserver tous les `useLang()` calls
- callaps n'a actuellement **aucune** dépendance `lucide-react` (à confirmer en Task 24 audit) — donc pas de migration d'imports à faire, juste des inline SVG à remplacer

---

## File Structure

### Nouveaux fichiers à créer

```
src/components/ui/
  ├─ sticker-card.tsx           # composant carte unifié dark + sous-composants
  └─ sticker-icon-box.tsx       # carré 56×56 contraste pour icônes

src/components/icons/sticker/
  ├─ index.ts                   # barrel export
  ├─ _types.ts                  # type StickerIconProps commun
  ├─ phone-incoming.tsx
  ├─ phone-missed.tsx
  ├─ microphone.tsx
  ├─ soundwave.tsx
  ├─ bubble-imessage.tsx
  ├─ conversation.tsx
  ├─ transcript.tsx
  ├─ lead.tsx
  ├─ euro.tsx
  ├─ chart-bar.tsx
  ├─ globe.tsx
  ├─ briefcase.tsx
  ├─ restaurant.tsx
  ├─ stethoscope.tsx
  ├─ scissors.tsx
  ├─ tooth.tsx
  ├─ code-brackets.tsx
  ├─ cog.tsx
  ├─ bolt-flash.tsx
  ├─ clock-247.tsx
  ├─ arrow-right.tsx            # copié de wevlap (+adaptation jaune→bleu)
  ├─ check.tsx
  ├─ sparkle.tsx
  ├─ calendar.tsx
  ├─ mail.tsx
  ├─ phone.tsx
  ├─ pin.tsx
  ├─ star.tsx
  ├─ quote.tsx
  ├─ message.tsx
  ├─ plus.tsx
  ├─ shield.tsx
  ├─ target.tsx
  ├─ trending-up.tsx
  ├─ lightning.tsx
  ├─ clock.tsx
  ├─ users.tsx
  ├─ expand.tsx
  └─ headset.tsx

src/components/scenes/
  ├─ hero-appel-entrant.tsx
  ├─ conversation-flow.tsx
  └─ dashboard-resultats.tsx

src/app/dev/sticker-preview/
  └─ page.tsx                   # route de prévisualisation (Phase 1)
```

### Fichiers modifiés

```
src/app/globals.css             # ajout tokens strict 4 couleurs + utilities sticker, suppression .glass/.gradient-*/animate-pulse-*
package.json                    # ajout framer-motion
src/components/Hero.tsx
src/components/ResultatHero.tsx
src/components/Problem.tsx
src/components/Solution.tsx
src/components/Integration.tsx
src/components/Benefits.tsx
src/components/Analysis.tsx
src/components/HowItWorks.tsx
src/components/Results.tsx
src/components/TargetAudience.tsx
src/components/Pricing.tsx
src/components/Testimonials.tsx
src/components/FAQ.tsx
src/components/CTA.tsx
src/components/Header.tsx
src/components/Footer.tsx
src/components/FloatingContact.tsx
src/app/demo/page.tsx
src/app/demo/layout.tsx
src/app/mentions-legales/page.tsx
src/app/confidentialite/page.tsx
```

### Hors scope (intacts)

```
src/app/blog/**                 # entièrement intact
src/app/api/**                  # routes API (pas de UI)
src/lib/translations.ts         # contenu textuel — pas touché
src/lib/LanguageContext.tsx     # i18n context — pas touché
src/lib/blog.ts                 # blog data — pas touché
public/logo.png                 # logo conservé
public/og-image.png             # OG existante (à régénérer plus tard)
```

---

# Phase 1 — Foundations

But : poser les tokens, installer framer-motion, créer les composants réutilisables, et 7 icônes prioritaires + une route `/dev/sticker-preview` pour validation.

---

### Task 1: Mise à jour des tokens et utilities dans `globals.css`

**Files:**
- Modify: `src/app/globals.css` (ré-écriture quasi-complète)

- [ ] **Step 1: Lire l'état actuel**

Run: `cat src/app/globals.css`

Note : le fichier actuel contient `@theme` avec primary/accent/surface tokens, `body { background-color: var(--color-surface-dark); color: white; }`, plusieurs keyframes (`float`, `pulse-glow`, `fade-in-up`, `slide-in-*`, `count-up`, `ping-slow`, `pulse-soft`), classes `.animate-*`, `.glass`, `.gradient-text`, `.gradient-border`.

- [ ] **Step 2: Ré-écrire `src/app/globals.css`**

Remplacer tout le contenu par :

```css
@import "tailwindcss";

@theme {
  /* === Brand-book colors (strict 4) === */
  --color-primary: #7B61FF;       /* violet — accent 1 */
  --color-secondary: #4DAFFF;     /* bleu — accent 2 (remplace magenta) */
  --color-stroke: #FFFFFF;        /* blanc — bordures + texte sur dark */
  --color-bg-deep: #0B0B0F;       /* noir — fond principal */

  /* === Surface variations (dark theme card depths) === */
  --color-card: #16161D;          /* card par défaut */
  --color-card-elevated: #1a1a24; /* card mise en avant */

  /* === Backwards-compat (will be cleaned up in Task 28) === */
  --color-surface: #16161D;
  --color-surface-light: #1a1a24;
  --color-surface-dark: #0B0B0F;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--color-bg-deep);
  color: var(--color-stroke);
  font-feature-settings: "ss01", "cv11";
}

/* Focus visible (a11y) */
*:focus-visible {
  outline: 3px solid var(--color-stroke);
  outline-offset: 2px;
  border-radius: 4px;
}

/* === Sticker utility classes === */

@utility sticker-shadow {
  box-shadow: 8px 8px 0 var(--color-stroke);
}

@utility sticker-shadow-sm {
  box-shadow: 3px 3px 0 var(--color-stroke);
}

@utility sticker-shadow-lg {
  box-shadow: 10px 10px 0 var(--color-stroke);
}

@utility sticker-border {
  border: 3px solid var(--color-stroke);
}

@utility sticker-border-thin {
  border: 2px solid var(--color-stroke);
}

/* === Animations conservées (utiles, pas en conflit avec sticker) === */

@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
}

.animation-delay-200 { animation-delay: 0.2s; }
.animation-delay-400 { animation-delay: 0.4s; }
.animation-delay-600 { animation-delay: 0.6s; }
.animation-delay-800 { animation-delay: 0.8s; }
```

**Ce qui est SUPPRIMÉ explicitement** :
- `.glass` (background rgba 5% + backdrop-filter blur)
- `.gradient-text` (background-clip text avec linear-gradient)
- `.gradient-border` (pseudo-element ::before avec mask gradient)
- `@keyframes pulse-glow`, `@keyframes ping-slow`, `@keyframes pulse-soft`, `@keyframes float`, `@keyframes count-up`, `@keyframes slide-in-left`, `@keyframes slide-in-right`
- `.animate-pulse-glow`, `.animate-ping-slow`, `.animate-pulse-soft`, `.animate-float`, `.animate-slide-in-*`
- Le token `--color-accent: #D946EF` (magenta) — supprimé entièrement
- Le token `--color-accent-light: #E879F9`
- Les tokens `--color-primary-light`, `--color-primary-dark`

- [ ] **Step 3: Vérifier que le build passe**

Run: `npm run build 2>&1 | tail -20`
Expected: build succeeds OR fails with compile errors pointing to files using the deleted classes (which we'll fix in subsequent tasks). Si l'erreur est sur `.glass` / `.gradient-text` etc. dans des composants, c'est NORMAL à ce stade — on les corrigera section par section.

Si la build échoue catastrophiquement (erreurs Tailwind non liées à nos suppressions), faire `git diff src/app/globals.css` et investiguer avant de continuer.

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css
git commit -m "feat(design): sticker tokens + remove gradient/glass/pulse-glow utilities"
```

---

### Task 2: Installer `framer-motion`

**Files:**
- Modify: `package.json` (auto-update by npm)
- Modify: `package-lock.json`

- [ ] **Step 1: Installer**

Run: `npm install framer-motion`

Expected: `added X packages` sans erreur. Verify `package.json` contains `"framer-motion": "^..."`.

- [ ] **Step 2: Vérifier compilation**

Run: `npm run build 2>&1 | tail -10`
Expected: build still succeeds (or shows the same pre-existing component errors).

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install framer-motion for sticker mini-scenes"
```

---

### Task 3: Créer le composant `<StickerCard>` (adapté dark)

**Files:**
- Create: `src/components/ui/sticker-card.tsx`

- [ ] **Step 1: Créer le fichier**

```tsx
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
```

- [ ] **Step 2: Vérifier TypeScript**

Run: `npx tsc --noEmit 2>&1 | grep -E "sticker-card|error TS" | head -10`
Expected: no errors in `sticker-card.tsx`.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/sticker-card.tsx
git commit -m "feat(ui): add StickerCard component (dark variants)"
```

---

### Task 4: Créer le composant `<StickerIconBox>` (adapté dark)

**Files:**
- Create: `src/components/ui/sticker-icon-box.tsx`

- [ ] **Step 1: Créer le fichier**

```tsx
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
```

- [ ] **Step 2: Vérifier TypeScript**

Run: `npx tsc --noEmit 2>&1 | grep -E "sticker-icon-box|error TS" | head -10`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/sticker-icon-box.tsx
git commit -m "feat(ui): add StickerIconBox component (dark variants)"
```

---

### Task 5: Créer le scaffold du module icônes

**Files:**
- Create: `src/components/icons/sticker/_types.ts`
- Create: `src/components/icons/sticker/index.ts`

- [ ] **Step 1: Créer `_types.ts`**

```ts
// src/components/icons/sticker/_types.ts
export type StickerIconProps = {
  size?: number;
  className?: string;
  title?: string;
};
```

- [ ] **Step 2: Créer `index.ts` (vide pour l'instant)**

```ts
// src/components/icons/sticker/index.ts
// Barrel export — chaque icône est ajoutée au fur et à mesure des tâches.
export type { StickerIconProps } from "./_types";
```

- [ ] **Step 3: Commit**

```bash
git add src/components/icons/sticker/
git commit -m "feat(icons): add sticker icons module scaffold"
```

---

### Task 6: 7 icônes prioritaires + route `/dev/sticker-preview`

Toutes les icônes sticker suivent ce template :
- viewBox `0 0 100 100` (icônes service/feature) ou `0 0 24 24` (utilitaires)
- `stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"`
- Fills explicites parmi : `#FFFFFF`, `#7B61FF`, `#4DAFFF`, `#0B0B0F`, `#16161D`
- `<title>` optionnel pour a11y

**Files:**
- Create: `src/components/icons/sticker/phone-incoming.tsx`
- Create: `src/components/icons/sticker/microphone.tsx`
- Create: `src/components/icons/sticker/soundwave.tsx`
- Create: `src/components/icons/sticker/sparkle.tsx`
- Create: `src/components/icons/sticker/arrow-right.tsx`
- Create: `src/components/icons/sticker/check.tsx`
- Create: `src/components/icons/sticker/calendar.tsx`
- Modify: `src/components/icons/sticker/index.ts`
- Create: `src/app/dev/sticker-preview/page.tsx`

- [ ] **Step 1: `phone-incoming.tsx`**

```tsx
import type { StickerIconProps } from "./_types";

export function StickerPhoneIncoming({ size = 64, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      <path d="M 26 14 L 38 14 L 46 34 L 34 42 Q 40 58 56 64 L 64 52 L 84 60 L 84 76 Q 84 86 74 86 Q 26 86 14 38 Q 14 28 26 14 Z"
        fill="#4DAFFF" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <line x1="60" y1="20" x2="80" y2="20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <polyline points="74,12 80,20 74,28" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
```

- [ ] **Step 2: `microphone.tsx`**

```tsx
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
```

- [ ] **Step 3: `soundwave.tsx`**

```tsx
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
```

- [ ] **Step 4: `sparkle.tsx`**

```tsx
import type { StickerIconProps } from "./_types";

export function StickerSparkle({ size = 24, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      <path d="M12 2 L13.5 9 L20 12 L13.5 15 L12 22 L10.5 15 L4 12 L10.5 9 Z"
        fill="#4DAFFF" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}
```

- [ ] **Step 5: `arrow-right.tsx`**

```tsx
import type { StickerIconProps } from "./_types";

export function StickerArrowRight({ size = 24, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <polyline points="13,5 20,12 13,19" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
```

- [ ] **Step 6: `check.tsx`**

```tsx
import type { StickerIconProps } from "./_types";

export function StickerCheck({ size = 24, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      <circle cx="12" cy="12" r="10" fill="#4DAFFF" stroke="currentColor" strokeWidth="2.5" />
      <polyline points="7,12 11,16 17,9" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
```

- [ ] **Step 7: `calendar.tsx`**

```tsx
import type { StickerIconProps } from "./_types";

export function StickerCalendar({ size = 24, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      <rect x="3" y="5" width="18" height="16" rx="2" fill="#16161D" stroke="currentColor" strokeWidth="2.5" />
      <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2.5" />
      <line x1="8" y1="3" x2="8" y2="7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="16" y1="3" x2="16" y2="7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="12" cy="15" r="2.5" fill="#7B61FF" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
```

- [ ] **Step 8: Mettre à jour `src/components/icons/sticker/index.ts`**

```ts
export type { StickerIconProps } from "./_types";
export { StickerPhoneIncoming } from "./phone-incoming";
export { StickerMicrophone } from "./microphone";
export { StickerSoundwave } from "./soundwave";
export { StickerSparkle } from "./sparkle";
export { StickerArrowRight } from "./arrow-right";
export { StickerCheck } from "./check";
export { StickerCalendar } from "./calendar";
```

- [ ] **Step 9: Créer `/dev/sticker-preview` route**

Comme pour Wevlap, le compound API `<StickerCard>.Title` ne marche pas en Server Component → split en server/client.

Create `src/app/dev/sticker-preview/page.tsx` :

```tsx
import { StickerPreviewClient } from "./client";

export const metadata = {
  title: "Sticker Preview (dev only)",
  robots: { index: false, follow: false },
};

export default function StickerPreviewPage() {
  return <StickerPreviewClient />;
}
```

Create `src/app/dev/sticker-preview/client.tsx` :

```tsx
"use client";

import { StickerCard } from "@/components/ui/sticker-card";
import { StickerIconBox } from "@/components/ui/sticker-icon-box";
import {
  StickerPhoneIncoming,
  StickerMicrophone,
  StickerSoundwave,
  StickerSparkle,
  StickerArrowRight,
  StickerCheck,
  StickerCalendar,
} from "@/components/icons/sticker";

export function StickerPreviewClient() {
  return (
    <main className="min-h-screen bg-bg-deep p-8 md:p-16">
      <h1 className="text-4xl font-black mb-2 text-stroke">Sticker Preview (Dark)</h1>
      <p className="text-stroke/70 mb-12">Page interne — vérification du système de design.</p>

      <h2 className="text-2xl font-black mb-6 text-stroke">Icônes (7/38)</h2>
      <div className="flex flex-wrap gap-4 mb-16">
        {[
          { Icon: StickerPhoneIncoming, name: "phone-incoming" },
          { Icon: StickerMicrophone, name: "microphone" },
          { Icon: StickerSoundwave, name: "soundwave" },
          { Icon: StickerSparkle, name: "sparkle" },
          { Icon: StickerArrowRight, name: "arrow-right" },
          { Icon: StickerCheck, name: "check" },
          { Icon: StickerCalendar, name: "calendar" },
        ].map(({ Icon, name }) => (
          <div key={name} className="flex flex-col items-center gap-2">
            <StickerIconBox variant="card" size="lg">
              <Icon size={36} className="text-stroke" />
            </StickerIconBox>
            <span className="text-xs font-mono text-stroke/70">{name}</span>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-black mb-6 text-stroke">Cartes — toutes les variantes</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {(["card", "canvas", "elevated", "violet", "blue", "paper"] as const).map((variant) => (
          <StickerCard key={variant} variant={variant}>
            <StickerIconBox variant={variant === "card" ? "violet" : "card"} size="md" className="mb-4">
              <StickerPhoneIncoming size={28} />
            </StickerIconBox>
            <StickerCard.Title>Variant {variant}</StickerCard.Title>
            <StickerCard.Description>Test de rendu pour la variante {variant}.</StickerCard.Description>
            <StickerCard.Pills items={["Pill A", "Pill B", "Pill C"]} />
            <StickerCard.Cta>Découvrir</StickerCard.Cta>
          </StickerCard>
        ))}
      </div>

      <h2 className="text-2xl font-black mb-6 text-stroke">Box icônes — toutes les variantes</h2>
      <div className="flex flex-wrap gap-4 mb-16">
        {(["card", "canvas", "elevated", "violet", "blue", "paper", "stroke"] as const).map((variant) => (
          <StickerIconBox key={variant} variant={variant} size="lg">
            <StickerSparkle size={32} />
          </StickerIconBox>
        ))}
      </div>

      <h2 className="text-2xl font-black mb-6 text-stroke">Rotations (visible ≥ 640px)</h2>
      <div className="flex flex-wrap gap-6 mb-16">
        {([-3, -2, 0, 2, 3] as const).map((rot) => (
          <StickerIconBox key={rot} variant="card" size="lg" rotation={rot}>
            <StickerCheck size={32} />
          </StickerIconBox>
        ))}
      </div>
    </main>
  );
}
```

- [ ] **Step 10: Vérifier**

Run: `npm run build 2>&1 | tail -15`
Expected: build succeeds, route `/dev/sticker-preview` listée. Si autres erreurs sur des composants `Hero.tsx` etc. (à cause du Task 1 cleanup CSS), c'est NORMAL — on les fixe phase 2.

Optionnel : `npm run dev` puis ouvrir `http://localhost:3000/dev/sticker-preview` pour validation visuelle.

- [ ] **Step 11: Commit**

```bash
git add src/components/icons/sticker/ src/app/dev/
git commit -m "feat(foundations): 7 priority icons + dev preview route"
```

---

# Phase 2 — Homepage migration

But : migrer les 17 sections + créer les ~31 icônes restantes au fur et à mesure + 3 mini-scènes. À la fin de la phase 2, la homepage entière respecte le système Sticker on Dark, build passe, audit grep clean.

---

### Task 7: Migrer `Hero` + créer mini-scène 1 "Appel entrant"

**Files:**
- Create: `src/components/scenes/hero-appel-entrant.tsx`
- Modify: `src/components/icons/sticker/index.ts`
- Modify: `src/components/Hero.tsx` (ré-écriture complète)

- [ ] **Step 1: Créer la mini-scène 1 `hero-appel-entrant.tsx`**

```tsx
// src/components/scenes/hero-appel-entrant.tsx
"use client";

import { motion } from "framer-motion";

export function HeroAppelEntrant({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 400"
      className={className}
      role="img"
      aria-labelledby="hero-appel-title hero-appel-desc"
    >
      <title id="hero-appel-title">Appel entrant en cours</title>
      <desc id="hero-appel-desc">
        Un iPhone sticker affichant un appel entrant avec onde sonore et boutons décrocher / refuser.
      </desc>

      {/* iPhone mockup */}
      <g>
        {/* phone body */}
        <rect x="120" y="40" width="240" height="340" rx="36" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="6" />
        {/* phone screen (dark) */}
        <rect x="135" y="55" width="210" height="310" rx="22" fill="#0B0B0F" />
        {/* notch */}
        <rect x="200" y="55" width="80" height="22" rx="11" fill="#FFFFFF" />

        {/* "Numéro inconnu" label */}
        <text x="240" y="130" fontSize="14" fontWeight="900" fill="#FFFFFF" textAnchor="middle" opacity="0.7">
          NUMÉRO INCONNU
        </text>
        {/* "Appel entrant" big text */}
        <text x="240" y="160" fontSize="22" fontWeight="900" fill="#FFFFFF" textAnchor="middle">
          Appel entrant
        </text>

        {/* Soundwave inside screen */}
        <motion.g animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.2, repeat: Infinity }} style={{ transformOrigin: "240px 220px" }}>
          <rect x="200" y="212" width="6" height="16" rx="2" fill="#4DAFFF" />
          <rect x="212" y="206" width="6" height="28" rx="2" fill="#7B61FF" />
          <rect x="224" y="200" width="6" height="40" rx="2" fill="#4DAFFF" />
          <rect x="236" y="194" width="6" height="52" rx="2" fill="#7B61FF" />
          <rect x="248" y="200" width="6" height="40" rx="2" fill="#4DAFFF" />
          <rect x="260" y="206" width="6" height="28" rx="2" fill="#7B61FF" />
          <rect x="272" y="212" width="6" height="16" rx="2" fill="#4DAFFF" />
        </motion.g>

        {/* Decline button (red) */}
        <circle cx="180" cy="320" r="22" fill="#FB7185" stroke="#FFFFFF" strokeWidth="3" />
        <line x1="172" y1="312" x2="188" y2="328" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
        <line x1="188" y1="312" x2="172" y2="328" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />

        {/* Answer button (green) with subtle glow */}
        <motion.g animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ transformOrigin: "300px 320px" }}>
          <circle cx="300" cy="320" r="22" fill="#4DAFFF" stroke="#FFFFFF" strokeWidth="3" />
          <path d="M 290 314 L 294 314 L 297 320 L 294 322 Q 296 326 300 328 L 302 325 L 308 328 L 308 332 Q 308 334 305 334 Q 290 334 286 318 Q 286 314 290 314 Z" fill="#FFFFFF" />
        </motion.g>
      </g>

      {/* Floating sparkles around */}
      <motion.path
        d="M 30 60 L 34 70 L 44 74 L 34 78 L 30 88 L 26 78 L 16 74 L 26 70 Z"
        fill="#7B61FF" stroke="#FFFFFF" strokeWidth="2"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 12, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        style={{ transformOrigin: "30px 74px" }}
      />
      <motion.circle
        cx="445" cy="120" r="8" fill="#4DAFFF" stroke="#FFFFFF" strokeWidth="2.5"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      />
      <motion.path
        d="M 440 340 L 444 348 L 452 352 L 444 356 L 440 364 L 436 356 L 428 352 L 436 348 Z"
        fill="#7B61FF" stroke="#FFFFFF" strokeWidth="2"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "440px 352px" }}
      />
    </svg>
  );
}
```

- [ ] **Step 2: Lire l'ancien `Hero.tsx` pour préserver les copies**

Run: `cat src/components/Hero.tsx`

Capter : tous les `t.hero.X[lang]` calls, les liens CTA (probablement `#pricing` ou `/demo`), la structure 2-col éventuelle.

- [ ] **Step 3: Ré-écrire `src/components/Hero.tsx`**

```tsx
// src/components/Hero.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";
import { StickerCalendar, StickerArrowRight } from "@/components/icons/sticker";
import { HeroAppelEntrant } from "@/components/scenes/hero-appel-entrant";

export default function Hero() {
  const { lang } = useLang();

  return (
    <section className="relative min-h-screen flex items-center bg-bg-deep overflow-hidden pt-20 lg:pt-24">
      {/* Pattern dots discret */}
      <div
        className="absolute inset-0 -z-10 opacity-30"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Texte */}
          <div className="lg:col-span-7">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card border-[2px] border-stroke text-stroke text-sm font-bold mb-8 [box-shadow:3px_3px_0_var(--color-stroke)]">
                <span className="w-2 h-2 rounded-full bg-secondary" />
                {t.hero.badge?.[lang] ?? "Disponible 24/7"}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-black tracking-[-0.04em] text-stroke mb-6 leading-[0.95]"
            >
              {t.hero.title[lang]}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-stroke/85 mb-10 max-w-2xl leading-relaxed"
            >
              {t.hero.subtitle[lang]}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/demo"
                className="group inline-flex items-center justify-center gap-3 bg-primary text-stroke px-8 py-4 rounded-full font-bold text-lg border-[3px] border-stroke [box-shadow:4px_4px_0_var(--color-stroke)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:[box-shadow:6px_6px_0_var(--color-stroke)] transition-transform duration-200 min-h-[56px]"
              >
                <StickerCalendar size={22} />
                {t.hero.ctaPrimary[lang]}
                <StickerArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                href="#solution"
                className="inline-flex items-center justify-center gap-2 bg-card text-stroke px-8 py-4 rounded-full font-bold text-lg border-[3px] border-stroke [box-shadow:4px_4px_0_var(--color-secondary)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:[box-shadow:6px_6px_0_var(--color-secondary)] transition-transform duration-200 min-h-[56px]"
              >
                {t.hero.ctaSecondary[lang]}
              </Link>
            </motion.div>
          </div>

          {/* Mini-scène */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="lg:col-span-5"
          >
            <HeroAppelEntrant className="w-full h-auto max-w-[480px] mx-auto" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

**IMPORTANT** : si les translation keys utilisées (`t.hero.title`, `t.hero.subtitle`, etc.) n'existent pas dans `translations.ts`, lire ce fichier (`cat src/lib/translations.ts | head -60`) et adapter les noms de keys à ce qui existe réellement. NE PAS créer de nouveau t.hero.X — utiliser les existants.

- [ ] **Step 4: Vérifier**

Run: `npm run build 2>&1 | tail -10`
Expected: build succeeds (Hero is now sticker-styled, but other sections still use deleted classes — those errors persist until migrated).

- [ ] **Step 5: Commit**

```bash
git add src/components/scenes/hero-appel-entrant.tsx src/components/Hero.tsx
git commit -m "feat(homepage): migrate Hero to sticker + mini-scene 'Appel entrant'"
```

---

### Task 8: Migrer `ResultatHero`

**Files:**
- Modify: `src/components/ResultatHero.tsx`

- [ ] **Step 1: Lire**

Run: `cat src/components/ResultatHero.tsx`

C'est probablement une section "transition" entre Hero et Problem qui montre rapidement les chiffres-clés (combien d'appels traités, conversion, etc.).

- [ ] **Step 2: Ré-écrire en sticker**

Pattern :
- Section `bg-card` (#16161D)
- Header avec sticker badge éventuel
- Stats en grille 3-4 colonnes : chaque stat dans `<StickerCard variant="canvas">` avec gros nombre `font-black`, label, optionnellement une icône `<StickerCheck>` ou `<StickerTrendingUp>` (la dernière sera créée Task 15 — utiliser `StickerCheck` en attendant)

Préserver tous les `t.X[lang]` calls et les chiffres exacts.

- [ ] **Step 3: Vérifier build et commit**

```bash
npm run build 2>&1 | tail -10
git add src/components/ResultatHero.tsx
git commit -m "feat(homepage): migrate ResultatHero to sticker"
```

---

### Task 9: Migrer `Problem` + créer icône `phone-missed`

**Files:**
- Create: `src/components/icons/sticker/phone-missed.tsx`
- Modify: `src/components/icons/sticker/index.ts`
- Modify: `src/components/Problem.tsx`

- [ ] **Step 1: Créer `phone-missed.tsx`**

```tsx
import type { StickerIconProps } from "./_types";

export function StickerPhoneMissed({ size = 64, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      <path d="M 26 14 L 38 14 L 46 34 L 34 42 Q 40 58 56 64 L 64 52 L 84 60 L 84 76 Q 84 86 74 86 Q 26 86 14 38 Q 14 28 26 14 Z"
        fill="#16161D" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      {/* X mark */}
      <circle cx="74" cy="22" r="14" fill="#FB7185" stroke="currentColor" strokeWidth="2.5" />
      <line x1="68" y1="16" x2="80" y2="28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="80" y1="16" x2="68" y2="28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
```

- [ ] **Step 2: Mettre à jour `index.ts`**

Append:
```ts
export { StickerPhoneMissed } from "./phone-missed";
```

- [ ] **Step 3: Lire et ré-écrire `Problem.tsx`**

Pattern :
- Section `bg-bg-deep`
- Header avec sticker badge + h2 (préserver `t.problem.title[lang]`)
- Grille de cards `<StickerCard variant="card">` représentant chaque problème (appels manqués, perte de revenu, surcharge admin, etc.) avec icônes sticker (`StickerPhoneMissed`, `StickerClock` à créer Task 12 — utiliser `StickerPhoneMissed` 2 fois en attendant si nécessaire, ou retirer l'icône de la 2ème card)
- Préserver verbatim toutes les copies via `t.X[lang]`

- [ ] **Step 4: Build + commit**

```bash
npm run build 2>&1 | tail -10
git add src/components/icons/sticker/phone-missed.tsx src/components/icons/sticker/index.ts src/components/Problem.tsx
git commit -m "feat(homepage): migrate Problem + add phone-missed icon"
```

---

### Task 10: Migrer `Solution` (section bg-violet plein) + créer icône `cog`

**Files:**
- Create: `src/components/icons/sticker/cog.tsx`
- Modify: `src/components/icons/sticker/index.ts`
- Modify: `src/components/Solution.tsx`

- [ ] **Step 1: Créer `cog.tsx`**

```tsx
import type { StickerIconProps } from "./_types";

export function StickerCog({ size = 64, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      <path d="M 50 12 L 56 18 L 64 14 L 68 22 L 78 22 L 78 32 L 86 36 L 82 44 L 88 50 L 82 56 L 86 64 L 78 68 L 78 78 L 68 78 L 64 86 L 56 82 L 50 88 L 44 82 L 36 86 L 32 78 L 22 78 L 22 68 L 14 64 L 18 56 L 12 50 L 18 44 L 14 36 L 22 32 L 22 22 L 32 22 L 36 14 L 44 18 Z"
        fill="#7B61FF" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="50" cy="50" r="14" fill="#FFFFFF" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  );
}
```

- [ ] **Step 2: Mettre à jour `index.ts`**

```ts
export { StickerCog } from "./cog";
```

- [ ] **Step 3: Lire et ré-écrire `Solution.tsx`**

Pattern (section ACCENT brand violet plein) :
- `<section className="relative py-20 md:py-28 bg-primary overflow-hidden">`
- Pattern dots blancs subtil (opacity-20)
- Header sticker badge `bg-card border-stroke` + h2 blanc pur (préserver `t.solution.title[lang]`)
- Grille de cards : variantes alternées **`canvas`** (#0B0B0F qui se découpe sur le violet) et **`paper`** (light surprise — 1 max), pas de `card` ou `violet` ici (sinon contraste insuffisant)
- Icônes utilisées : `StickerMicrophone`, `StickerSoundwave`, `StickerCog`, `StickerSparkle` selon les solutions listées
- CTA en bas `<StickerCard.Cta>` ou bouton sticker `bg-stroke text-bg-deep`

**ATTENTION contraste** : sur fond violet `#7B61FF`, les cards `card` (#16161D) sont OK mais perdent du punch. Préférer `canvas` (#0B0B0F) ou `paper` (#FAF7F0) pour max contraste.

- [ ] **Step 4: Build + commit**

```bash
npm run build 2>&1 | tail -10
git add src/components/icons/sticker/cog.tsx src/components/icons/sticker/index.ts src/components/Solution.tsx
git commit -m "feat(homepage): migrate Solution (bg-violet) + add cog icon"
```

---

### Task 11: Migrer `Integration` + créer icône `code-brackets`

**Files:**
- Create: `src/components/icons/sticker/code-brackets.tsx`
- Modify: `src/components/icons/sticker/index.ts`
- Modify: `src/components/Integration.tsx`

- [ ] **Step 1: Créer `code-brackets.tsx`**

```tsx
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
```

- [ ] **Step 2: Update index, lire et ré-écrire `Integration.tsx`**

```ts
export { StickerCodeBrackets } from "./code-brackets";
```

Pattern Integration:
- Section `bg-card`
- Header sticker badge + h2 (préserver `t.integration.title[lang]`)
- Grille de cards petites (variant `canvas`) listant les intégrations partenaires (Slack, Notion, Google Calendar, HubSpot, etc.). Si les logos partenaires existent en image, les afficher dans la card. Sinon, utiliser `StickerCodeBrackets` en placeholder avec le nom du partenaire.
- Préserver toutes les copies via `t.X[lang]`

- [ ] **Step 3: Build + commit**

```bash
npm run build 2>&1 | tail -10
git add src/components/icons/sticker/code-brackets.tsx src/components/icons/sticker/index.ts src/components/Integration.tsx
git commit -m "feat(homepage): migrate Integration + add code-brackets icon"
```

---

### Task 12: Migrer `Benefits` + créer 5 icônes (globe, bolt-flash, clock-247, shield, headset)

**Files:**
- Create: `src/components/icons/sticker/globe.tsx`
- Create: `src/components/icons/sticker/bolt-flash.tsx`
- Create: `src/components/icons/sticker/clock-247.tsx`
- Create: `src/components/icons/sticker/shield.tsx`
- Create: `src/components/icons/sticker/headset.tsx`
- Modify: `src/components/icons/sticker/index.ts`
- Modify: `src/components/Benefits.tsx`

- [ ] **Step 1: `globe.tsx`**

```tsx
import type { StickerIconProps } from "./_types";

export function StickerGlobe({ size = 64, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      <circle cx="50" cy="50" r="36" fill="#4DAFFF" stroke="currentColor" strokeWidth="2.5" />
      <ellipse cx="50" cy="50" rx="36" ry="14" fill="none" stroke="currentColor" strokeWidth="2" />
      <ellipse cx="50" cy="50" rx="14" ry="36" fill="none" stroke="currentColor" strokeWidth="2" />
      <line x1="14" y1="50" x2="86" y2="50" stroke="currentColor" strokeWidth="2" />
      <line x1="50" y1="14" x2="50" y2="86" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
```

- [ ] **Step 2: `bolt-flash.tsx`**

```tsx
import type { StickerIconProps } from "./_types";

export function StickerBoltFlash({ size = 64, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      <path d="M 56 8 L 24 56 L 48 56 L 40 92 L 76 40 L 52 40 Z"
        fill="#7B61FF" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
    </svg>
  );
}
```

- [ ] **Step 3: `clock-247.tsx`**

```tsx
import type { StickerIconProps } from "./_types";

export function StickerClock247({ size = 64, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      <circle cx="50" cy="50" r="36" fill="#16161D" stroke="currentColor" strokeWidth="3" />
      <text x="50" y="46" fontSize="14" fontWeight="900" fill="#FFFFFF" textAnchor="middle">24</text>
      <line x1="36" y1="50" x2="64" y2="50" stroke="currentColor" strokeWidth="2" />
      <text x="50" y="68" fontSize="14" fontWeight="900" fill="#4DAFFF" textAnchor="middle">7</text>
      <circle cx="20" cy="20" r="4" fill="#4DAFFF" stroke="currentColor" strokeWidth="2" />
      <circle cx="80" cy="20" r="4" fill="#7B61FF" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
```

- [ ] **Step 4: `shield.tsx`**

```tsx
import type { StickerIconProps } from "./_types";

export function StickerShield({ size = 64, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      <path d="M 50 12 L 82 24 L 82 50 Q 82 78 50 90 Q 18 78 18 50 L 18 24 Z"
        fill="#4DAFFF" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <polyline points="36,52 46,62 64,42" stroke="#FFFFFF" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
```

- [ ] **Step 5: `headset.tsx`**

```tsx
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
```

- [ ] **Step 6: Update `index.ts`**

```ts
export { StickerGlobe } from "./globe";
export { StickerBoltFlash } from "./bolt-flash";
export { StickerClock247 } from "./clock-247";
export { StickerShield } from "./shield";
export { StickerHeadset } from "./headset";
```

- [ ] **Step 7: Lire et ré-écrire `Benefits.tsx`**

Pattern :
- Section `bg-bg-deep`
- Header sticker badge + h2 (préserver `t.benefits.title[lang]`)
- Grille 2 ou 3 colonnes de cards `<StickerCard variant="card">` listant les bénéfices
- Mapping suggéré (ajuster selon copies réelles dans translations) : disponibilité 24/7 → `StickerClock247`, multi-langue → `StickerGlobe`, instantané → `StickerBoltFlash`, sécurisé/RGPD → `StickerShield`, support → `StickerHeadset`
- Variantes de cards : alterner `card` et `elevated` pour rythme

- [ ] **Step 8: Build + commit**

```bash
npm run build 2>&1 | tail -10
git add src/components/icons/sticker/ src/components/Benefits.tsx
git commit -m "feat(homepage): migrate Benefits + add 5 benefit icons"
```

---

### Task 13: Migrer `Analysis` (section bg-secondary plein) + créer icônes `chart-bar`, `transcript`, `clock`

**Files:**
- Create: `src/components/icons/sticker/chart-bar.tsx`
- Create: `src/components/icons/sticker/transcript.tsx`
- Create: `src/components/icons/sticker/clock.tsx`
- Modify: `src/components/icons/sticker/index.ts`
- Modify: `src/components/Analysis.tsx`

- [ ] **Step 1: `chart-bar.tsx`**

```tsx
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
```

- [ ] **Step 2: `transcript.tsx`**

```tsx
import type { StickerIconProps } from "./_types";

export function StickerTranscript({ size = 64, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      <path d="M 18 14 L 64 14 L 80 30 L 80 88 L 18 88 Z" fill="#16161D" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M 64 14 L 64 30 L 80 30" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <line x1="28" y1="44" x2="70" y2="44" stroke="#FFFFFF" strokeWidth="2" />
      <line x1="28" y1="54" x2="60" y2="54" stroke="#FFFFFF" strokeWidth="2" />
      <line x1="28" y1="64" x2="68" y2="64" stroke="#FFFFFF" strokeWidth="2" />
      <line x1="28" y1="74" x2="56" y2="74" stroke="#FFFFFF" strokeWidth="2" />
      <circle cx="74" cy="78" r="6" fill="#4DAFFF" stroke="currentColor" strokeWidth="2" />
      <text x="74" y="81" fontSize="6" fontWeight="900" fill="#FFFFFF" textAnchor="middle">⏱</text>
    </svg>
  );
}
```

- [ ] **Step 3: `clock.tsx`**

```tsx
import type { StickerIconProps } from "./_types";

export function StickerClock({ size = 64, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      <circle cx="50" cy="50" r="36" fill="#16161D" stroke="currentColor" strokeWidth="3" />
      <line x1="50" y1="50" x2="50" y2="28" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="50" y1="50" x2="66" y2="58" stroke="#4DAFFF" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="50" cy="50" r="3" fill="currentColor" />
    </svg>
  );
}
```

- [ ] **Step 4: Update index + ré-écrire `Analysis.tsx`**

```ts
export { StickerChartBar } from "./chart-bar";
export { StickerTranscript } from "./transcript";
export { StickerClock } from "./clock";
```

Pattern Analysis (section bg-secondary plein BLEU) :
- `<section className="relative py-20 md:py-28 bg-secondary overflow-hidden">`
- ATTENTION CONTRASTE : texte blanc sur bleu #4DAFFF passe juste WCAG AA (4.05:1). Si lisibilité limite, basculer le H2 en `text-bg-deep` (noir sur bleu = ratio 5.2:1).
- Pattern dots blancs subtil (opacity-25)
- Header sticker badge `bg-card border-stroke` + h2 (préserver `t.analysis.title[lang]`)
- Grille de features (chart, transcript, clock, etc.) en cards `canvas` ou `paper`
- Si la section existante affiche un mockup dashboard, le restyler en sticker simple (border-stroke + shadow blanc)

- [ ] **Step 5: Build + commit**

```bash
npm run build 2>&1 | tail -10
git add src/components/icons/sticker/ src/components/Analysis.tsx
git commit -m "feat(homepage): migrate Analysis (bg-secondary) + add 3 icons"
```

---

### Task 14: Migrer `HowItWorks` + mini-scène 2 "Conversation flow" + 3 icônes (bubble-imessage, conversation, lead)

**Files:**
- Create: `src/components/icons/sticker/bubble-imessage.tsx`
- Create: `src/components/icons/sticker/conversation.tsx`
- Create: `src/components/icons/sticker/lead.tsx`
- Modify: `src/components/icons/sticker/index.ts`
- Create: `src/components/scenes/conversation-flow.tsx`
- Modify: `src/components/HowItWorks.tsx`

- [ ] **Step 1: `bubble-imessage.tsx`**

```tsx
import type { StickerIconProps } from "./_types";

export function StickerBubbleImessage({ size = 64, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      <path d="M 14 30 Q 14 18 26 18 L 78 18 Q 90 18 90 30 L 90 56 Q 90 68 78 68 L 38 68 L 22 80 Q 16 84 16 78 L 18 68 Q 14 64 14 56 Z"
        fill="#4DAFFF" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <line x1="28" y1="36" x2="72" y2="36" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="28" y1="46" x2="60" y2="46" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
```

- [ ] **Step 2: `conversation.tsx`**

```tsx
import type { StickerIconProps } from "./_types";

export function StickerConversation({ size = 64, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      {/* incoming bubble (left) */}
      <path d="M 8 22 Q 8 14 16 14 L 50 14 Q 58 14 58 22 L 58 38 Q 58 46 50 46 L 24 46 L 14 54 Q 10 56 10 52 L 12 46 Q 8 44 8 38 Z"
        fill="#16161D" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      {/* outgoing bubble (right) */}
      <path d="M 42 56 Q 42 48 50 48 L 84 48 Q 92 48 92 56 L 92 74 Q 92 82 84 82 L 58 82 L 48 90 Q 44 92 44 88 L 46 82 Q 42 80 42 74 Z"
        fill="#7B61FF" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  );
}
```

- [ ] **Step 3: `lead.tsx`**

```tsx
import type { StickerIconProps } from "./_types";

export function StickerLead({ size = 64, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      <circle cx="50" cy="36" r="14" fill="#4DAFFF" stroke="currentColor" strokeWidth="2.5" />
      <path d="M 22 84 Q 22 60 50 58 Q 78 60 78 84 Z" fill="#4DAFFF" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      {/* check badge top-right */}
      <circle cx="74" cy="22" r="14" fill="#7B61FF" stroke="currentColor" strokeWidth="2.5" />
      <polyline points="68,22 73,28 82,16" stroke="#FFFFFF" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
```

- [ ] **Step 4: Update index**

```ts
export { StickerBubbleImessage } from "./bubble-imessage";
export { StickerConversation } from "./conversation";
export { StickerLead } from "./lead";
```

- [ ] **Step 5: Créer mini-scène 2 `conversation-flow.tsx`**

```tsx
// src/components/scenes/conversation-flow.tsx
"use client";

import { motion } from "framer-motion";

export function ConversationFlow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 360" className={className} role="img" aria-labelledby="conv-title conv-desc">
      <title id="conv-title">Conversation entre client et agent IA</title>
      <desc id="conv-desc">Deux bulles de message iMessage entre un client et l'agent callaps.</desc>

      {/* Avatar incoming (silhouette client, NOT a robot) */}
      <circle cx="50" cy="80" r="22" fill="#16161D" stroke="#FFFFFF" strokeWidth="3" />
      <circle cx="50" cy="74" r="8" fill="#FFFFFF" />
      <path d="M 36 92 Q 36 86 50 86 Q 64 86 64 92" fill="#FFFFFF" />

      {/* Incoming bubble (left, gray) */}
      <motion.g initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
        <path d="M 84 50 Q 84 38 96 38 L 380 38 Q 392 38 392 50 L 392 110 Q 392 122 380 122 L 110 122 L 92 138 Q 84 142 84 134 L 86 122 Q 80 118 80 110 Z"
          fill="#16161D" stroke="#FFFFFF" strokeWidth="3" strokeLinejoin="round" />
        <text x="100" y="68" fontSize="14" fontWeight="500" fill="#FFFFFF">
          Bonjour, je voudrais réserver
        </text>
        <text x="100" y="90" fontSize="14" fontWeight="500" fill="#FFFFFF">
          une table pour 4 ce soir à 20h
        </text>
      </motion.g>

      {/* Sparkle in middle */}
      <motion.path
        d="M 240 160 L 244 170 L 254 174 L 244 178 L 240 188 L 236 178 L 226 174 L 236 170 Z"
        fill="#4DAFFF" stroke="#FFFFFF" strokeWidth="2"
        animate={{ scale: [1, 1.3, 1], rotate: [0, 30, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        style={{ transformOrigin: "240px 174px" }}
      />

      {/* Avatar outgoing (callaps "C" letter, NOT a robot mascot) */}
      <circle cx="430" cy="280" r="22" fill="#7B61FF" stroke="#FFFFFF" strokeWidth="3" />
      <text x="430" y="288" fontSize="20" fontWeight="900" fill="#FFFFFF" textAnchor="middle">C</text>

      {/* Outgoing bubble (right, violet) */}
      <motion.g initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.6 }}>
        <path d="M 88 250 Q 88 238 100 238 L 384 238 Q 396 238 396 250 L 396 320 Q 396 332 384 332 L 116 332 L 98 348 Q 88 352 88 344 L 90 332 Q 84 328 84 320 Z"
          fill="#7B61FF" stroke="#FFFFFF" strokeWidth="3" strokeLinejoin="round" />
        <text x="104" y="270" fontSize="14" fontWeight="500" fill="#FFFFFF">
          Avec plaisir ! Je vous confirme la
        </text>
        <text x="104" y="292" fontSize="14" fontWeight="500" fill="#FFFFFF">
          réservation pour 4 personnes ce soir
        </text>
        <text x="104" y="314" fontSize="14" fontWeight="500" fill="#FFFFFF">
          à 20h. À tout à l&apos;heure 👋
        </text>
      </motion.g>
    </svg>
  );
}
```

- [ ] **Step 6: Lire et ré-écrire `HowItWorks.tsx`**

Pattern :
- Section `bg-card`
- Header sticker badge + h2 (préserver `t.howItWorks.title[lang]`)
- Layout 2-cols : à gauche les étapes (1, 2, 3, 4) en cards `<StickerCard variant="canvas">` numérotées, à droite la `<ConversationFlow />` mini-scène
- Préserver le contenu des étapes via `t.X[lang]`

- [ ] **Step 7: Build + commit**

```bash
npm run build 2>&1 | tail -10
git add src/components/icons/sticker/ src/components/scenes/conversation-flow.tsx src/components/HowItWorks.tsx
git commit -m "feat(homepage): migrate HowItWorks + mini-scene 'Conversation flow'"
```

---

### Task 15: Migrer `Results` + mini-scène 3 "Dashboard résultats" + icône `trending-up`

**Files:**
- Create: `src/components/icons/sticker/trending-up.tsx`
- Modify: `src/components/icons/sticker/index.ts`
- Create: `src/components/scenes/dashboard-resultats.tsx`
- Modify: `src/components/Results.tsx`

- [ ] **Step 1: `trending-up.tsx`**

```tsx
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
```

- [ ] **Step 2: Update index**

```ts
export { StickerTrendingUp } from "./trending-up";
```

- [ ] **Step 3: Créer mini-scène 3 `dashboard-resultats.tsx`**

```tsx
// src/components/scenes/dashboard-resultats.tsx
"use client";

import { motion } from "framer-motion";

export function DashboardResultats({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 360" className={className} role="img" aria-labelledby="dash-title dash-desc">
      <title id="dash-title">Dashboard de résultats callaps</title>
      <desc id="dash-desc">Mini-dashboard avec stats hebdomadaires : 247 appels, 184 leads, 38 RDV.</desc>

      {/* Dashboard card */}
      <rect x="20" y="20" width="440" height="320" rx="20" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="6" />
      <rect x="26" y="26" width="428" height="308" rx="14" fill="#16161D" />

      {/* Header */}
      <text x="44" y="60" fontSize="18" fontWeight="900" fill="#FFFFFF">Cette semaine</text>

      {/* Period pills */}
      <rect x="280" y="44" width="36" height="24" rx="12" fill="#7B61FF" stroke="#FFFFFF" strokeWidth="2" />
      <text x="298" y="60" fontSize="11" fontWeight="700" fill="#FFFFFF" textAnchor="middle">7j</text>
      <rect x="324" y="44" width="40" height="24" rx="12" fill="transparent" stroke="#FFFFFF" strokeWidth="2" />
      <text x="344" y="60" fontSize="11" fontWeight="700" fill="#FFFFFF" textAnchor="middle">30j</text>
      <rect x="372" y="44" width="40" height="24" rx="12" fill="transparent" stroke="#FFFFFF" strokeWidth="2" />
      <text x="392" y="60" fontSize="11" fontWeight="700" fill="#FFFFFF" textAnchor="middle">12m</text>

      {/* Stat cards row */}
      <g>
        {/* Stat 1 — 247 appels */}
        <rect x="44" y="92" width="124" height="86" rx="12" fill="#0B0B0F" stroke="#FFFFFF" strokeWidth="3" />
        <text x="56" y="116" fontSize="13" fontWeight="700" fill="#FFFFFF" opacity="0.7">📞 APPELS REÇUS</text>
        <text x="56" y="160" fontSize="34" fontWeight="900" fill="#4DAFFF">247</text>

        {/* Stat 2 — 184 leads */}
        <rect x="178" y="92" width="124" height="86" rx="12" fill="#0B0B0F" stroke="#FFFFFF" strokeWidth="3" />
        <text x="190" y="116" fontSize="13" fontWeight="700" fill="#FFFFFF" opacity="0.7">✓ LEADS GÉNÉRÉS</text>
        <text x="190" y="160" fontSize="34" fontWeight="900" fill="#7B61FF">184</text>

        {/* Stat 3 — 38 RDV */}
        <rect x="312" y="92" width="124" height="86" rx="12" fill="#0B0B0F" stroke="#FFFFFF" strokeWidth="3" />
        <text x="324" y="116" fontSize="13" fontWeight="700" fill="#FFFFFF" opacity="0.7">📅 RDV PRIS</text>
        <text x="324" y="160" fontSize="34" fontWeight="900" fill="#4DAFFF">38</text>
      </g>

      {/* Sparkline */}
      <rect x="44" y="200" width="392" height="120" rx="12" fill="#0B0B0F" stroke="#FFFFFF" strokeWidth="3" />
      <text x="56" y="224" fontSize="13" fontWeight="700" fill="#FFFFFF" opacity="0.7">PROGRESSION</text>
      <motion.polyline
        points="60,290 110,272 160,260 210,250 260,232 310,220 360,200 420,180"
        stroke="#4DAFFF" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      <circle cx="60" cy="290" r="4" fill="#4DAFFF" stroke="#FFFFFF" strokeWidth="1.5" />
      <circle cx="160" cy="260" r="4" fill="#4DAFFF" stroke="#FFFFFF" strokeWidth="1.5" />
      <circle cx="260" cy="232" r="4" fill="#4DAFFF" stroke="#FFFFFF" strokeWidth="1.5" />
      <circle cx="360" cy="200" r="4" fill="#4DAFFF" stroke="#FFFFFF" strokeWidth="1.5" />
      <circle cx="420" cy="180" r="4" fill="#7B61FF" stroke="#FFFFFF" strokeWidth="1.5" />
    </svg>
  );
}
```

- [ ] **Step 4: Lire et ré-écrire `Results.tsx`**

Pattern :
- Section `bg-bg-deep` avec pattern dots blanc subtil
- Header sticker badge + h2 (préserver `t.results.title[lang]`)
- Layout 2-cols : à gauche les result-stats en cards (3 cards : appels, leads, RDV — chacune avec `<StickerTrendingUp>`), à droite la `<DashboardResultats />`
- Préserver les chiffres exacts via `t.X[lang]`

- [ ] **Step 5: Build + commit**

```bash
npm run build 2>&1 | tail -10
git add src/components/icons/sticker/trending-up.tsx src/components/icons/sticker/index.ts src/components/scenes/dashboard-resultats.tsx src/components/Results.tsx
git commit -m "feat(homepage): migrate Results + mini-scene 'Dashboard'"
```

---

### Task 16: Migrer `TargetAudience` + 5 icônes audiences (briefcase, restaurant, stethoscope, scissors, tooth)

**Files:**
- Create: `src/components/icons/sticker/briefcase.tsx`
- Create: `src/components/icons/sticker/restaurant.tsx`
- Create: `src/components/icons/sticker/stethoscope.tsx`
- Create: `src/components/icons/sticker/scissors.tsx`
- Create: `src/components/icons/sticker/tooth.tsx`
- Modify: `src/components/icons/sticker/index.ts`
- Modify: `src/components/TargetAudience.tsx`

- [ ] **Step 1: `briefcase.tsx`**

```tsx
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
```

- [ ] **Step 2: `restaurant.tsx`**

```tsx
import type { StickerIconProps } from "./_types";

export function StickerRestaurant({ size = 64, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      {/* Fork */}
      <rect x="32" y="14" width="6" height="32" fill="#4DAFFF" stroke="currentColor" strokeWidth="2" />
      <line x1="28" y1="14" x2="28" y2="30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="35" y1="14" x2="35" y2="30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="42" y1="14" x2="42" y2="30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="32" y="46" width="6" height="40" rx="2" fill="#4DAFFF" stroke="currentColor" strokeWidth="2.5" />
      {/* Knife */}
      <path d="M 60 14 Q 64 14 66 18 L 72 50 L 64 56 L 56 50 L 60 18 Q 60 14 60 14 Z" fill="#7B61FF" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <rect x="60" y="56" width="6" height="30" rx="2" fill="#7B61FF" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  );
}
```

- [ ] **Step 3: `stethoscope.tsx`**

```tsx
import type { StickerIconProps } from "./_types";

export function StickerStethoscope({ size = 64, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      <path d="M 24 14 Q 24 50 40 56 Q 56 50 56 14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <circle cx="24" cy="14" r="4" fill="#4DAFFF" stroke="currentColor" strokeWidth="2" />
      <circle cx="56" cy="14" r="4" fill="#4DAFFF" stroke="currentColor" strokeWidth="2" />
      <line x1="40" y1="56" x2="40" y2="68" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <circle cx="40" cy="78" r="10" fill="#7B61FF" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="40" cy="78" r="4" fill="#FFFFFF" />
    </svg>
  );
}
```

- [ ] **Step 4: `scissors.tsx`**

```tsx
import type { StickerIconProps } from "./_types";

export function StickerScissors({ size = 64, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      <circle cx="28" cy="72" r="12" fill="#7B61FF" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="28" cy="72" r="3" fill="#FFFFFF" />
      <circle cx="72" cy="72" r="12" fill="#4DAFFF" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="72" cy="72" r="3" fill="#FFFFFF" />
      <line x1="38" y1="64" x2="62" y2="14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="62" y1="64" x2="38" y2="14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
```

- [ ] **Step 5: `tooth.tsx`**

```tsx
import type { StickerIconProps } from "./_types";

export function StickerTooth({ size = 64, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      <path d="M 26 14 Q 14 14 14 30 Q 14 50 24 70 Q 28 84 36 84 Q 42 84 44 74 L 48 60 L 52 74 Q 54 84 60 84 Q 68 84 74 70 Q 86 50 86 30 Q 86 14 74 14 Q 60 14 50 22 Q 40 14 26 14 Z"
        fill="#FFFFFF" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="34" cy="34" r="3" fill="#4DAFFF" />
    </svg>
  );
}
```

- [ ] **Step 6: Update `index.ts`**

```ts
export { StickerBriefcase } from "./briefcase";
export { StickerRestaurant } from "./restaurant";
export { StickerStethoscope } from "./stethoscope";
export { StickerScissors } from "./scissors";
export { StickerTooth } from "./tooth";
```

- [ ] **Step 7: Lire et ré-écrire `TargetAudience.tsx`**

Pattern :
- Section `bg-card`
- Header sticker badge + h2 (préserver `t.targetAudience.title[lang]`)
- Grille 2-3 colonnes de cards `<StickerCard>` — une card par audience cible (resto, médical, salons, dentaire, B2B générique). Chaque card : `<StickerIconBox variant="violet">` avec l'icône métier + h3 + description courte + (éventuellement) liste de bénéfices spécifiques.
- Variantes alternées : `card`, `elevated`, `card`, `elevated`, `paper` (light surprise sur la 5ème)
- Préserver toutes les copies métier via `t.X[lang]`

- [ ] **Step 8: Build + commit**

```bash
npm run build 2>&1 | tail -10
git add src/components/icons/sticker/ src/components/TargetAudience.tsx
git commit -m "feat(homepage): migrate TargetAudience + 5 industry icons"
```

---

### Task 17: Migrer `Pricing` + icône `euro`

**Files:**
- Create: `src/components/icons/sticker/euro.tsx`
- Modify: `src/components/icons/sticker/index.ts`
- Modify: `src/components/Pricing.tsx`

- [ ] **Step 1: `euro.tsx`**

```tsx
import type { StickerIconProps } from "./_types";

export function StickerEuro({ size = 64, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      <circle cx="50" cy="50" r="36" fill="#7B61FF" stroke="currentColor" strokeWidth="3" />
      <path d="M 64 32 Q 56 26 48 26 Q 32 26 28 50 Q 32 74 48 74 Q 56 74 64 68"
        fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
      <line x1="22" y1="42" x2="48" y2="42" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="22" y1="56" x2="44" y2="56" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}
```

- [ ] **Step 2: Update index + ré-écrire `Pricing.tsx`**

```ts
export { StickerEuro } from "./euro";
```

Pattern Pricing :
- Section `bg-bg-deep`
- Header sticker badge + h2 (préserver `t.pricing.title[lang]`)
- 3 cards Pricing en grille (Starter, Business, Sur-mesure d'après les commits récents callaps) :
  - Starter : `<StickerCard variant="card">` — basique, prix mis en avant en gros `font-black`
  - Business : `<StickerCard variant="violet">` avec **badge "⚡ Populaire"** sticker en haut à droite (`absolute top-5 right-5 bg-stroke text-bg-deep rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-wide border-[2px] border-stroke [box-shadow:3px_3px_0_var(--color-bg-deep)] sm:rotate-[5deg]`)
  - Sur-mesure : `<StickerCard variant="elevated">` ou `paper` (light surprise) — "Contactez-nous"
- Chaque card : icône `<StickerEuro>`, prix gros, pills features avec `<StickerCheck>`, CTA principal pill ink
- Préserver les prix EXACTS du brand commit (`Starter 230€`, `Business 350€` selon commit `a740f34`)

- [ ] **Step 3: Build + commit**

```bash
npm run build 2>&1 | tail -10
git add src/components/icons/sticker/euro.tsx src/components/icons/sticker/index.ts src/components/Pricing.tsx
git commit -m "feat(homepage): migrate Pricing + add euro icon + Populaire badge"
```

---

### Task 18: Migrer `Testimonials` + 2 icônes (star, quote)

**Files:**
- Create: `src/components/icons/sticker/star.tsx`
- Create: `src/components/icons/sticker/quote.tsx`
- Modify: `src/components/icons/sticker/index.ts`
- Modify: `src/components/Testimonials.tsx`

- [ ] **Step 1: `star.tsx`**

```tsx
import type { StickerIconProps } from "./_types";

export function StickerStar({ size = 24, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      <path d="M 12 2 L 14.5 9 L 22 9.5 L 16.5 14.5 L 18.5 22 L 12 17.5 L 5.5 22 L 7.5 14.5 L 2 9.5 L 9.5 9 Z"
        fill="#4DAFFF" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}
```

- [ ] **Step 2: `quote.tsx`**

```tsx
import type { StickerIconProps } from "./_types";

export function StickerQuote({ size = 32, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      <path d="M 5 22 Q 5 12 13 8 L 13 14 Q 9 16 9 22 L 13 22 L 13 28 L 5 28 Z"
        fill="#7B61FF" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M 19 22 Q 19 12 27 8 L 27 14 Q 23 16 23 22 L 27 22 L 27 28 L 19 28 Z"
        fill="#4DAFFF" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}
```

- [ ] **Step 3: Update index + ré-écrire `Testimonials.tsx`**

```ts
export { StickerStar } from "./star";
export { StickerQuote } from "./quote";
```

Pattern Testimonials :
- Section `bg-card-elevated` (légère élévation après Pricing)
- Header sticker badge + h2 (préserver `t.testimonials.title[lang]`)
- Grille de 3 cards `<StickerCard variant="card">` ou alternées avec `paper` (1 card en light surprise pour briser la monotonie)
- Chaque card : `<StickerQuote>` en haut, 5 `<StickerStar>` en ligne, citation, signature avatar+nom+rôle
- Préserver tous les noms/citations/avatarUrl via `t.X[lang]` ou data structure existante

- [ ] **Step 4: Build + commit**

```bash
npm run build 2>&1 | tail -10
git add src/components/icons/sticker/ src/components/Testimonials.tsx
git commit -m "feat(homepage): migrate Testimonials + add star/quote icons"
```

---

### Task 19: Migrer `FAQ` + icône `plus`

**Files:**
- Create: `src/components/icons/sticker/plus.tsx`
- Modify: `src/components/icons/sticker/index.ts`
- Modify: `src/components/FAQ.tsx`

- [ ] **Step 1: `plus.tsx`**

```tsx
import type { StickerIconProps } from "./_types";

export function StickerPlus({ size = 24, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      <line x1="12" y1="4" x2="12" y2="20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
```

- [ ] **Step 2: Update index + ré-écrire `FAQ.tsx`**

```ts
export { StickerPlus } from "./plus";
```

Pattern FAQ :
- Section `bg-bg-deep`
- Header sticker badge "FAQ" + h2 (préserver `t.faq.title[lang]`)
- Stack vertical d'items FAQ dans `<div className="bg-card sticker-border sticker-shadow rounded-2xl overflow-hidden">` chacun
- Toggle accordeon avec `useState` (single-open ou multi-open selon ce qui existe — préserver le comportement). Bouton avec `<StickerPlus>` qui rotate à 45° quand ouvert.
- Animation framer-motion pour l'expansion (height: auto)
- CTA en bas "Une question pas dans la liste ?" → contact / demo

- [ ] **Step 3: Build + commit**

```bash
npm run build 2>&1 | tail -10
git add src/components/icons/sticker/plus.tsx src/components/icons/sticker/index.ts src/components/FAQ.tsx
git commit -m "feat(homepage): migrate FAQ + add plus icon"
```

---

### Task 20: Migrer `CTA` (section bg-secondary plein) + icône `message`

**Files:**
- Create: `src/components/icons/sticker/message.tsx`
- Modify: `src/components/icons/sticker/index.ts`
- Modify: `src/components/CTA.tsx`

- [ ] **Step 1: `message.tsx`**

```tsx
import type { StickerIconProps } from "./_types";

export function StickerMessage({ size = 64, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      <path d="M 14 20 L 86 20 L 86 64 L 50 64 L 38 78 L 38 64 L 14 64 Z"
        fill="#16161D" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <line x1="26" y1="34" x2="74" y2="34" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="26" y1="44" x2="64" y2="44" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="74" cy="44" r="3" fill="#4DAFFF" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
```

- [ ] **Step 2: Update index + ré-écrire `CTA.tsx`**

```ts
export { StickerMessage } from "./message";
```

Pattern CTA finale :
- Section `bg-secondary` plein BLEU avec pattern dots blancs subtil
- Layout 2-cols : à gauche le copy + CTAs, à droite la `<DashboardResultats />` mini-scène (ou autre selon design — peut être réutilisé ou remplacée par `<HeroAppelEntrant />`)
- ATTENTION CONTRASTE sur bleu : utiliser `text-bg-deep` (#0B0B0F) sur fond bleu pour ratio max — H2 et CTA primaire en noir sur bleu
- Badge sticker `bg-stroke text-bg-deep border-bg-deep`
- 2 CTA boutons :
  - Primaire : pill `bg-bg-deep text-stroke border-stroke` avec `<StickerCalendar>` + label + `<StickerArrowRight>`. Ombre `[box-shadow:4px_4px_0_var(--color-stroke)]`
  - Secondaire : pill `bg-stroke text-bg-deep border-bg-deep` avec `<StickerMessage>` + label
- Préserver toutes les copies via `t.cta.X[lang]`

- [ ] **Step 3: Build + commit**

```bash
npm run build 2>&1 | tail -10
git add src/components/icons/sticker/message.tsx src/components/icons/sticker/index.ts src/components/CTA.tsx
git commit -m "feat(homepage): migrate CTA finale (bg-secondary) + add message icon"
```

---

### Task 21: Migrer `Header`

**Files:**
- Modify: `src/components/Header.tsx`

- [ ] **Step 1: Lire l'ancien**

Run: `cat src/components/Header.tsx`

Capter : navLinks (avec `t.nav.X[lang]`), language switcher (lang/setLang via useLang), CTA "Réserver une démo" (probablement vers `/demo`).

- [ ] **Step 2: Ré-écrire**

Pattern :
- Position fixed top, fond `bg-bg-deep` (par défaut) avec border-b 2px stroke au scroll
- Logo `Image src="/logo.png"` conservé tel quel + texte "callaps" en font-black à droite (en `hidden sm:inline`)
- Nav links centrés (Comment ça marche, Tarifs, FAQ, Blog) — `text-stroke/80` hover `text-stroke`
- À droite : language switcher (FR/EN existant — adapter style en pill sticker dark) + CTA "Réserver une démo" en pill `bg-primary text-stroke border-stroke`
- Mobile hamburger (à conserver, état mobileOpen existant — adapter si besoin en pill bordée blanche)

```tsx
// src/components/Header.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";
import { StickerCalendar, StickerArrowRight } from "@/components/icons/sticker";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, setLang } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: t.nav.features[lang], href: "#solution" },
    { label: t.nav.pricing[lang], href: "#pricing" },
    { label: t.nav.faq[lang], href: "#faq" },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 bg-bg-deep ${
        scrolled ? "border-b-[2px] border-stroke/30" : "border-b-[2px] border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 lg:h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="callaps" width={32} height={32} className="w-8 h-8" />
          <span className="hidden sm:inline font-black text-stroke text-lg tracking-tight">callaps</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="text-stroke/80 font-bold hover:text-stroke transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Language switcher (sticker pill) */}
          <button
            onClick={() => setLang(lang === "fr" ? "en" : "fr")}
            className="hidden sm:inline-flex items-center justify-center w-10 h-10 rounded-full bg-card border-[2px] border-stroke text-stroke text-sm font-black [box-shadow:2px_2px_0_var(--color-stroke)]"
            aria-label="Change language"
          >
            {lang === "fr" ? "EN" : "FR"}
          </button>
          {/* CTA */}
          <Link
            href="/demo"
            className="hidden sm:inline-flex items-center gap-2 bg-primary text-stroke px-5 py-2.5 rounded-full font-bold text-sm border-[2.5px] border-stroke [box-shadow:3px_3px_0_var(--color-stroke)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:[box-shadow:5px_5px_0_var(--color-stroke)] transition-transform duration-200"
          >
            <StickerCalendar size={16} />
            <span className="hidden md:inline">{t.nav.demo?.[lang] ?? "Demo"}</span>
            <StickerArrowRight size={14} />
          </Link>
          {/* Mobile burger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-10 h-10 rounded-full bg-card border-[2.5px] border-stroke [box-shadow:2px_2px_0_var(--color-stroke)] flex items-center justify-center"
            aria-label="Menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-stroke">
              {mobileOpen ? (
                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" />
                  <line x1="3" y1="12" x2="21" y2="12" strokeLinecap="round" />
                  <line x1="3" y1="18" x2="21" y2="18" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer (simple) */}
      {mobileOpen && (
        <div className="lg:hidden bg-bg-deep border-t-[2px] border-stroke px-4 py-6 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block bg-card border-[3px] border-stroke [box-shadow:4px_4px_0_var(--color-stroke)] rounded-2xl px-5 py-4 text-stroke font-black text-lg"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/demo"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center gap-2 w-full bg-primary text-stroke px-6 py-4 rounded-full font-black text-lg border-[3px] border-stroke [box-shadow:4px_4px_0_var(--color-stroke)] min-h-[56px]"
          >
            <StickerCalendar size={20} />
            {t.nav.demo?.[lang] ?? "Demo"}
            <StickerArrowRight size={18} />
          </Link>
        </div>
      )}
    </header>
  );
}
```

**Note** : si `t.nav.demo` n'existe pas dans translations, utiliser un littéral "Réserver une démo" / "Book a demo" — vérifier `cat src/lib/translations.ts | grep -A 2 "nav"`.

- [ ] **Step 3: Build + commit**

```bash
npm run build 2>&1 | tail -10
git add src/components/Header.tsx
git commit -m "feat(layout): migrate Header to sticker"
```

---

### Task 22: Migrer `Footer` + 3 icônes (mail, phone, pin)

**Files:**
- Create: `src/components/icons/sticker/mail.tsx`
- Create: `src/components/icons/sticker/phone.tsx`
- Create: `src/components/icons/sticker/pin.tsx`
- Modify: `src/components/icons/sticker/index.ts`
- Modify: `src/components/Footer.tsx`

- [ ] **Step 1: `mail.tsx`**

```tsx
import type { StickerIconProps } from "./_types";

export function StickerMail({ size = 24, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      <rect x="2" y="5" width="20" height="14" rx="2" fill="#16161D" stroke="currentColor" strokeWidth="2.5" />
      <polyline points="2,7 12,14 22,7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
```

- [ ] **Step 2: `phone.tsx`**

```tsx
import type { StickerIconProps } from "./_types";

export function StickerPhone({ size = 24, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      <path d="M 6 3 L 9 3 L 11 8 L 8 10 Q 9.5 14 14 15.5 L 16 12.5 L 21 14.5 L 21 18 Q 21 21 18 21 Q 6 21 3 9 Q 3 6 6 3 Z"
        fill="#7B61FF" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  );
}
```

- [ ] **Step 3: `pin.tsx`**

```tsx
import type { StickerIconProps } from "./_types";

export function StickerPin({ size = 24, className = "", title }: StickerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden={!title}>
      {title && <title>{title}</title>}
      <path d="M 12 2 Q 4 2 4 11 Q 4 17 12 22 Q 20 17 20 11 Q 20 2 12 2 Z"
        fill="#4DAFFF" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="12" cy="11" r="3" fill="#FFFFFF" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
```

- [ ] **Step 4: Update index + ré-écrire `Footer.tsx`**

```ts
export { StickerMail } from "./mail";
export { StickerPhone } from "./phone";
export { StickerPin } from "./pin";
```

Pattern Footer :
- `<footer className="relative bg-bg-deep text-stroke border-t-[2px] border-stroke/20">`
- Pattern dots blanc subtil
- Top CTA strip (optionnel, si existe) en card sticker
- 4 colonnes : Brand (logo + tagline + contact mail/phone/pin sticker) / Produit (liens features, pricing, demo) / Légal (mentions, confidentialité) / Social (LinkedIn, Twitter, etc. — conserver les liens existants)
- Bottom : copyright + lien social
- Préserver tous les `t.footer.X[lang]` calls et les liens

- [ ] **Step 5: Build + commit**

```bash
npm run build 2>&1 | tail -10
git add src/components/icons/sticker/ src/components/Footer.tsx
git commit -m "feat(layout): migrate Footer + add mail/phone/pin icons"
```

---

### Task 23: Migrer `FloatingContact`

**Files:**
- Modify: `src/components/FloatingContact.tsx`

- [ ] **Step 1: Lire l'ancien**

Run: `cat src/components/FloatingContact.tsx`

C'est un pill flottant en bas à droite (probablement Whatsapp / téléphone direct).

- [ ] **Step 2: Ré-écrire en sticker dark**

```tsx
"use client";

import Link from "next/link";
import { StickerPhoneIncoming } from "@/components/icons/sticker";

export default function FloatingContact() {
  return (
    <Link
      href="tel:+33XXXXXXXXX"  // adapter au numéro réel depuis l'ancien fichier
      className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 bg-primary text-stroke px-5 py-3 rounded-full font-bold text-sm border-[2.5px] border-stroke [box-shadow:4px_4px_0_var(--color-stroke)] hover:scale-105 hover:[box-shadow:6px_6px_0_var(--color-stroke)] transition-all duration-200 sm:rotate-[-2deg]"
      aria-label="Contact direct"
    >
      <StickerPhoneIncoming size={20} />
      <span className="hidden sm:inline">Appelez-nous</span>
    </Link>
  );
}
```

**IMPORTANT** : préserver le numéro / lien EXACT depuis l'ancien fichier (peut être un mailto, tel, ou external URL).

- [ ] **Step 3: Build + commit**

```bash
npm run build 2>&1 | tail -10
git add src/components/FloatingContact.tsx
git commit -m "feat(layout): migrate FloatingContact to sticker pill"
```

---

### Task 24: Audit homepage

**Files:** aucun (audit)

- [ ] **Step 1: Audit grep classes bannies**

```bash
echo "=== bg-gradient-to ===" && grep -rn "bg-gradient-to" src/components src/app | grep -v "src/app/blog"
echo "=== blur- ===" && grep -rn "blur-" src/components src/app | grep -v "src/app/blog"
echo "=== glass ===" && grep -rn "\.glass\|className.*glass" src/components src/app | grep -v "src/app/blog"
echo "=== gradient-text/border ===" && grep -rn "gradient-text\|gradient-border" src/components src/app | grep -v "src/app/blog"
echo "=== animate-pulse-glow ===" && grep -rn "animate-pulse-glow\|animate-ping-slow\|animate-pulse-soft" src/components src/app
echo "=== magenta D946EF ===" && grep -rn "#D946EF\|D946EF" src/
echo "=== lucide-react ===" && grep -rn "from \"lucide-react\"" src/
```

Expected: la plupart à 0. Si certaines lignes restent dans des composants migrés, il faut les fixer. Si elles sont dans `Demo.tsx`, `mentions-legales`, `confidentialite` — c'est NORMAL, traité Phases 3-4.

- [ ] **Step 2: Build de prod**

```bash
npm run build 2>&1 | tail -20
```

Expected: build réussit, 39+ pages générées.

- [ ] **Step 3: Lint**

```bash
npm run lint 2>&1 | tail -10
```

Expected: 0 erreur, warnings tolérés.

- [ ] **Step 4: Commit (cleanup si besoin)**

Si l'audit a révélé des restes, les corriger ICI dans des Edit ciblés et committer :

```bash
git add -A
git commit -m "fix(homepage): cleanup remaining old-style classes after migration"
```

Sinon pas de commit.

---

# Phase 3 — Demo page

But : adapter la page `/demo` (test agent IA en direct) au système sticker.

---

### Task 25: Migrer `/demo` page

**Files:**
- Modify: `src/app/demo/page.tsx`
- Modify: `src/app/demo/layout.tsx` (si visuel)

- [ ] **Step 1: Lire**

Run: `cat src/app/demo/page.tsx src/app/demo/layout.tsx`

La page demo contient probablement : un input pour tester l'IA, une conversation iMessage en direct, un sélecteur de créneaux Calendly via `/api/slots`, un bouton "Réserver" via `/api/booking`.

- [ ] **Step 2: Adapter au système sticker**

- Section principale `bg-bg-deep`
- Le rendu de la conversation iMessage : utiliser le composant `<StickerCard>` ou des bulles inline avec contour stroke 2.5px + ombre 3px 3px 0 stroke
- Inputs : `bg-card sticker-border-thin sticker-shadow-sm rounded-xl px-4 py-3 focus:outline-none focus:[box-shadow:4px_4px_0_var(--color-stroke)]`
- Boutons : pill sticker `bg-primary text-stroke border-stroke` avec ombre dure
- Sélecteur de créneaux : grille de cards `<StickerCard variant="canvas">` cliquables, état actif → `variant="violet"`
- Préserver toute la logique métier (state, fetch API, handlers)

- [ ] **Step 3: Build + commit**

```bash
npm run build 2>&1 | tail -10
git add src/app/demo/
git commit -m "feat(demo): migrate /demo page to sticker dark"
```

---

# Phase 4 — Pages légales

But : appliquer le système sticker aux 2 pages légales (mentions légales + politique confidentialité) — léger, juste header/footer + h1.

---

### Task 26: Migrer `/mentions-legales` + `/confidentialite`

**Files:**
- Modify: `src/app/mentions-legales/page.tsx`
- Modify: `src/app/confidentialite/page.tsx`

- [ ] **Step 1: Lire les 2 pages**

```bash
cat src/app/mentions-legales/page.tsx
cat src/app/confidentialite/page.tsx
```

- [ ] **Step 2: Adapter le wrapper visuel SEULEMENT**

Le contenu juridique RGPD reste verbatim. On adapte uniquement :
- Section hero header : `bg-bg-deep` + dot pattern + sticker badge "Mentions légales" / "Confidentialité" + h1 sticker (font-black, text-stroke)
- Le contenu HTML/MDX du texte juridique reste pur (text-stroke/85 pour la lisibilité, h2/h3 en font-bold)
- Pas de cards sticker pour le contenu (texte juridique = lisibilité prioritaire, pas d'effets)
- Si la page a un fond gradient actuel, le remplacer par `bg-bg-deep` simple

- [ ] **Step 3: Build + commit**

```bash
npm run build 2>&1 | tail -10
git add src/app/mentions-legales/ src/app/confidentialite/
git commit -m "feat(legal): migrate mentions-legales + confidentialite to sticker dark"
```

---

# Phase 5 — Audit final + cleanup

But : valider tous les critères du spec §13 et nettoyer les tokens obsolètes.

---

### Task 27: Audit final complet

**Files:** aucun (audit)

- [ ] **Step 1: Grep audit complet**

```bash
echo "=== bg-gradient-to ===" && grep -rn "bg-gradient-to" src/ | grep -v "src/app/blog"
echo "=== blur- ===" && grep -rn "blur-" src/ | grep -v "src/app/blog"
echo "=== .glass ===" && grep -rn "\.glass" src/ | grep -v "src/app/blog"
echo "=== gradient-text/border ===" && grep -rn "gradient-text\|gradient-border" src/ | grep -v "src/app/blog"
echo "=== animate-pulse-* ===" && grep -rn "animate-pulse-glow\|animate-ping-slow\|animate-pulse-soft\|animate-float" src/
echo "=== #D946EF (magenta) ===" && grep -rn "#D946EF\|D946EF" src/
echo "=== --color-accent (magenta token) ===" && grep -rn "color-accent" src/ | grep -v "primary\|accent-light"
echo "=== lucide-react ===" && grep -rn "from \"lucide-react\"" src/
```

Expected:
- `bg-gradient-to` / `blur` / `gradient-text` / `gradient-border` → 0 résultats (hors `src/app/blog/`)
- `animate-pulse-glow` etc → 0 résultats
- `#D946EF` / `--color-accent` → 0 résultats (magenta complètement éradiqué)
- `lucide-react` → 0 résultats (callaps n'a jamais utilisé Lucide à priori)

Si l'un montre des résultats hors-scope, fixer avant de continuer.

- [ ] **Step 2: Build + lint final**

```bash
npm run build 2>&1 | tail -20
npm run lint 2>&1 | tail -10
```

- [ ] **Step 3: Lighthouse desktop + mobile**

```bash
npm run dev &
sleep 5
npx lighthouse http://localhost:3000 --preset=desktop --only-categories=performance,accessibility,best-practices,seo --output=html --output-path=./lighthouse-desktop.html
npx lighthouse http://localhost:3000 --only-categories=performance,accessibility,best-practices,seo --output=html --output-path=./lighthouse-mobile.html
```

Expected sur les 2 :
- Accessibility ≥ 95
- Performance ≥ 90
- Best Practices ≥ 95
- SEO ≥ 100

- [ ] **Step 4: Test mobile responsive**

Ouvrir `http://localhost:3000/`, DevTools → iPhone 12 (390×844) :
- Aucune rotation visible (toutes les rotations sont en `sm:` Tailwind)
- Aucun scroll horizontal
- Tous les CTAs ≥ 48px haut tactile
- Mini-scènes passent au-dessus du texte
- Conversation flow scene reste lisible

- [ ] **Step 5: Ajouter lighthouse-*.html au gitignore et committer le rapport**

```bash
echo "lighthouse-*.html" >> .gitignore
git add .gitignore
git commit -m "chore: gitignore lighthouse audit reports"
```

---

### Task 28: Cleanup tokens obsolètes

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Retirer les tokens backwards-compat**

Dans `src/app/globals.css`, supprimer le bloc :
```css
  /* === Backwards-compat (will be cleaned up in Task 28) === */
  --color-surface: #16161D;
  --color-surface-light: #1a1a24;
  --color-surface-dark: #0B0B0F;
```

Faire un grep avant pour confirmer qu'aucun composant n'utilise encore `--color-surface` / `--color-surface-light` / `--color-surface-dark` :
```bash
grep -rn "color-surface" src/ | grep -v "src/app/globals.css"
```

S'il reste des usages, soit migrer vers les nouveaux tokens (`bg-card`, `bg-card-elevated`, `bg-bg-deep`), soit reporter le cleanup à plus tard.

- [ ] **Step 2: Décider du sort de `/dev/sticker-preview`**

Soit garder (utile pour les futures itérations, déjà non-indexable) soit supprimer :
```bash
# Pour supprimer :
rm -rf src/app/dev/
```

Recommandation : **garder** (zero pollution prod, utile pour debug futur).

- [ ] **Step 3: Build final + commit**

```bash
npm run build 2>&1 | tail -10
git add src/app/globals.css src/app/dev/ 2>/dev/null
git commit -m "chore: remove obsolete --color-surface tokens after migration"
```

- [ ] **Step 4: Récapitulatif**

```bash
git log --oneline main..HEAD | wc -l   # nombre de commits
git diff --stat main HEAD | tail -1    # nombre de fichiers modifiés
```

Le redesign callaps est terminé. Toutes les pages publiques (sauf blog) appliquent le système Sticker on Dark, tous les critères du spec §13 sont remplis.

---

## Self-Review (effectué pendant la rédaction)

**Spec coverage check** :
- §3 codes sticker → Task 1 (tokens + utilities)
- §4 design tokens → Task 1
- §5 composants → Tasks 3, 4
- §6 bibliothèque d'icônes (38 total) → Tasks 5, 6, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 22 (38 icônes au total : 7 prio + 1 phone-missed + 1 cog + 1 code-brackets + 5 benefits + 3 analysis + 3 howitworks + 1 trending-up + 5 audiences + 1 euro + 2 testimonials + 1 plus + 1 message + 3 footer = 38) ✅
- §7 mini-scènes → Tasks 7 (Appel entrant), 14 (Conversation flow), 15 (Dashboard résultats)
- §8 backgrounds + rythme couleur → appliqués dans chaque task de section
- §9 user-friendly upgrades → Tasks 21 (Header), 22 (Footer), 23 (FloatingContact), tous les CTA primaires (min-h-56px)
- §10 risques → mitigations appliquées (rotations désactivées mobile via `sm:`, contrastes WCAG vérifiés Task 27)
- §11 phases → 5 phases respectées (1-5)
- §12 hors scope → blog/api/translations préservés, vérifié dans chaque task
- §13 critères de validation → Task 27 audit complet

**Placeholder check** : pas de "TBD", "TODO", "implement later" dans le plan. Quelques tasks (7-23) demandent à l'exécutant d'inventorier le contenu des composants live et d'adapter. Chaque step donne le pattern précis à appliquer.

**Type consistency check** :
- `StickerIconProps` défini Task 5, utilisé dans toutes les icônes ✅
- `<StickerCard>` variantes : `card | canvas | elevated | violet | blue | paper` — cohérent dans toutes les tasks ✅
- `<StickerIconBox>` variantes : `card | canvas | elevated | violet | blue | paper | stroke` — cohérent ✅
- Toutes les icônes nommées en `Sticker<PascalCase>` exporté en `Sticker<Name>` depuis le barrel ✅
- Tokens `--color-stroke` (blanc), `--color-bg-deep` (#0B0B0F), `--color-card` (#16161D), `--color-card-elevated` (#1a1a24), `--color-primary` (#7B61FF), `--color-secondary` (#4DAFFF) — cohérents partout ✅

Plan complet, prêt à exécuter.
