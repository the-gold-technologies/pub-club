import { NextResponse } from "next/server";
import JSZip from "jszip";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const urlsParam = searchParams.get("urls");
  const singleUrl = searchParams.get("url");

  // Case 1: Single file download
  if (singleUrl) {
    try {
      const response = await fetch(singleUrl);
      if (!response.ok) throw new Error("Failed to fetch file");

      const blob = await response.blob();
      const headers = new Headers();
      const filename = singleUrl.split("/").pop()?.split("?")[0] || "menu.pdf";

      headers.set("Content-Disposition", `attachment; filename="${filename}"`);
      headers.set("Content-Type", response.headers.get("Content-Type") || "application/pdf");

      return new Response(blob, {
        status: 200,
        headers,
      });
    } catch (error) {
      console.error("Single download error:", error);
      return NextResponse.json({ error: "Failed to download file" }, { status: 500 });
    }
  }

  // Case 2: Multi-file zip download
  if (urlsParam) {
    const urls = urlsParam.split(",").map((u) => decodeURIComponent(u.trim())).filter(Boolean);
    if (urls.length === 0) {
      return NextResponse.json({ error: "No URLs provided" }, { status: 400 });
    }

    try {
      const zip = new JSZip();

      // Fetch files in parallel
      const fetchPromises = urls.map(async (url, idx) => {
        try {
          const res = await fetch(url);
          if (!res.ok) throw new Error(`Status ${res.status}`);
          const arrayBuffer = await res.arrayBuffer();
          // Extract file name
          let fileName = url.split("/").pop() || `menu-${idx + 1}.pdf`;
          // Strip query parameters
          fileName = fileName.split("?")[0];
          // Ensure it ends with .pdf
          if (!fileName.toLowerCase().endsWith(".pdf")) {
            fileName += ".pdf";
          }
          zip.file(fileName, arrayBuffer);
        } catch (err) {
          console.error(`Failed to fetch file at ${url}:`, err);
        }
      });

      await Promise.all(fetchPromises);

      const content = await zip.generateAsync({ type: "arraybuffer" });

      const headers = new Headers();
      headers.set("Content-Disposition", 'attachment; filename="all-menus.zip"');
      headers.set("Content-Type", "application/zip");

      return new Response(content, {
        status: 200,
        headers,
      });
    } catch (error) {
      console.error("Zipping files failed:", error);
      return NextResponse.json({ error: "Failed to create zip file" }, { status: 500 });
    }
  }

  return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
}
