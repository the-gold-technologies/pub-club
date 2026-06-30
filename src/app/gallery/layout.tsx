import type { Metadata } from "next";
import { generatePageMetadata, getPageSEO, RenderSchema } from "@/utils/seo";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata(
    "gallery",
    "Gallery | Seven Stars Gastro Club Pub",
    "Explore photo and video galleries showcasing the interior, food, drinks, and beer garden of Seven Stars Gastro Club Pub."
  );
}

export default async function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const seo = await getPageSEO("gallery");
  const schema = seo?.schema;

  return (
    <>
      {schema && <RenderSchema schema={schema} id="gallery-schema" />}
      {children}
    </>
  );
}
