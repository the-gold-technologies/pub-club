import type { Metadata } from "next";
import { generatePageMetadata } from "@/utils/seo";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata(
    "menu",
    "Our Menu | Seven Stars Gastro Club Pub",
    "View our seasonal menus featuring award-winning dishes, sunday roasts, craft beers, and fine wines at Seven Stars Gastro Club Pub."
  );
}

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
