"use client";

import Image from "next/image";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";

export default function Problem() {
  const { lang } = useLang();

  return (
    <section id="problem" className="bg-surface/50 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Text */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              {t.problem.title[lang]}
            </h2>

            <p className="text-slate-400 mb-8">
              {t.problem.subtitle[lang]}
            </p>

            {/* Pain points */}
            <div className="flex flex-col gap-3 mb-8">
              {t.problem.items.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-accent shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-lg text-slate-300">{item[lang]}</span>
                </div>
              ))}
            </div>

            {/* Result */}
            <div className="glass rounded-xl p-5 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-primary/10 to-accent/10 pointer-events-none" />
              <p className="relative text-lg font-semibold text-white">
                <span className="bg-gradient-to-r from-accent to-primary bg-[length:100%_2px] bg-no-repeat bg-bottom pb-1">
                  {t.problem.result[lang]}
                </span>
              </p>
            </div>
          </div>

          {/* Right — Image */}
          <div className="flex justify-center lg:justify-end">
            <Image
              src="/appels-manques.png"
              alt={lang === "fr" ? "Appels manqués" : "Missed calls"}
              width={1000}
              height={667}
              className="w-full max-w-[480px] h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
