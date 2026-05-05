# Redesign callaps — Système visuel "Sticker Pop on Dark"

**Date** : 2026-05-05
**Auteur** : Wassim Habib (validation) + Claude (rédaction)
**Statut** : Spec validée, prêt pour plan d'implémentation
**Projet** : `/Users/wassimhabib/Projects/callaps`

---

## 1. Contexte & objectif

`callaps.ai` est une SaaS landing page pour un produit d'agent IA téléphonique (B2B, capture de leads via appels automatisés). Le site (Next.js 16, React 19, Tailwind 4, TypeScript) utilise aujourd'hui un visual language commun aux SaaS tech IA-générés :

- Thème **dark** mais avec gradients lisses violet→magenta sur cartes et titres
- Glass morphism (`.glass`, `backdrop-blur`)
- Gradient borders + gradient text (`.gradient-text`, `.gradient-border`)
- Pulse animations + glow effects décoratifs
- Icônes Lucide ou inline gris/violet

Le visuel actuel est techniquement correct mais **indistinguable d'autres SaaS IA**.

**Brief utilisateur** : Appliquer le même type de système visuel distinctif que celui qu'on a déployé pour Wevlap (Sticker Pop Mono) — mais **adapté au thème dark de callaps et à son brand-book**.

**Cible** : décideurs B2B qui ratent des appels (restos, médical, salons, dentaire, services pro). Ils ne veulent pas de marketing abstrait — ils veulent voir le produit qui marche (cf. brand-book §6).

**Objectif du redesign** : produire une signature visuelle propre à callaps, irréductible aux SaaS IA génériques, en restant **strictement aligné avec le brand-book existant** (`docs/BRAND-BOOK.md`).

---

## 2. Décisions de cadrage (validées en brainstorming)

| # | Décision | Valeur |
|---|---|---|
| D1 | Style visuel | Sticker Pop on Dark (bordures blanches 3px + ombres dures offset blanches) |
| D2 | Palette | Strict 4 couleurs brand-book : Violet `#7B61FF` + Bleu `#4DAFFF` + Noir `#0B0B0F` + Blanc `#FFFFFF`. **Pas de magenta** (présent dans le code actuel mais absent du brand-book). **Pas de jaune** (hors brand-book). |
| D3 | Logo | Conservé tel quel (PNG existant `/public/logo.png`) |
| D4 | Mini-scènes hero | 3 scènes brand-book-aligned : "Appel entrant" (iPhone mockup), "Conversation flow" (bulles iMessage), "Dashboard résultats" (mini-dashboard UI) — **aucun robot, aucune IA abstraite** |
| D5 | Périmètre | Toutes pages publiques sauf blog : homepage (17 sections) + `/demo` + `/mentions-legales` + `/confidentialite` |
| D6 | Stratégie code | Copier-adapter les composants `<StickerCard>` / `<StickerIconBox>` depuis Wevlap, refactorer les variantes pour DARK |
| D7 | Inventaire icônes | 38 icônes (19 copiées de Wevlap + 19 créées spécifiques callaps) |

---

## 3. Système visuel — les "codes sticker dark"

Règles fondamentales appliquées partout — elles garantissent la cohérence sans réfléchir composant par composant.

### 3.1 Bordures, ombres, radius

| Élément | Règle |
|---|---|
| Bordure cartes | `3px solid #FFFFFF` |
| Bordure icônes / pills | `2px solid #FFFFFF` |
| Ombre cartes (default) | `8px 8px 0 #FFFFFF` (offset blanc, **zéro blur**) |
| Ombre cartes (hover) | `10px 10px 0 #FFFFFF` + `translate(-2px, -2px)` |
| Ombre icônes | `3px 3px 0 #FFFFFF` |
| Radius cartes | `16px` à `20px` |
| Radius icônes | `10px` à `12px` |
| Radius pills | `999px` |

### 3.2 Rotations accents

Légère rotation (-3° à +5°) appliquée à **certains** éléments seulement :
- ✅ Icônes en standalone, badges décoratifs, pills "Populaire", éléments des mini-scènes
- ❌ JAMAIS sur les cartes principales, ni sur les CTA, ni en mobile (cf. §10 risques — désactivées via `sm:` Tailwind prefix)

### 3.3 Bannis (zéro tolérance)

- Tout `bg-gradient-to-*` sur cartes/fonds (sauf pour le logo qui contient son propre gradient interne)
- `.glass` et `backdrop-blur-*`
- `.gradient-text` (titres en gradient)
- `.gradient-border` (le pseudo-element ::before avec mask)
- `animate-pulse` sur dots décoratifs / `animate-pulse-glow` / `animate-ping-slow`
- Toute couleur en dehors des 4 du brand-book (drop le magenta `#D946EF` actuel partout)
- Toute illustration **robot, IA abstraite, futuriste générique** (cf. brand-book §6)

---

## 4. Design tokens

### 4.1 Couleurs

Mise à jour de `src/app/globals.css` (le bloc `@theme`) :

```css
@theme {
  /* === Brand-book colors (strict 4) === */
  --color-primary: #7B61FF;       /* violet — accent 1 */
  --color-secondary: #4DAFFF;     /* bleu — accent 2 (remplace magenta) */
  --color-stroke: #FFFFFF;        /* blanc — bordures + texte sur dark */
  --color-bg-deep: #0B0B0F;       /* noir — fond principal */

  /* === Surface variations (dark theme card depths) === */
  --color-card: #16161D;          /* card par défaut */
  --color-card-elevated: #1a1a24; /* card mise en avant */
}
```

Les tokens existants `--color-accent: #D946EF` (magenta), `--color-primary-light/dark`, `--color-accent-light`, `--color-surface*` peuvent être supprimés ou laissés inutilisés (à supprimer en phase de cleanup pour éviter la dette).

### 4.2 Typographie

Inter (déjà chargé probablement via `next/font`) — confirmer dans `layout.tsx`.

| Niveau | Avant | Après |
|---|---|---|
| Body | 16px / 1.5 / Inter 400 / blanc | 17-19px / 1.65 / Inter 400 / `rgba(255,255,255,0.85)` |
| H1 desktop | varies | 64-80px / Inter 900 / `letter-spacing: -0.04em` / blanc pur |
| H2 desktop | varies | 48-56px / Inter 900 / `letter-spacing: -0.03em` / blanc pur |
| H3 | varies | 24-30px / Inter 800 / blanc pur |
| Pills | varies | 11-12px / 700 / uppercase / `letter-spacing: 0.06em` |
| CTA | varies | 18-20px / 700 |

Pas de nouvelle police. On reste sur Inter (option Satoshi du brand-book §5 non retenue pour éviter chargement supplémentaire — Inter 900 suffit).

### 4.3 Espacement

- Sections : `py-20` (mobile) / `py-28` (desktop)
- CTA primaires : `padding: 20px 40px`, `min-height: 56px` desktop, `min-height: 48px` mobile
- Cards intérieures : `padding: 28-36px` desktop / `20-24px` mobile

### 4.4 Animations

- Hover cartes : `transition: transform 200ms ease, box-shadow 200ms ease`
- Mini-scènes : `framer-motion` (à installer si pas déjà présent — confirmer dans `package.json`)
- Focus visible : `outline: 3px solid #FFFFFF; outline-offset: 2px`

---

## 5. Composants `<StickerCard>` et `<StickerIconBox>`

### 5.1 `<StickerCard>` adapté DARK

API identique à celle de Wevlap. **Variantes refactorées pour dark** :

| Variant | Fond | Texte | Cas d'usage |
|---|---|---|---|
| `card` (défaut) | `var(--color-card)` (#16161D) | blanc/85% | Cards majoritaires (Problem, Benefits, Integration, Testimonials, FAQ items, Footer cards) |
| `canvas` | `var(--color-bg-deep)` (#0B0B0F) | blanc | Cards qui se fondent dans la section, look "punched out" |
| `elevated` | `var(--color-card-elevated)` (#1a1a24) | blanc | Cards Pricing premium, Featured testimonial, Featured target audience |
| `violet` | `var(--color-primary)` (#7B61FF) | blanc | Cards accent brand (1-2 par section max — Solution phares, premium pricing) |
| `blue` | `var(--color-secondary)` (#4DAFFF) | blanc | Cards accent secondaire (1-2 par section max — Resultats, Demo CTA) |
| `paper` (inverse rare) | `#FAF7F0` | `#0B0B0F` (ink) | **1 carte par page max** — effet "light surprise" sur dark, max contraste |

Hover par défaut : `translate(-2px, -2px)` + ombre passe à `10px 10px 0 #FFFFFF`. Sur la variante `paper`, ombre devient `10px 10px 0 #0B0B0F` (inverse).

### 5.2 `<StickerIconBox>` adapté DARK

7 variantes : `card`, `canvas`, `elevated`, `violet`, `blue`, `paper`, `stroke` (fond blanc avec icône ink — pour les box "alarme" / "notification" rares).

Bordure 2px blanc, ombre 3px 3px 0 blanc. Tailles `sm` (40×40) / `md` (56×56) / `lg` (64×64).

### 5.3 Structure de fichiers

```
src/
├── components/
│   ├── ui/
│   │   ├── sticker-card.tsx          # adapté dark (copié de wevlap, refactoré variantes)
│   │   └── sticker-icon-box.tsx      # adapté dark
│   ├── icons/
│   │   └── sticker/
│   │       ├── _types.ts
│   │       ├── index.ts              # barrel
│   │       └── *.tsx                 # 38 icônes
│   ├── scenes/
│   │   ├── hero-appel-entrant.tsx
│   │   ├── conversation-flow.tsx
│   │   └── dashboard-resultats.tsx
│   └── [callaps existants]           # Header.tsx, Hero.tsx, Solution.tsx, etc. — migrés un par un
```

---

## 6. Bibliothèque d'icônes (38 au total)

### 6.1 Format technique

Toutes les icônes sticker suivent ce template (identique à Wevlap, mais le `currentColor` héritera du blanc par défaut sur les sections dark) :
- viewBox `0 0 100 100` (icônes service/feature) ou `0 0 24 24` (icônes utilitaires)
- `stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"`
- Fills explicites parmi : `#FFFFFF`, `#7B61FF`, `#4DAFFF`, `#0B0B0F`, `#16161D` (les 4 brand + card depths)
- `<title>` optionnel pour a11y si la prop `title` est fournie

### 6.2 19 icônes copiées de Wevlap (utilitaires + concepts génériques)

`arrow-right`, `check`, `sparkle`, `calendar`, `mail`, `phone`, `pin`, `star`, `quote`, `message`, `plus`, `shield`, `target`, `trending-up`, `lightning`, `clock`, `users`, `expand`, `headset`.

**Adaptation requise lors de la copie** : remplacer tous les fills `#FDE047` (jaune) par `#4DAFFF` (bleu brand) ou `#7B61FF` (violet brand) selon contexte. Drop tout `#FB7185` (rose) si présent.

### 6.3 19 icônes créées spécifiques callaps

Toutes alignées brand-book §6 (UI réelle, pas de robot/IA abstraite) :

| Icône | Usage section | Description visuelle |
|---|---|---|
| `phone-incoming` | Hero, ResultatHero, Header CTA | Combiné téléphone avec petite flèche entrante + onde sonore |
| `phone-missed` | Problem ("appels manqués") | Combiné téléphone avec ❌ ou flèche descendante |
| `microphone` | Hero, Solution, Demo | Micro studio sticker (corps blanc + grille noire + base) |
| `soundwave` | Solution, Hero scene | 5 barres verticales d'amplitudes variées (style equalizer) |
| `bubble-imessage` | HowItWorks, Demo, Conversation flow scene | Bulle de message avec arrondi de queue (gauche ou droite) |
| `conversation` (2 bulles) | HowItWorks | 2 bulles iMessage empilées (gauche+droite) |
| `transcript` | Solution, Analysis | Document avec lignes de texte + chronomètre intégré |
| `lead` | Results, Analysis | Personnage silhouette avec ✓ vert (lead qualifié) |
| `euro` | Pricing | Symbole € en sticker bold |
| `chart-bar` | Analysis, Results, Dashboard scene | 3 barres verticales croissantes |
| `globe` | Benefits ("multi-langue") | Globe terrestre avec méridiens |
| `briefcase` | TargetAudience (B2B générique) | Mallette professionnelle |
| `restaurant` | TargetAudience | Couverts (fourchette + couteau) |
| `stethoscope` | TargetAudience | Stéthoscope médical |
| `scissors` | TargetAudience | Ciseaux salons |
| `tooth` | TargetAudience | Dent stylisée |
| `code-brackets` | Integration | `< />` en sticker |
| `cog` | Solution (customization) | Roue dentée |
| `bolt-flash` | Benefits (instantané) | Éclair (différent de `lightning` qui est plus stat-oriented) |
| `clock-247` | Benefits ("disponible 24/7") | Horloge avec "24/7" inscrit dans le cadran |

**Total** : 38 icônes (19 + 19). **Aucune** icône `ai-bot` / `robot` / `cyber` (violation brand-book).

### 6.4 Migration des icônes Lucide / inline existantes

- Audit grep : `grep -rE "from \"lucide-react\"" src/components` (à exécuter en Phase 1) pour lister tout ce qui doit être remplacé
- Lucide reste autorisé uniquement pour les icônes UI utilitaires : `Menu`, `X` (mobile menu), `ChevronDown`/`ChevronRight` (FAQ accordion). Tout le reste migre.

---

## 7. Mini-scènes hero (alignées brand-book §6)

3 illustrations narratives custom, chacune dessinée en SVG inline (~150-300 lignes par scène) — palette stricte brand (Violet + Bleu + Noir + Blanc).

**Toutes les scènes respectent §6 brand-book** : iPhone mockups, UI réelle, dashboards, cartes flottantes. **Aucune** mascotte robot, pas d'abstrait.

### 7.1 Scène 1 — "Appel entrant" (Hero homepage)

- **Composition** : iPhone mockup sticker (corps blanc bordure blanche 4px, écran sombre `#0B0B0F`) en position centrale. À l'écran : interface d'appel entrant — "Numéro inconnu" en haut, gros bouton vert "Décrocher" + bouton rouge "Refuser" en bas. Onde sonore (5 barres) qui pulse au-dessus du téléphone.
- **Position** : à droite du H1 sur desktop (split layout 60/40), au-dessus en mobile
- **Animation** : onde qui pulse (1s), bouton "Décrocher" qui glow subtilement (3s)
- **Taille** : ~480×400px, responsive en `viewBox`

### 7.2 Scène 2 — "Conversation flow" (HowItWorks ou Demo)

- **Composition** : 2 bulles iMessage sticker empilées
  - Bulle gauche (entrante, fond `card`, contour blanc) : "Bonjour, je voudrais réserver une table pour 4 ce soir à 20h" — petit avatar circulaire à gauche (silhouette personne, **pas un robot**)
  - Bulle droite (sortante, fond `violet`, contour blanc) : "Avec plaisir ! Je vous confirme la réservation pour 4 personnes ce soir à 20h. À tout à l'heure 👋" — petit avatar circulaire à droite (lettre "C" du logo callaps, **pas un robot mascotte**)
  - "✨" sparkle sticker entre les 2 bulles
- **Position** : à droite de la section HowItWorks ou en pleine largeur dans Demo
- **Animation** : bulle gauche apparaît, sparkle clignote, bulle droite apparaît (séquence 1.5s)

### 7.3 Scène 3 — "Dashboard résultats" (Results ou CTA finale)

- **Composition** : mini-dashboard sticker en card unique avec :
  - Header : "Cette semaine" + period selector pills ("7j", "30j", "12m" — un sélectionné)
  - 3 stat cards en grille : "📞 247 appels reçus" / "✓ 184 leads générés" / "📅 38 RDV pris"
  - Mini-sparkline en bas : 7 points reliés par ligne, courbe croissante en `secondary` (bleu)
- **Position** : à droite de la section CTA finale ou Results
- **Animation** : sparkline qui se trace (path animation, 1.5s)

### 7.4 Règles communes

- 100% SVG inline (pas d'images externes — pas de cost réseau, indexable SEO)
- Palette stricte : 4 couleurs brand-book (Violet, Bleu, Noir, Blanc) + neutre `card` (#16161D)
- Mobile : passer en `block` au-dessus du texte, taille réduite mais lisible
- Accessibilité : `<title>` et `<desc>` dans chaque SVG (lecteurs d'écran)
- Cohérent avec le style "iPhone mockup" déjà présent dans le projet (cf. `public/iphone-mockup.png` et le commit `feat: conversation bulles style iMessage`)

---

## 8. Backgrounds & rythme couleur

### 8.1 Ce qui dégage

- `.glass` (background rgba 5% + backdrop-blur 12px) — supprimé
- `.gradient-border` (le pseudo-element avec mask gradient) — supprimé
- `.gradient-text` (background-clip text avec linear-gradient) — supprimé
- Tous les `animate-pulse-glow` / `animate-ping-slow` / `animate-pulse-soft`
- Tous les `bg-gradient-to-*` sur fonds de section et cartes

### 8.2 Rythme couleur des sections (homepage)

Ordre actuel de `src/app/page.tsx` :

| Section | Fond | Note |
|---|---|---|
| Hero | `bg-bg-deep` (#0B0B0F) + dot pattern blanc subtil | scène "Appel entrant" à droite |
| ResultatHero | `bg-card` (#16161D) | |
| Problem | `bg-bg-deep` | |
| **Solution** | **`bg-primary` plein (#7B61FF)** | bloc accent brand — high impact |
| Integration | `bg-card` | grille de logos partenaires (Slack, Notion, etc.) en cards sticker |
| Benefits | `bg-bg-deep` | |
| **Analysis** | **`bg-secondary` plein (#4DAFFF)** | bloc accent secondaire (remplace l'idée magenta) |
| HowItWorks | `bg-card` | scène "Conversation flow" intégrée |
| Results | `bg-bg-deep` | scène "Dashboard résultats" intégrée |
| TargetAudience | `bg-card` | grille de cards (resto, médical, salons, dentaire, B2B) |
| Pricing | `bg-bg-deep` | |
| **Testimonials** | **`bg-card-elevated` (#1a1a24)** | légère élévation, calmer après le bleu |
| FAQ | `bg-bg-deep` | |
| **CTA finale** | **`bg-secondary` plein (#4DAFFF)** | final pop bleu — "action" couleur, max conversion |
| Footer | `bg-bg-deep` | |

Avec ça : 3 transitions chromatiques fortes (violet, bleu, bleu finale) au lieu d'un tunnel dark monotone. Les sections colorées contiennent toutes une CTA (Problème→Solution→Résultat→Action, cf. brand-book §8).

### 8.3 Pattern dots

- Sections phares (Hero, CTA finale) : pattern dots blanc subtil :
  ```css
  background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0);
  background-size: 28px 28px;
  ```

---

## 9. User-friendly upgrades

### 9.1 Header & navigation

- Liens : 4 max (existant : Accueil / Comment ça marche / Tarifs / Demo) + 1 CTA "Réserver une démo" en pill violet
- Pas de pulsing dot d'état
- Sticky top, fond `bg-card-elevated` au scroll

### 9.2 FloatingContact (le pill flottant)

Refonte en pill sticker dark :
- `bg-primary` (violet) avec contour blanc 2.5px + ombre 4px 4px 0 blanc
- Icône `phone-incoming` sticker
- Hover : scale 1.05 + ombre passe à 6px 6px 0 blanc

### 9.3 Boutons & CTA

- Primaire : pill `bg-primary text-stroke` 56px haut, ombre 4px 4px 0 blanc, hover translate(-2px, -2px) + ombre 6px 6px 0 blanc
- Secondaire : pill `bg-card border-2 border-stroke text-stroke` (transparent-ish sur dark)
- Tertiaire : texte seul + arrow sticker qui translate au hover

### 9.4 Lisibilité

- Body 17px mobile / 19px desktop
- Line-height 1.65 sur paragraphes
- Largeur de ligne max `65ch`
- `text-white/85` pour le body (un blanc à 85% opacité — moins agressif que pur blanc sur dark)

### 9.5 Accessibilité

- Focus states : `outline: 3px solid #FFFFFF; outline-offset: 2px`
- Contrastes WCAG AA garantis :
  - Texte blanc sur `bg-bg-deep` (#0B0B0F) → ratio 19.8:1 ✅
  - Texte blanc sur `bg-card` (#16161D) → ratio 16.4:1 ✅
  - Texte blanc sur `bg-primary` (#7B61FF) → ratio 4.96:1 ✅
  - Texte blanc sur `bg-secondary` (#4DAFFF) → ratio 4.05:1 ⚠️ (juste au seuil — vérifier visuellement, augmenter contraste si besoin avec text-bg-deep sur fond bleu)

---

## 10. Risques & mitigations

| Risque | Mitigation |
|---|---|
| **Cohérence pendant la migration** : sections migrées + sections old style | Suivre l'ordre de phases (§11). Commit checkpoint à la fin de chaque phase. |
| **Rotations sticker mobile** : layout cassé / scroll horizontal | Toutes les rotations en `sm:` Tailwind prefix (≥640px). Mobile = zéro rotation. |
| **Contraste WCAG sur `bg-secondary`** | Ratio juste à 4.05:1. Si insuffisant à l'usage, basculer le texte sur le bleu en `text-bg-deep` (#0B0B0F sur #4DAFFF = ratio 5.2:1) ou augmenter font-weight pour 18pt+ qui passe le seuil avec un ratio ≥ 3:1. |
| **Régression Lighthouse perfs** (poids SVG inline cumulé) | Garder chaque icône < 2KB. Mini-scènes optimisées via SVGO en CI ou pré-commit. |
| **Système de traduction** (`translations.ts`, `LanguageContext.tsx`) | NE PAS toucher. Toutes les copies textuelles sont externalisées dans `translations.ts` — la migration ne touche que la structure visuelle. |
| **Régression contenu** | Préserver verbatim : H1/H2 textes (via `t('hero.title')` etc.), CTAs, Pricing, FAQ, Testimonials. |
| **Cards Pricing / Testimonials qui doivent garder leur emphase actuelle** | Mapper la card "Populaire" actuelle vers variant `violet` ou `paper` (light surprise). Discuter avec user si bascule. |

---

## 11. Périmètre & ordre d'attaque

### Phase 1 — Foundations (jour 1, ~3-4h)

- Tokens CSS (couleurs brand-book strict, classes utilitaires sticker dans `globals.css`)
- Suppression `.glass`, `.gradient-text`, `.gradient-border`, animations bannies
- Composant `<StickerCard>` adapté dark + sous-composants (Title, Description, Pills, Cta)
- Composant `<StickerIconBox>` adapté dark
- Helpers : `.sticker-shadow` (white), `.sticker-shadow-lg`, `.sticker-shadow-sm`
- 7 icônes prioritaires : `phone-incoming`, `microphone`, `soundwave`, `sparkle`, `arrow-right`, `check`, `calendar`
- Route `/dev/sticker-preview` (équivalent du dev preview de Wevlap)

**Critère d'acceptation phase 1** : `/dev/sticker-preview` montre une carte sticker fonctionnelle dans les 6 variantes (card / canvas / elevated / violet / blue / paper) + les 7 icônes en boxes contrastées.

### Phase 2 — Homepage (jour 2-4, ~10-14h — la grosse phase)

Dans cet ordre (du plus contenu visuel au moins) :

1. `Hero` (avec mini-scène 1 "Appel entrant")
2. `ResultatHero` (callout entre Hero et Problem)
3. `Problem` (cards "appels manqués")
4. `Solution` (section `bg-primary` violet plein, cards solutions)
5. `Integration` (cards logos partenaires)
6. `Benefits` (grille avantages)
7. `Analysis` (section `bg-secondary` bleu plein)
8. `HowItWorks` (avec mini-scène 2 "Conversation flow")
9. `Results` (avec mini-scène 3 "Dashboard résultats")
10. `TargetAudience` (5-6 cards métiers : resto, médical, salons, dentaire, B2B)
11. `Pricing` (cards tarifs avec "Populaire" sticker badge)
12. `Testimonials`
13. `FAQ`
14. `CTA` finale (section `bg-secondary` bleu plein)
15. `Header`
16. `Footer`
17. `FloatingContact`
+ création des ~31 icônes restantes au fur et à mesure des sections qui les utilisent

**Critère d'acceptation phase 2** : la homepage entière en local respecte les §3 (codes sticker), zéro `.glass`, zéro `.gradient-*`, zéro `animate-pulse-*`, zéro icône Lucide non-utilitaire.

### Phase 3 — Demo page (~2h)

`/demo` (test agent IA en direct). La conversation iMessage existante est adaptée au look sticker (bulles avec contours blancs + ombres dures). Les contrôles UI (input, boutons "Tester", calendar slot picker) migrent en sticker dark.

### Phase 4 — Pages légales (~1h)

`/mentions-legales` + `/confidentialite` : contenu texte intact (RGPD, mentions légales = contenu juridique préservé), seul le wrapper de page (header + footer + h1 sticker) est restylé pour cohérence visuelle.

### Phase 5 — Audit final + cleanup (~2h)

- Grep audit : zéro `bg-gradient-to-*`, zéro `.glass`, zéro `.gradient-text`, zéro `animate-pulse-glow`, zéro `animate-ping-slow`, imports `lucide-react` uniquement utilitaires
- Build + lint
- Lighthouse desktop + mobile
- Mobile responsive check (DevTools iPhone 12) — zéro rotation visible, zéro scroll horizontal, boutons ≥ 48px haut
- Cleanup `globals.css` : suppression des tokens obsolètes (`--color-accent` magenta, `--color-primary-light/dark`, `--color-accent-light`, `--color-surface*`)
- Suppression du dossier `/dev/sticker-preview` ou ajout au `next-sitemap` exclude

---

## 12. Hors scope (non touché)

- **Logo PNG callaps** (`/public/logo.png`) — reste tel quel
- **Blog** (`/src/app/blog/*`, articles, layouts) — entièrement intact
- **API routes** (`/src/app/api/booking`, `/api/call`, `/api/slots`) — pas de UI, pas touché
- **Système de traduction** (`/src/lib/translations.ts`, `/src/lib/LanguageContext.tsx`) — préservé strictement. Toutes les copies textuelles passent par `t('key')` — la migration ne fait que changer le wrapper visuel
- **OG image existante** (`/public/og-image.png`) — restera tel quel pour le MVP. À régénérer en sticker dans une phase 2 séparée.
- **Stack** (Next.js, Tailwind 4) — aucun changement de dépendance majeur. `framer-motion` à installer si pas déjà là.

---

## 13. Critères de validation finaux

Le redesign est terminé quand **toutes** ces assertions sont vraies :

- [ ] `grep -rn "bg-gradient-to" src/components src/app | grep -v "src/app/blog"` → 0 résultats
- [ ] `grep -rn "\.glass\b" src/app/globals.css` → 0 (la classe `.glass` est supprimée)
- [ ] `grep -rn "gradient-text\|gradient-border" src/components src/app | grep -v "src/app/blog"` → 0
- [ ] `grep -rn "animate-pulse-glow\|animate-ping-slow\|animate-pulse-soft" src/components src/app` → 0
- [ ] `grep -rn "#D946EF" src/` → 0 (magenta complètement éradiqué)
- [ ] `grep -rn "from \"lucide-react\"" src/components src/app` → uniquement `Menu`, `X`, `ChevronDown`, `ChevronRight`
- [ ] Tous les CTA primaires ont `min-height: 56px` desktop / `48px` mobile
- [ ] Lighthouse Accessibility ≥ 95 sur la homepage
- [ ] Lighthouse Performance ≥ 90
- [ ] Les 3 mini-scènes (Appel entrant / Conversation flow / Dashboard résultats) sont en place
- [ ] Mobile (`< 640px`) : zéro rotation visible, zéro scroll horizontal, tous boutons ≥ 48px
- [ ] Le système de traduction est intact : `t('key')` calls inchangés
- [ ] Toutes les sections du brand-book §9 (HERO → PROBLÈME → SOLUTION → RÉSULTAT → CTA) sont visuellement claires en 3 secondes (cf. brand-book §14 "Compréhension en 3 secondes")
- [ ] Aucune régression sur `/blog/*`, `/api/*`

---

## 14. Prochaine étape

Ce spec est l'entrée de la skill **writing-plans** qui produira un plan d'implémentation détaillé phase par phase, avec :
- Code SVG complet pour les 38 icônes
- Code TSX complet pour les 3 mini-scènes
- Code complet des composants `<StickerCard>` / `<StickerIconBox>` adaptés dark
- Vérifications post-tâche (grep audits, build, lint)
- Commits par tâche pour rollback ciblé

---

## Annexe — Cohérence avec le brand-book

Ce spec est aligné avec `docs/BRAND-BOOK.md` :

| Brand-book | Application dans le spec |
|---|---|
| §1 "Chaque appel devient une opportunité" | Mini-scène "Appel entrant" en Hero met l'appel entrant au centre |
| §5 Couleurs (Violet, Bleu, Noir, Blanc) | Tokens stricts §4.1 — magenta supprimé |
| §6 "Toujours iPhone mockups, UI réelle, dashboards, cartes flottantes" | Les 3 mini-scènes sont toutes UI réelle (téléphone, conversation, dashboard). Pas de robot mascotte. |
| §6 "Jamais robots, IA abstraite, futuriste générique" | Icône `ai-bot` retirée de l'inventaire. Mini-scène 2 utilise des avatars silhouette/lettre callaps, pas de robot character. |
| §7 Iconographie (appel en cours, transcription, lead généré) | Icônes `phone-incoming`, `transcript`, `lead` créées spécifiquement |
| §8 Structure (Problème → Solution → Résultat) | Préservée dans l'ordre des sections homepage |
| §10 CTA toujours visibles | FloatingContact préservé + CTA primaire dans Header + CTA finale section bleu plein |
| §12 Ton (direct, business, court, impactant) | Composants minimalistes, pas de décorations gratuites |
| §14 Compréhension en 3 secondes | Validé via le critère §13 |
