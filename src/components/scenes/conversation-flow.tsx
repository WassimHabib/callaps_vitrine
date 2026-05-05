// src/components/scenes/conversation-flow.tsx
"use client";

import { motion } from "framer-motion";

export function ConversationFlow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 360" className={className} role="img" aria-labelledby="conv-title conv-desc">
      <title id="conv-title">Conversation entre client et agent IA</title>
      <desc id="conv-desc">Deux bulles de message iMessage entre un client et l&apos;agent callaps.</desc>

      {/* Avatar incoming (client silhouette) */}
      <circle cx="50" cy="80" r="22" fill="#16161D" stroke="#FFFFFF" strokeWidth="3" />
      <circle cx="50" cy="74" r="8" fill="#FFFFFF" />
      <path d="M 36 92 Q 36 86 50 86 Q 64 86 64 92" fill="#FFFFFF" />

      {/* Incoming bubble (left, dark) */}
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

      {/* Avatar outgoing (callaps "C" letter) */}
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
