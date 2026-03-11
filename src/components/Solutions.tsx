export default function Solutions() {
  const solutions = [
    {
      title: "Service Client",
      description:
        "Automatisez votre service client avec un agent IA disponible 24/7. Réduisez les temps d'attente et augmentez la satisfaction.",
      bullets: [
        "Réponses instantanées",
        "Transfert intelligent vers un humain",
        "Suivi des tickets",
      ],
      badge: "Populaire",
      icon: (
        <svg
          className="w-12 h-12"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24 6C15.163 6 8 13.163 8 22v4a4 4 0 0 0 0 8v-12c0-8.837 7.163-16 16-16s16 7.163 16 16v12a4 4 0 0 0 0-8v-4C40 13.163 32.837 6 24 6Z"
            fill="currentColor"
            opacity="0.2"
          />
          <path
            d="M10 24a4 4 0 0 0-4 4v4a4 4 0 0 0 4 4h1a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1ZM38 24a4 4 0 0 1 4 4v4a4 4 0 0 1-4 4h-1a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h1Z"
            fill="currentColor"
          />
          <path
            d="M12 22c0-6.627 5.373-12 12-12s12 5.373 12 12"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M38 34c0 3.314-6.268 6-14 6"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      title: "Prospection Commerciale",
      description:
        "Multipliez vos prises de contact. Votre agent IA qualifie les leads et planifie les rendez-vous automatiquement.",
      bullets: [
        "Qualification automatique",
        "Prise de RDV intégrée",
        "Reporting détaillé",
      ],
      badge: null,
      icon: (
        <svg
          className="w-12 h-12"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24 4l4 10h10l-8 6 3 10-9-7-9 7 3-10-8-6h10l4-10Z"
            fill="currentColor"
            opacity="0.2"
          />
          <path
            d="M24 4l4 10h10l-8 6 3 10-9-7-9 7 3-10-8-6h10l4-10Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M24 34v10M18 40l6-6 6 6"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Enquêtes & Sondages",
      description:
        "Réalisez des enquêtes téléphoniques à grande échelle. Collectez des données structurées en un temps record.",
      bullets: [
        "Appels sortants en masse",
        "Données structurées",
        "Analyse en temps réel",
      ],
      badge: null,
      icon: (
        <svg
          className="w-12 h-12"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="8"
            y="4"
            width="32"
            height="40"
            rx="4"
            fill="currentColor"
            opacity="0.2"
          />
          <rect
            x="8"
            y="4"
            width="32"
            height="40"
            rx="4"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M16 16h16M16 24h12M16 32h8"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M34 28l-6 6-3-3"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <section id="solutions" className="bg-surface-dark py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Des solutions adaptées à{" "}
            <span className="gradient-text">chaque besoin</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Que vous soyez une startup, PME ou grand groupe, Callaps
            s&apos;adapte à votre échelle.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {solutions.map((solution) => (
            <div
              key={solution.title}
              className="glass gradient-border rounded-2xl p-8 hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Icon */}
              <div className="bg-primary/10 rounded-xl p-3 w-fit mb-6 text-primary">
                {solution.icon}
              </div>

              {/* Title + Badge */}
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-xl font-semibold text-white">
                  {solution.title}
                </h3>
                {solution.badge && (
                  <span className="bg-primary/20 text-primary text-xs font-medium px-3 py-1 rounded-full">
                    {solution.badge}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-slate-400 mb-6 leading-relaxed">
                {solution.description}
              </p>

              {/* Bullet points */}
              <ul className="space-y-3 mb-8 flex-1">
                {solution.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-center gap-3 text-slate-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                    {bullet}
                  </li>
                ))}
              </ul>

              {/* CTA link */}
              <a
                href="#"
                className="text-primary hover:text-primary-light font-medium transition-colors duration-200 mt-auto"
              >
                En savoir plus &rarr;
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
