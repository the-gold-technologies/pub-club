"use client";

import Image from "next/image";
import { parseMarkdownLinks } from "@/utils/text";

export default function AboutExperience({ data }: { data: any }) {
  const highlights = Array.isArray(data.highlights) ? data.highlights : [];

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="reveal-section order-2 lg:order-1 relative h-[600px] rounded-3xl overflow-hidden shadow-2xl group">
            {data.differentImage && (
              <Image
                src={data.differentImage}
                alt="Cozy Interior"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-primary-900/10 group-hover:bg-transparent transition-colors duration-700" />
          </div>

          <div className="reveal-section order-1 lg:order-2 space-y-8">
            <div className="space-y-4">
              <span className="text-[10px] tracking-[0.4em] text-[#475DB1] uppercase font-bold flex items-center gap-3">
                <span className="w-8 h-[1px] bg-[#475DB1]"></span>
                {data.differentTag}
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-slate-900 leading-tight">
                {data.differentHeading}{" "}
                <em className="text-[#475DB1] font-light">
                  {data.differentHeadingItalic}
                </em>
              </h2>
            </div>

            <p className="text-lg text-slate-600 font-light leading-relaxed">
              {parseMarkdownLinks(data.differentDesc)}
            </p>

            <div className="space-y-4 pt-4">
              {highlights.map((highlight: string, index: number) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#475DB1]" />
                  <p className="text-slate-700 font-medium italic">
                    {parseMarkdownLinks(highlight)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
