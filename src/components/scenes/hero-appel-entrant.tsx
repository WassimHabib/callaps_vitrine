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
        <rect x="120" y="40" width="240" height="340" rx="36" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="6" />
        <rect x="135" y="55" width="210" height="310" rx="22" fill="#0B0B0F" />
        <rect x="200" y="55" width="80" height="22" rx="11" fill="#FFFFFF" />

        <text x="240" y="130" fontSize="14" fontWeight="900" fill="#FFFFFF" textAnchor="middle" opacity="0.7">
          NUMÉRO INCONNU
        </text>
        <text x="240" y="160" fontSize="22" fontWeight="900" fill="#FFFFFF" textAnchor="middle">
          Appel entrant
        </text>

        <motion.g animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.2, repeat: Infinity }} style={{ transformOrigin: "240px 220px" }}>
          <rect x="200" y="212" width="6" height="16" rx="2" fill="#4DAFFF" />
          <rect x="212" y="206" width="6" height="28" rx="2" fill="#7B61FF" />
          <rect x="224" y="200" width="6" height="40" rx="2" fill="#4DAFFF" />
          <rect x="236" y="194" width="6" height="52" rx="2" fill="#7B61FF" />
          <rect x="248" y="200" width="6" height="40" rx="2" fill="#4DAFFF" />
          <rect x="260" y="206" width="6" height="28" rx="2" fill="#7B61FF" />
          <rect x="272" y="212" width="6" height="16" rx="2" fill="#4DAFFF" />
        </motion.g>

        <circle cx="180" cy="320" r="22" fill="#FB7185" stroke="#FFFFFF" strokeWidth="3" />
        <line x1="172" y1="312" x2="188" y2="328" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
        <line x1="188" y1="312" x2="172" y2="328" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />

        <motion.g animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ transformOrigin: "300px 320px" }}>
          <circle cx="300" cy="320" r="22" fill="#4DAFFF" stroke="#FFFFFF" strokeWidth="3" />
          <path d="M 290 314 L 294 314 L 297 320 L 294 322 Q 296 326 300 328 L 302 325 L 308 328 L 308 332 Q 308 334 305 334 Q 290 334 286 318 Q 286 314 290 314 Z" fill="#FFFFFF" />
        </motion.g>
      </g>

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
