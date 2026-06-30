import type { Metadata } from "next";
import { generatePageMetadata, getPageSEO, RenderSchema } from "@/utils/seo";
import HomePageClient from "./HomePageClient";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata(
    "home",
    "Seven Stars | Countryside Gastro Club Pub",
    "Experience luxury dining, elegant ambience, and unforgettable events at Seven Stars Gastro Club Pub."
  );
}

export default async function HomePage() {
  const seo = await getPageSEO("home");
  const schema = seo?.schema;

  return (
    <>
      {schema && <RenderSchema schema={schema} id="home-schema" />}
      <HomePageClient />
    </>
  );
}
