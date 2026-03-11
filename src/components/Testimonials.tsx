const testimonials = [
  {
    name: "Sophie Martin",
    initials: "SM",
    role: "Directrice Commerciale, TechVision",
    quote:
      "Depuis que nous utilisons Callaps, notre taux de prise de RDV a augment\u00e9 de 45%. L\u2019agent IA est bluffant de naturel.",
    stars: 5,
  },
  {
    name: "Marc Dupont",
    initials: "MD",
    role: "CEO, LogiPlus",
    quote:
      "Le service client automatis\u00e9 nous a permis de r\u00e9duire nos co\u00fbts de 60% tout en am\u00e9liorant la satisfaction. Un game changer.",
    stars: 5,
  },
  {
    name: "Amira Benali",
    initials: "AB",
    role: "Responsable SAV, MediCare+",
    quote:
      "La mise en place a \u00e9t\u00e9 rapide et l\u2019\u00e9quipe Wevlap nous a accompagn\u00e9s \u00e0 chaque \u00e9tape. Nos clients ne font plus la diff\u00e9rence avec un humain.",
    stars: 5,
  },
];

function StarIcon() {
  return (
    <svg
      className="w-4 h-4 text-yellow-400"
      fill="currentColor"
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
    </svg>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-surface-dark py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Ils nous font confiance</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            D&eacute;couvrez comment nos clients transforment leur communication.
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="relative glass rounded-2xl p-8"
            >
              {/* Quote icon */}
              <svg
                className="absolute top-4 right-4 w-10 h-10 text-primary/20"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
              </svg>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.stars }).map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>

              {/* Quote */}
              <p className="text-slate-300 leading-relaxed mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                  {testimonial.initials}
                </div>
                <div>
                  <p className="text-white font-semibold">{testimonial.name}</p>
                  <p className="text-slate-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
