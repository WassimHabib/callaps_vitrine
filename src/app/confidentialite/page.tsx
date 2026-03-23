import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de Confidentialité — Callaps",
  description: "Politique de confidentialité et protection des données personnelles du site callaps.fr — RGPD.",
};

export default function Confidentialite() {
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
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Politique de Confidentialité</h1>
        <p className="text-sm text-slate-500 mb-12">Dernière mise à jour : 23 mars 2026</p>

        <div className="space-y-10 text-slate-300 leading-relaxed">
          {/* Introduction */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">1. Introduction</h2>
            <p>
              WH Consulting (Wevlap), éditeur du site callaps.fr et de la solution Callaps,
              s&apos;engage à protéger la vie privée de ses utilisateurs conformément au
              Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés.
            </p>
            <p className="mt-3">
              La présente politique détaille comment nous collectons, utilisons et protégeons vos données personnelles.
            </p>
          </section>

          {/* Responsable */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">2. Responsable du traitement</h2>
            <ul className="space-y-1 text-slate-400">
              <li><strong className="text-slate-200">Responsable :</strong> Wassim Habib — WH Consulting (Wevlap)</li>
              <li><strong className="text-slate-200">Email :</strong> <a href="mailto:contact@wevlap.fr" className="text-accent hover:text-accent-light transition-colors">contact@wevlap.fr</a></li>
              <li><strong className="text-slate-200">Adresse :</strong> Île-de-France, France</li>
            </ul>
          </section>

          {/* Données collectées */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">3. Données collectées</h2>
            <p>Nous collectons les données suivantes dans le cadre de nos services :</p>
            <div className="mt-4 space-y-4">
              <div>
                <h3 className="text-base font-medium text-white mb-2">Via le formulaire de démonstration</h3>
                <ul className="list-disc list-inside text-slate-400 space-y-1">
                  <li>Nom et prénom</li>
                  <li>Adresse email</li>
                  <li>Numéro de téléphone</li>
                  <li>Nom de l&apos;entreprise</li>
                  <li>Description du besoin</li>
                </ul>
              </div>
              <div>
                <h3 className="text-base font-medium text-white mb-2">Via la fonctionnalité &quot;Tester l&apos;agent&quot;</h3>
                <ul className="list-disc list-inside text-slate-400 space-y-1">
                  <li>Prénom</li>
                  <li>Numéro de téléphone</li>
                </ul>
              </div>
              <div>
                <h3 className="text-base font-medium text-white mb-2">Données de navigation</h3>
                <ul className="list-disc list-inside text-slate-400 space-y-1">
                  <li>Adresse IP (anonymisée)</li>
                  <li>Type de navigateur et système d&apos;exploitation</li>
                  <li>Pages visitées et durée de visite</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Finalités */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">4. Finalités du traitement</h2>
            <p>Vos données sont utilisées pour :</p>
            <ul className="mt-3 list-disc list-inside text-slate-400 space-y-1">
              <li>Répondre à vos demandes de démonstration</li>
              <li>Vous permettre de tester notre agent IA par téléphone</li>
              <li>Planifier des rendez-vous via notre système de réservation</li>
              <li>Vous contacter dans le cadre de notre relation commerciale</li>
              <li>Améliorer nos services et l&apos;expérience utilisateur du site</li>
              <li>Respecter nos obligations légales</li>
            </ul>
          </section>

          {/* Base juridique */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">5. Base juridique</h2>
            <p>Le traitement de vos données repose sur :</p>
            <ul className="mt-3 list-disc list-inside text-slate-400 space-y-1">
              <li><strong className="text-slate-200">Votre consentement</strong> — lorsque vous remplissez un formulaire ou demandez un appel</li>
              <li><strong className="text-slate-200">L&apos;intérêt légitime</strong> — pour améliorer nos services et assurer le bon fonctionnement du site</li>
              <li><strong className="text-slate-200">L&apos;exécution contractuelle</strong> — dans le cadre de la fourniture de nos services</li>
            </ul>
          </section>

          {/* Durée de conservation */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">6. Durée de conservation</h2>
            <ul className="space-y-2 text-slate-400">
              <li><strong className="text-slate-200">Données de prospect :</strong> 3 ans à compter du dernier contact</li>
              <li><strong className="text-slate-200">Données client :</strong> durée de la relation contractuelle + 5 ans (obligations légales)</li>
              <li><strong className="text-slate-200">Données de navigation :</strong> 13 mois maximum</li>
            </ul>
          </section>

          {/* Partage */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">7. Partage des données</h2>
            <p>Vos données peuvent être partagées avec :</p>
            <ul className="mt-3 list-disc list-inside text-slate-400 space-y-1">
              <li><strong className="text-slate-200">Cal.com</strong> — pour la gestion des rendez-vous</li>
              <li><strong className="text-slate-200">Vercel</strong> — hébergement du site</li>
              <li><strong className="text-slate-200">Callaps (infrastructure IA)</strong> — pour le traitement des appels</li>
            </ul>
            <p className="mt-3">
              Nous ne vendons jamais vos données à des tiers. Tous nos sous-traitants sont conformes au RGPD.
            </p>
          </section>

          {/* Sécurité */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">8. Sécurité des données</h2>
            <p>Nous mettons en œuvre les mesures techniques et organisationnelles suivantes :</p>
            <ul className="mt-3 list-disc list-inside text-slate-400 space-y-1">
              <li>Chiffrement HTTPS (TLS) sur l&apos;ensemble du site</li>
              <li>Clés API stockées en variables d&apos;environnement sécurisées</li>
              <li>Accès restreint aux données personnelles</li>
              <li>Hébergement conforme aux standards de sécurité (Vercel, SOC 2)</li>
            </ul>
          </section>

          {/* Droits */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">9. Vos droits</h2>
            <p>Conformément au RGPD, vous disposez des droits suivants :</p>
            <ul className="mt-3 list-disc list-inside text-slate-400 space-y-1">
              <li><strong className="text-slate-200">Droit d&apos;accès</strong> — obtenir une copie de vos données</li>
              <li><strong className="text-slate-200">Droit de rectification</strong> — corriger vos données inexactes</li>
              <li><strong className="text-slate-200">Droit à l&apos;effacement</strong> — demander la suppression de vos données</li>
              <li><strong className="text-slate-200">Droit à la portabilité</strong> — recevoir vos données dans un format structuré</li>
              <li><strong className="text-slate-200">Droit d&apos;opposition</strong> — vous opposer au traitement de vos données</li>
              <li><strong className="text-slate-200">Droit à la limitation</strong> — limiter le traitement de vos données</li>
            </ul>
            <p className="mt-4">
              Pour exercer vos droits, contactez-nous à{" "}
              <a href="mailto:contact@wevlap.fr" className="text-accent hover:text-accent-light transition-colors">
                contact@wevlap.fr
              </a>.
              Nous répondons sous 30 jours.
            </p>
          </section>

          {/* CNIL */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">10. Réclamation</h2>
            <p>
              Si vous estimez que le traitement de vos données ne respecte pas la réglementation,
              vous pouvez introduire une réclamation auprès de la CNIL :
            </p>
            <ul className="mt-3 text-slate-400 space-y-1">
              <li><strong className="text-slate-200">CNIL</strong> — Commission Nationale de l&apos;Informatique et des Libertés</li>
              <li>3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07</li>
              <li>www.cnil.fr</li>
            </ul>
          </section>

          {/* Modification */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">11. Modification de la politique</h2>
            <p>
              Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment.
              La date de dernière mise à jour est indiquée en haut de cette page.
              Nous vous encourageons à la consulter régulièrement.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
