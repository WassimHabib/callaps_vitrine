"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

/* ─── Conversation IA simulée ─── */
const AI_CONVERSATION: { role: "ai" | "user"; text: string; delay: number }[] =
  [
    {
      role: "ai",
      text: "Bonjour ! Je suis l'agent IA de Callaps. Comment puis-je vous aider aujourd'hui ?",
      delay: 0,
    },
    {
      role: "user",
      text: "Bonjour, je voudrais en savoir plus sur vos solutions d'automatisation.",
      delay: 2500,
    },
    {
      role: "ai",
      text: "Bien sûr ! Callaps propose des agents IA conversationnels qui gèrent vos appels entrants et sortants automatiquement. Quel est votre besoin principal : service client, prospection ou enquêtes ?",
      delay: 5000,
    },
    {
      role: "user",
      text: "Nous cherchons à automatiser notre service client. On reçoit environ 200 appels par jour.",
      delay: 8500,
    },
    {
      role: "ai",
      text: "Parfait, notre solution est idéale pour ce volume. Notre agent IA peut gérer ces 200 appels simultanément, 24h/24, avec un taux de résolution de 85% sans intervention humaine. Souhaitez-vous planifier une démonstration personnalisée ?",
      delay: 11000,
    },
    {
      role: "user",
      text: "Oui, je suis intéressé. Comment on procède ?",
      delay: 14500,
    },
    {
      role: "ai",
      text: "Excellent ! Je vous propose de réserver un créneau de 30 minutes avec notre équipe. Vous pouvez choisir directement un horaire dans le calendrier ci-dessous. 👇",
      delay: 16500,
    },
  ];

/* ─── Sound wave animation bars ─── */
function SoundWave({ active }: { active: boolean }) {
  return (
    <div className="flex items-center gap-[3px] h-5">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={`w-[3px] rounded-full transition-all duration-300 ${
            active ? "bg-primary" : "bg-slate-600"
          }`}
          style={{
            height: active ? `${8 + Math.random() * 14}px` : "4px",
            animation: active
              ? `soundbar 0.${4 + i}s ease-in-out infinite alternate`
              : "none",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Phone Widget ─── */
function PhoneWidget() {
  const [messages, setMessages] = useState<
    { role: "ai" | "user"; text: string }[]
  >([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  function startDemo() {
    setIsPlaying(true);
    setMessages([]);
    setCurrentIdx(0);
  }

  useEffect(() => {
    if (!isPlaying || currentIdx >= AI_CONVERSATION.length) {
      if (currentIdx >= AI_CONVERSATION.length) setIsPlaying(false);
      return;
    }

    const msg = AI_CONVERSATION[currentIdx];
    const baseDelay = currentIdx === 0 ? 800 : 1800;

    // Show typing indicator
    const typingTimer = setTimeout(() => {
      setIsTyping(true);
    }, baseDelay - 800);

    // Show message
    const timer = setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { role: msg.role, text: msg.text }]);
      setCurrentIdx((prev) => prev + 1);
    }, baseDelay + msg.text.length * 15);

    return () => {
      clearTimeout(typingTimer);
      clearTimeout(timer);
    };
  }, [isPlaying, currentIdx]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div className="relative">
      {/* Phone frame */}
      <div className="relative mx-auto w-full max-w-[380px]">
        {/* Outer glow */}
        <div className="absolute -inset-4 bg-gradient-to-b from-primary/20 via-accent/10 to-transparent rounded-[3rem] blur-2xl opacity-60" />

        <div className="relative rounded-[2.5rem] bg-slate-950 border border-white/10 p-3 shadow-2xl shadow-black/50">
          {/* Phone notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-slate-950 rounded-b-2xl z-20 flex items-center justify-center">
            <div className="w-16 h-1 bg-slate-800 rounded-full" />
          </div>

          {/* Screen */}
          <div className="rounded-[2rem] bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden">
            {/* Status bar */}
            <div className="flex items-center justify-between px-6 pt-8 pb-3">
              <span className="text-xs text-slate-500">Callaps IA</span>
              <SoundWave active={isPlaying} />
              <span className="text-xs text-slate-500">
                {isPlaying ? "En cours..." : "Prêt"}
              </span>
            </div>

            {/* Agent info */}
            <div className="text-center px-6 pb-4 border-b border-white/5">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center ring-4 ring-primary/20">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                >
                  <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" />
                  <path d="M9 21h6" />
                  <circle cx="12" cy="9" r="2" />
                </svg>
              </div>
              <h3 className="text-white font-semibold">Agent Callaps</h3>
              <p className="text-xs text-slate-500 mt-1">
                Assistant IA conversationnel
              </p>
            </div>

            {/* Chat area */}
            <div
              ref={chatRef}
              className="h-[320px] overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin"
            >
              {messages.length === 0 && !isPlaying && (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="text-primary"
                    >
                      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                      <line x1="12" y1="19" x2="12" y2="23" />
                      <line x1="8" y1="23" x2="16" y2="23" />
                    </svg>
                  </div>
                  <p className="text-slate-500 text-sm">
                    Lancez la démo pour voir
                    <br />
                    l&apos;agent IA en action
                  </p>
                </div>
              )}

              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed rounded-2xl ${
                      msg.role === "ai"
                        ? "bg-white/5 text-slate-200 rounded-tl-sm"
                        : "bg-gradient-to-r from-primary to-accent text-white rounded-tr-sm"
                    }`}
                    style={{
                      animation: "fadeSlideUp 0.3s ease-out",
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 px-4 py-3 rounded-2xl rounded-tl-sm">
                    <div className="flex gap-1.5">
                      <div
                        className="w-2 h-2 rounded-full bg-slate-400"
                        style={{
                          animation: "typingDot 1.4s infinite",
                          animationDelay: "0ms",
                        }}
                      />
                      <div
                        className="w-2 h-2 rounded-full bg-slate-400"
                        style={{
                          animation: "typingDot 1.4s infinite",
                          animationDelay: "200ms",
                        }}
                      />
                      <div
                        className="w-2 h-2 rounded-full bg-slate-400"
                        style={{
                          animation: "typingDot 1.4s infinite",
                          animationDelay: "400ms",
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action button */}
            <div className="px-4 pb-6 pt-2">
              <button
                onClick={startDemo}
                disabled={isPlaying}
                className={`w-full py-3.5 rounded-2xl font-semibold text-sm transition-all duration-300 ${
                  isPlaying
                    ? "bg-white/5 text-slate-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98]"
                }`}
              >
                {isPlaying
                  ? "Conversation en cours..."
                  : messages.length > 0
                    ? "Relancer la démo"
                    : "Lancer la démo"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Calendly Embed ─── */
function CalendlyEmbed() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className="calendly-inline-widget rounded-2xl overflow-hidden"
      data-url="https://calendly.com/habib-wassim75/premier-echange-decouverte-de-vos-besoins-wevlap?hide_gdpr_banner=1&background_color=0f172a&text_color=e2e8f0&primary_color=06b6d4"
      style={{ minWidth: "320px", height: "700px" }}
    />
  );
}

/* ─── Page principale ─── */
export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="relative z-20 flex items-center justify-between max-w-7xl mx-auto px-6 py-6">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Callaps"
            width={140}
            height={40}
            className="h-9 w-auto"
            priority
          />
        </Link>
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Retour
        </Link>
      </header>

      {/* Main content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        {/* Title */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-slate-400 mb-6">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Démo interactive
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Testez notre{" "}
            <span className="gradient-text">agent IA en direct</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Découvrez comment notre agent conversationnel gère un appel, puis
            réservez un créneau pour une démonstration personnalisée.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Phone demo */}
          <div>
            <div className="text-center mb-8 lg:text-left">
              <h2 className="text-xl font-semibold text-white mb-2">
                Simulation d&apos;appel IA
              </h2>
              <p className="text-sm text-slate-400">
                Observez une conversation type entre un client et notre agent
              </p>
            </div>
            <PhoneWidget />
          </div>

          {/* Right: Calendly booking */}
          <div>
            <div className="mb-8 lg:text-left text-center">
              <h2 className="text-xl font-semibold text-white mb-2">
                Prendre rendez-vous
              </h2>
              <p className="text-sm text-slate-400">
                30 minutes pour découvrir comment Callaps peut transformer vos
                appels
              </p>
            </div>
            <div className="rounded-3xl bg-slate-900/80 border border-white/10 overflow-hidden backdrop-blur-sm">
              <CalendlyEmbed />
            </div>
          </div>
        </div>

        {/* Trust signals */}
        <div className="mt-20 flex flex-wrap items-center justify-center gap-8 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-emerald-400"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Gratuit et sans engagement
          </div>
          <div className="flex items-center gap-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-emerald-400"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Réponse sous 24h
          </div>
          <div className="flex items-center gap-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-emerald-400"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Démo personnalisée
          </div>
        </div>
      </main>

      {/* CSS animations */}
      <style jsx>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes typingDot {
          0%,
          60%,
          100% {
            opacity: 0.3;
            transform: translateY(0);
          }
          30% {
            opacity: 1;
            transform: translateY(-4px);
          }
        }
        @keyframes soundbar {
          from {
            height: 4px;
          }
          to {
            height: 18px;
          }
        }
      `}</style>
    </div>
  );
}
