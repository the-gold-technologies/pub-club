"use client";

import Image from "next/image";
import { Users, Heart, Utensils } from "lucide-react";

export default function AboutRoots({ data }: { data: any }) {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="reveal-section space-y-8">
            <div className="space-y-4">
              <span className="text-[10px] tracking-[0.4em] text-[#475DB1] uppercase font-medium flex items-center gap-3">
                <span className="w-8 h-[1px] bg-[#475DB1]"></span>
                {data.rootsTag}
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-slate-900 leading-tight">
                {data.rootsHeading}{" "}
                <em className="text-[#475DB1] font-light">{data.rootsHeadingItalic}</em>
              </h2>
            </div>

            <div className="space-y-6 text-lg text-slate-600 font-light leading-relaxed">
              <p>{data.rootsDesc1}</p>
              <p>{data.rootsDesc2}</p>
            </div>

            <div className="pt-6 grid grid-cols-3 gap-8">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto bg-primary-50 rounded-full flex items-center justify-center text-[#475DB1]">
                  <Users size={20} />
                </div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">
                  {data.pillar1}
                </p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto bg-primary-50 rounded-full flex items-center justify-center text-[#475DB1]">
                  <Heart size={20} />
                </div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">
                  {data.pillar2}
                </p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto bg-primary-50 rounded-full flex items-center justify-center text-[#475DB1]">
                  <Utensils size={20} />
                </div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">
                  {data.pillar3}
                </p>
              </div>
            </div>
          </div>

          <div className="reveal-section relative h-[500px] rounded-3xl overflow-hidden shadow-2xl group">
            {data.rootsImage && (
              <Image
                src={data.rootsImage}
                alt="Community Spirit"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <p className="font-serif text-2xl italic">
                &quot;{data.rootsQuote}&quot;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
