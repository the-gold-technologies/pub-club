"use client";

import Image from "next/image";
import { Users, Heart, Beer, Coffee, Music } from "lucide-react";

export default function StoryHub({ data }: { data: any }) {
  return (
    <section className="py-24 md:py-32 bg-slate-50 relative overflow-hidden border-t border-slate-200/50">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#475DB1]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#475DB1]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="reveal-section lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <span className="text-[10px] tracking-[0.4em] text-[#475DB1] uppercase font-medium flex items-center gap-3">
                <span className="w-8 h-[1px] bg-[#475DB1]"></span>
                {data.hubTagline}
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-slate-900 leading-tight">
                {data.hubHeading} <br />
                <em className="text-[#475DB1] font-light">{data.hubHeadingItalic}</em>
              </h2>
            </div>

            <div className="space-y-6 text-lg text-slate-600 font-light leading-relaxed">
              <p>{data.hubDesc1}</p>
              <p>{data.hubDesc2}</p>
              <p>{data.hubDesc3}</p>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow-lg border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center shrink-0">
                <Music className="text-[#475DB1] w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">
                  {data.cardTitle}
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {data.cardDesc}
                </p>
              </div>
            </div>
          </div>

          <div className="reveal-section lg:col-span-6">
            <div className="relative h-[400px] md:h-[450px] rounded-3xl overflow-hidden shadow-2xl mb-8 group">
              {data.rightImage && (
                <Image
                  src={data.rightImage}
                  alt="Community Hub Experiences"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl md:text-3xl font-serif italic font-light">
                  {data.rightImageTitle}
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-[#475DB1] shrink-0">
                  <Beer className="w-5 h-5" />
                </div>
                <span className="font-medium text-slate-800 text-sm">
                  {data.exp1}
                </span>
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-[#475DB1] shrink-0">
                  <Coffee className="w-5 h-5" />
                </div>
                <span className="font-medium text-slate-800 text-sm">
                  {data.exp2}
                </span>
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-[#475DB1] shrink-0">
                  <Heart className="w-5 h-5" />
                </div>
                <span className="font-medium text-slate-800 text-sm">
                  {data.exp3}
                </span>
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-[#475DB1] shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <span className="font-medium text-slate-800 text-sm">
                  {data.exp4}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
