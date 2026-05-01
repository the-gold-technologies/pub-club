"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "The atmosphere at Seven Stars is unmatched. From the warm welcome to the exquisite Middle Eastern influences in their Sunday roast, it's a truly boutique experience.",
    author: "James Harrison",
    role: "Local Food Critic",
    image: "/images/gallery/testimonial-v2-1.jpg",
  },
  {
    quote:
      "A perfect blend of British tradition and modern culinary art. Their orange and cognac crème brulée is quite literally the best dessert I've had this year.",
    author: "Sarah Jenkins",
    role: "Frequent Guest",
    image: "/images/gallery/testimonial-v2-2.jpg",
  },
  {
    quote:
      "We hosted our anniversary here and the team went above and beyond. The setting is stunning, especially in the evening when the glow hits the stone walls.",
    author: "Robert & Elena",
    role: "Club Members",
    image: "/images/gallery/testimonial-v2-3.jpg",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  const changeTestimonial = (index: number) => {
    if (index === active || isChanging) return;
    setIsChanging(true);

    const tl = gsap.timeline({
      onComplete: () => {
        setActive(index);
        setIsChanging(false);
        // Reset container so children entrance is visible
        gsap.set(".testimonial-content", { opacity: 1, y: 0 });
      },
    });

    // Exit animation: fade and slide down slightly
    tl.to(".testimonial-content", {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: "power2.in",
    });
  };

  useEffect(() => {
    // Entrance animation whenever 'active' changes
    gsap.fromTo(
      ".testimonial-content > *",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        clearProps: "all",
      },
    );
  }, [active]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isChanging) {
        changeTestimonial((active + 1) % testimonials.length);
      }
    }, 8000);
    return () => clearInterval(timer);
  }, [active, isChanging]);

  return (
    <section className="bg-[#faf9f6] overflow-hidden min-h-[600px] flex items-center relative border-t border-black/5">
      {/* Paper Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

      <div className="w-full grid grid-cols-1 md:grid-cols-2 h-full min-h-[600px] relative z-10">
        {/* Left Side: Content */}
        <div className="p-12 md:p-24 flex flex-col justify-center items-center text-center relative bg-[#FDFBF7] min-h-[550px]">
          <div className="max-w-xl w-full flex flex-col justify-center min-h-[350px]">
            <div className="testimonial-content space-y-10">
              <div className="flex justify-center">
                <Quote
                  className="text-[#475DB1] w-12 h-12 opacity-25 rotate-180"
                  fill="currentColor"
                />
              </div>

              <p className="text-2xl md:text-3xl font-serif text-neutral-800 italic leading-snug tracking-tight px-4">
                &quot;{testimonials[active].quote}&quot;
              </p>

              <div className="space-y-2">
                <h4 className="text-sm tracking-[0.4em] text-black uppercase font-bold">
                  {testimonials[active].author}
                </h4>
                <p className="text-[11px] tracking-[0.3em] text-[#475DB1] uppercase font-bold opacity-80">
                  {testimonials[active].role}
                </p>
              </div>
            </div>
          </div>

          {/* Decorative accent - Left side only */}
          <div className="absolute left-12 top-0 bottom-0 w-[1px] bg-black/5 hidden lg:block" />
        </div>

        {/* Right Side: Image */}
        <div className="relative h-[450px] md:h-auto overflow-hidden bg-[#FDFBF7]">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-all duration-[1500ms] ease-in-out ${
                i === active
                  ? "opacity-100 scale-100 z-10"
                  : "opacity-0 scale-110 z-0"
              }`}
            >
              <Image
                src={testimonial.image}
                alt="Boutique Atmosphere"
                fill
                className="object-cover contrast-[1.05] brightness-[1.02]"
                priority={i === 0}
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FDFBF7]/40 to-transparent pointer-events-none z-20" />
          {/* Subtle vignette */}
          <div className="absolute inset-0 bg-black/5 pointer-events-none z-20" />
        </div>
      </div>
    </section>
  );
}
