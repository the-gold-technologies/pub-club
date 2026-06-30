import type { Metadata } from "next";
import { generatePageMetadata, getPageSEO, RenderSchema } from "@/utils/seo";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata(
    "blog",
    "Blog & News | Seven Stars Gastro Club Pub",
    "Read the latest updates, culinary news, and event highlights from Seven Stars."
  );
}

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const seo = await getPageSEO("blog");
  const schema = seo?.schema;

  return (
    <>
      {schema && <RenderSchema schema={schema} id="blog-schema" />}
      {children}
    </>
  );
}
