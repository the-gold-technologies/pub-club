import type { Metadata } from "next";
import { generatePageMetadata } from "@/utils/seo";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata(
    "about",
    "About Us | Seven Stars Gastro Club Pub",
    "Learn more about the heritage and values behind Seven Stars Gastro Club Pub."
  );
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
