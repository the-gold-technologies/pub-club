import type { Metadata } from "next";
import { generatePageMetadata } from "@/utils/seo";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata(
    "gallery",
    "Gallery | Seven Stars Gastro Club Pub",
    "Explore photo and video galleries showcasing the interior, food, drinks, and beer garden of Seven Stars Gastro Club Pub."
  );
}

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
