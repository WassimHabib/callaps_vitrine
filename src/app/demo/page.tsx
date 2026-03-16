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

/* ─── Calendar Widget ─── */
const DAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const MONTHS = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];

// Slot from Cal.com: { time: "2026-03-19T09:00:00+01:00" }
type CalSlot = { time: string };
// Slots grouped by date key "YYYY-MM-DD"
type SlotsMap = Record<string, CalSlot[]>;

function toDateKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function formatSlotTime(isoTime: string) {
  // "2026-03-19T09:00:00+01:00" → "09:00"
  return isoTime.slice(11, 16);
}

function CalendarBooking() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<CalSlot | null>(null);
  const [step, setStep] = useState<"calendar" | "slots" | "form" | "submitting" | "confirmed" | "error">("calendar");
  const [errorMsg, setErrorMsg] = useState("");
  const [slotsMap, setSlotsMap] = useState<SlotsMap>({});
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", company: "", message: "",
  });

  // Fetch slots for the visible month
  useEffect(() => {
    async function fetchSlots() {
      setLoadingSlots(true);
      const start = new Date(currentYear, currentMonth, 1);
      const end = new Date(currentYear, currentMonth + 1, 0);
      const startTime = `${toDateKey(start)}T00:00:00Z`;
      const endTime = `${toDateKey(end)}T23:59:59Z`;

      try {
        const res = await fetch(`/api/slots?startTime=${startTime}&endTime=${endTime}`);
        const data = await res.json();
        setSlotsMap(data.slots || {});
      } catch {
        setSlotsMap({});
      }
      setLoadingSlots(false);
    }
    fetchSlots();
  }, [currentMonth, currentYear]);

  function getDaysInMonth(month: number, year: number) {
    return new Date(year, month + 1, 0).getDate();
  }
  function getFirstDayOfMonth(month: number, year: number) {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
  }
  function isPast(date: Date) {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return date < now;
  }
  function hasSlots(date: Date) {
    return (slotsMap[toDateKey(date)]?.length ?? 0) > 0;
  }
  function prevMonth() {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1); }
    else setCurrentMonth(currentMonth - 1);
  }
  function nextMonth() {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1); }
    else setCurrentMonth(currentMonth + 1);
  }
  function handleDateClick(day: number) {
    const date = new Date(currentYear, currentMonth, day);
    if (isPast(date) || !hasSlots(date)) return;
    setSelectedDate(date);
    setSelectedSlot(null);
    setStep("slots");
  }
  function handleSlotClick(slot: CalSlot) {
    setSelectedSlot(slot);
    setStep("form");
  }
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedDate || !selectedSlot) return;
    setStep("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          message: formData.message,
          start: selectedSlot.time,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMsg(data.details || data.error || "Une erreur est survenue");
        setStep("error");
        return;
      }
      setStep("confirmed");
    } catch {
      setErrorMsg("Erreur de connexion. Veuillez réessayer.");
      setStep("error");
    }
  }

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

  return (
    <div className="w-full">
      {/* Progress steps */}
      <div className="flex items-center gap-2 mb-8">
        {["Date", "Horaire", "Infos", "Confirmé"].map((label, i) => {
          const stepIdx = step === "calendar" ? 0 : step === "slots" ? 1 : (step === "form" || step === "submitting" || step === "error") ? 2 : 3;
          return (
            <div key={label} className="flex items-center gap-2 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 transition-all duration-300 ${
                i <= stepIdx ? "bg-gradient-to-r from-primary to-accent text-white" : "bg-white/5 text-slate-500"
              }`}>
                {i < stepIdx ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                ) : (i + 1)}
              </div>
              <span className={`text-xs hidden sm:block ${i <= stepIdx ? "text-white" : "text-slate-500"}`}>{label}</span>
              {i < 3 && <div className={`flex-1 h-px ${i < stepIdx ? "bg-primary" : "bg-white/10"}`} />}
            </div>
          );
        })}
      </div>

      {/* Calendar view */}
      {step === "calendar" && (
        <div style={{ animation: "fadeSlideUp 0.3s ease-out" }}>
          <div className="flex items-center justify-between mb-6">
            <button onClick={prevMonth} className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <h3 className="text-lg font-semibold text-white">{MONTHS[currentMonth]} {currentYear}</h3>
            <button onClick={nextMonth} className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {DAYS.map((day) => (
              <div key={day} className="text-center text-xs font-medium text-slate-500 py-2">{day}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {[...Array(firstDay)].map((_, i) => <div key={`empty-${i}`} />)}
            {[...Array(daysInMonth)].map((_, i) => {
              const day = i + 1;
              const date = new Date(currentYear, currentMonth, day);
              const past = isPast(date);
              const available = hasSlots(date);
              const disabled = past || !available;
              const isToday = date.toDateString() === today.toDateString();
              return (
                <button key={day} onClick={() => handleDateClick(day)} disabled={disabled}
                  className={`relative aspect-square rounded-xl flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                    disabled ? "text-slate-700 cursor-not-allowed" : "text-white hover:bg-primary/20 hover:scale-105 cursor-pointer"
                  } ${isToday ? "ring-1 ring-primary/50" : ""} ${!past && available ? "bg-primary/5" : ""}`}>
                  {day}
                  {isToday && <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />}
                  {!past && available && <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-400" />}
                </button>
              );
            })}
          </div>
          {loadingSlots ? (
            <p className="text-xs text-slate-500 mt-4 text-center">Chargement des disponibilités...</p>
          ) : (
            <p className="text-xs text-slate-500 mt-4 text-center">Sélectionnez une date avec un point vert</p>
          )}
        </div>
      )}

      {/* Slots view */}
      {step === "slots" && selectedDate && (
        <div style={{ animation: "fadeSlideUp 0.3s ease-out" }}>
          <button onClick={() => setStep("calendar")} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-6 transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
            Retour au calendrier
          </button>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white">
              {selectedDate.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
            </h3>
            <p className="text-sm text-slate-400 mt-1">Choisissez un créneau de 30 minutes</p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {(selectedDate ? slotsMap[toDateKey(selectedDate)] || [] : []).map((slot) => (
              <button key={slot.time} onClick={() => handleSlotClick(slot)}
                className="py-3 px-4 rounded-xl text-sm font-medium border border-white/10 text-white hover:border-primary/50 hover:bg-primary/10 transition-all duration-200 hover:scale-[1.02]">
                {formatSlotTime(slot.time)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Form view */}
      {(step === "form" || step === "submitting" || step === "error") && selectedDate && selectedSlot && (
        <div style={{ animation: "fadeSlideUp 0.3s ease-out" }}>
          <button onClick={() => setStep("slots")} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-6 transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
            Retour aux créneaux
          </button>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-primary/10 border border-primary/20 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <div>
              <p className="text-white text-sm font-medium">
                {selectedDate.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
              </p>
              <p className="text-primary text-xs">{selectedSlot ? formatSlotTime(selectedSlot.time) : ""} — 30 min</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1.5">Nom complet *</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:border-primary/50 focus:ring-1 focus:ring-primary/25 outline-none transition-all text-sm"
                  placeholder="Jean Dupont" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1.5">Email *</label>
                <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:border-primary/50 focus:ring-1 focus:ring-primary/25 outline-none transition-all text-sm"
                  placeholder="jean@entreprise.fr" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1.5">Téléphone</label>
                <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:border-primary/50 focus:ring-1 focus:ring-primary/25 outline-none transition-all text-sm"
                  placeholder="06 12 34 56 78" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1.5">Entreprise</label>
                <input type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:border-primary/50 focus:ring-1 focus:ring-primary/25 outline-none transition-all text-sm"
                  placeholder="Ma Société SAS" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Décrivez votre besoin</label>
              <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={3}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:border-primary/50 focus:ring-1 focus:ring-primary/25 outline-none transition-all text-sm resize-none"
                placeholder="Ex: Nous recevons 200 appels/jour et souhaitons automatiser le support niveau 1..." />
            </div>
            {step === "error" && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {errorMsg}
              </div>
            )}
            <button type="submit" disabled={step === "submitting"}
              className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                step === "submitting"
                  ? "bg-white/10 text-slate-400 cursor-wait"
                  : "bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.01] active:scale-[0.99]"
              }`}>
              {step === "submitting" ? "Réservation en cours..." : "Confirmer et réserver"}
            </button>
          </form>
        </div>
      )}

      {/* Confirmation view */}
      {step === "confirmed" && selectedDate && selectedSlot && (
        <div style={{ animation: "fadeSlideUp 0.3s ease-out" }} className="text-center py-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 flex items-center justify-center mx-auto mb-6 ring-4 ring-emerald-500/10">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-400"><polyline points="20 6 9 17 4 12" /></svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Rendez-vous confirmé !</h3>
          <p className="text-slate-400 mb-6">Merci {formData.name.split(" ")[0]}, nous avons hâte d&apos;échanger avec vous.</p>
          <div className="inline-flex flex-col items-start gap-3 p-6 rounded-2xl bg-white/5 border border-white/10 text-left mb-8">
            <div className="flex items-center gap-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span className="text-white text-sm">
                {selectedDate.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="text-white text-sm">{selectedSlot ? formatSlotTime(selectedSlot.time) : ""} — 30 minutes</span>
            </div>
            <div className="flex items-center gap-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-400"><polyline points="20 6 9 17 4 12" /></svg>
              <span className="text-white text-sm">Vous recevrez un email de confirmation</span>
            </div>
          </div>
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary-light transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
            Retour à l&apos;accueil
          </Link>
        </div>
      )}
    </div>
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
            width={360}
            height={100}
            className="h-14 md:h-24 w-auto"
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

          {/* Right: Calendar booking */}
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
            <div className="rounded-3xl bg-slate-900/80 border border-white/10 p-6 sm:p-8 backdrop-blur-sm">
              <CalendarBooking />
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
