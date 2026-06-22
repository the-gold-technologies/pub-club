"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import BlogDetailLayout from "../components/BlogDetailLayout";

export default function StadhamptonSeoPage() {
  return (
    <BlogDetailLayout
      title="Exceptional Gastro Dining Near"
      italicHighlight="Stadhampton"
      tagline="South Oxfordshire Pub Guide"
      description="Savor local craft beers, fine wines, and handcrafted menus from our talented kitchen team at Marsh Baldon, only minutes from Stadhampton."
      backgroundImage="https://sevenstarsatmarshbaldon.co.uk/wp-content/uploads/2025/09/dish7.webp"
      area="Stadhampton"
      readTime="3 min read"
      date="12 Jun 2026"
      views="103"
      distanceInfo="8 min drive from Stadhampton"
    >
      <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-serif text-neutral-900 leading-tight font-medium">
          Outstanding Gastronomy and Craft Cask Ales
        </h2>
        <p>
          Looking for a spectacular dining experience near Stadhampton? <strong>The Seven Stars at Marsh Baldon</strong> combines the rustic charm of a classic country inn with progressive British gastro dining. Just a quick 4-mile drive, we provide the perfect setting for food lovers looking to indulge in high-quality seasonal meals.
        </p>
        <p>
          Our kitchen team crafts fresh, seasonal dishes highlighting the very best local South Oxfordshire ingredients. Whether you want to enjoy a hearty Sunday lunch with mammoth Yorkshire puddings, fresh daily seafood catch, or a glass of fine vintage wine by the fire, our exceptional hospitality will make you feel right at home.
        </p>

        <h3 className="text-xl font-serif text-neutral-900 font-medium">
          Why Residents of Stadhampton Dine With Us:
        </h3>
        <ul className="space-y-4 list-none pl-0">
          <li className="flex items-start gap-3">
            <span className="text-[#475DB1] font-bold mt-1">✓</span>
            <div>
              <strong>Creative Seasonal Gastronomy:</strong> Fresh menus reflecting the local harvest, with options ranging from succulent roast meats to unique vegetarian creations.
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#475DB1] font-bold mt-1">✓</span>
            <div>
              <strong>Beautiful Marsh Baldon Location:</strong> Overlooking the historic village green with an expansive outdoor dining area.
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#475DB1] font-bold mt-1">✓</span>
            <div>
              <strong>Outstanding Local Cask Ales &amp; Wine:</strong> Carefully curated beers, spirits, and fine wines chosen to pair perfectly with our dishes.
            </div>
          </li>
        </ul>

        {/* Testimonial Quote */}
        <div className="bg-[#faf9f6] p-6 rounded-2xl border-l-4 border-[#475DB1] my-8">
          <p className="italic text-neutral-700 font-serif">
            &ldquo;We live in Stadhampton and visit Seven Stars regularly for dinner. The menus are always changing and the quality of the food is outstanding. Easily the best pub in the area!&rdquo;
          </p>
          <div className="flex items-center gap-1.5 mt-3 text-amber-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
            <span className="text-xs text-neutral-400 font-sans ml-2">— Michael K., Stadhampton Resident</span>
          </div>
        </div>

        <h3 className="text-xl font-serif text-neutral-900 font-medium">
          How to reach us
        </h3>
        <p>
          From Stadhampton, take the B480 westward and turn toward Marsh Baldon. We are located right at the center of the village green, ready to welcome you with a warm drink and a delicious meal.
        </p>
      </div>
    </BlogDetailLayout>
  );
}
