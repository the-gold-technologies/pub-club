"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import BlogDetailLayout from "../components/BlogDetailLayout";

export default function BerinsfieldSeoPage() {
  return (
    <BlogDetailLayout
      title="Pub Dining & Beer Garden Near"
      italicHighlight="Berinsfield"
      tagline="South Oxfordshire Pub Guide"
      description="Escape the routine. Enjoy our expansive, scenic beer garden overlooking the village green, located just 5 minutes from Berinsfield."
      backgroundImage="https://sevenstarsatmarshbaldon.co.uk/wp-content/uploads/2025/09/dish6.webp"
      area="Berinsfield"
      readTime="3 min read"
      date="15 Jun 2026"
      views="95"
      distanceInfo="5 min drive from Berinsfield"
    >
      <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-serif text-neutral-900 leading-tight font-medium">
          Outstanding Gastronomy and Outdoor Seating Near Berinsfield
        </h2>
        <p>
          When you&apos;re searching for a quality gastro pub close to Berinsfield, <strong>The Seven Stars at Marsh Baldon</strong> offers the ultimate countryside destination. Just a quick 3-mile drive up the road, our historic pub provides a complete sensory shift: peaceful green views, a beautifully landscaped outdoor beer garden, and an outstanding menu created by professional chefs.
        </p>
        <p>
          We pride ourselves on offering a friendly atmosphere that makes every visitor feel at home. From crisp craft lagers and local real ales to an extensive list of wines, cocktails, and seasonal specialties, our bar is stocked to complement any dining selection.
        </p>

        <h3 className="text-xl font-serif text-neutral-900 font-medium">
          Why Berinsfield Locals Love The Seven Stars:
        </h3>
        <ul className="space-y-4 list-none pl-0">
          <li className="flex items-start gap-3">
            <span className="text-[#475DB1] font-bold mt-1">✓</span>
            <div>
              <strong>Spectacular Beer Garden:</strong> The perfect place to relax on sunny days, overlook the historic green, and enjoy outdoor dining with friends and family.
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#475DB1] font-bold mt-1">✓</span>
            <div>
              <strong>Fresh, Creative Menus:</strong> Gourmet roasts, fresh seafood, signature burgers, and delicate desserts prepared from scratch daily.
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#475DB1] font-bold mt-1">✓</span>
            <div>
              <strong>Perfect Event Location:</strong> Our gorgeous dining spaces are ideal for private celebrations, corporate events, or family holiday dinners.
            </div>
          </li>
        </ul>

        {/* Testimonial Quote */}
        <div className="bg-[#faf9f6] p-6 rounded-2xl border-l-4 border-[#475DB1] my-8">
          <p className="italic text-neutral-700 font-serif">
            &ldquo;It takes less than 5 minutes to drive here from Berinsfield, but it feels like a total countryside escape. The beer garden is the best in South Oxfordshire, and the food is top-notch.&rdquo;
          </p>
          <div className="flex items-center gap-1.5 mt-3 text-amber-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
            <span className="text-xs text-neutral-400 font-sans ml-2">— Tom H., Berinsfield Local</span>
          </div>
        </div>

        <h3 className="text-xl font-serif text-neutral-900 font-medium">
          How to reach us
        </h3>
        <p>
          Simply take the A4074 north from Berinsfield toward Oxford. After passing through Nuneham Courtenay, follow signs for Marsh Baldon. You&apos;ll find us situated on the right side of the main common green.
        </p>
      </div>
    </BlogDetailLayout>
  );
}
