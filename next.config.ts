import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "sevenstarsatmarshbaldon.co.uk",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/pub-in-abingdon",
        destination: "/blog/pub-in-abingdon",
        permanent: true,
      },
      {
        source: "/best-pub-in-wallingford",
        destination: "/blog/best-pub-in-wallingford",
        permanent: true,
      },
      {
        source: "/pub-in-kennington",
        destination: "/blog/pub-in-kennington",
        permanent: true,
      },
      {
        source: "/pub-in-berinsfield",
        destination: "/blog/pub-in-berinsfield",
        permanent: true,
      },
      {
        source: "/pub-in-stadhampton",
        destination: "/blog/pub-in-stadhampton",
        permanent: true,
      },
      {
        source: "/pub-in-dorchester",
        destination: "/blog/pub-in-dorchester",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
