import Link from "next/link";
import React from "react";

/**
 * Parses markdown-style links [text](url) in a string and returns React nodes.
 * Internal URLs use Next.js <Link>, while external URLs use standard <a> tags with target="_blank".
 */
export function parseMarkdownLinks(text: any, linkClassName?: string): React.ReactNode {
  if (typeof text !== "string") {
    return text;
  }
  if (!text) {
    return "";
  }

  // Regex to match [text](url)
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const matchIndex = match.index;

    // Add text before the match
    if (matchIndex > lastIndex) {
      parts.push(text.substring(lastIndex, matchIndex));
    }

    const linkText = match[1];
    const linkUrl = match[2];
    const isExternal =
      linkUrl.startsWith("http://") ||
      linkUrl.startsWith("https://") ||
      linkUrl.startsWith("//");

    const defaultClass = "!text-blue-500 hover:!text-blue-600 underline transition-colors cursor-pointer font-medium";
    const className = linkClassName ? `${defaultClass} ${linkClassName}` : defaultClass;

    if (isExternal) {
      parts.push(
        <a
          key={matchIndex}
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {linkText}
        </a>
      );
    } else {
      parts.push(
        <Link key={matchIndex} href={linkUrl} className={className}>
          {linkText}
        </Link>
      );
    }

    lastIndex = regex.lastIndex;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? <>{parts}</> : text;
}
