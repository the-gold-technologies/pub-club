import type { Metadata } from "next";
import { generatePageMetadata } from "@/utils/seo";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata(
    "our-story",
    "Our Story | Seven Stars Gastro Club Pub",
    "Discover the history, passion, and culinary journey of Seven Stars Gastro Club Pub."
  );
}

export default function OurStoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
