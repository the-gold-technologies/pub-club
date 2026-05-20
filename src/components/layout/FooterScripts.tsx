"use client";

import { useEffect, useRef } from "react";

/**
 * Renders raw HTML from the CMS customFooterScripts field.
 * This handles both <script> tags (executed via DOM recreation) and
 * arbitrary HTML like custom elements (e.g. <react-widget-uv>).
 */
export default function FooterScripts({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    // React's dangerouslySetInnerHTML doesn't execute <script> tags.
    // We must recreate them as real DOM nodes so the browser runs them.
    const scripts = Array.from(ref.current.querySelectorAll("script"));
    scripts.forEach((oldScript) => {
      const newScript = document.createElement("script");
      Array.from(oldScript.attributes).forEach((attr) =>
        newScript.setAttribute(attr.name, attr.value)
      );
      newScript.textContent = oldScript.textContent;
      oldScript.parentNode?.replaceChild(newScript, oldScript);
    });
  }, [html]);

  return <div ref={ref} dangerouslySetInnerHTML={{ __html: html }} />;
}
