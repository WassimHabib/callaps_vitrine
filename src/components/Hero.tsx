import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Large glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-[10%] w-3 h-3 rounded-full bg-primary/30 animate-float animate-pulse-glow" />
      <div className="absolute top-40 right-[15%] w-2 h-2 rounded-full bg-accent/40 animate-float animation-delay-200" />
      <div className="absolute bottom-32 left-[20%] w-4 h-4 rounded-full bg-primary/20 animate-float animation-delay-400" />
      <div className="absolute top-[30%] right-[8%] w-2.5 h-2.5 rounded-full bg-accent-light/30 animate-float animation-delay-600" />
      <div className="absolute bottom-48 right-[25%] w-3 h-3 rounded-full bg-primary-light/20 animate-float animation-delay-800" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-6 py-20">
        {/* Main heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-6 animate-fade-in-up">
          Automatisez vos appels avec des{" "}
          <span className="gradient-text">agents IA intelligents</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 animate-fade-in-up animation-delay-200">
          Callaps crée des agents conversationnels personnalisés qui gèrent vos
          appels entrants et sortants, 24h/24, 7j/7. Plus de leads, moins de
          coûts.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up animation-delay-400">
          <Link
            href="/demo"
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-primary to-accent text-white font-semibold text-lg shadow-lg shadow-primary/25 transition-transform duration-300 hover:scale-105"
          >
            Démarrer gratuitement
          </Link>
          <Link
            href="/demo"
            className="px-8 py-3.5 rounded-full glass text-white font-semibold text-lg transition-all duration-300 hover:scale-105 hover:border-white/20"
          >
            Voir la démo
          </Link>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto animate-fade-in-up animation-delay-600">
          <div className="glass rounded-2xl p-6">
            <p className="text-3xl font-bold gradient-text mb-1">98%</p>
            <p className="text-sm text-slate-400">Satisfaction client</p>
          </div>
          <div className="glass rounded-2xl p-6">
            <p className="text-3xl font-bold gradient-text mb-1">24/7</p>
            <p className="text-sm text-slate-400">Disponibilité</p>
          </div>
          <div className="glass rounded-2xl p-6">
            <p className="text-3xl font-bold gradient-text mb-1">x3</p>
            <p className="text-sm text-slate-400">Leads générés</p>
          </div>
        </div>
      </div>
    </section>
  );
}
