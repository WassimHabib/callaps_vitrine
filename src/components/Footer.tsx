const productLinks = [
  { label: "Fonctionnalités", href: "#features" },
  { label: "Solutions", href: "#solutions" },
  { label: "Tarifs", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const companyLinks = [
  { label: "À propos", href: "#about" },
  { label: "Blog", href: "#blog" },
  { label: "Carrières", href: "#careers" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-surface-dark border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 py-16">
        {/* 4-column grid */}
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {/* Column 1 — Brand */}
          <div className="col-span-2 lg:col-span-1">
            <a href="#" className="inline-block">
              <span className="gradient-text text-2xl font-bold">Callaps</span>
            </a>
            <p className="mt-4 max-w-xs text-slate-400">
              Agents IA conversationnels personnalisés pour automatiser vos
              appels et booster votre croissance. Un produit Wevlap.
            </p>
          </div>

          {/* Column 2 — Produit */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Produit</h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-slate-400 transition-colors duration-200 hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Entreprise */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Entreprise</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-slate-400 transition-colors duration-200 hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Contact</h3>
            <ul className="space-y-3 text-slate-400">
              <li>
                <a
                  href="mailto:contact@wevlap.fr"
                  className="transition-colors duration-200 hover:text-primary"
                >
                  contact@wevlap.fr
                </a>
              </li>
              <li>
                <a
                  href="tel:+33651370395"
                  className="transition-colors duration-200 hover:text-primary"
                >
                  06 51 37 03 95
                </a>
              </li>
              <li>Île-de-France</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-white/5" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-slate-500">
            &copy; 2026 Callaps &mdash; Wevlap (WH Consulting). Tous droits
            réservés.
          </p>
          <div className="flex gap-6">
            <a
              href="#legal"
              className="text-sm text-slate-500 transition-colors duration-200 hover:text-slate-300"
            >
              Mentions légales
            </a>
            <a
              href="#privacy"
              className="text-sm text-slate-500 transition-colors duration-200 hover:text-slate-300"
            >
              Confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
