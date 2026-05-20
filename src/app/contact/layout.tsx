import type { Metadata } from "next";
import { generatePageMetadata } from "@/utils/seo";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata(
    "contact",
    "Contact Us | Seven Stars Gastro Club Pub",
    "Get in touch with us at Seven Stars Gastro Club Pub for reservations, enquiries, and private hire."
  );
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
