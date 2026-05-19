"use client";

export default function AboutCta({ data }: { data: any }) {
  return (
    <section className="py-32 relative overflow-hidden bg-[#475DB1]">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 border-4 border-white rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 border-4 border-white rounded-full translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-10 reveal-section">
        <h2 className="text-5xl md:text-7xl font-serif text-white">
          {data.ctaHeading}
        </h2>
        <p className="text-xl text-white/80 font-light max-w-2xl mx-auto">
          {data.ctaDesc}
        </p>
        <div className="pt-6">
          <a
            href={data.ctaButtonUrl}
            className="inline-block px-12 py-5 bg-white text-[#475DB1] rounded-full uppercase tracking-[0.2em] text-sm font-bold hover:bg-slate-100 hover:scale-105 transition-all duration-300 shadow-xl"
          >
            {data.ctaButtonLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
