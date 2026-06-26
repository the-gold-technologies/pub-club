import type { Metadata } from "next";
import { generatePageMetadata } from "@/utils/seo";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata(
    "christmas",
    "Christmas 2026 | Seven Stars Gastro Club Pub",
    "Celebrate Christmas 2026 at Seven Stars in Marsh Baldon, Oxford. Book festive party tables and download holiday menus."
  );
}

export default function ChristmasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
