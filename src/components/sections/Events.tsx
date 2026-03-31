'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Events() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image: clip-path wipe from left (curtain-style reveal)
      gsap.fromTo('.events-image',
        { clipPath: 'inset(0 100% 0 0)', opacity: 1 },
        { clipPath: 'inset(0 0% 0 0)', duration: 1.3, ease: 'power4.inOut',
          scrollTrigger: { trigger: '.events-image', start: 'top 78%', toggleActions: 'play none none none' }
        }
      );

      // Heading: slide from right
      gsap.fromTo('.events-heading',
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.events-heading', start: 'top 82%', toggleActions: 'play none none none' }
        }
      );

      // List items: stagger fade + slide
      gsap.fromTo('.events-list-item',
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.65, stagger: 0.12, ease: 'power2.out',
          scrollTrigger: { trigger: '.events-list-item', start: 'top 82%', toggleActions: 'play none none none' }
        }
      );

      // CTA button
      gsap.fromTo('.events-cta',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: '.events-cta', start: 'top 88%', toggleActions: 'play none none none' }
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="events" className="py-24 bg-dark-990 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="events-image order-2 lg:order-1 relative h-[600px] w-full rounded-3xl overflow-hidden group border border-dark-800 p-2">
             <div className="relative h-full w-full overflow-hidden rounded-2xl">
               <div className="absolute inset-0 bg-dark-900/40 group-hover:bg-transparent transition-colors z-10 duration-700" />
               <Image 
                 src="/images/event_venue.png"
                 alt="Private event at Seven Stars"
                 fill
                 className="object-cover transition-transform duration-1000 group-hover:scale-105"
               />
             </div>
          </div>

          <div className="order-1 lg:order-2 space-y-8">

            <div className="events-heading flex flex-col gap-3 pb-8 border-b border-dark-800/60">
              <span className="text-[10px] tracking-[0.4em] text-gold-600 uppercase font-medium flex items-center gap-3">
                <span className="font-serif text-2xl text-dark-700 leading-none">03</span>
                <span className="w-6 h-[1px] bg-gold-600/50"></span>
                Memorable Occasions
              </span>
              <h3 className="text-4xl md:text-5xl font-serif text-white leading-tight tracking-tight">
                Host your <em className="not-italic italic text-gold-500 font-light">Celebrations</em>
              </h3>
            </div>
            
            <p className="text-dark-200 leading-relaxed font-light text-lg">
              With an opulent setting accommodating 150–170 guests, Seven Stars is the perfect venue for your private gatherings. We host tailored events that reflect your personal style and exceed your expectations.
            </p>
            
            <ul className="space-y-4 pt-4 pb-8">
              <li className="events-list-item flex items-center text-dark-100">
                <span className="w-2 h-2 rounded-full bg-gold-600 mr-4"></span> Elegant Weddings &amp; Receptions
              </li>
              <li className="events-list-item flex items-center text-dark-100">
                <span className="w-2 h-2 rounded-full bg-gold-600 mr-4"></span> Milestone Birthdays &amp; Anniversaries
              </li>
              <li className="events-list-item flex items-center text-dark-100">
                <span className="w-2 h-2 rounded-full bg-gold-600 mr-4"></span> Sophisticated Corporate Gatherings
              </li>
              <li className="events-list-item flex items-center text-dark-100">
                <span className="w-2 h-2 rounded-full bg-gold-600 mr-4"></span> Exclusive Wine Evenings &amp; BBQ Parties
              </li>
            </ul>

            <a href="#contact" className="events-cta inline-block px-8 py-4 bg-dark-800 hover:bg-gold-600 text-white hover:text-dark-990 border border-gold-600/30 uppercase tracking-widest text-sm font-semibold transition-all rounded-full">
              Enquire Now
            </a>
          </div>

        </div>
        
      </div>
    </section>
  );
}
