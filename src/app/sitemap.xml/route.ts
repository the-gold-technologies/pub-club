import { NextResponse } from "next/server";

export async function GET() {
  const cmsApiUrl = process.env.NEXT_PUBLIC_CMS_API_URL || "https://cms-seven-star.vercel.app";
  try {
    const res = await fetch(`${cmsApiUrl}/api/seo/sitemap`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return new Response("Sitemap not found", { status: res.status });
    }

    const xml = await res.text();

    return new Response(xml, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate",
      },
    });
  } catch (error) {
    console.error("Error proxying sitemap.xml:", error);
    return new Response("Error loading sitemap", { status: 500 });
  }
}
