import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { articles, getArticleBySlug } from "@/lib/blog";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      url: `https://callaps.fr/blog/${article.slug}`,
      publishedTime: article.date,
      authors: ["Wevlap"],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
    },
    alternates: {
      canonical: `https://callaps.fr/blog/${article.slug}`,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    author: {
      "@type": "Organization",
      name: "Callaps by Wevlap",
      url: "https://callaps.fr",
    },
    publisher: {
      "@type": "Organization",
      name: "Callaps",
      logo: { "@type": "ImageObject", url: "https://callaps.fr/logo.png" },
    },
    mainEntityOfPage: `https://callaps.fr/blog/${article.slug}`,
    keywords: article.keywords.join(", "),
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
          href="/blog"
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Blog
        </Link>
      </header>

      <main className="max-w-3xl mx-auto px-6 pb-20">
        {/* Article header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
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

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
            {article.title}
          </h1>

          <p className="text-lg text-slate-400 leading-relaxed">
            {article.description}
          </p>
        </div>

        {/* Table of contents */}
        <nav className="rounded-xl bg-white/5 border border-white/10 p-5 mb-12">
          <h2 className="text-sm font-semibold text-white mb-3">Sommaire</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="#quest-ce-quun-agent-vocal-ia" className="text-slate-400 hover:text-primary transition-colors">Qu&apos;est-ce qu&apos;un agent vocal IA ?</a></li>
            <li><a href="#pourquoi-adopter-agent-vocal" className="text-slate-400 hover:text-primary transition-colors">Pourquoi adopter un agent vocal IA en 2026 ?</a></li>
            <li><a href="#cas-utilisation" className="text-slate-400 hover:text-primary transition-colors">Les cas d&apos;utilisation concrets</a></li>
            <li><a href="#comment-ca-marche" className="text-slate-400 hover:text-primary transition-colors">Comment fonctionne un agent vocal IA ?</a></li>
            <li><a href="#agent-vocal-vs-callbot" className="text-slate-400 hover:text-primary transition-colors">Agent vocal IA vs Callbot traditionnel</a></li>
            <li><a href="#choisir-solution" className="text-slate-400 hover:text-primary transition-colors">Comment choisir la bonne solution ?</a></li>
            <li><a href="#conclusion" className="text-slate-400 hover:text-primary transition-colors">Conclusion</a></li>
          </ul>
        </nav>

        {/* Article content */}
        <article
          className="prose-custom"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Author + share */}
        <div className="mt-16 pt-8 border-t border-white/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
            C
          </div>
          <div>
            <p className="text-white font-medium">Callaps by Wevlap</p>
            <p className="text-sm text-slate-500">Experts en agents vocaux IA pour entreprises</p>
          </div>
        </div>
      </main>
    </div>
  );
}
