"use client";

import { useEffect, useRef, useState } from "react";

const features = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    title: "Appels automatisés",
    description:
      "Gérez des centaines d\u2019appels simultanément. Vos agents IA répondent instantanément, 24h/24, sans temps d\u2019attente.",
    metric: "500+",
    metricLabel: "appels/heure",
    accentColor: "from-cyan-500 to-blue-600",
    glowColor: "bg-cyan-500/20",
    iconBg: "bg-cyan-500/10",
    iconColor: "text-cyan-400",
    pattern: "radial",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" />
        <path d="M9 21h6" />
        <path d="M10 17v4" />
        <path d="M14 17v4" />
        <circle cx="12" cy="9" r="2" />
      </svg>
    ),
    title: "IA Conversationnelle",
    description:
      "Compréhension naturelle du langage. Vos agents comprennent les nuances et répondent de manière fluide et humaine.",
    metric: "98%",
    metricLabel: "compréhension",
    accentColor: "from-violet-500 to-purple-600",
    glowColor: "bg-violet-500/20",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-400",
    pattern: "dots",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="M7 16l4-8 4 4 5-10" />
      </svg>
    ),
    title: "Analytics avancés",
    description:
      "Tableaux de bord en temps réel. Analysez les performances, le sentiment client et les tendances d\u2019appels.",
    metric: "360°",
    metricLabel: "vue complète",
    accentColor: "from-emerald-500 to-teal-600",
    glowColor: "bg-emerald-500/20",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
    pattern: "lines",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="8" height="8" rx="2" />
        <rect x="14" y="2" width="8" height="8" rx="2" />
        <rect x="2" y="14" width="8" height="8" rx="2" />
        <rect x="14" y="14" width="8" height="8" rx="2" />
        <path d="M10 6h4" />
        <path d="M6 10v4" />
        <path d="M18 10v4" />
        <path d="M10 18h4" />
      </svg>
    ),
    title: "Intégration CRM",
    description:
      "Connexion native avec vos outils : HubSpot, Salesforce, Pipedrive et plus encore.",
    metric: "50+",
    metricLabel: "intégrations",
    accentColor: "from-orange-500 to-amber-600",
    glowColor: "bg-orange-500/20",
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-400",
    pattern: "grid",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: "Sécurité & RGPD",
    description:
      "Données hébergées en France. Conformité RGPD totale. Chiffrement de bout en bout.",
    metric: "100%",
    metricLabel: "conforme RGPD",
    accentColor: "from-rose-500 to-pink-600",
    glowColor: "bg-rose-500/20",
    iconBg: "bg-rose-500/10",
    iconColor: "text-rose-400",
    pattern: "shield",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 15V3m0 12l-4-4m4 4l4-4" />
        <path d="M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17" />
      </svg>
    ),
    title: "100% Personnalisable",
    description:
      "Scripts d\u2019appels, voix, tonalité, scénarios — tout est configurable selon votre marque.",
    metric: "\u221E",
    metricLabel: "possibilités",
    accentColor: "from-sky-500 to-indigo-600",
    glowColor: "bg-sky-500/20",
    iconBg: "bg-sky-500/10",
    iconColor: "text-sky-400",
    pattern: "waves",
  },
];

function CardPattern({ type }: { type: string }) {
  switch (type) {
    case "radial":
      return (
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-gradient-to-br from-cyan-500/10 to-transparent blur-2xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-cyan-500/5 blur-xl" />
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-cyan-500/10"
              style={{
                width: `${80 + i * 60}px`,
                height: `${80 + i * 60}px`,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
        </div>
      );
    case "dots":
      return (
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          <div className="absolute -top-8 -right-8 w-36 h-36 bg-gradient-to-br from-violet-500/15 to-transparent blur-2xl" />
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }} />
        </div>
      );
    case "lines":
      return (
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          <div className="absolute -bottom-8 -right-8 w-36 h-36 bg-gradient-to-tl from-emerald-500/15 to-transparent blur-2xl" />
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: "repeating-linear-gradient(135deg, transparent, transparent 10px, white 10px, white 11px)",
          }} />
        </div>
      );
    case "grid":
      return (
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-gradient-to-b from-orange-500/10 to-transparent blur-2xl" />
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }} />
        </div>
      );
    case "shield":
      return (
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-rose-500/10 to-transparent blur-2xl" />
          <svg className="absolute bottom-4 right-4 w-24 h-24 text-rose-500/[0.04]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>
      );
    case "waves":
      return (
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          <div className="absolute -top-4 -left-4 w-36 h-36 bg-gradient-to-br from-sky-500/15 to-transparent blur-2xl" />
          <svg className="absolute bottom-0 left-0 w-full h-16 text-sky-500/[0.05]" viewBox="0 0 400 60" preserveAspectRatio="none">
            <path d="M0 30 Q50 10 100 30 T200 30 T300 30 T400 30 V60 H0Z" fill="currentColor" />
            <path d="M0 40 Q50 20 100 40 T200 40 T300 40 T400 40 V60 H0Z" fill="currentColor" opacity="0.5" />
          </svg>
        </div>
      );
    default:
      return null;
  }
}

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-3xl p-[1px] transition-all duration-500"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        transitionDelay: `${index * 100}ms`,
      }}
    >
      {/* Animated gradient border on hover */}
      <div
        className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[1px]`}
      />

      {/* Spotlight effect following cursor */}
      {isHovered && (
        <div
          className="pointer-events-none absolute z-10 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl transition-opacity duration-300"
          style={{
            left: mousePos.x,
            top: mousePos.y,
            background: `radial-gradient(circle, ${
              feature.iconColor.includes("cyan") ? "#06b6d4" :
              feature.iconColor.includes("violet") ? "#8b5cf6" :
              feature.iconColor.includes("emerald") ? "#10b981" :
              feature.iconColor.includes("orange") ? "#f97316" :
              feature.iconColor.includes("rose") ? "#f43f5e" :
              "#0ea5e9"
            } 0%, transparent 70%)`,
          }}
        />
      )}

      {/* Card content */}
      <div className="relative h-full rounded-3xl bg-slate-900/90 p-8 backdrop-blur-sm overflow-hidden">
        {/* Background pattern unique per card */}
        <CardPattern type={feature.pattern} />

        {/* Content */}
        <div className="relative z-10">
          {/* Top row: icon + metric */}
          <div className="flex items-start justify-between mb-6">
            <div
              className={`w-14 h-14 rounded-2xl ${feature.iconBg} ${feature.iconColor} flex items-center justify-center ring-1 ring-white/5 group-hover:scale-110 group-hover:ring-white/10 transition-all duration-300`}
            >
              {feature.icon}
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold bg-gradient-to-r ${feature.accentColor} bg-clip-text text-transparent`}>
                {feature.metric}
              </div>
              <div className="text-[11px] uppercase tracking-wider text-slate-500">
                {feature.metricLabel}
              </div>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-white/90 transition-colors">
            {feature.title}
          </h3>

          {/* Description */}
          <p className="text-slate-400 leading-relaxed text-[15px]">
            {feature.description}
          </p>

          {/* Bottom accent line */}
          <div className="mt-6 flex items-center gap-2">
            <div className={`h-[2px] w-8 rounded-full bg-gradient-to-r ${feature.accentColor} opacity-60 group-hover:w-16 group-hover:opacity-100 transition-all duration-500`} />
            <span className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">
              En savoir plus
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Features() {
  return (
    <section id="features" className="relative bg-surface-dark py-28 px-4 overflow-hidden">
      {/* Section background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-slate-400 mb-6">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            Fonctionnalités clés
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Des agents IA qui{" "}
            <span className="gradient-text">transforment votre business</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Nos agents conversationnels s&apos;adaptent à vos besoins et
            s&apos;intègrent à vos outils existants.
          </p>
        </div>

        {/* Feature cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
