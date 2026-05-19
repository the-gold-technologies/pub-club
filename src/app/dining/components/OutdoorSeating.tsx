"use client";

import Image from "next/image";
import Link from "next/link";

interface OutdoorSeatingProps {
  data?: any;
}

export default function OutdoorSeating({ data = {} }: OutdoorSeatingProps) {
  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Image with half-pill shape */}
          <div className="relative w-full lg:w-[60%] h-[330px] md:h-[450px] rounded-r-full overflow-hidden shadow-2xl">
            {data.outdoorImage && (
              <Image
                src={data.outdoorImage}
                alt={data.outdoorHeading}
                fill
                className="object-cover"
              />
            )}
          </div>

          {/* Content */}
          <div className="w-full lg:w-[40%] space-y-8">
            <h2 className="text-7xl font-serif text-slate-900 tracking-tighter leading-none">
              {data.outdoorHeading} <br />
              <span className="text-[#475DB1]">{data.outdoorHeadingItalic}</span>
            </h2>
            <p className="text-neutral-600 font-light leading-relaxed max-w-md">
              {data.outdoorDesc}
            </p>
            <Link
              href={data.outdoorCtaLink || "#"}
              className="inline-block border border-black px-10 py-3.5 text-[12px] uppercase tracking-widest font-bold hover:bg-[#475DB1] hover:border-[#475DB1] hover:text-white transition-all rounded-full"
            >
              {data.outdoorCtaText}
            </Link>

            {/* Pagination/Scroll Indicators */}
            <div className="pt-4">
              <div className="w-24 h-1 bg-[#475DB1] rounded-sm" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
