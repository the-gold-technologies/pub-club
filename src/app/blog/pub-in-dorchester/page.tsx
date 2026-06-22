"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import BlogDetailLayout from "../components/BlogDetailLayout";

export default function DorchesterSeoPage() {
  return (
    <BlogDetailLayout
      title="Traditional Pub Experience Near"
      italicHighlight="Dorchester"
      tagline="South Oxfordshire Pub Guide"
      description="Relax with fine cask ales, classic British food, and cozy countryside ambience at Marsh Baldon, only 10 minutes from Dorchester-on-Thames."
      backgroundImage="https://sevenstarsatmarshbaldon.co.uk/wp-content/uploads/2025/09/dish8.webp"
      area="Dorchester"
      readTime="3 min read"
      date="10 Jun 2026"
      views="120"
      distanceInfo="10 min drive from Dorchester"
    >
      <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-serif text-neutral-900 leading-tight font-medium">
          A Warm Welcome and Traditional Country Pub Charm
        </h2>
        <p>
          Dorchester-on-Thames is famous for its gorgeous Abbey and historical architecture. If you&apos;re looking to pair your local exploration with an exceptional lunch or dinner, <strong>The Seven Stars at Marsh Baldon</strong> is located just 5 miles up the road.
        </p>
        <p>
          Our country pub combines the best elements of traditional British innkeeper heritage with a fresh, modern gastro menu. Sit back in our rustic wood-beamed bar, enjoy a selection of premium cask ales, and enjoy freshly prepared classics like fish and chips, handcrafted pies, and chef&apos;s daily specialties.
        </p>

        <h3 className="text-xl font-serif text-neutral-900 font-medium">
          Why Dorchester Visitors Choose The Seven Stars:
        </h3>
        <ul className="space-y-4 list-none pl-0">
          <li className="flex items-start gap-3">
            <span className="text-[#475DB1] font-bold mt-1">✓</span>
            <div>
              <strong>Traditional Country Atmosphere:</strong> A classic pub experience with roaring open fires, wooden beams, and friendly local service.
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#475DB1] font-bold mt-1">✓</span>
            <div>
              <strong>Spectacular Village Green:</strong> Sit outdoors in our expansive garden overlooking the historic Marsh Baldon common.
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#475DB1] font-bold mt-1">✓</span>
            <div>
              <strong>Handcrafted Gastro Menus:</strong> Beautiful, chef-prepared options made with fresh, locally sourced ingredients.
            </div>
          </li>
        </ul>

        {/* Testimonial Quote */}
        <div className="bg-[#faf9f6] p-6 rounded-2xl border-l-4 border-[#475DB1] my-8">
          <p className="italic text-neutral-700 font-serif">
            &ldquo;We visited Dorchester Abbey in the morning and drove over to Seven Stars for lunch. The food was fantastic, and the country atmosphere was exactly what we were looking for.&rdquo;
          </p>
          <div className="flex items-center gap-1.5 mt-3 text-amber-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
            <span className="text-xs text-neutral-400 font-sans ml-2">— George &amp; Emma S., Dorchester Visitors</span>
          </div>
        </div>

        <h3 className="text-xl font-serif text-neutral-900 font-medium">
          How to reach us
        </h3>
        <p>
          From Dorchester, head north on the Oxford Road (A4074) toward Nuneham Courtenay, then follow the signs for Marsh Baldon. Our pub is located directly facing the picturesque village common.
        </p>
      </div>
    </BlogDetailLayout>
  );
}
