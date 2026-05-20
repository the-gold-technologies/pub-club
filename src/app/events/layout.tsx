import type { Metadata } from "next";
import { generatePageMetadata } from "@/utils/seo";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata(
    "events",
    "Events & Parties | Seven Stars Gastro Club Pub",
    "Discover upcoming live music, pub quizzes, beer festivals, and themed nights at Seven Stars Gastro Club Pub."
  );
}

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
