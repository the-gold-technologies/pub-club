import React from "react";
import type { Metadata } from "next";
import { generatePageMetadata, getPageSEO, RenderSchema } from "@/utils/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return generatePageMetadata(
    `blog/${slug}`,
    "Blog Article | Seven Stars",
    "Read this article from Seven Stars at Marsh Baldon."
  );
}

export default async function BlogDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const seo = await getPageSEO(`blog/${slug}`);
  const schema = seo?.schema;

  return (
    <>
      {schema && <RenderSchema schema={schema} id={`blog-detail-${slug}-schema`} />}
      {children}
    </>
  );
}
