"use client";

import { Instagram, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface InstagramRibbonProps {
  data?: {
    title?: string;
    subtitle?: string;
    instagramAccountId?: string;
    instagramToken?: string;
  };
}

interface InstaPost {
  id: string;
  media_url: string;
  permalink: string;
  caption: string;
  media_type: string;
  thumbnail_url?: string;
}

export default function InstagramRibbon({ data }: InstagramRibbonProps) {
  const [posts, setPosts] = useState<InstaPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Determine instagramUrl dynamically from the CMS subtitle if it is a handle or URL
  const instagramUrl = (data?.subtitle && (data.subtitle.startsWith("@") || data.subtitle.startsWith("http")))
    ? (data.subtitle.startsWith("http") ? data.subtitle : `https://www.instagram.com/${data.subtitle.replace("@", "")}`)
    : "#";

  useEffect(() => {
    async function fetchInstagram() {
      if (!data?.instagramToken) {
        setLoading(false);
        return;
      }
      try {
        let fetchUrl = "";
        
        // Auto-detect which Instagram API to use based on token prefix
        if (data.instagramToken.startsWith("IG")) {
          // Instagram Basic Display API
          fetchUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type,thumbnail_url,permalink&access_token=${data.instagramToken}&limit=12`;
        } else {
          // Meta Graph API (requires Account ID)
          if (!data.instagramAccountId) {
            console.warn("Instagram Account ID is missing.");
            setError(true);
            setLoading(false);
            return;
          }
          fetchUrl = `https://graph.facebook.com/v20.0/${data.instagramAccountId}/media?fields=id,caption,media_url,media_type,thumbnail_url,permalink&access_token=${data.instagramToken}&limit=12`;
        }

        const res = await fetch(fetchUrl);
        const json = await res.json();
        
        if (json.error || !json.data) {
          console.error("Instagram API Error:", json.error);
          setError(true);
          setLoading(false);
          return;
        }

        // Map to standard format, using thumbnail for videos
        const mappedPosts = json.data.map((p: any) => ({
          id: p.id,
          caption: p.caption || "View on Instagram",
          permalink: p.permalink,
          media_type: p.media_type,
          media_url: p.media_type === "VIDEO" && p.thumbnail_url ? p.thumbnail_url : p.media_url,
        }));
        
        setPosts(mappedPosts);
        setError(false);
      } catch (err) {
        console.error("Failed to fetch Instagram:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchInstagram();
  }, [data?.instagramToken, data?.instagramAccountId]);

  // Duplicate for seamless infinite marquee scroll
  const repeatedPosts = [...posts, ...posts];

  if (!data?.instagramToken) {
    return (
      <section className="bg-[#f8fafc] border-t border-slate-100 py-24">
        <div className="max-w-3xl mx-auto text-center p-12 border-2 border-dashed border-slate-300 rounded-3xl bg-white">
          <Instagram className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-700 mb-2">Live Feed Not Connected</h3>
          <p className="text-slate-500">
            Please enter your official Meta Instagram Token in the CMS to activate the automatic feed.
          </p>
        </div>
      </section>
    );
  }

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

          {data?.title && (
            <h2 className="text-xs sm:text-sm tracking-[0.4em] text-slate-800 uppercase font-bold">
              {data.title}
            </h2>
          )}

          {data?.subtitle && (
            data.subtitle.startsWith("@") || data.subtitle.startsWith("http") ? (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-lg sm:text-xl font-serif text-[#475DB1] hover:text-[#475DB1]/80 transition-colors duration-300 underline underline-offset-8 decoration-[#475DB1]/30 hover:decoration-[#475DB1]"
              >
                {data.subtitle}
              </a>
            ) : (
              <p className="text-lg sm:text-xl font-serif text-slate-600">
                {data.subtitle}
              </p>
            )
          )}
        </div>

        {error && (
          <div className="max-w-xl mx-auto mb-8 bg-red-50 text-red-600 p-4 rounded-xl flex items-center justify-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <p className="text-sm font-medium">Your Meta Graph API Token is invalid or expired.</p>
          </div>
        )}

        {/* Dynamic Image Ribbon Slider */}
        <div className="relative w-full border-y border-slate-100 bg-[#f8fafc] overflow-hidden py-8 min-h-[300px] flex items-center">

          {loading ? (
            <div className="w-full flex justify-center py-12">
              <div className="w-8 h-8 border-4 border-[#475DB1]/30 border-t-[#475DB1] rounded-full animate-spin" />
            </div>
          ) : posts.length > 0 ? (
            <>
              {/* Fading Edges */}
              <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-r from-[#f8fafc] to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-l from-[#f8fafc] to-transparent z-10 pointer-events-none" />

              {/* Marquee Track Container */}
              <div className="animate-marquee-track">
                {repeatedPosts.map((post, index) => (
                  <div key={`${post.id}-${index}`} className="shrink-0 px-4">
                    <a
                      href={post.permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative block aspect-square w-[280px] sm:w-[320px] overflow-hidden group rounded-xl border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 bg-white"
                    >
                      <img
                        src={post.media_url}
                        alt={post.caption}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        loading="lazy"
                      />
                      {/* Instagram Hover Overlay */}
                      <div className="absolute inset-0 bg-[#475DB1]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-6 text-center select-none">
                        <Instagram className="w-8 h-8 mb-3 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                        <p className="text-xs font-light leading-relaxed max-w-[220px] opacity-95 line-clamp-3">
                          {post.caption}
                        </p>
                        <span className="text-[10px] uppercase tracking-widest text-amber-200/90 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 font-semibold">
                          View on Instagram
                        </span>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </>
          ) : !error && (
            <div className="w-full text-center text-slate-500 text-sm">No recent posts found.</div>
          )}
        </div>
      </div>
    </section>
  );
}
