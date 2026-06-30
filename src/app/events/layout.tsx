import type { Metadata } from "next";
import { generatePageMetadata, getPageSEO, RenderSchema } from "@/utils/seo";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata(
    "events",
    "Events & Parties | Seven Stars Gastro Club Pub",
    "Discover upcoming live music, pub quizzes, beer festivals, and themed nights at Seven Stars Gastro Club Pub."
  );
}

export default async function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const seo = await getPageSEO("events");
  const schema = seo?.schema;

  return (
    <>
      {schema && <RenderSchema schema={schema} id="events-schema" />}
      {children}
    </>
  );
}
