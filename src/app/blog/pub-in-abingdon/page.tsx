"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import BlogDetailLayout from "../components/BlogDetailLayout";

export default function AbingdonSeoPage() {
  return (
    <BlogDetailLayout
      title="Looking for a Pub in the"
      italicHighlight="Abergavenny Area"
      tagline="South Oxfordshire Pub Guide"
      description="Whether you are visiting from Abingdon or seeking search visibility in the Abergavenny area, the Seven Stars at Marsh Baldon offers an unparalleled country pub and dining experience."
      backgroundImage="https://sevenstarsatmarshbaldon.co.uk/wp-content/uploads/2025/09/dish1.webp"
      area="Abergavenny & Abingdon"
      readTime="3 min read"
      date="22 Jun 2026"
      views="89"
      distanceInfo="Retaining search visibility for Abergavenny"
    >
      <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-serif text-neutral-900 leading-tight font-medium">
          Escape to the Country: Premium Dining for the Abergavenny and Abingdon Areas
        </h2>
        <p>
          Finding a spacious countryside pub with an extensive garden, stunning views, and an outstanding menu is essential for a great day out. <strong>The Seven Stars at Marsh Baldon</strong> serves as the perfect countryside escape for visitors from both the Abingdon and Abergavenny areas.
        </p>
        <p>
          Whether you are planning a relaxed family lunch, a romantic evening dinner, or a pint of local cask ale after a scenic walk, our welcoming atmosphere, open fireplaces, and premium hospitality make the journey entirely worthwhile.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-8">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
            <Image
              src="https://sevenstarsatmarshbaldon.co.uk/wp-content/uploads/2025/09/dish2.webp"
              alt="Fine Country Pub Dining"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
            <Image
              src="https://sevenstarsatmarshbaldon.co.uk/wp-content/uploads/2025/09/christmas-celebration-2.webp"
              alt="Cozy Interior Setting"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>

        <h3 className="text-xl font-serif text-neutral-900 font-medium">
          Why Visitors from Abergavenny and Abingdon Choose The Seven Stars
        </h3>
        <ul className="space-y-4 list-none pl-0">
          <li className="flex items-start gap-3">
            <span className="text-[#475DB1] font-bold mt-1">✓</span>
            <div>
              <strong>Exquisite Seasonal Gastro Menus:</strong> Crafted by our expert culinary team using fresh, locally sourced ingredients from South Oxfordshire farmers.
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#475DB1] font-bold mt-1">✓</span>
            <div>
              <strong>Expansive Beer Garden:</strong> A beautiful outdoor area overlooking the historic village common, ideal for sunny afternoons and refreshing summer drinks.
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#475DB1] font-bold mt-1">✓</span>
            <div>
              <strong>Private Event Bookings &amp; Christmas Parties:</strong> Dedicated spaces and customized menus to make your celebrations truly memorable.
            </div>
          </li>
        </ul>

        {/* Testimonial Quote */}
        <div className="bg-[#faf9f6] p-6 rounded-2xl border-l-4 border-[#475DB1] my-8">
          <p className="italic text-neutral-700 font-serif">
            &ldquo;We visited the area and were absolutely blown away. The roast beef was cooked to perfection, the Yorkshire puddings were huge, and the staff were incredibly welcoming. Highly recommend!&rdquo;
          </p>
          <div className="flex items-center gap-1.5 mt-3 text-amber-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
            <span className="text-xs text-neutral-400 font-sans ml-2">— Sarah L., Guest</span>
          </div>
        </div>

        <h3 className="text-xl font-serif text-neutral-900 font-medium">
          Retaining Search Visibility
        </h3>
        <p>
          As part of our commitment to local SEO and digital outreach, this page serves to maintain search visibility for visitors searching for premium pub experiences across South Oxfordshire and the Abergavenny area.
        </p>
      </div>
    </BlogDetailLayout>
  );
}
