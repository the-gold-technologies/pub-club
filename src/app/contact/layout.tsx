import type { Metadata } from "next";
import { generatePageMetadata, getPageSEO, RenderSchema } from "@/utils/seo";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata(
    "contact",
    "Contact Us | Seven Stars Gastro Club Pub",
    "Get in touch with us at Seven Stars Gastro Club Pub for reservations, enquiries, and private hire."
  );
}

export default async function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const seo = await getPageSEO("contact");
  const schema = seo?.schema;

  return (
    <>
      {schema && <RenderSchema schema={schema} id="contact-schema" />}
      {children}
    </>
  );
}
