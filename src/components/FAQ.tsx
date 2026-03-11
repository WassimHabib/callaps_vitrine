"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Qu'est-ce qu'un agent IA Callaps ?",
    answer:
      "Un agent IA Callaps est un assistant vocal intelligent qui gère vos appels téléphoniques automatiquement. Il comprend le langage naturel, répond aux questions de vos clients et peut effectuer des actions comme la prise de rendez-vous ou le transfert d'appel.",
  },
  {
    question: "Comment se passe l'intégration avec notre CRM ?",
    answer:
      "Callaps s'intègre nativement avec les principaux CRM du marché (HubSpot, Salesforce, Pipedrive). Notre équipe configure la connexion en quelques heures. Toutes les données d'appels sont automatiquement synchronisées.",
  },
  {
    question: "L'agent IA peut-il transférer l'appel à un humain ?",
    answer:
      "Absolument. Vous définissez les règles de transfert : complexité de la demande, sentiment détecté, mot-clé spécifique. Le transfert est fluide et le contexte de la conversation est transmis à l'agent humain.",
  },
  {
    question: "Nos données sont-elles sécurisées ?",
    answer:
      "Oui. Toutes les données sont hébergées en France, chiffrées de bout en bout et conformes au RGPD. Nous ne partageons jamais vos données avec des tiers.",
  },
  {
    question: "Peut-on personnaliser la voix et le ton de l'agent ?",
    answer:
      "Entièrement. Vous choisissez la voix, le ton, le vocabulaire et les scénarios de conversation. L'agent reflète parfaitement l'identité de votre marque.",
  },
  {
    question: "Y a-t-il un engagement minimum ?",
    answer:
      "Non. Tous nos plans sont sans engagement. Vous pouvez évoluer, réduire ou annuler à tout moment.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-surface/50 py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="gradient-text">Questions fréquentes</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Tout ce que vous devez savoir sur Callaps.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl mb-4"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full p-6 flex justify-between items-center text-white font-medium cursor-pointer text-left hover:bg-white/5 rounded-xl transition-colors"
                >
                  <span>{faq.question}</span>
                  <svg
                    className={`w-5 h-5 flex-shrink-0 ml-4 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-slate-400">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
