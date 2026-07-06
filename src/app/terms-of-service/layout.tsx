import type { Metadata } from "next";
import { generatePageMetadata, getPageSEO, RenderSchema } from "@/utils/seo";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata(
    "terms-of-service",
    "Terms of Service | Seven Stars Gastro Club Pub",
    "Read the Terms of Service for Seven Stars to understand the rules and guidelines for visiting and booking our pub.",
  );
}

export default async function TermsOfServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const seo = await getPageSEO("terms-of-service");
  const schema = seo?.schema;

  return (
    <>
      {schema && <RenderSchema schema={schema} id="terms-of-service-schema" />}
      {children}
    </>
  );
}
