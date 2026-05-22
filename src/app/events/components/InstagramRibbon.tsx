"use client";

import { Instagram } from "lucide-react";

interface InstagramRibbonProps {
  data?: {
    oldEvents?: Array<{ src: string; name: string; postUrl?: string }>;
    title?: string;
    subtitle?: string;
  };
}

export default function InstagramRibbon({ data }: InstagramRibbonProps) {
  // Normalize posts: map from CMS oldEvents (user uploaded)
  const basePosts = (data?.oldEvents || []).map((item, idx) => ({
    id: `cms-${idx}`,
    imageUrl: item.src,
    postUrl: item.postUrl || "https://www.instagram.com/sevenstarsatmarshbaldon/",
    caption: item.name
  }));

  // If there are no posts in the CMS, do not render the ribbon
  if (basePosts.length === 0) {
    return null;
  }

  // Repeat the base list so we have enough items to cover the screen width.
  // We need at least 12 items to cover large viewports smoothly.
  let repeatedPosts = [...basePosts];
  while (repeatedPosts.length > 0 && repeatedPosts.length < 12) {
    repeatedPosts = [...repeatedPosts, ...basePosts];
  }

  // To make it loop seamlessly, we duplicate the array once more (first half identical to second half)
  const marqueePosts = [...repeatedPosts, ...repeatedPosts].map((post, idx) => ({
    ...post,
    uniqueId: `${post.id}-${idx}`
  }));

  return (
    <section className="bg-[#f8fafc] border-t border-slate-100 relative overflow-hidden py-24">
      {/* CSS Styles for seamless animation and custom play states */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .animate-marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
        }
        .animate-marquee-track:hover {
          animation-play-state: paused;
        }
      `}} />

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center space-y-4 mb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Instagram className="w-9 h-9 text-slate-800 mx-auto opacity-90 hover:scale-110 transition-transform duration-300" />
          <h2 className="text-xs sm:text-sm tracking-[0.4em] text-slate-800 uppercase font-bold">
            {data?.title}
          </h2>
          <a
            href={data?.subtitle || "https://www.instagram.com/sevenstarsatmarshbaldon/"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-lg sm:text-xl font-serif text-[#475DB1] hover:text-[#475DB1]/80 transition-colors duration-300 underline underline-offset-8 decoration-[#475DB1]/30 hover:decoration-[#475DB1]"
          >
            {data?.subtitle ? (
              data.subtitle.startsWith("http")
                ? `@${data.subtitle.replace(/\/$/, "").split("/").pop()}`
                : (data.subtitle.startsWith("@") ? data.subtitle : `@${data.subtitle}`)
            ) : "@sevenstarsatmarshbaldon"}
          </a>
        </div>

        {/* Dynamic Image Ribbon Slider */}
        <div className="relative w-full border-y border-slate-100 bg-[#f8fafc] overflow-hidden">
          {/* Slider Container with marquee track */}
          <div className="animate-marquee-track">
            {marqueePosts.map((post) => (
              <a
                key={post.uniqueId}
                href={post.postUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-square w-[220px] sm:w-[260px] md:w-[300px] shrink-0 overflow-hidden group block"
              >
                <img
                  src={post.imageUrl}
                  alt={post.caption}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                {/* Instagram Hover Overlay */}
                <div className="absolute inset-0 bg-[#475DB1]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-6 text-center select-none">
                  <Instagram className="w-8 h-8 mb-3 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                  <p className="text-xs font-light leading-relaxed max-w-[220px] opacity-95 line-clamp-3">
                    {post.caption}
                  </p>
                  <span className="text-[10px] uppercase tracking-widest text-amber-200/90 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 font-semibold">
                    View Post
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
