import type { Metadata } from "next";
import { generatePageMetadata, getPageSEO, RenderSchema } from "@/utils/seo";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata(
    "menu",
    "Our Menu | Seven Stars Gastro Club Pub",
    "View our seasonal menus featuring award-winning dishes, sunday roasts, craft beers, and fine wines at Seven Stars Gastro Club Pub."
  );
}

export default async function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const seo = await getPageSEO("menu");
  const schema = seo?.schema;

  return (
    <>
      {schema && <RenderSchema schema={schema} id="menu-schema" />}
      {children}
    </>
  );
}
