"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import BlogDetailLayout from "../components/BlogDetailLayout";

export default function KenningtonSeoPage() {
  return (
    <BlogDetailLayout
      title="Cozy Country Pub Near"
      italicHighlight="Kennington"
      tagline="South Oxfordshire Pub Guide"
      description="Escaping to the country is simple. Find your cozy spot by our roaring fireplaces at Marsh Baldon, only 10 minutes from Kennington."
      backgroundImage="https://sevenstarsatmarshbaldon.co.uk/wp-content/uploads/2025/09/dish5.webp"
      area="Kennington"
      readTime="3 min read"
      date="18 Jun 2026"
      views="74"
      distanceInfo="10 min drive from Kennington"
    >
      <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-serif text-neutral-900 leading-tight font-medium">
          Your Village Green Escape Near Kennington
        </h2>
        <p>
          Located just 5 miles from Kennington, <strong>The Seven Stars at Marsh Baldon</strong> serves as a favorite destination for Kennington locals who want to enjoy the fresh air of a true Oxfordshire countryside village. Situated on a massive village green, we offer a relaxed space where you can enjoy excellent food and drinks without the noise of the main Oxford routes.
        </p>
        <p>
          Our country pub features cozy nook seating, warm wooden beams, and friendly pub dogs. We specialize in classic pub food cooked with gourmet flair: including beer-battered cod, artisan burgers, seasonal soups, and an array of homemade desserts.
        </p>

        <h3 className="text-xl font-serif text-neutral-900 font-medium">
          What We Offer Kennington Visitors:
        </h3>
        <ul className="space-y-4 list-none pl-0">
          <li className="flex items-start gap-3">
            <span className="text-[#475DB1] font-bold mt-1">✓</span>
            <div>
              <strong>Traditional &amp; Modern Dining:</strong> From locally sourced ribeye steaks to handcrafted plant-based specialties, we have something to suit every preference.
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#475DB1] font-bold mt-1">✓</span>
            <div>
              <strong>A Welcoming Space for Families &amp; Dogs:</strong> The Seven Stars is dog-friendly and family-oriented, complete with children&apos;s options.
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#475DB1] font-bold mt-1">✓</span>
            <div>
              <strong>Fabulous Drink Options:</strong> Cask ales, fine spirits, local gins, and hot seasonal drinks.
            </div>
          </li>
        </ul>

        {/* Testimonial Quote */}
        <div className="bg-[#faf9f6] p-6 rounded-2xl border-l-4 border-[#475DB1] my-8">
          <p className="italic text-neutral-700 font-serif">
            &ldquo;We walked over from Kennington along the Thames path and ended up here for lunch. The food was outstanding, and the garden views are stunning. We&apos;ll be making this our regular spot!&rdquo;
          </p>
          <div className="flex items-center gap-1.5 mt-3 text-amber-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
            <span className="text-xs text-neutral-400 font-sans ml-2">— Robert D., Kennington Resident</span>
          </div>
        </div>

        <h3 className="text-xl font-serif text-neutral-900 font-medium">
          How to reach us
        </h3>
        <p>
          From Kennington, take the road south toward Radley and continue east via the Abingdon road, or drive via the A4142 Eastern Bypass and take the A4074 south toward Nuneham Courtenay, turning left at the sign for Marsh Baldon.
        </p>
      </div>
    </BlogDetailLayout>
  );
}
