import type { Metadata } from "next";
import { generatePageMetadata } from "@/utils/seo";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata(
    "dining",
    "Dining | Seven Stars Gastro Club Pub",
    "Experience dynamic dining in a beautiful, premium environment at Seven Stars Gastro Club Pub."
  );
}

export default function DiningLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
