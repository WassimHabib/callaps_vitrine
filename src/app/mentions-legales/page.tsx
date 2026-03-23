import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions Légales — Callaps",
  description: "Mentions légales du site callaps.fr — Éditeur, hébergeur, propriété intellectuelle, responsabilité.",
};

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-surface-dark">
      {/* Header */}
      <header className="flex items-center justify-between max-w-5xl mx-auto px-6 py-6">
        <Link href="/">
          <Image src="/logo.png" alt="Callaps" width={360} height={100} className="h-12 w-auto" />
        </Link>
        <Link href="/" className="text-sm text-slate-400 hover:text-white transition-colors">
          Retour
        </Link>
      </header>

      <main className="max-w-3xl mx-auto px-6 pb-20">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Mentions Légales</h1>
        <p className="text-sm text-slate-500 mb-12">Dernière mise à jour : 23 mars 2026</p>

        <div className="space-y-10 text-slate-300 leading-relaxed">
          {/* Éditeur */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">1. Éditeur du site</h2>
            <p>Le site <strong className="text-white">callaps.fr</strong> est édité par :</p>
            <ul className="mt-3 space-y-1 text-slate-400">
              <li><strong className="text-slate-200">Raison sociale :</strong> WH Consulting (Wevlap)</li>
              <li><strong className="text-slate-200">Forme juridique :</strong> Micro-entreprise</li>
              <li><strong className="text-slate-200">Siège social :</strong> Île-de-France, France</li>
              <li><strong className="text-slate-200">SIRET :</strong> En cours d&apos;immatriculation</li>
              <li><strong className="text-slate-200">Responsable de la publication :</strong> Wassim Habib</li>
              <li><strong className="text-slate-200">Email :</strong> <a href="mailto:contact@wevlap.fr" className="text-accent hover:text-accent-light transition-colors">contact@wevlap.fr</a></li>
              <li><strong className="text-slate-200">Téléphone :</strong> <a href="tel:+33651370395" className="text-accent hover:text-accent-light transition-colors">06 51 37 03 95</a></li>
            </ul>
          </section>

          {/* Hébergeur */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">2. Hébergement</h2>
            <p>Le site est hébergé par :</p>
            <ul className="mt-3 space-y-1 text-slate-400">
              <li><strong className="text-slate-200">Hébergeur :</strong> Vercel Inc.</li>
              <li><strong className="text-slate-200">Adresse :</strong> 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</li>
              <li><strong className="text-slate-200">Site web :</strong> vercel.com</li>
            </ul>
          </section>

          {/* Propriété intellectuelle */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">3. Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble du contenu du site callaps.fr (textes, images, logos, icônes, logiciels, base de données, structure)
              est protégé par le droit de la propriété intellectuelle et est la propriété exclusive de WH Consulting (Wevlap),
              sauf mention contraire.
            </p>
            <p className="mt-3">
              Toute reproduction, représentation, modification, publication, adaptation, totale ou partielle,
              des éléments du site est interdite sans autorisation écrite préalable.
            </p>
          </section>

          {/* Responsabilité */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">4. Limitation de responsabilité</h2>
            <p>
              WH Consulting s&apos;efforce d&apos;assurer l&apos;exactitude des informations diffusées sur le site.
              Toutefois, elle ne peut garantir l&apos;exactitude, la complétude et l&apos;actualité des informations
              mises à disposition.
            </p>
            <p className="mt-3">
              L&apos;éditeur ne pourra être tenu responsable des dommages directs ou indirects résultant
              de l&apos;utilisation du site ou de l&apos;impossibilité d&apos;y accéder.
            </p>
          </section>

          {/* Liens hypertextes */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">5. Liens hypertextes</h2>
            <p>
              Le site peut contenir des liens vers d&apos;autres sites. WH Consulting n&apos;exerce aucun contrôle
              sur ces sites et décline toute responsabilité quant à leur contenu.
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">6. Cookies</h2>
            <p>
              Le site callaps.fr peut utiliser des cookies à des fins de mesure d&apos;audience et d&apos;amélioration
              de l&apos;expérience utilisateur. L&apos;utilisateur peut configurer son navigateur pour refuser les cookies.
              Pour plus d&apos;informations, consultez notre{" "}
              <Link href="/confidentialite" className="text-accent hover:text-accent-light transition-colors">
                politique de confidentialité
              </Link>.
            </p>
          </section>

          {/* Droit applicable */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">7. Droit applicable</h2>
            <p>
              Les présentes mentions légales sont régies par le droit français.
              En cas de litige, les tribunaux français seront seuls compétents.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
