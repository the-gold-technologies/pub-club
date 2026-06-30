import type { Metadata } from "next";
import { generatePageMetadata, getPageSEO, RenderSchema } from "@/utils/seo";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata(
    "dining",
    "Dining | Seven Stars Gastro Club Pub",
    "Experience dynamic dining in a beautiful, premium environment at Seven Stars Gastro Club Pub."
  );
}

export default async function DiningLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const seo = await getPageSEO("dining");
  const schema = seo?.schema;

  return (
    <>
      {schema && <RenderSchema schema={schema} id="dining-schema" />}
      {children}
    </>
  );
}
