import { NextResponse } from "next/server";

export async function GET() {
  const cmsApiUrl = process.env.NEXT_PUBLIC_CMS_API_URL || "https://cms-seven-star.vercel.app";
  try {
    const res = await fetch(`${cmsApiUrl}/api/seo/robots`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return new Response("Robots config not found", { status: res.status });
    }

    const text = await res.text();

    return new Response(text, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } catch (error) {
    console.error("Error proxying robots.txt:", error);
    return new Response("User-agent: *\nAllow: /", {
      headers: { "Content-Type": "text/plain" },
    });
  }
}
