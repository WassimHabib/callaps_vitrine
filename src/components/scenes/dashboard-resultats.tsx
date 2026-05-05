// src/components/scenes/dashboard-resultats.tsx
"use client";

import { motion } from "framer-motion";

export function DashboardResultats({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 360" className={className} role="img" aria-labelledby="dash-title dash-desc">
      <title id="dash-title">Dashboard de résultats callaps</title>
      <desc id="dash-desc">Mini-dashboard avec stats hebdomadaires : 247 appels, 184 leads, 38 RDV.</desc>

      <rect x="20" y="20" width="440" height="320" rx="20" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="6" />
      <rect x="26" y="26" width="428" height="308" rx="14" fill="#16161D" />

      <text x="44" y="60" fontSize="18" fontWeight="900" fill="#FFFFFF">Cette semaine</text>

      <rect x="280" y="44" width="36" height="24" rx="12" fill="#7B61FF" stroke="#FFFFFF" strokeWidth="2" />
      <text x="298" y="60" fontSize="11" fontWeight="700" fill="#FFFFFF" textAnchor="middle">7j</text>
      <rect x="324" y="44" width="40" height="24" rx="12" fill="transparent" stroke="#FFFFFF" strokeWidth="2" />
      <text x="344" y="60" fontSize="11" fontWeight="700" fill="#FFFFFF" textAnchor="middle">30j</text>
      <rect x="372" y="44" width="40" height="24" rx="12" fill="transparent" stroke="#FFFFFF" strokeWidth="2" />
      <text x="392" y="60" fontSize="11" fontWeight="700" fill="#FFFFFF" textAnchor="middle">12m</text>

      <g>
        <rect x="44" y="92" width="124" height="86" rx="12" fill="#0B0B0F" stroke="#FFFFFF" strokeWidth="3" />
        <text x="56" y="116" fontSize="11" fontWeight="700" fill="#FFFFFF" opacity="0.7">APPELS REÇUS</text>
        <text x="56" y="160" fontSize="34" fontWeight="900" fill="#4DAFFF">247</text>

        <rect x="178" y="92" width="124" height="86" rx="12" fill="#0B0B0F" stroke="#FFFFFF" strokeWidth="3" />
        <text x="190" y="116" fontSize="11" fontWeight="700" fill="#FFFFFF" opacity="0.7">LEADS GÉNÉRÉS</text>
        <text x="190" y="160" fontSize="34" fontWeight="900" fill="#7B61FF">184</text>

        <rect x="312" y="92" width="124" height="86" rx="12" fill="#0B0B0F" stroke="#FFFFFF" strokeWidth="3" />
        <text x="324" y="116" fontSize="11" fontWeight="700" fill="#FFFFFF" opacity="0.7">RDV PRIS</text>
        <text x="324" y="160" fontSize="34" fontWeight="900" fill="#4DAFFF">38</text>
      </g>

      <rect x="44" y="200" width="392" height="120" rx="12" fill="#0B0B0F" stroke="#FFFFFF" strokeWidth="3" />
      <text x="56" y="224" fontSize="11" fontWeight="700" fill="#FFFFFF" opacity="0.7">PROGRESSION</text>
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
