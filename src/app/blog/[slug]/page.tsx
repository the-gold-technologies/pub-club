"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import PageLoader from "@/components/layout/PageLoader";
import { useCMSStore } from "@/store/useCMSStore";
import { ArrowLeft, Award } from "lucide-react";
import BlogDetailLayout from "../components/BlogDetailLayout";

interface Blog {
  id: string;
  title: string;
  slug: string;
  visibility: string;
  featuredImage: string | null;
  excerpt: string;
  content: string;
  area: string;
  readTime: string;
  tag: string;
  views: number;
  date: string;
  metaTitle?: string;
  metaDescription?: string;
  headingTag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export default function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
  const { fetchBlogBySlug } = useCMSStore();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchBlogBySlug(slug)
        .then((data) => {
          if (data) {
            setBlog(data);
          }
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [slug, fetchBlogBySlug]);

  if (loading) {
    return <PageLoader isLoading={true} />;
  }

  if (!blog) {
    const Navbar = dynamic(() => import("@/components/layout/Navbar"), { ssr: true });
    const Footer = dynamic(() => import("@/components/layout/Footer"), { ssr: true });
    return (
      <div className="min-h-screen bg-[#faf9f6] flex flex-col justify-between text-neutral-800">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center pt-32">
          <Award className="w-12 h-12 text-[#475DB1] mb-4 animate-bounce" />
          <h1 className="text-3xl font-serif font-bold text-slate-900 mb-2">Article Not Found</h1>
          <p className="text-gray-500 max-w-sm mb-6">
            The blog post you are looking for may have been moved, set to draft, or deleted.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-[#475DB1] hover:bg-[#3b4f98] text-white px-6 py-3 rounded-full text-sm font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to blog list
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Dynamic typography split for title styling
  const titleWords = blog.title.split(" ");
  let displayTitle = blog.title;
  let displayHighlight = "";
  if (titleWords.length > 3) {
    displayTitle = titleWords.slice(0, titleWords.length - 2).join(" ");
    displayHighlight = titleWords.slice(titleWords.length - 2).join(" ");
  }

  return (
    <>
      <BlogDetailLayout
        title={displayTitle}
        italicHighlight={displayHighlight}
        tagline={blog.tag || "South Oxfordshire Pub Guide"}
        description={blog.excerpt}
        backgroundImage={blog.featuredImage || "https://sevenstarsatmarshbaldon.co.uk/wp-content/uploads/2025/09/christmas-celebration-2.webp"}
        area={blog.area || "South Oxfordshire"}
        readTime={blog.readTime || "3 min read"}
        date={blog.date}
        views={String(blog.views)}
        distanceInfo={blog.area ? `${blog.area} Area` : "South Oxfordshire"}
        headingTag={blog.headingTag}
        currentSlug={blog.slug}
      >
        <div className="space-y-6">
          <div 
            dangerouslySetInnerHTML={{ __html: blog.content }} 
            className="rich-text-content"
          />
        </div>

        {/* Global style overrides to style dynamic blog HTML elements to look premium */}
        <style jsx global>{`
          .rich-text-content {
            font-family: var(--font-inter), sans-serif;
            font-size: 1.125rem;
            color: #374151;
          }
          .rich-text-content p {
            margin-bottom: 1.75em;
            line-height: 1.8;
          }
          .rich-text-content h2 {
            font-family: var(--font-playfair), Georgia, serif;
            font-size: 1.75rem;
            font-weight: 700;
            color: #0f172a;
            margin-top: 2em;
            margin-bottom: 0.8em;
            letter-spacing: -0.02em;
          }
          .rich-text-content h3 {
            font-family: var(--font-playfair), Georgia, serif;
            font-size: 1.35rem;
            font-weight: 700;
            color: #1e293b;
            margin-top: 1.8em;
            margin-bottom: 0.6em;
          }
          .rich-text-content blockquote {
            font-family: var(--font-playfair), Georgia, serif;
            font-style: italic;
            border-left: 4px solid #475DB1;
            padding-left: 1.5em;
            margin: 2em 0;
            color: #475569;
            font-size: 1.25rem;
            line-height: 1.6;
          }
          .rich-text-content ul, .rich-text-content ol {
            margin-top: 1em;
            margin-bottom: 1.5em;
            padding-left: 1.5em;
          }
          .rich-text-content li {
            margin-bottom: 0.5em;
            line-height: 1.6;
          }
          .rich-text-content a {
            color: #475DB1;
            text-decoration: underline;
            font-weight: 600;
          }
          .rich-text-content a:hover {
            color: #3b4f98;
          }
        `}</style>
      </BlogDetailLayout>
    </>
  );
}
