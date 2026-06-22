"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import BlogDetailLayout from "../components/BlogDetailLayout";

export default function WallingfordSeoPage() {
  return (
    <BlogDetailLayout
      title="Best Pub in"
      italicHighlight="Wallingford Area"
      tagline="South Oxfordshire Pub Guide"
      description="Discover the ultimate countryside gastronomy at the Seven Stars in Marsh Baldon, only a scenic 15-minute journey from Wallingford."
      backgroundImage="https://sevenstarsatmarshbaldon.co.uk/wp-content/uploads/2025/09/dish2.webp"
      area="Wallingford"
      readTime="3 min read"
      date="20 Jun 2026"
      views="112"
      distanceInfo="15 min drive from Wallingford"
    >
      <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-serif text-neutral-900 leading-tight font-medium">
          Why the Best Pub Near Wallingford is The Seven Stars
        </h2>
        <p>
          Wallingford is known for its historic market town vibes, but when it comes to finding a peaceful country retreat with an award-winning menu and views overlooking a village green, the locals look slightly further afield. Located 8 miles north in Marsh Baldon, <strong>The Seven Stars</strong> is consistently recognized as the premier dining pub choice in the Wallingford area.
        </p>
        <p>
          Our gastro pub prides itself on providing a premium dining experience that combines culinary excellence with the charm of a classic country inn. From handcrafted starters to dry-aged steaks and classic British Sunday roasts, our chefs prioritize regional and seasonal ingredients to ensure every plate is a masterpiece.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-8">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
            <Image
              src="https://sevenstarsatmarshbaldon.co.uk/wp-content/uploads/2025/09/dish3.webp"
              alt="Fine Country Pub Dining"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
            <Image
              src="https://sevenstarsatmarshbaldon.co.uk/wp-content/uploads/2025/09/dish4.webp"
              alt="Delicious Starters"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>

        <h3 className="text-xl font-serif text-neutral-900 font-medium">
          Key Offerings for Wallingford Food Lovers
        </h3>
        <ul className="space-y-4 list-none pl-0">
          <li className="flex items-start gap-3">
            <span className="text-[#475DB1] font-bold mt-1">✓</span>
            <div>
              <strong>Chef-Curated Gastronomy:</strong> Enjoy seasonal game, fresh fish, and premium vegan options paired with hand-selected boutique wines and craft beers.
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#475DB1] font-bold mt-1">✓</span>
            <div>
              <strong>Village Green Setting:</strong> Relax on the picturesque Marsh Baldon common green, complete with outdoor tables and a lively atmosphere.
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#475DB1] font-bold mt-1">✓</span>
            <div>
              <strong>Cozy Fireplaces &amp; Atmosphere:</strong> Ideal for cold winter evenings, cozy dates, or catching up with friends in a traditional environment.
            </div>
          </li>
        </ul>

        {/* Testimonial Quote */}
        <div className="bg-[#faf9f6] p-6 rounded-2xl border-l-4 border-[#475DB1] my-8">
          <p className="italic text-neutral-700 font-serif">
            &ldquo;We have visited almost every pub in and around Wallingford, but Seven Stars remains our favorite. The food is consistently outstanding, and the service is always warm and professional. A true gem!&rdquo;
          </p>
          <div className="flex items-center gap-1.5 mt-3 text-amber-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
            <span className="text-xs text-neutral-400 font-sans ml-2">— James &amp; Lucy T., Wallingford Residents</span>
          </div>
        </div>

        <h3 className="text-xl font-serif text-neutral-900 font-medium">
          Directions from Wallingford
        </h3>
        <p>
          Drive north out of Wallingford along the A4074 (Henley Road) toward Oxford. Continue past Nuneham Courtenay, then take the turn-off toward Marsh Baldon. We are located right at the center of the village green, ready to welcome you.
        </p>
      </div>
    </BlogDetailLayout>
  );
}
