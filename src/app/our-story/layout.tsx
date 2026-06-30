import type { Metadata } from "next";
import { generatePageMetadata, getPageSEO, RenderSchema } from "@/utils/seo";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata(
    "our-story",
    "Our Story | Seven Stars Gastro Club Pub",
    "Discover the history, passion, and culinary journey of Seven Stars Gastro Club Pub."
  );
}

export default async function OurStoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const seo = await getPageSEO("our-story");
  const schema = seo?.schema;

  return (
    <>
      {schema && <RenderSchema schema={schema} id="our-story-schema" />}
      {children}
    </>
  );
}
