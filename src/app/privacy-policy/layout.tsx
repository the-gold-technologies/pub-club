import type { Metadata } from "next";
import { generatePageMetadata, getPageSEO, RenderSchema } from "@/utils/seo";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata(
    "privacy-policy",
    "Privacy Policy | Seven Stars Gastro Club Pub",
    "Read the Privacy Policy of Seven Stars to understand how we collect, use, protect, and handle your personal data.",
  );
}

export default async function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const seo = await getPageSEO("privacy-policy");
  const schema = seo?.schema;

  return (
    <>
      {schema && <RenderSchema schema={schema} id="privacy-policy-schema" />}
      {children}
    </>
  );
}
