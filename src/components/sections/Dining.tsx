'use client';

import Image from 'next/image';
import { UtensilsCrossed } from 'lucide-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Dining() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header: slide up + fade
      gsap.fromTo('.dining-header',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.dining-header', start: 'top 82%', toggleActions: 'play none none none' }
        }
      );

      // Left text block: stagger items up
      gsap.fromTo('.dining-text-item',
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, stagger: 0.18, ease: 'power2.out',
          scrollTrigger: { trigger: '.dining-text-item', start: 'top 80%', toggleActions: 'play none none none' }
        }
      );

      // Stats: count-up feel — fade in with upward pop
      gsap.fromTo('.dining-stat',
        { y: 24, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.2, ease: 'back.out(1.5)',
          scrollTrigger: { trigger: '.dining-stat', start: 'top 85%', toggleActions: 'play none none none' }
        }
      );

      // Image: slow zoom + slide from right
      gsap.fromTo('.dining-image',
        { x: 60, opacity: 0, scale: 1.05 },
        { x: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: '.dining-image', start: 'top 78%', toggleActions: 'play none none none' }
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="dining" className="py-24 bg-dark-950 relative border-t border-light/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="dining-header mb-20 flex items-end justify-between border-b border-dark-800/60 pb-8">
          <div className="flex flex-col gap-3">
            <span className="text-[10px] tracking-[0.4em] text-gold-600 uppercase font-medium flex items-center gap-3">
              <span className="font-serif text-2xl text-dark-700 leading-none">02</span>
              <span className="w-6 h-[1px] bg-gold-600/50"></span>
              Exquisite Taste
            </span>
            <h3 className="text-4xl md:text-5xl font-serif text-white leading-tight tracking-tight">
              The <em className="not-italic italic text-gold-500 font-light">Dining</em> Experience
            </h3>
          </div>
          <div className="hidden md:flex items-center justify-center w-14 h-14 rounded-full border border-dark-700 text-gold-600/60">
            <UtensilsCrossed size={24} strokeWidth={1.2} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-8 max-w-xl">
            <h4 className="dining-text-item text-2xl font-serif text-white mb-6">Signature Cuisine &amp; Craft Drinks</h4>
            <p className="dining-text-item text-dark-200 leading-relaxed font-light text-lg">
              Our menu revolves around locally sourced, premium seasonal ingredients crafted to perfection by our executive chefs. 
            </p>
            <p className="dining-text-item text-dark-200 leading-relaxed font-light text-lg">
              Enjoy signature dishes paired perfectly with our extensive selection of fine wines, artisan spirits, and craft ales. From a refined Sunday roast to an elaborate evening course, dining at Seven Stars is designed to indulge the senses.
            </p>
            
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-dark-800">
              <div className="dining-stat">
                <p className="font-serif text-gold-400 text-3xl mb-2">50+</p>
                <p className="text-sm uppercase tracking-wider text-dark-300">Fine Wines</p>
              </div>
              <div className="dining-stat">
                <p className="font-serif text-gold-400 text-3xl mb-2">12</p>
                <p className="text-sm uppercase tracking-wider text-dark-300">Signature Mains</p>
              </div>
            </div>
          </div>

          <div className="dining-image relative h-[600px] w-full rounded-2xl overflow-hidden group">
             <div className="absolute inset-0 bg-gold-900/10 group-hover:bg-transparent transition-colors z-10 duration-700" />
             <Image 
               src="/images/dining_plate.png"
               alt="Gourmet dish at Seven Stars"
               fill
               className="object-cover transition-transform duration-1000 group-hover:scale-105"
             />
             <div className="absolute bottom-0 left-0 right-0 p-8 glass bg-dark-990/60 z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
               <p className="text-gold-400 font-serif text-xl italic mb-2">The Prime Cut</p>
               <p className="text-sm text-dark-200 uppercase tracking-widest">Our Signature Dish</p>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
