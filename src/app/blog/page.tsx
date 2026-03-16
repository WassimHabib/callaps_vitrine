import Link from "next/link";
import Image from "next/image";
import { articles } from "@/lib/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Callaps",
  description:
    "Guides, conseils et actualités sur les agents vocaux IA, l'automatisation des appels et l'IA conversationnelle pour entreprises.",
  openGraph: {
    title: "Blog Callaps — Agents Vocaux IA & Automatisation",
    description:
      "Guides, conseils et actualités sur les agents vocaux IA et l'automatisation des appels.",
    url: "https://callaps.fr/blog",
  },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="relative z-20 flex items-center justify-between max-w-7xl mx-auto px-6 py-6">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Callaps"
            width={360}
            height={100}
            className="h-14 md:h-20 w-auto"
            priority
          />
        </Link>
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Accueil
        </Link>
      </header>

      <main className="max-w-4xl mx-auto px-6 pb-20">
        {/* Title */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Le Blog <span className="gradient-text">Callaps</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Guides, conseils et actualités sur les agents vocaux IA
            et l&apos;automatisation des appels.
          </p>
        </div>

        {/* Articles grid */}
        <div className="space-y-6">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="block group"
            >
              <article className="rounded-2xl bg-white/5 border border-white/10 p-6 md:p-8 transition-all duration-200 hover:bg-white/[0.07] hover:border-white/20">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-medium text-primary bg-primary/10 rounded-full px-3 py-1">
                    {article.category}
                  </span>
                  <span className="text-xs text-slate-500">
                    {new Date(article.date).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <span className="text-xs text-slate-500">{article.readTime} de lecture</span>
                </div>

                <h2 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                  {article.title}
                </h2>

                <p className="text-slate-400 mb-4 leading-relaxed">
                  {article.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {article.keywords.slice(0, 3).map((kw) => (
                    <span
                      key={kw}
                      className="text-xs text-slate-500 bg-white/5 rounded-full px-2.5 py-1"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20 p-8">
            <h2 className="text-xl font-bold text-white mb-3">
              Prêt à automatiser vos appels ?
            </h2>
            <p className="text-slate-300 mb-6">
              Réservez un échange découverte gratuit de 30 minutes.
            </p>
            <Link
              href="/demo"
              className="inline-block rounded-full bg-gradient-to-r from-primary to-accent px-8 py-3 text-white font-semibold hover:scale-105 transition-transform"
            >
              Réserver une démo
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
