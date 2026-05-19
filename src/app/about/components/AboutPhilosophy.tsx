"use client";

export default function AboutPhilosophy({ data }: { data: any }) {
  return (
    <section className="py-24 bg-[#0A192F] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full text-white fill-current"
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            strokeWidth="0.5"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r="30"
            stroke="currentColor"
            strokeWidth="0.5"
            fill="none"
          />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-4 text-center space-y-12 reveal-section">
        <h3 className="text-3xl md:text-5xl font-serif text-white leading-snug">
          &quot;{data.philosophyQuote}&quot;
        </h3>
        <div className="flex justify-center">
          <div className="w-20 h-1 bg-[#475DB1]" />
        </div>
      </div>
    </section>
  );
}
