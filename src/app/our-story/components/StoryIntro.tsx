"use client";

import { parseMarkdownLinks } from "@/utils/text";

export default function StoryIntro({ data }: { data: any }) {
  return (
    <section className="pt-24 md:pt-32 pb-8 bg-white relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] bg-[#475DB1]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center reveal-section relative z-10">
        <span className="text-[10px] tracking-[0.4em] text-[#475DB1] uppercase font-medium flex items-center justify-center gap-3 mb-6">
          <span className="w-8 h-[1px] bg-[#475DB1]"></span>
          {data.introTagline}
          <span className="w-8 h-[1px] bg-[#475DB1]"></span>
        </span>
        <h2 className="text-4xl md:text-5xl font-serif text-slate-900 leading-tight mb-8">
          {data.introHeading}{" "}
          <em className="text-[#475DB1] font-light">{data.introHeadingItalic}</em>
        </h2>
        <p className="text-lg sm:text-xl text-slate-600 font-light leading-relaxed max-w-3xl mx-auto">
          {parseMarkdownLinks(data.introDesc)}
        </p>
      </div>
    </section>
  );
}
