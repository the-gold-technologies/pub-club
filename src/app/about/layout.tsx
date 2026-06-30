import type { Metadata } from "next";
import { generatePageMetadata, getPageSEO, RenderSchema } from "@/utils/seo";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata(
    "about",
    "About Us | Seven Stars Gastro Club Pub",
    "Learn more about the heritage and values behind Seven Stars Gastro Club Pub."
  );
}

export default async function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const seo = await getPageSEO("about");
  const schema = seo?.schema;

  return (
    <>
      {schema && <RenderSchema schema={schema} id="about-schema" />}
      {children}
    </>
  );
}
