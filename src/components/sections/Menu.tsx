'use client';

import { ChefHat } from 'lucide-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const menuCategories = [
  {
    title: "Starters",
    items: [
      { name: "Truffle Arancini", desc: "Wild mushroom, black truffle, aged parmesan, saffron aioli", price: "£14" },
      { name: "Seared Scallops", desc: "Pea purée, crispy pancetta, mint oil, lemon zest", price: "£18" },
      { name: "Wagyu Beef Carpaccio", desc: "Caper berries, rocket, shaved truffle, olive oil", price: "£22" },
    ]
  },
  {
    title: "Mains",
    items: [
      { name: "Pan-Roasted Halibut", desc: "Samphire, crushed jersey royals, Champagne beurre blanc", price: "£36" },
      { name: "Dry-Aged Ribeye 10oz", desc: "Triple cooked chips, roasted vine tomatoes, peppercorn sauce", price: "£42" },
      { name: "Wild Venison Loin", desc: "Fondant potato, blackberry jus, heritage carrots", price: "£38" },
    ]
  },
  {
    title: "Desserts",
    items: [
      { name: "Dark Chocolate Delice", desc: "Hazelnut praline, salted caramel ice cream, gold leaf", price: "£12" },
      { name: "Vanilla Bean Panna Cotta", desc: "Rhubarb compote, ginger crumble", price: "£10" },
    ]
  }
];

export default function Menu() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.fromTo('.menu-header',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.menu-header', start: 'top 82%', toggleActions: 'play none none none' }
        }
      );

      // Menu cards: stagger slide up with slight rotation
      gsap.fromTo('.menu-card',
        { y: 60, opacity: 0, rotateX: 4 },
        { y: 0, opacity: 1, rotateX: 0, duration: 0.85, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: '.menu-card', start: 'top 82%', toggleActions: 'play none none none' }
        }
      );

      // Each menu item: subtle stagger within cards
      gsap.fromTo('.menu-item',
        { opacity: 0, x: -15 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out',
          scrollTrigger: { trigger: '.menu-card', start: 'top 70%', toggleActions: 'play none none none' }
        }
      );

      // Download CTA
      gsap.fromTo('.menu-download',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: '.menu-download', start: 'top 90%', toggleActions: 'play none none none' }
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="menu" className="py-24 bg-dark-950 border-t border-light/5 relative overflow-hidden">
      
      {/* Decorative text */}
      <div className="absolute top-16 -left-28 text-[15rem] font-serif text-dark-900/40 select-none z-0 rotate-[-90deg] hidden lg:block">
        MENU
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="menu-header mb-16 flex items-end justify-between border-b border-dark-800/60 pb-8">
          <div className="flex flex-col gap-3">
            <span className="text-[10px] tracking-[0.4em] text-gold-600 uppercase font-medium flex items-center gap-3">
              <span className="font-serif text-2xl text-dark-700 leading-none">05</span>
              <span className="w-6 h-[1px] bg-gold-600/50"></span>
              Seasonal Selection
            </span>
            <h3 className="text-4xl md:text-5xl font-serif text-white leading-tight tracking-tight">
              Our <em className="not-italic italic text-gold-500 font-light">Menu</em>
            </h3>
          </div>
          <div className="hidden md:flex items-center justify-center w-14 h-14 rounded-full border border-dark-700 text-gold-600/60">
            <ChefHat size={24} strokeWidth={1.2} />
          </div>
        </div>

        <div className="space-y-16">
          {menuCategories.map((cat, i) => (
            <div key={i} className="menu-card space-y-8 glass-card rounded-3xl p-8 md:p-12 relative">
               <h4 className="text-2xl font-serif text-gold-400 mb-8 border-b border-dark-800 pb-4">{cat.title}</h4>
               <div className="grid grid-cols-1 gap-8">
                 {cat.items.map((item, j) => (
                   <div key={j} className="menu-item group cursor-default">
                     <div className="flex justify-between items-baseline mb-2">
                       <h5 className="text-lg font-medium text-white uppercase tracking-wider group-hover:text-gold-400 transition-colors">{item.name}</h5>
                       <span className="text-xl font-serif text-gold-500">{item.price}</span>
                     </div>
                     <p className="text-dark-300 font-light text-sm italic">{item.desc}</p>
                   </div>
                 ))}
               </div>
            </div>
          ))}
        </div>

        <div className="menu-download mt-16 text-center">
          <a href="/Modern-Sample-Menu.pdf" download className="inline-flex items-center justify-center px-8 py-4 border border-gold-600 text-gold-400 hover:bg-gold-600 hover:text-dark-990 uppercase tracking-widest text-sm transition-all group rounded-full">
            Download PDF Menu
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
