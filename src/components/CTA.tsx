import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl p-16 relative overflow-hidden">
          {/* Decorative glow circles */}
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-accent rounded-full blur-3xl opacity-20" />

          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-white mb-6">
              Prêt à révolutionner vos appels ?
            </h2>
            <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto">
              Rejoignez les entreprises qui font confiance à Callaps pour
              automatiser leur communication.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                href="/demo"
                className="bg-gradient-to-r from-primary to-accent text-white rounded-full px-8 py-4 text-lg font-medium hover:opacity-90 transition-opacity"
              >
                Démarrer gratuitement
              </Link>
              <Link
                href="/demo"
                className="bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-full px-8 py-4 text-lg font-medium hover:bg-white/10 transition-colors"
              >
                Prendre rendez-vous
              </Link>
            </div>

            <p className="text-slate-400 text-sm">
              Réponse sous 24h &middot; Sans engagement &middot; Démo gratuite
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
