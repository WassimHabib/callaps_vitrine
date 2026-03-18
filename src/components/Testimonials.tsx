"use client";

import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";

const testimonials = [
  {
    name: "Sophie Martin",
    role: 0,
  },
  {
    name: "Marc Dupont",
    role: 1,
  },
  {
    name: "Amira Benali",
    role: 2,
  },
];

export default function Testimonials() {
  const { lang } = useLang();

  return (
    <section className="bg-gray-50 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t.testimonials.title1[lang]}{" "}
            <span className="text-blue-600">{t.testimonials.titleHighlight[lang]}</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            {t.testimonials.subtitle[lang]}
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
            >
              {/* Opening quote mark */}
              <span className="text-4xl text-blue-200 leading-none">&ldquo;</span>

              {/* Quote */}
              <p className="text-gray-600 italic leading-relaxed mb-6">
                {t.testimonials.items[index].quote[lang]}
              </p>

              {/* Author */}
              <div>
                <p className="text-gray-900 font-semibold">{testimonial.name}</p>
                <p className="text-gray-400 text-sm">{t.testimonials.items[index].role[lang]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
